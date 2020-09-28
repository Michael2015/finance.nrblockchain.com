<template>
  <div class="userInfoIndex">
    <div class="filter-container">
      <el-form ref="searchInfo" :inline="true" :model="userInfo" class="form-inline">
        <el-form-item label="状态" prop="status">
          <el-select v-model="userInfo.status" style="width: 200px" placeholder="请选择">
            <el-option label="有效" value="0" />
            <el-option label="无效" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="userInfo.name" clearable style="width: 200px" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="工号" prop="union_id">
          <el-input v-model="userInfo.union_id" clearable style="width: 200px" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userInfo.mobile" maxlength="11" clearable style="width: 200px" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="支付宝绑定" prop="bindAlipay">
          <el-select v-model="userInfo.bindAlipay" style="width: 200px" placeholder="请选择">
            <el-option label="全部" value="" />
            <el-option label="已绑定" value="2" />
            <el-option label="未绑定" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付宝账号" prop="alipay">
          <el-input v-model="userInfo.alipay" maxlength="80" clearable style="width: 200px" placeholder="请输入支付宝账号" />
        </el-form-item>
        <el-form-item label="岗位" prop="position">
          <el-input v-model="userInfo.position" clearable style="width: 200px" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="部门" prop="division">
          <el-input v-model="userInfo.division" clearable style="width: 200px" placeholder="请输入部门" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchList">查询</el-button>
          <el-button type="primary" plain @click="resetFields">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="form-container">
      <div class="btn-wraper" style="padding: 0 0 10px">
        <el-button type="primary" @click="addUser(1)">新增</el-button>
        <el-button type="primary" @click="upGroup">批量导入</el-button>
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
        <el-table-column label="ID" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="name" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="工号" prop="union_id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.union_id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付宝" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.alipay }}</span>
          </template>

        </el-table-column>
        <el-table-column label="岗位" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.position }}</span>
          </template>
        </el-table-column>
        <el-table-column label="所属" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.division }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入职时间" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.entry_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="性别" prop="id" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.six_text  }}</span>
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
            <el-button @click="addUser(2, scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
    <el-dialog :title="aeType === 1 ? '新增' : '编辑'" :visible.sync="infoVisible" class="load_card">
      <el-form
        ref="addform"
        class="dialog-wrap"
        :rules="rules"
        :model="users"
        label-width="120px"
      >
        <el-form-item label="ID" prop="union_id">
          <el-input v-model="users.union_id" style="width: 300px" clearable placeholder="请输入ID" />
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="users.name" style="width: 300px" clearable placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="users.mobile" style="width: 300px" clearable placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="岗位" prop="position">
          <el-input v-model="users.position" style="width: 300px" clearable placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="所属" prop="division">
          <el-input v-model="users.division" style="width: 300px" clearable placeholder="请输入所属部门" />
        </el-form-item>
        <el-form-item label="入职时间" prop="entry_time">
          <el-date-picker
            v-model="users.entry_time"
            style="position: relative; width: 300px"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="性别" prop="six">
          <el-radio-group v-model="users.six" size="small">
            <el-radio label="1">保密</el-radio>
            <el-radio label="2">男</el-radio>
            <el-radio label="3">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="users.status" size="small">
            <el-radio label="1">启用</el-radio>
            <el-radio label="2">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="default" @click="infoVisible=false">取消</el-button>
          <el-button
            type="primary"
            :loading="isLoad"
            style="width: 120px; margin-left: 30px"
            @click="sureUsr"
          >确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="批量导入" :visible.sync="upFileVisible" class="load_card">
      <div class="file_warp">
        <div v-if="chargeType == 'uploadexcel'">
          <i class="icons el-icon-success" />
          <div>导入成功</div>
        </div>
        <div v-if="chargeType == 'fail'">
          <i class="icons icon-err el-icon-error" />
          <div>导入失败</div>
        </div>
        <div v-if="chargeType == 'uploadexcel'" class="files">
          <div>{{ chargeMsg }}</div>
          <!--<div>本次导入用户数：{{ chargeDate.user_count }} 条</div>-->
        </div>
        <div v-if="chargeType == 'before'" class="up_file">
          <el-upload
            class="upload-wraper"
            action="posts/"
            drag
            :show-file-list="false"
            :on-remove="handleRemove"
            :http-request="upUsers"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip">只能上传excel文件，且不超过500kb</div>
          </el-upload>
        </div>
        <div v-if="chargeType == 'before'" class="down_wrap">
          <el-button size="small" type="text" @click="downloadExcel(2)">
            下载导入excel模板文件
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { getUsers, adduser, upUsers, updateUser } from '@/api/userInfo'
const defaultUser = {
  union_id: '',
  name: '',
  mobile: '',
  position: '',
  division: '',
  status: '1',
  six: '1',
  entry_time: ''
}
export default {
  name: 'UserInfo',
  components: { Pagination },
  data() {
    return {
      userInfo: {
        status: '',
        name: '',
        union_id: '',
        mobile: '',
        bindAlipay: '',
        alipay: '',
        position: '',
        division: ''
      },
      users: Object.assign({}, defaultUser),
      page: 1,
      limit: 10,
      total: 0,
      isLoad: false,
      storeInfo: {},
      rules: {
        union_id: [{ required: true, message: '请输入ID' }],
        name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请填写电话', trigger: 'blur' }
        ],
        position: [{ required: true, message: '请填写岗位' }],
        division: [
          { required: true, message: '请填写所属部门', trigger: 'blur' }
        ],
        entry_time: [
          { required: true, message: '请填写入职时间', trigger: 'blur' }
        ],
        six: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      },
      tableKey: '',
      list: [],
      aeType: 1,
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
      chargeType: 'before', // 充值的状态
      chargeMsg: '', // 上传信息
      chargeDate: '', // 充值的金额
      couponList: [],
      detailVisible: false,
      infoVisible: false, // 上传的蒙层
      upFileVisible: false, // 上传文件
      shopVisible: false, // 门店列表详情
      shopList: [], // 门店列表
      shopTotal: 0, //
      shopId: '',
      shopName: '',
      userPhone: '',
      active_coupon: '', // 优惠券ID
      coupon_no: '', // 优惠券编号
      couponLinkVisible: false,
      couponLink: '' // 优惠券链接
    }
  },
  mounted() {
    // 获取活动列表
    this.getList()
  },
  methods: {
    getList() {
      const { userInfo } = this
      getUsers({
        status: userInfo.status,
        name: userInfo.name,
        union_id: userInfo.union_id,
        mobile: userInfo.mobile,
        position: userInfo.position,
        alipay: userInfo.alipay,
        bind_status: userInfo.bindAlipay, // 淘宝绑定
        division: userInfo.division,
        page: this.listQuery.page,
        limit: this.listQuery.limit
      }).then(res => {
        if (res.code === 200) {
          this.list = res.data.list
          this.total = res.data.pagination.total
        }
      })
    },
    searchList() {
      // 搜索s
      this.listQuery.page = 1
      this.getList()
    },
    addUser(type, user) {
      // 新增，编辑用户
      this.aeType = type
      this.infoVisible = true
      // console.log(this.users)
      if (type === 1) {
        this.users = Object.assign({}, defaultUser)
      } else if (type === 2) {
        this.users = Object.assign({}, user)
        this.users.six = user.six + ''
        this.users.status = user.status + ''
      }
    },
    sureUsr() {
      if (this.aeType === 1) {
        this.addNewUser()
      } else if (this.aeType === 2) {
        this.updateUser()
      }
    },
    addNewUser() {
      this.$refs['addform'].validate(valid => {
        if (valid) {
          this.isLoad = true
          adduser({
            union_id: this.users.union_id,
            name: this.users.name,
            mobile: this.users.mobile,
            position: this.users.position,
            division: this.users.division,
            status: this.users.status,
            six: this.users.six,
            entry_time: this.users.entry_time
          }).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.infoVisible = false
              this.getList()
            } else {
              this.$message(res.msg)
            }
          }).catch(err => {
            console.log(err)
            this.isLoad = false
          })
        } else {
          console.log('验证不通过')
        }
      })
    },
    updateUser() {
      console.log(this.users)
      this.$refs['addform'].validate(valid => {
        if (valid) {
          this.isLoad = true
          updateUser({
            id: this.users.id,
            union_id: this.users.union_id,
            name: this.users.name,
            mobile: this.users.mobile,
            position: this.users.position,
            division: this.users.division,
            status: this.users.status,
            six: this.users.six,
            entry_time: this.users.entry_time
          }).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.infoVisible = false
              this.getList()
            } else {
              this.$message(res.msg)
            }
          }).catch(err => {
            console.log(err)
            this.isLoad = false
          })
        } else {
          console.log('验证不通过')
        }
      })
    },
    getCouponList(id) {
      this.detailVisible = true
      this.active_coupon = id
      this.getCouponLists()
    },
    upGroup() {
      // 批量上传用户
      this.upFileVisible = true
      this.chargeType = 'before'
    },
    resetFields() {
      // 重置搜索的表单
      this.$refs['searchInfo'].resetFields()
    },
    upUsers(e) {
      upUsers(e).then(res => {
        if (res.code == 0) {
          this.chargeType = 'uploadexcel'
          this.chargeMsg = res.msg
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    downloadExcel(id) {
      const link = document.createElement('a')
      link.style.display = 'none'
      link.href = 'http://performance.nrblockchain.com/admin/v1/users/download'
      link.setAttribute('download', 'excel.xlsx')
      document.body.appendChild(link)
      link.click()
    },
    handleRemove() {

    },
    chargeGiftcard() {

    }
  }
}
</script>

<style lang="scss">
.userInfoIndex {
  padding: 10px;
  .filter-container {
    padding-top: 10px;
  }
  .load_card {
    .el-dialog {
      width: 500px;
      margin-top: 20vh;
      text-align: center;
    }

    .icons {
      font-size: 60px;
      color: #2ac06d;
    }

    .icon-err {
      color: #b3450e;
    }

    .upload-wraper {
      width: 360px;
      margin: 0 auto;
      box-sizing: border-box;
    }

    .down_wrap {
      text-align: center;
      padding: 10px;
    }
    .button-wrap {
      margin-top: 30px;
      text-align: center;
    }
  }
}
</style>
