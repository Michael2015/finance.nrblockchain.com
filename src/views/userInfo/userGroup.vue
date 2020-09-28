<template>
  <div class="discounts">
    <div class="filter-container">
      <el-form :inline="true" :model="groupInfo" class="form-inline">
        <el-form-item label="用户组名称">
          <el-input v-model="groupInfo.groupName" clearable style="width: 300px" placeholder="请输入活动编号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="refreshGroup">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button size="small" type="primary" @click="addGroup">新增</el-button>
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
        <el-table-column label="编号" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="id" align="center" width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="用户数" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.member_num_text }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.create_time | dateFormat('yyyy-MM-dd hh:mm') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.admin_id === 0 ? '管理员': '其他' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="id" align="center">
          <template slot-scope="scope">
            <el-button type="default" @click="editGroup(scope.row.id)">编辑</el-button>
            <el-button type="danger" @click="delGroup(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getGroupLists" />
    </div>
    <el-dialog title="新增用户组" :visible.sync="detailVisible">
      <el-form :model="userGroup" class="form-inline">
        <el-form-item label="名称">
          <el-input v-model="userGroup.name" clearable style="width: 300px" placeholder="请输入活动编号" />
        </el-form-item>
        <el-form-item>
          <el-transfer
            v-model="userGroup.groupList"
            style="text-align: left; display: inline-block"
            filterable
            :render-content="renderFunc"
            :titles="['用户', '用户组']"
            :button-texts="['取消', '加入']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :data="data"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="detailVisible = false">取 消</el-button>
          <el-button :loading="isLoad" type="primary" @click="addUserGroup">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑用户组" :visible.sync="editVisible">
      <el-form :model="userGroup" class="form-inline">
        <el-form-item label="名称">
          <el-input v-model="userGroup.name" clearable style="width: 300px" placeholder="请输入活动编号" />
        </el-form-item>
        <el-form-item>
          <el-transfer
            v-model="userGroup.groupList"
            style="text-align: left; display: inline-block"
            filterable
            :render-content="renderFunc"
            :titles="['用户', '用户组']"
            :button-texts="['取消', '加入']"
            :format="{
              noChecked: '${total}',
              hasChecked: '${checked}/${total}'
            }"
            :data="data"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button :loading="isLoad" type="primary" @click="updateGroup">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUsers, addUserGroup, updateuserGroup, getuserGroup, userGroupList, delUserGroup } from '@/api/userInfo'
export default {
  name: 'Discounts',
  components: { Pagination },
  data() {
    return {
      data: [],
      groupInfo: {
        groupName: ''
      },
      renderFunc(h, option) {
        return <span>{ option.label }</span>
      },
      userGroup: {
        name: '',
        groupList: []
      },
      delDialogVisible: false,
      tableKey: 0,
      list: [],
      userList: [],
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
      detailVisible: false,
      editVisible: false, // 编辑的蒙层
      editId: '',
      isLoad: false
    }
  },
  mounted() {
    this.getUsers() // 获取用户列表
    // 获取活动列表
    this.getGroupLists()
  },
  methods: {
    addGroup() {
      this.detailVisible = true
      this.userGroup.name = ''
      this.userGroup.groupList = []
    },
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys)
      console.log(direction)
    },
    getUsers() {
      getUsers({
        status: '',
        name: '',
        id: '',
        mobile: '',
        position: '',
        division: '',
        page: 1,
        limit: 0
      }).then(res => {
        // 构造穿梭框的内容
        if (res.code === 200) {
          this.userList = res.data
          this.userList.forEach(item => {
            this.data.push({
              key: item.id,
              label: `${item.name}`
            })
          })
        }
      })
    },
    addUserGroup() {
      // 添加用户组
      addUserGroup({
        name: this.userGroup.name,
        member: this.userGroup.groupList
      }).then(res => {
        if (res.code === 200) {
          this.$message('添加分组成功！')
          this.refreshGroup()
          this.detailVisible = false
        } else {
          this.$message.error(res.msg)

        }
      })
    },
    refreshGroup() {
      // 刷新页面
      this.listQuery.page = 1
      this.getGroupLists()
    },
    getGroupLists() {
      userGroupList({
        name: this.groupInfo.groupName,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }).then(res => {
        this.list = res.data.list
        this.total = res.data.pagination.total
      })
    },
    editGroup(id) {
      this.editVisible = true
      getuserGroup({ id }).then(res => {
        if (res.code === 200) {
          this.editId = res.data.id
          this.userGroup.name = res.data.name
          this.userGroup.groupList = res.data.member
        }
      }).catch(err => err)
    },
    updateGroup() {
      updateuserGroup({
        id: this.editId,
        name: this.userGroup.name,
        member: this.userGroup.groupList
      }).then(res => {
        if (res.code === 200) {
          this.$message('编辑分组成功！')
          this.refreshGroup()
          this.editVisible = false
        }
      })
    },
    delGroup(id) {
      this.$confirm('删除该用户组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUserGroup({ id: id }).then(res => {
          if (res.code === 200) {
            console.log(res)
            this.refreshGroup()
          } else {
            this.$message({
              type: 'info',
              message: res.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
