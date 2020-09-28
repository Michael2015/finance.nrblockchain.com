<template>
  <div class="discounts">
    <div class="filter-container">
      <el-form :inline="true" :model="evaModal" class="form-inline">
        <el-form-item label="状态">
          <el-select v-model="evaModal.status" style="width: 200px" placeholder="请选择">
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="模型名称">
          <el-input v-model="evaModal.name" style="width: 300px" clearable placeholder="请输入活动名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchEva()">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="$router.push('/evaluationModel/creatEvaModel')">新增</el-button>
      </div>
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="evaModeList"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模型名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模型标签数" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.label_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="模型类型" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.model_text}}</span>

          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateFormat('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户组" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.group_name_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status == 1 ? '启用': '停用'  }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="editEvaModal(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="delEva(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getEvaList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getEvaluate, deleteEvaluate } from '@/api/evaluationModel'
export default {
  name: 'Discounts',
  components: { Pagination },
  data() {
    return {
      evaModal: {
        name: '',
        status: ''
      },
      evaModeList: [], // 列表
      tableKey: 0,
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
      listQuery2: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      couponTotal: 0,
      listQuery3: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      couponList: [],
      detailVisible: false,
      shopVisible: false, // 门店列表详情
      shopList: [], // 门店列表
      shopTotal: 0, //
      shopId: '',
      shopName: '',
      userPhone: '',
      active_coupon: '', // 优惠券ID
      coupon_no: '', // 优惠券编号
      couponLinkVisible: false,
      couponLink: ''// 优惠券链接
    }
  },
  mounted() {
    // 获取活动列表
    this.getEvaList()
  },
  methods: {
    getEvaList() {
      const { evaModal } = this
      getEvaluate({
        name: evaModal.name,
        status: evaModal.status,
        page: this.listQuery.page,
        limit: 10
      }).then(res => {
        if (res.code === 200) {
          this.evaModeList = res.data.list
          this.total = res.data.pagination.total
        }
      })
    },
    searchEva() {
      this.listQuery.page = 1
      this.getEvaList()
    },
    editEvaModal(id) {
      this.$router.push('/evaluationModel/creatEvaModel?id=' + id)
    },
    delEva(id) {
      this.$confirm('是否要删除该评价模型?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEvaluate({ id: id }).then(res => {
          if (res.code === 200) {
            console.log(res)
            this.searchEva()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    sureDel() {

    },
    searchCopon() {
      this.listQuery2.page = 1
      this.getCouponLists()
    }
  }
}
</script>

<style lang="scss">
  .discounts {
    padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
  }
</style>
