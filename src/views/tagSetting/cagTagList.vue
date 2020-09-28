<template>
  <div class="cagTagList">
    <div class="filter-container">
      <el-form :inline="true" class="form-inline">
        <el-form-item label="接口分类名称">
          <el-input v-model="category" style="width: 300px" clearable placeholder="请输入模型名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoad" @click="searchList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="addCagTag">新增</el-button>
        <el-button type="success" @click="stockSet">动态股权配置</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="cagList"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="分类ID" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口分类名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注描述" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remarks }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="success" @click="showEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="delTag(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <el-dialog title="分类名称设置" :visible.sync="addVisible" class="load_card">
      <div class="filter-container">
        <el-form>
          <el-form-item
            label="分类名称"
            :rules="[
              { required: true, message: '请输入分类名称', trigger: 'blur' }
            ]"
          >
            <el-input v-model="cagInfo.name" style="width: 300px" clearable placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item
            label="备注描述"
          >
            <el-input
              v-model="cagInfo.remarks"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              style="width: 300px"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="addVisible = false">取消</el-button>
            <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="addTagNew">确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="编辑分类设置" :visible.sync="editVisible" class="load_card">
      <div class="filter-container">
        <el-form>
          <el-form-item label="分类ID">
            {{ editInfo.id }}
          </el-form-item>
          <el-form-item label="分类名称">
            <el-input v-model="editInfo.name" style="width: 300px" clearable placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item label="备注描述">
            <el-input
              v-model="editInfo.remarks"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              style="width: 300px"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="addVisible = false">取消</el-button>
            <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="editTag">确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog title="动态股权配置" :visible.sync="blockVisible" class="load_card">
      <div class="filter-container">
        <el-form>
          <el-form-item
            label="项目ID"
            :rules="[
              { required: true, message: '请输入项目ID', trigger: 'blur' }
            ]"
          >
            <el-input v-model="stockInfo.id" style="width: 300px" clearable placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item
            style="color: #f00"
          >
            <div> 获取项目ID：注册动态股权账号并创建项目</div>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="blockVisible = false">取消</el-button>
            <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="sureProid">确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getClassify, addClassify, updateClassify, editClassify, delClassify, updateProject, getProject } from '@/api/tagSetting'
import Pagination from '@/components/Pagination'
export default {
  name: 'CagTagListVue',
  components: { Pagination },
  data() {
    return {
      category: '',
      catetoryList: [], // 接口列表分类
      cagList: [], // 接口；列表分类
      stockInfo: {
        id: '' // 动态股权Id
      },
      cagInfo: {
        name: '',
        remarks: ''
      },
      editInfo: {
        id: '',
        name: '',
        remarks: ''
      },
      shopList: [],
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      addVisible: false,
      editVisible: false,
      blockVisible: false,
      listLoading: false,
      total: 0, // 全部条数
      isLoad: false // loading状态
    }
  },
  mounted() {
    this.getList()
    this.getProid()
  },
  methods: {
    getList() {
      this.isLoad = true
      getClassify({
        name: this.category,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }).then(res => {
        this.isLoad = false
        if (res.code === 200) {
          this.cagList = res.data.list
          this.total = res.data.pagination.total
        }
      })
    },
    searchList() {
      this.listQuery.page = 1
      this.getList()
    },
    addCagTag() {
      // 添加标签分类
      this.addVisible = true
      this.cagInfo.name = ''
      this.cagInfo.remarks = ''
    },
    stockSet() {
      this.blockVisible = true
      // this.stockInfo.id = ''
    },
    getProid() {
      getProject().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.stockInfo.id = res.data
        }
      })
    },
    sureProid() {
      this.isLoad = true
      updateProject({ value: this.stockInfo.id }).then(res => {
        this.isLoad = false
        if (res.code === 200) {
          this.$message('添加动态股权配置成功')
          this.blockVisible = false
        } else {
          this.$message(res.msg)
        }
      })
    },
    addTagNew() {
      this.isLoad = true
      addClassify(this.cagInfo).then(res => {
        console.log(res)
        this.isLoad = false

        if (res.code === 200) {
          this.$message('添加分类成功')
          this.addVisible = false
        } else {
          this.$message(res.msg)
        }
      }).catch(err => {
        console.log(err)
        this.isLoad = false
        this.$message({
          type: 'info',
          message: '分类名称错误！'
        })
      })
    },
    showEdit(item) {
      this.editVisible = true
      this.editInfo = item
    },
    editTag() {
      this.isLoad = true
      updateClassify({
        id: this.editInfo.id,
        name: this.editInfo.name,
        remarks: this.editInfo.remarks

      }).then(res => {
        this.isLoad = false
        if (res.code === 200) {
          this.editVisible = false
          this.$message('编辑成功')
          this.searchList()
        }
      })
    },
    delTag(id) {
      this.$confirm('删除该接口分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delClassify({ id: id }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.searchList()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .cagTagList {
    padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
  }
  .form-content {
    padding: 10px;
  }
  .field-container {
    padding: 20px 10px;
  }
  .btn-wrap {
    padding: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .dialog-wrap {
    height: 500px;
    overflow: auto;
  }
  .el-upload--picture-img {
    width: 180px;
    height:80px;
  }

  .titles {
    width: 180px;
    text-align: right;
    line-height: 40px;
    font-size: 18px;
    font-weight: 700;
  }

  .el-upload--picture-logo {
    width: 60px;
    height: 60px;
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
</style>
