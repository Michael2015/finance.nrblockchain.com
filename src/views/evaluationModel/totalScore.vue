<template>
  <div class="totalScores">
    <div class="filter-container">
      <el-form :inline="true" :model="totalScore" class="form-inline">
        <el-form-item label="状态">
          <el-select v-model="totalScore.state" style="width: 200px" placeholder="请选择">
            <el-option label="启用" value="1" />
            <el-option label="停用" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="模型名称">
          <el-input v-model="totalScore.name" style="width: 300px" clearable placeholder="请输入综合评分模型名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="$router.push('/evaluationModel/createTotalScore')">新增</el-button>
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
        <el-table-column label="评分模型名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="综合积分模型数" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.grade_num }}</span>
          </template>
        </el-table-column>
        <!--        <el-table-column label="用户组" prop="id" align="center">-->
        <!--          <template slot-scope="scope">-->
        <!--            <span>{{ scope.row.type  }}</span>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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
            <el-button size="small" @click="editScore(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="delScore(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getScore, deleteScore } from '@/api/evaluationModel'
export default {
  name: 'TotalScore',
  components: { Pagination },
  data() {
    return {
      totalScore: {
        state: '',
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
    // 获取p评分列表
    this.getList()
  },
  methods: {
    getList() {
      getScore({
        status: this.totalScore.state,
        name: this.totalScore.name,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
      })
    },
    searchScore() {
      this.listQuery.page = 1
      this.getList()
    },
    editScore(id) {
      // 编辑
      this.$router.push('/evaluationModel/createTotalScore?id=' + id)
    },
    delScore(id) {
      this.$confirm('删除该综合评分, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteScore({ id }).then(res => {
          if (res.code === 200) {
            this.searchScore()
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

<style lang="scss">
  .totalScores {
    padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
  }
</style>
