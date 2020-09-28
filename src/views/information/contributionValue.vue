<template>
  <div class="contributionValue">
    <div class="filter-container">
      <el-form :inline="true" :model="classys" class="form-inline">
        <el-form-item label="分类">
          <el-select v-model="classys.classify_id" style="width: 200px" placeholder="请选择">
            <el-option label="请选择" value="" />
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="classys.identify_uid" style="width: 300px" clearable placeholder="用户ID" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">查询</el-button>
          <!--          <el-button type="primary" plain>重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="success" @click="cardVisible = true">导入贡献值</el-button>
        <el-button type="primary" @click="exporContrList">导出到excel</el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.data_uid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户ID" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.identify_uid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类标签" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.classify_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="得分" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="获取时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_sec }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.describe }}</span>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getData" />
    </div>
    <el-dialog title="导入贡献值" :visible.sync="cardVisible" class="load_card">
      <div class="file_warp">
        <div v-if="isUploadModal">
          <i class="icons  el-icon-success" />
          <div style="line-height: 3">导入贡献值列表成功</div>
        </div>
        <div v-else class="up_file">
          <el-upload
            class="upload-wraper"
            action="posts/"
            drag
            :show-file-list="false"
            :on-remove="handleRemove"
            :http-request="upFile"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
          </el-upload>

        </div>
        <div class="down_wrap">
          <el-button size="small" type="text" @click="downloadExcel(1)">
            <!--            <a download="file" target="_blank" href="http://112.74.51.130:9206/alf_mgt/api/v1/gift/download_model_file?file_code=1"> 下载excel文件模板</a>-->
            下载导入excel模板
          </el-button>
        </div>
      </div>
      <div class="button-wrap">
        <el-button type="default" @click="close">关闭</el-button>
        <!--        <el-button type="primary" :loading="isLoad">确定</el-button>-->
      </div>
    </el-dialog>
  </div>

</template>
<script>
import Pagination from '@/components/Pagination'
import { getToken } from '@/utils/auth'
import { getClassify, getClassifyData, upLoadClassify, getExcelFile } from '@/api/tagSetting'
export default {
  name: 'ContributionValue',
  components: { Pagination },
  data() {
    return {
      classys: {
        classify_id: '',
        identify_uid: ''
      },
      tableKey: 0,
      classList: [],
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      couponTotal: 0,
      couponList: [],
      detailVisible: false,
      cardVisible: false,
      isUploadModal: false,
      shopVisible: false
    }
  },
  mounted() {
    this.getClassify()
    this.getData()
  },
  methods: {
    getData() {
      const { classys } = this
      getClassifyData({
        classify_id: classys.classify_id,
        identify_uid: classys.identify_uid,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }).then(res => {
        if (res.code === 200) {
          if (res.data.pagination) {
            this.list = res.data.list
            this.total = res.data.pagination.total
          } else {
            this.list = []
            this.total = 0
          }
        }
      }).catch(err => console.log(err))
    },
    searchData() {
      this.listQuery.page = 1
      this.getData()
    },
    upFile(e) {
      // 上传
      upLoadClassify(e).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$message('导入成功！')
          this.isUploadModal = true
          // this.cardVisible = false
        }
      })
    },
    handleRemove() {
      // 移除
    },
    downloadExcel() {
      // 下载
      const hasToken = getToken()
      const baseUrl = process.env.VUE_APP_BASE_API
      // const baseUrl = 'http://performancetest.nrblockchain.com/admin'
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = baseUrl + '/v1/classify/download?x-token=' + hasToken
      link.setAttribute('download', 'model.xlsx')
      console.log(link.href)
      document.body.appendChild(link)
      link.click()
    },
    close() {
      this.cardVisible = false
      this.isUploadModal = false
    },
    exporContrList() {
      const baseUrl = process.env.VUE_APP_BASE_API
      const hasToken = getToken()
      const { classys } = this
      // 下载模板文件
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = baseUrl + '/v1/classify/export?x-token=' + hasToken +
              '&classify_id=' + classys.classify_id + '&identify_uid=' + classys.identify_uid
      link.setAttribute('download', 'order.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    getClassify() {
      getClassify({
        name: '',
        page: 1,
        limit: 0
      }).then(res => {
        if (res.code === 200) {
          this.classList = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .contributionValue {
    padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
    .load_card {
      .el-dialog {
        width: 500px;
        margin-top: 20vh;
        text-align: center;
      }

      .icons {
        font-size: 60px;
        color: #2ac06d;
      }

      .icon-err {
        color: #b3450e;
      }

      .upload-wraper {
        width: 360px;
        margin: 0 auto;
        box-sizing: border-box;
      }

      .down_wrap {
        text-align: center;
        padding: 10px;
      }
      .button-wrap {
        margin-top: 30px;
        text-align: center;
      }
    }
  }
</style>
