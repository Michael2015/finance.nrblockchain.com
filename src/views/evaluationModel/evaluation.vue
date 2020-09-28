<template>
  <div class="evaluation">
    <div class="filter-container">
      <el-form :inline="true" :model="grsdes" class="form-inline">
        <el-form-item label="状态">
          <el-select v-model="grsdes.status" style="width: 200px" placeholder="请选择">
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="综合评分模型名称">
          <el-select v-model="grsdes.name" style="width: 200px" placeholder="请选择">
            <el-option label="模型一" value="0" />
            <el-option label="模型二" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="$router.push('/evaluationModel/createEvaluation')">新增</el-button>
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
        <el-table-column label="ID" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="综合评分模型" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评价模型数" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.evaluate_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户组" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.group_name_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateFormat('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center">
          <template slot-scope="scope">
            <el-button size="small" @click="editEvaluation(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="delEvaluation(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getGrade, deleteGrade } from '@/api/evaluationModel'
export default {
  name: 'Evaluation',
  components: { Pagination },
  data() {
    return {
      grsdes: {
        status: '',
        name: ''
      },
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
      couponTotal: 0,
      couponList: [],
      detailVisible: false,
      shopVisible: false
    }
  },
  mounted() {
    // 获取列表
    this.getList()
  },
  methods: {
    getList() {
      const { grsdes } = this

      getGrade({
        name: grsdes.name,
        status: grsdes.status,
        page: this.listQuery.page,
        limit: this.listQuery.limit

      }).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
      })
    },
    searchGrade() {
      this.listQuery.page = 1
      this.getList()
    },
    delGrades(id) {

    },
    getCouponList(id) {
      this.detailVisible = true
      this.active_coupon = id
      this.getCouponLists()
    },
    editEvaluation(id) {
      // 编辑综合评分
      this.$router.push('/evaluationModel/createEvaluation?id=' + id)
    },
    delEvaluation(id) {
      // 删除综合评分
      this.$confirm('删除该综合评分模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGrade({ id }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'info',
              message: '删除成功！'
            })
            this.searchGrade()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getShopList(id) {
      this.shopVisible = true
      this.shopId = id
      this.getShopLists()
    },
    getShopLists() {

    },
    getCouponLink(cid) {
      this.couponLinkVisible = true
      this.couponLink = 'http://coupon.nrblockchain.com/?cid=' + cid
    },
    searchShop() {
      this.listQuery.page = 1
      this.getShopLists()
    },
    onSubmit() {
      console.log('提交查询')
    },
    submits() {
      console.log('筛选优惠券')
    }
  }
}
</script>

<style lang="scss">
  .evaluation {
    padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
  }
</style>
