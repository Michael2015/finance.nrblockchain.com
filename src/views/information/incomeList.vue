<template>
  <div class="contributionValue">
    <div class="filter-container">
      <el-form :inline="true" :model="allocInfo" class="form-inline">
        <el-select v-model="allocInfo.type" style="width: 150px" placeholder="请选择">
          <el-option label="开始时间" value="1" />
          <el-option label="支付时间" value="2" />
        </el-select>
        <el-form-item>
          <el-date-picker
            v-model="allocInfo.time"
            type="month"
            placeholder="选择月"
          />
        </el-form-item>
        <!--
        <el-form-item label="分账模型">
          <el-select v-model="allocInfo.income_id" style="width: 200px" placeholder="请选择">
            <el-option label="请选择" value="" />
            <el-option v-for="item in classList" :key="item.id" :label="item.name" :value="item.id" />
            <el-option :key="-2" label="销售排行榜奖励" value="-2" />
            <el-option :key="-1" label="任务" value="-1" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户ID">
          <el-input v-model="allocInfo.uid" style="width: 300px" clearable placeholder="用户ID" />
        </el-form-item>
        <el-form-item label="分账状态">
          <el-select v-model="allocInfo.is_send" style="width: 200px" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="未分账" value="0" />
            <el-option label="已分账" value="1" />
            <el-option label="分账失败" value="2" />
            <el-option label="转账成功" value="3" />
            <el-option label="转账失败" value="4" />
          </el-select>
        </el-form-item>
        -->
        <el-form-item>
          <el-button type="primary" @click="searchData">查询</el-button>
          <!--  <el-button type="primary" plain>重置</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" size="small" @click="exporIncomeList(1)">导出到excel</el-button>
         <!--
        <el-button type="success" size="small" @click="exporIncomeList(2)">收入明细</el-button>
        <el-button type="primary" size="small" @click="exporIncomeList(3)">个税劳务报酬所得</el-button>
        <el-button type="success" size="small" @click="exporIncomeList(4)">个税人员信息</el-button>
        <el-button type="success" size="small" @click="exporIncomeList(5)">汇总报表</el-button>
        -->
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
        <el-table-column label="用户ID" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.union_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
       
        <el-table-column label="分账平台" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.platform_name}}</span>
          </template>
        </el-table-column>
         <!--
        <el-table-column label="经销商价格（提成金额）" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        -->
        <el-table-column label="分账金额" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="扣税金额" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tax }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实得金额" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.grant }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分账状态" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.send_text }} <span v-if="scope.row.error_msg != ''">({{ scope.row.error_msg }})</span></span>
          </template>
        </el-table-column>
        <el-table-column label="说明" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.title }} </span></span>
          </template>
        </el-table-column>
        <el-table-column label="分账时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.pay_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单ID" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.no }}</span>
          </template>
        </el-table-column>
      </el-table>
    
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getToken } from '@/utils/auth' // get token from cookie
import { getIncome, getIncomeList } from '@/api/evaluationModel'
import { dateFormat } from '@/filters'
export default {
  name: 'IncomeList',
  components: { Pagination },
  data() {
    return {
      allocInfo: {
        type: '1',
        date: '',
        uid: '', // 工号
        income_id: '', // 收入模型ID
        time: '', // 时间
        is_send: '' // 分账情况
      },
      tableKey: 0,
      classList: [],
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 2000,
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
    this.getClassify()
    this.getData()
  },
  methods: {
    getData() {
      const { allocInfo } = this
      console.log(allocInfo)
      getIncomeList({
        income_id: allocInfo.income_id, // 收入模型ID
        uid: allocInfo.uid, // 工号
        type: allocInfo.type, // 类型
        time: dateFormat(allocInfo.time, 'yyyy-MM'), // 时间
        is_send: allocInfo.is_send, // 分账状态
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
    getClassify() {
      getIncome({
        name: '',
        status: 1,
        page: 1,
        limit: 0
      }).then(res => {
        if (res.code === 200) {
          this.classList = res.data
        }
      })
    },
    exporIncomeList(type) {
      const baseUrl = process.env.VUE_APP_BASE_API
      // const baseUrl = 'http://performancetest.nrblockchain.com/admin'
      const hasToken = getToken()
      const { allocInfo } = this
      // 下载模板文件
      const link = document.createElement('a')
      link.style.display = 'none'
      const url = 'http://finance.nrblockchain.com/api/v1/income/'
      if (type === 1) {
        const datef = dateFormat(allocInfo.time, 'yyyy-MM')
        link.href = url + 'download?x-token=' + hasToken + '&type=' + allocInfo.type +
          '&income_id=' + allocInfo.income_id + '&uid=' + allocInfo.uid + '&time=' + datef
      } else if (type === 2) {
        if (this.allocInfo.time === '') {
          this.$message('请先选择月份')
          return
        } else {
          const datef = dateFormat(allocInfo.time, 'yyyy-MM')
          link.href = url + 'export/one?x-token=' + hasToken + '&type=' + allocInfo.type +
            '&income_id=' + allocInfo.income_id + '&uid=' + allocInfo.uid + '&time=' + datef
        }
      } else if (type === 3) {
        if (this.allocInfo.time === '') {
          this.$message('请先选择月份')
          return
        } else {
          const datef = dateFormat(allocInfo.time, 'yyyy-MM')
          link.href = url + 'export/two?x-token=' + hasToken + '&type=' + allocInfo.type +
            '&income_id=' + allocInfo.income_id + '&uid=' + allocInfo.uid + '&time=' + datef
        }
      } else if (type === 4) {
        if (this.allocInfo.time === '') {
          this.$message('请先选择月份')
          return
        } else {
          const datef = dateFormat(allocInfo.time, 'yyyy-MM')
          link.href = url + 'export/three?x-token=' + hasToken + '&type=' + allocInfo.type +
            '&income_id=' + allocInfo.income_id + '&uid=' + allocInfo.uid + '&time=' + datef
        }
      } else if (type === 5) {
        if (this.allocInfo.time === '') {
          this.$message('请先选择月份')
          return
        } else {
          const datef = dateFormat(allocInfo.time, 'yyyy-MM')
          link.href = url + 'export/four?x-token=' + hasToken + '&type=' + allocInfo.type +
            '&income_id=' + allocInfo.income_id + '&uid=' + allocInfo.uid + '&time=' + datef
        }
      }
      console.warn(link.href)
      link.setAttribute('download', 'order.xlsx')
      document.body.appendChild(link)
      link.click()
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
  }
</style>
