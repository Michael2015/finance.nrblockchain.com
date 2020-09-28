<template>
  <div class="discounts">
    <div class="filter-container">
      <el-form :inline="true" :model="discount" class="form-inline">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="discount.date"
            style="position: relative"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="生效状态">
          <el-select v-model="discount.no" style="width: 200px" placeholder="请选择">
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="月份">
          <el-date-picker
            v-model="discount.month"
            style="position: relative"
            value-format="yyyy-MM"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">查询</el-button>
          <el-button type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="addRankSet">新增</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="ID" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.activities_no }}</span>
          </template>
        </el-table-column>
        <el-table-column label="榜单名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.start_time | dateFormat('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="月份" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.end_time | dateFormat('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="奖金总额" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.type | coupontype }}</span>
          </template>
        </el-table-column>
        <el-table-column label="本月奖励人数" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.rule }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.coupon_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.expiration_date }}</span>
          </template>
        </el-table-column>

        <el-table-column label="开奖状态" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.receivable_balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="getCouponList(scope.row.coupon_type_id)">编辑</el-button>
            <el-button type="danger" @click="getCouponLink(scope.row.coupon_type_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <el-dialog title="条件设置" :visible.sync="detailVisible">
      <el-form ref="registerform" class="dialog-wrap" :model="incentive" label-width="180px">
        <el-form-item label="选择榜单" prop="main_image">
          <el-select v-model="incentive.id" placeholder="请选择">
            <el-option
              v-for="item in ranklist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="奖励月份" prop="shop_name">
          <el-select v-model="incentive.month" placeholder="请选择">
            <el-option
              v-for="item in months"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="每周奖励人数" prop="mobile">
          <el-input v-model="incentive.reward_num" style="width: 130px" clearable placeholder="请输入人数" />人
        </el-form-item>
        <el-form-item label="奖金分配规则" prop="address">
          <div> 第一周：<el-input v-model="rule[0].rule_total_money" style="width: 100px" clearable placeholder="请输入奖金额" /> 元</div>
          <div> 第二周：<el-input v-model="rule[1].rule_total_money" style="width: 100px" clearable placeholder="请输入奖金额" /> 元</div>
          <div> 第三周：<el-input v-model="rule[2].rule_total_money" style="width: 100px" clearable placeholder="请输入奖金额" /> 元</div>
          <div> 第四周：<el-input v-model="rule[3].rule_total_money" style="width: 100px" clearable placeholder="请输入奖金额" /> 元</div>
          <div> 第五周：<el-input v-model="rule[4].rule_total_money" style="width: 100px" clearable placeholder="请输入奖金额" /> 元</div>
        </el-form-item>
        <el-form-item label="生效状态" prop="shop_status">
          <el-radio-group v-model="storeInfo.shop_status" size="small">
            <el-radio label="0">
              启用
            </el-radio>
            <el-radio label="2">
              禁用
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label-width="180px">
          <el-button type="default" @click="detailVisible=false">取消</el-button>
          <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="addAttendanc">确定
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { projectsList } from '@/api/rankSetting'
import { attendancList, addAttendancList } from '@/api/rankSetting'
export default {
  name: 'Discounts',
  components: { Pagination },
  data() {
    return {
      discount: {
        no: '',
        date: [],
        month: ''
      },
      incentive: {
        id: '',
        month: '',
        reward_num: '',
        total_money: '20'
      },
      months: [{
        label: '1月',
        value: '1'
      }, {
        label: '2月',
        value: '2'
      }, {
        label: '3月',
        value: '3'
      }, {
        label: '4月',
        value: '4'
      }, {
        label: '5月',
        value: '5'
      }, {
        label: '6月',
        value: '6'
      },
      {
        label: '7月',
        value: '7'
      }, {
        label: '8月',
        value: '8'
      }, {
        label: '9月',
        value: '9'
      }, {
        label: '10月',
        value: '10'
      }, {
        label: '11月',
        value: '11'
      }, {
        label: '12月',
        value: '12'
      }],
      rule: [
        {
          rule_status: 1,
          rule_week_num: 1,
          rule_total_money: '',
          rule_start_time: 0,
          rule_end_time: 0
        },
        {
          rule_status: 1,
          rule_week_num: 2,
          rule_total_money: '',
          rule_start_time: 0,
          rule_end_time: 0
        },
        {
          rule_status: 1,
          rule_week_num: 3,
          rule_total_money: '',
          rule_start_time: 0,
          rule_end_time: 0
        },
        {
          rule_status: 1,
          rule_week_num: 4,
          rule_total_money: '',
          rule_start_time: 0,
          rule_end_time: 0
        },
        {
          rule_status: 1,
          rule_week_num: 5,
          rule_total_money: '',
          rule_start_time: 0,
          rule_end_time: 0
        }

      ],
      list: [],
      storeInfo: {},
      rules: [],
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
      options: [],
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
      ranklist: [], // 榜单列表
      isLoad: false, // loading
      couponLink: ''// 优惠券链接
    }
  },
  mounted() {
    // 获取活动列表
    this.getList()
    this.getRankList()
  },
  methods: {
    getList() {
      const { discount } = this
      let start = 0; let end = 0
      if (discount.date.length > 0) {
        start = (new Date(discount.date[0])).getTime() / 1000
        if (discount.date[0] == discount.date[1]) {
          end = start + 86400
        } else {
          end = (new Date(discount.date[1])).getTime() / 1000
        }
      }
      console.log(this.discount)
      // attendancList({
      //   activities_no: this.discount.no,
      //   start_time: start,
      //   end_time: end,
      //   page: this.listQuery.page,
      //   limit: this.listQuery.limit
      // }).then(res => {
      //   if (res.code === 200) {
      //     if (res.data.length > 0) {
      //       this.list = res.data.list
      //       this.total = res.data.pagination.total
      //     }
      //   }
      // })
    },
    addAttendanc() {
      addAttendancList({
        project_id: this.incentive.id,
        // time: this.incentive.month,
        time: '2020-01',
        reward_num: this.incentive.reward_num,
        total_money: this.incentive.total_money,
        rule: this.rule
      }).then(res => {
        if (res.code === 200) {
          this.$message('添加成功')
        }
      })
    },
    getRankList() {
      projectsList({
        name: '',
        page: 1,
        limit: 0
      }).then(res => {
        this.ranklist = res.data
      })
    },
    addRankSet() {
      this.detailVisible = true
    },
    getCouponLists() {
      getActiveCoupons({
        coupon_type_id: this.active_coupon,
        mobile: this.userPhone,
        pagination: {
          'current_page': this.listQuery2.page,
          'page_size': 10,
          'last_page': 0,
          'total': 0
        }
      }).then(res => {
        // console.log(res)
        this.couponTotal = res.pagination.total
        this.couponList = res.data
      })
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

</style>
