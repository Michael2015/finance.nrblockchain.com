<template>
  <div class="discounts">
    <div class="filter-container">
      <el-form :inline="true" :model="tagSetting" class="form-inline">

        <el-form-item label="创建时间">
          <el-date-picker
            v-model="tagSetting.date"
            style="position: relative"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="显示状态">
          <el-select v-model="tagSetting.state" style="width: 200px" placeholder="请选择">
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="接口描述">
          <el-input v-model="tagSetting.no" clearable style="width: 300px" placeholder="请输入接口描述" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refreshInterface">查询</el-button>
          <el-button type="primary" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="$router.push('/tagSetting/edit')">新增</el-button>
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
        <el-table-column label="标签描述" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口地址" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.url }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调取时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.request_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="调取次数" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.error_num }}</span>
          </template>
        </el-table-column>
        <el-table-column label="启用状态" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="small" @click="eidtInterface(scope.row.id)">编辑</el-button>

            <el-button size="small" type="danger" @click="delInterface(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { interfacesList, addInterface, editInterface, delInterface } from '@/api/tagSetting'
export default {
  name: 'Discounts',
  components: { Pagination },
  data() {
    return {
      tagSetting: {
        name: '',
        date: []
      },
      tableKey: 0,
      list: [],
      total: 0,
      page: 1,
      limit: 10,
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
      detailVisible: false,
      shopVisible: false, // 门店列表详情
      couponLinkVisible: false,
      couponLink: ''// 优惠券链接
    }
  },
  mounted() {
    // 获取活动列表
    this.getList()
  },
  methods: {
    getList() {
      const { tagSetting } = this
      let start = 0; let end = 0
      if (tagSetting.date.length > 0) {
        start = (new Date(tagSetting.date[0])).getTime() / 1000
        if (tagSetting.date[0] == tagSetting.date[1]) {
          end = start + 86400
        } else {
          end = (new Date(tagSetting.date[1])).getTime() / 1000
        }
      }
      // 获取列表
      interfacesList({
        name: this.tagSetting.no,
        start_time: start,
        end_time: end,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data.list
          this.total = res.data.pagination.total
        }
        console.log(res)
      })
    },
    refreshInterface() {
      this.listQuery.page = 1
      this.getList()
    },
    eidtInterface(id) {
      this.$router.push('/tagSetting/edit?id=' + id)
    },
    delInterface(id) {
      this.$confirm('是否要删除该接口?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delInterface({ id: id }).then(res => {
          if (res.code === 200) {
            console.log(res)
            this.refreshInterface()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getCouponList(id) {
      this.detailVisible = true
      this.active_coupon = id
      this.getCouponLists()
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
        if (res.pagination) {
          this.couponList = res.data
          this.couponTotal = res.pagination.total
        }
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
