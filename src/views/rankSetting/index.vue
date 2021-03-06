<template>
  <div class="discounts">
    <div class="filter-container">
      <el-form :inline="true" :model="ranks" class="form-inline">
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="ranks.date"
            style="position: relative"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="启用状态">
          <el-select v-model="ranks.status" style="width: 200px" placeholder="请选择">
            <el-option label="启用" value="0" />
            <el-option label="停用" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="榜单名称">
          <el-input v-model="ranks.name" clearable style="width: 200px" placeholder="请输入活动编号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refreshRank">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="$router.push('/rankSetting/addRank')">新增</el-button>
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
        <el-table-column label="榜单名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="接口名称" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.interfaces_name_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="开奖时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.lottery_time_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联榜单" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.award_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateFormat('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="启用状态" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.status_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center" width="300">
          <template slot-scope="scope">
            <el-button size="small" @click="editRank(scope.row.id)">编辑</el-button>
            <el-button size="small" type="success" @click="showProject(scope.row.id)">上链配置</el-button>
            <el-button type="danger" size="small" @click="delRank(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <el-dialog title="动态股权配置" :visible.sync="blockVisible" class="load_card">
      <div class="filter-container">
        <el-form>
          <el-form-item
            label="项目ID"
            :rules="[
              { required: true, message: '请输入项目ID', trigger: 'blur' }
            ]"
          >
            <el-input v-model="stockInfo.proj_id" style="width: 300px" clearable placeholder="请输入分类名称" />
          </el-form-item>
          <el-form-item
            style="color: #f00"
          >
            <div> 获取项目ID：注册动态股权账号并创建项目</div>
          </el-form-item>
          <el-form-item>
            <el-button type="default" @click="blockVisible = false">取消</el-button>
            <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="updateProject">确认
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { projectsList, delProjects, setProjectShare } from '@/api/rankSetting'
export default {
  name: 'Discounts',
  components: { Pagination },
  data() {
    return {
      ranks: {
        status: '',
        date: [],
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
      blockVisible: false,
      stockInfo: {
        id: '',
        proj_id: ''
      },
      isLoad: false
    }
  },
  mounted() {
    // 获取活动列表
    this.getList()
  },
  methods: {
    getList() {
      const { ranks } = this
      let start = 0; let end = 0
      if (ranks.date.length > 0) {
        start = (new Date(ranks.date[0])).getTime() / 1000
        if (ranks.date[0] == ranks.date[1]) {
          end = start + 86400
        } else {
          end = (new Date(ranks.date[1])).getTime() / 1000
        }
      }
      projectsList({
        name: ranks.name,
        start_time: start,
        end_time: end,
        page: this.listQuery.page,
        limit: 10
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
      })
    },
    refreshRank() {
      this.listQuery.page = 1
      this.getList()
    },
    showProject(id) {
      this.blockVisible = true
      this.stockInfo.id = id
      this.stockInfo.proj_id = ''
    },
    updateProject() {
      this.isLoad = true
      setProjectShare({
        proj_id: this.stockInfo.proj_id,
        id: this.stockInfo.id
      }).then(res => {
        this.isLoad = false
        console.log(res)
        if (res.code === 200) {
          this.$message('添加动态股权配置成功')
          this.blockVisible = false
        } else {
          this.$message(res.msg)
        }
      }).catch(err => {
        this.isLoad = false
        console.log(err)
      })
    },
    editRank(id) {
      this.$router.push('/rankSetting/addRank?id=' + id)
    },
    delRank(id) {
      this.$confirm('是否要删除该排行榜?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delProjects({ id: id }).then(res => {
          if (res.code === 200) {
            console.log(res)
            this.refreshRank()
          } else {
            this.$message(res.msg)
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
  .discounts {
    padding: 10px;
    .filter-container {
      padding-top: 10px;
    }
  }
</style>
