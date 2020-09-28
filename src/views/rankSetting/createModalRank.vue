<template>
  <div class="createModalRank">
    <div class="tits">榜单设置</div>
    <el-form ref="rankInfo" :rules="rules" :model="rankInfo" label-width="180px">
      <div class="titles">基本信息</div>
      <el-form-item
        label="榜单名称"
        :rules="[
          { required: true, message: '请输入榜单名称', trigger: 'blur' }
        ]"
        prop="rank_name"
      >
        <el-input v-model="rankInfo.rank_name" style="width: 300px" clearable placeholder="请输入榜单名称" />
      </el-form-item>
      <!--      <div class="sub-tit"><span style="color: #f00">*</span>数据来源 <el-button type="primary" style="margin-left: 20px" @click="addRankUrl">添加</el-button></div>-->
      <el-form-item
        label="数据来源"
        :rules="[
          { required: true, message: '请输入榜单名称', trigger: 'blur' }
        ]"
      >
        <div>
          <el-select v-model="rankInfo.type" style="width: 200px" placeholder="请选择模型类别" @change="selectMo">
            <el-option
              label="综合评分模型"
              value="2"
            />
            <el-option
              label="岗位模型"
              value="1"
            />
          </el-select>
          <el-select v-model="rankInfo.cycle" style="width: 100px" placeholder="请选择模型周期" @change="selectMo">
            <el-option
              v-for="item in modalCycle"
              :key="item.lable"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
      </el-form-item>

      <el-form-item
        v-for="(item,index) in rankInfo.rank_url"
        :key="item.id"
        :rules="[
          { required: true, message: '请输入接口地址', trigger: 'blur' }
        ]"
        :prop="'rank_url.' + index + '.id'"
      >
        <div>
          <el-select v-model="item.id" style="width: 300px" placeholder="请选择接口地址">
            <el-option
              v-for="item in tagList"
              :key="item.label"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-button v-if="index ===0 && rankInfo.type == 1" type="text" style="margin-left: 10px" @click="addRankUrl()">添加</el-button>
          <el-button v-if="index > 0" type="text" style="margin-left: 10px" @click="removeRankUrl(item)">删除</el-button>
        </div>

      </el-form-item>
      <el-form-item
        label="排名方式"
        :rules="[
          { required: true, message: '请选择排名方式' }
        ]"
        prop="rank_method"
      >
        <el-radio-group v-model="rankInfo.rank_method" size="small">
          <el-radio label="desc">
            升序（从小到大）
          </el-radio>
          <el-radio label="asc">
            降序（从大到小）
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="启用状态"
        :rules="[
          { required: true, message: '请选择显示状态' }
        ]"
        prop="show_status"
      >
        <el-radio-group v-model="rankInfo.show_status" size="small">
          <el-radio label="1">
            启用
          </el-radio>
          <el-radio label="2">
            停用
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="titles">榜单页面设置</div>
      <el-form-item
        label="排行榜列表图"
        :rules="[
          { required: true, message: '选择排行榜底图' }
        ]"
        prop="rank_backImg"
      >
        <uploadImg :img-url.sync="rankInfo.rank_listImg" />
        <span>点击上传自定义图片（请上传120*120的图片，不超过1M，jpg/png格式）</span>
      </el-form-item>
      <el-form-item
        label="排行榜底图"
        :rules="[
          { required: true, message: '选择排行榜底图' }
        ]"
        prop="rank_backImg"
      >
        <uploadImg :img-url.sync="rankInfo.rank_backImg" />
        <span>点击上传自定义图片（请上传120*120的图片，不超过1M，jpg/png格式）</span>
      </el-form-item>
      <el-form-item
        label="排行榜字段"
      >
        <el-table
          :data="tableData"
          border
          style="width: 500px"
        >
          <el-table-column
            label="位置"
            width="80"
            type="index"
          />
          <el-table-column
            label="名称"
            width="180"
            type="index"
          >
            <template slot-scope="scope">
              <template v-if="scope.$index === 0 || scope.$index === tableData.length-1">
                {{ scope.row.name }}
              </template>
              <template v-else>
                <el-select v-model="scope.row.name" placeholder="请选择">
                  <el-option
                    v-for="item in fieldOption"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  />

                </el-select>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="设置"
          >
            <template slot-scope="scope">
              <template v-if="scope.$index === 1">
                <el-button type="primary" @click="addField(scope.row)">添加</el-button>
              </template>
              <template v-if="scope.$index > 1 && scope.$index < tableData.length-1">
                <el-button type="danger" @click="removeField(scope.row)">删除</el-button>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item
        label="显示名次"
        :rules="[
          { required: true, message: '请填写显示名次', trigger: 'blur' }
        ]"
        prop="rank_num"
      >
        <el-input v-model="rankInfo.rank_num" style="width: 70px" clearable placeholder="请输入" /> 名
      </el-form-item>
      <el-form-item
        :rules="[
          { required: true, message: '请填写规则描述', trigger: 'blur' }
        ]"
        label="规则描述"
        prop="rank_dec"
      >
        <el-input
          v-model="rankInfo.rank_dec"
          type="textarea"
          :rows="4"
          style="width: 300px"
          clearable
          placeholder="请输入规则描述"
        />
      </el-form-item>
      <el-form-item label="开奖举报" prop="rank_report">
        <el-input v-model="rankInfo.rank_report" style="width: 300px" clearable placeholder="请输入链接" />
      </el-form-item>
      <el-form-item label-width="180px">
        <el-button type="default">取消</el-button>
        <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="createRank">确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import uploadImg from './components/uploadImg'
import { addModalRank, editModalRank, updateModalRank } from '@/api/rankSetting'
import { getEvaluate, getScore } from '../../api/evaluationModel'
import { userGroupList } from '@/api/userInfo'

export default {
  name: 'CreateModalRank',
  components: {
    uploadImg
  },
  data() {
    return {
      tagList: [], // 接口列表
      groupList: [], // 用户组列表
      id: '', // 榜单ID
      rankInfo: {
        rank_name: '', // 榜单名称
        type: '', // 类型
        cycle: '1', // 周期
        rank_url: [
          {
            id: '' // 接口ur
          }
        ], // 接口
        calc_type: '1', // 计算方式
        rank_method: 'desc', // 排名方式
        award_condition: '1', // 奖励条件
        rank_limit: '0', // 上榜限制
        rank_limit_start: '', // 最小
        rank_limit_end: '', // 最大
        // run_lottery_week: '', // 开奖周
        run_lottery_hour: '', // 开奖时
        sub_account: '0', // 分账时间
        sub_account_week: '', // 分账时间
        sub_account_hour: '', // 分账时间
        user_group: '', // 用户组
        show_status: '1', // 显示状态
        rank_listImg: '', // 排行榜列表图
        rank_backImg: '', // 排行榜底图
        params: '', // 排行榜字段
        rank_num: '', // 显示名次
        rank_dec: '', // 规则描述
        rank_report: '' // 开奖举报
      },
      rules: {}, // 规则
      weekoptions: [{
        value: '0',
        label: '星期一'
      }, {
        label: '星期二',
        value: '1'
      }, {
        label: '星期三',
        value: 2
      }, {
        label: '星期四',
        value: 3
      }, {
        label: '星期五',
        value: 4
      }, {
        label: '星期六',
        value: 5
      }, {
        label: '星期日',
        value: 6
      }],
      modalCycle: [
        { label: '月度', value: '1' },
        { label: '季度', value: '2' },
        { label: '年度', value: '3' }
      ],
      houroptions: [
        {
          label: '1时',
          value: 1
        }, {
          label: '2时',
          value: 2
        }, {
          label: '3时',
          value: 3
        }, {
          label: '4时',
          value: 4
        }, {
          label: '5时',
          value: 5
        }, {
          label: '6时',
          value: 6
        },
        {
          label: '7时',
          value: 7
        }, {
          label: '8时',
          value: 8
        }, {
          label: '9时',
          value: 9
        }, {
          label: '10时',
          value: 10
        }, {
          label: '11时',
          value: 11
        }, {
          label: '12时',
          value: 12
        }, {
          label: '13时',
          value: 13
        }, {
          label: '14时',
          value: 14
        }, {
          label: '15时',
          value: 15
        }, {
          label: '16时',
          value: 16
        }, {
          label: '17时',
          value: 17
        }, {
          label: '18时',
          value: 18
        }, {
          label: '19时',
          value: 19
        }, {
          label: '20时',
          value: 20
        }, {
          label: '21时',
          value: 21
        }, {
          label: '22时',
          value: 22
        }, {
          label: '23时',
          value: 23
        }],
      groupoptions: [{
        label: 15,
        value: '用户组1'
      }, {
        label: 16,
        value: '用户组2'
      }, {
        label: 17,
        value: '用户组3'
      }, {
        label: 18,
        value: '用户组4'
      }, {
        label: 19,
        value: '用户组5'
      }, {
        label: 20,
        value: '用户组6'
      }],
      tableData: [{
        name: '排名',
        field: 'rank'
      }, {
        name: '姓名',
        field: 'name'
      }, {
        name: '职位',
        field: 'position'
      }, {
        name: '贡献值',
        field: 'integral'
      }],
      fieldOption: [{
        label: '姓名',
        value: 'name'
      }, {
        label: '职位',
        value: 'position'
      }],
      shopList: [], // 获取的店的列表
      shopLi: [],
      selectModal: '', // 选中的模板
      isLoad: false
    }
  },
  mounted() {
    // this.getModalTagList() // 获取职位模型列表
    // this.getGradeTagList() // 获取综合评分模型列表
    // this.getGroupList() // 获取用户组列表
    if (this.$route.query.id) {
      const ids = this.$route.query.id
      this.getProject(ids)
      // this.getModalTagList() // 获取职位模型列表
      // this.getGradeTagList() // 获取综合评分模型列表
    }
  },
  methods: {
    getProject(id) {
      // 按ID取出对应的对象
      editModalRank({ id }).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.id = res.data.id
          this.rankInfo.rank_name = res.data.name
          this.rankInfo.type = res.data.source.type
          this.rankInfo.cycle = res.data.source.cycle
          this.rankInfo.rank_url = res.data.source.info
          this.rankInfo.show_status = res.data.status + ''
          this.rankInfo.rank_listImg = res.data.image_1
          this.rankInfo.rank_backImg = res.data.image_2

          this.rankInfo.rank_num = res.data.show_num
          this.rankInfo.rank_dec = res.data.role_des
          this.rankInfo.rank_report = res.data.report_url
          this.tableData = res.data.show_field
          this.selectMo() // 获取选项
        }
      })
    },
    selectMo(val) {
      console.log(val)
      if (this.rankInfo.type === '1') {
        this.getModalTagList()
      } else if (this.rankInfo.type === '2') {
        this.getGradeTagList()
      }
    },
    getModalTagList() {
      this.tagList = []
      // 岗位模型
      getEvaluate({
        cycle: this.rankInfo.cycle,
        page: 1,
        limit: 0
      }).then(res => {
        // console.log(res)
        if (res.code === 200) {
          this.tagList = res.data
        }
      })
    },
    getGradeTagList() {
      // 综合评分模型
      getScore({
        cycle: this.rankInfo.cycle,
        page: 1,
        limit: 0
      }).then(res => {
        this.tagList = res.data
      })
    },
    getGroupList() {
      userGroupList({
        page: 1,
        limit: 0
      }).then(res => {
        if (res.code === 200) {
          this.groupList = res.data
        }
      })
    },
    createRank() {
      // 处理排行榜表头字段
      this.tableData.forEach(item => {
        console.log(item)
        this.fieldOption.forEach(it => {
          console.log(item.name, it.label)
          if (item.name == it.value) {
            item.name = it.label
            item.field = it.value
          }
        })
      })
      this.$refs['rankInfo'].validate(valid => {
        if (valid) {
          console.log('验证通过！')
          const { rankInfo } = this
          if (this.$route.query.id) {
            const activeData = {
              id: this.$route.query.id,
              name: rankInfo.rank_name, // 榜单名称
              source: {
                type: rankInfo.type,
                cycle: rankInfo.cycle,
                info: rankInfo.rank_url
              },
              reckon_type: rankInfo.calc_type, // 计算方式
              ranking_type: rankInfo.rank_method, // 排名方式
              status: rankInfo.show_status, // 显示状态
              image_1: rankInfo.rank_listImg, // 排行榜列表图地址
              image_2: rankInfo.rank_backImg, // 排行榜底图
              show_field: this.tableData, // 排行榜字段
              show_num: rankInfo.rank_num, // 显示名次
              role_des: rankInfo.rank_dec, // 规则描述
              report_url: rankInfo.rank_report // rank_report // 开奖举报
            }

            // console.log(activeData)
            this.isLoad = true
            updateModalRank(activeData).then(res => {
              this.isLoad = false
              if (res.code === 200) {
                this.$router.push('/rankSetting/modalList')
              } else {
                this.$message(res.msg)
              }
            })
          } else {
            const activeData = {
              id: this.$route.query.id,
              name: rankInfo.rank_name, // 榜单名称
              source: {
                type: rankInfo.type,
                cycle: rankInfo.cycle,
                info: rankInfo.rank_url
              },
              reckon_type: rankInfo.calc_type, // 计算方式
              ranking_type: rankInfo.rank_method, // 排名方式
              status: rankInfo.show_status, // 显示状态
              image_1: rankInfo.rank_listImg, // 排行榜列表图地址
              image_2: rankInfo.rank_backImg, // 排行榜底图
              show_field: this.tableData, // 排行榜字段
              show_num: rankInfo.rank_num, // 显示名次
              role_des: rankInfo.rank_dec, // 规则描述
              report_url: rankInfo.rank_report // rank_report // 开奖举报
            }
            console.log(activeData)
            this.isLoad = true
            addModalRank(activeData).then(res => {
              console.log(res)
              this.isLoad = false
              if (res.code === 200) {
                this.$message('新增模型排行榜成功')
                this.$router.push('/rankSetting/modalList')
              } else {
                this.$message(res.msg)
              }
            })
          }
        }
      })
    },
    addRankUrl() {
      // 添加url
      this.rankInfo.rank_url.push({
        id: '', // 接口url
        contr: '', // 贡献值
        contrV: '', // 贡献度
        key: new Date()
      })
    },
    removeRankUrl(item) {
      const index = this.rankInfo.rank_url.indexOf(item)
      if (index !== -1) {
        this.rankInfo.rank_url.splice(index, 1)
      }
    },
    addField(item) {
      if (this.tableData.length < 5) {
        const len = this.tableData.length - 1
        this.tableData.splice(len, 0, {
          name: '姓名',
          field: 'name'
        })
      }
    },
    removeField(item) {
      const index = this.tableData.indexOf(item)
      if (index !== -1) {
        this.tableData.splice(index, 1)
      }
    },
    handleChange() {

    },
    handleSelect(item) {
      // 选择
      this.selectModal = item.coupon_name
      this.discountInfo.model_id = item.model_id
      this.shoptype = item.use_range_type + ''
    }
  }
}
</script>

<style scoped lang="scss">
  .createModalRank {
    padding: 10px;
    .tits {
      text-align: center;
      font-size: 28px;

    }
    .sub-tit {
      width: 240px;
      text-align: right;
      margin-bottom: 20px;
    }

    .conr-calc {
      padding: 10px 0;
    }
    .titles {
      width: 180px;
      text-align: right;
      line-height: 40px;
      font-size: 18px;
      font-weight: 700;
    }

    .info-wrap {
      display: flex;
      width: 600px;

      .pictue {
        flex: 1;
        text-align: center;

        .el-upload--picture-img {
          margin: 0 auto;
        }
      }
    }
  }
</style>
