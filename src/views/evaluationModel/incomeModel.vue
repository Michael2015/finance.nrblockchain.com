<template>
  <div class="discounts">
    <div class="filter-container">
      <el-form :inline="true" :model="income" class="form-inline">
        <el-form-item label="状态">
          <el-select v-model="income.status" style="width: 200px" placeholder="请选择">
            <el-option label="启用" value="1" />
            <el-option label="停用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="模型名称">
          <el-input v-model="income.name" style="width: 300px" clearable placeholder="请输入模型名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="$router.push('/evaluationModel/createIncomeModel')">新增</el-button>
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
        <el-table-column label="模型名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联综合积分数" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.grade_num }}</span>
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
            <el-button size="small" @click="editIncomeModel(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="delIncome(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>

  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getIncome, deleteIncome } from '@/api/evaluationModel'
export default {
  name: 'Discounts',
  components: { Pagination },
  data() {
    return {
      income: {
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
      }
    }
  },
  mounted() {
    // 获取活动列表
    this.getList()
  },
  methods: {
    getList() {
      const { income } = this
      getIncome({
        name: income.name,
        status: income.status,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
      })
    },
    searchIncome() {
      this.listQuery.page = 1
      this.getList()
    },
    delIncome(id) {
      this.$confirm('删除该收入模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteIncome({ id }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'info',
              message: '删除成功！'
            })
            this.searchIncome()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editIncomeModel(id) {
      this.$router.push('/evaluationModel/createIncomeModel?id=' + id)
    },
    getCouponList(id) {
      this.detailVisible = true
      this.active_coupon = id
      this.getCouponLists()
    },
    searchCopon() {
      this.listQuery2.page = 1
      this.getCouponLists()
    },
    getShopList(id) {
      this.shopVisible = true
      this.shopId = id
      this.getShopLists()
    },
    getShopLists() {
      getCouponShop({
        coupon_type_id: this.shopId,
        shop_name: this.shopName,
        'pagination': {
          'current_page': 1,
          'page_size': 10,
          'last_page': 1,
          'total': 2
        }
      }).then(res => {
        if (res.code === 0) {
          this.shopTotal = res.pagination.total
          this.shopList = res.data
        }
      })
    },
    getCouponLink(cid) {
      this.couponLinkVisible = true
      this.couponLink = 'http://coupon.nrblockchain.com/?cid=' + cid
    },
    searchShop() {
      this.listQuery3.page = 1
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
  .discounts {
    padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
  }
</style>
