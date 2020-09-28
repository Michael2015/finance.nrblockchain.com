<template>
  <div class="rankList">
    <div class="filter-container">
      <el-form :inline="true" :model="querys" class="form-inline">
        <el-form-item label="接口名称">
          <el-select v-model="querys.id" style="width: 300px" placeholder="请选择接口地址">
            <el-option
              v-for="item in tagList"
              :key="item.label"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="UID">
          <el-input v-model="querys.uid" style="width: 300px" clearable placeholder="请输入接UID" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="querys.name" style="width: 300px" clearable placeholder="请输入姓名" />

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <!-- <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="exporContrList">导出到excel</el-button>
      </div>-->
      <el-table
        :key="tableKey"
        v-loading="listLoading"
        :data="list"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column label="编号" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.data_uid }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.interfaces_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="UID" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.interfaces_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数值" prop="id" align="center">
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
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
  </div>
</template>

<script>

import Pagination from '@/components/Pagination'
import { getInterfaceRankList } from '@/api/tagSetting'
import { interfacesList } from '@/api/tagSetting'
export default {
  name: 'RankList',
  components: { Pagination },
  data() {
    return {
      querys: {
        id: '',
        name: '',
        uid: ''
      },
      tagList: [], // 接口列表
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
      shopVisible: false
    }
  },
  mounted() {
    this.getTagList() // 获取接口列表
    // this.getList()
  },
  methods: {
    getTagList() {
      interfacesList({
        page: 1,
        limit: 0
      }).then(res => {
        if (res.code === 200) {
          this.tagList = res.data
        }
      })
    },
    getList() {
      if (this.querys.id === '') {
        this.$message.warning('请先选择接口名称！')
      } else {
        getInterfaceRankList({
          id: this.querys.id,
          name: this.querys.name,
          uid: this.querys.uid,
          page: this.listQuery.page,
          limit: this.listQuery.limit
        }).then(res => {
          if (res.code === 200) {
            if (res.data.pagination) {
              this.list = res.data.list
              this.total = res.data.pagination.total
              console.log(this.total)
            } else {
              this.list = []
              this.total = 0
            }
          }
        }).catch(err => console.log(err))
      }
    },
    searchData() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

<style scoped  lang="scss">
  .rankList {
      padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
  }
</style>
