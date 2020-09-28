<template>
  <div class="createrank">
    <div class="tits">新增榜单</div>
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
      <div class="sub-tit"><span style="color: #f00">*</span>接口 <el-button type="primary" style="margin-left: 20px" @click="addRankUrl">添加</el-button></div>
      <el-form-item
        v-for="(item,index) in rankInfo.rank_url"
        :key="item.url"
        :label="'接口'+index"
        :rules="[
          { required: true, message: '请输入接口地址', trigger: 'blur' }
        ]"
        :prop="'rank_url.' + index + '.interfaces_id'"
      >
        <div>
          <el-select v-model="item.interfaces_id" style="width: 300px" placeholder="请选择接口地址">
            <el-option
              v-for="item in tagList"
              :key="item.label"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <div class="conr-calc">
            <div style="float: left">贡献值计算：</div>
            <el-col :span="2">
              <el-form-item
                :rules="[
                  {
                    required:
                      true,
                    message:
                      '请输入贡献度',
                    trigger:
                      'blur'
                  }
                ]"
                :prop="'rank_url.' + index + '.role_a'"
              >
                <el-input v-model="item.role_a" style="width: 90px" clearable placeholder="请输入店铺名称" />
              </el-form-item>
            </el-col>

            <div style="float: left">贡献度兑换 </div>
            <el-col :span="2">
              <el-form-item
                :rules="[
                  {
                    required:
                      true,
                    message:
                      '请输入贡献值',
                    trigger:
                      'blur'
                  }
                ]"
                :prop="'rank_url.' + index + '.role_b'"
              >
                <el-input v-model="item.role_b" style="width: 90px" clearable placeholder="请输入店铺名称" />
              </el-form-item>

            </el-col>
            <div style="float: left">贡献值</div>
            <el-button v-if="index > 0" type="danger" style="float:left; margin-left: 10px" @click="removeRankUrl(item)">删除</el-button>
          </div>

        </div>

      </el-form-item>
      <el-form-item
        label="计算方式"
        :rules="[
          { required: true, message: '请选择计算方式' }
        ]"
        prop="calc_type"
      >
        <el-radio-group v-model="rankInfo.calc_type" size="small">
          <el-radio label="1">
            贡献值累加
          </el-radio>
          <!--           <el-radio label="2">
                      贡献值平均
                    </el-radio>
                    <el-radio label="3">
                      贡献值百分百
                    </el-radio>-->
        </el-radio-group>
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
        label="奖励条件"
        :rules="[
          { required: true, message: '请选择奖励条件' }
        ]"
        prop="award_condition"
      >
        <el-radio-group v-model="rankInfo.award_condition" size="small">
          <el-radio label="1" style="display: block;margin-bottom: 20px">
            月贡献排名，周累计清空 (贡献度按照月度累积，每周清空已得奖贡献积分；<br>
            其他用户继续积分；每个月全部用户清空一次)
          </el-radio>
          <el-radio label="2" style="display: block">
            月贡献排名，月累计清空 (贡献度按照月度累积，每月清空已得奖贡献积分；<br>
            其他用户继续积分；每个月全部用户清空一次)
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="上榜限制"
        :rules="[
          { required: true, message: '选择上榜限制' }
        ]"
        prop="rank_limit"
      >
        <el-radio-group v-model="rankInfo.rank_limit" size="small">
          <div style="padding: 10px 0">
            <el-radio label="0">
              无限制
            </el-radio>
          </div>
          <div style="line-height: 35px">
            <el-radio style="line-height: 35px" label="1">
              <span style="display: inline-block">数量限制</span>
              <span style="display: inline-block; width: 400px">
                <el-col style="width: 110px">
                  <el-form-item
                    :rules="[
                      { required: rankInfo.rank_limit === '1' , message: '请输入' }
                    ]"
                    prop="rank_limit_start"
                  >
                    <el-input v-model="rankInfo.rank_limit_start" style="width: 90px" clearable placeholder="请输入" />

                  </el-form-item>
                </el-col>
                <el-col :span="1">至</el-col>
                <el-col style="width: 110px">
                  <el-form-item
                    :rules="[
                      { required: rankInfo.rank_limit === '1', message: '请输入' }
                    ]"
                    prop="rank_limit_end"
                  >
                    <el-input v-model="rankInfo.rank_limit_end" style="width: 90px" clearable placeholder="请输入" />

                  </el-form-item>

                </el-col>
                条数据可上榜
              </span>

            </el-radio>
          </div>

        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="开奖时间"
        required
      >
        <!--<el-col :span="2">
          <el-form-item
            :rules="[
              { required: true, message: '选择开奖星期' }
            ]"
            prop="run_lottery_week"
          >
            <el-select v-model="rankInfo.run_lottery_week" style="width: 100px" placeholder="请选择星期">
              <el-option
                v-for="item in weekoptions"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

        </el-col>-->

        <el-col :span="2">
          <el-form-item
            :rules="[
              { required: true, message: '选择开奖时数' }
            ]"
            prop="run_lottery_hour"
          >
            <el-select v-model="rankInfo.run_lottery_hour" style="width: 100px" placeholder="请选择时间">
              <el-option
                v-for="item in houroptions"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>

      </el-form-item>
      <el-form-item
        label="分账时间"
        :rules="[
          { required: true, message: '选择分账时间' }
        ]"
        prop="sub_account"
        style="width: 500px"
      >
        <el-radio-group v-model="rankInfo.sub_account" style="width: 700px" size="small">
          <div>
            <span style="display: inline-block">
              <el-radio label="0" style="width: 360px; line-height: 35px">
                自定义时间
                <el-col style="width: 210px;float: right">
                  <el-form-item
                    :rules="[
                      { required: true, message: '选择开奖星期' }
                    ]"
                    prop="sub_account_week"
                    style="width: 100px; float: left"
                  >
                    <el-select v-model="rankInfo.sub_account_week" placeholder="请选择星期">
                      <el-option
                        v-for="item in weekoptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                  <el-form-item
                    :rules="[
                      { required: true, message: '选择开奖时数' }
                    ]"
                    prop="sub_account_hour"
                    style="width: 100px;float: left;margin-left: 5px"
                  >
                    <el-select v-model="rankInfo.sub_account_hour" placeholder="请选择时间">
                      <el-option
                        v-for="item in houroptions"
                        :key="item.label"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>

              </el-radio>
            </span>
          </div>
          <div style="padding: 10px 0">
            <el-radio label="1">
              开奖立即分账
            </el-radio>
          </div>

        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="用户组"
        :rules="[
          { required: true, message: '选择用户组' }
        ]"
        prop="user_group"
      >
        <el-select v-model="rankInfo.user_group" style="width: 200px" placeholder="请选择">
          <el-option
            v-for="item in groupList"
            :key="item.label"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="显示状态"
        :rules="[
          { required: true, message: '请选择显示状态' }
        ]"
        prop="show_status"
      >
        <el-radio-group v-model="rankInfo.show_status" size="small">
          <el-radio label="1">
            显示
          </el-radio>
          <el-radio label="2">
            隐藏
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="titles">榜单页面设置</div>
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
          placeholder="请输入链接"
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
import { addProjects, editProjects, updateProjects } from '@/api/rankSetting'
import { userGroupList } from '@/api/userInfo'
import { interfacesList, addInterface, editInterface, delInterface } from '@/api/tagSetting'
export default {
  name: 'CreatDiscount',
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
        rank_url: [
          {
            interfaces_id: '', // 接口url
            role_a: '', // 贡献值
            role_b: '' // 贡献度
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
  computed: {
    checkShop: function() {
      console.log(this.discountInfo.shopList)
      this.discountInfo.shopList.forEach(item => {
        console.log(item)
      })
      return 3
    }
  },
  mounted() {
    this.getTagList() // 获取接口列表
    this.getGroupList() // 获取用户组列表
    if (this.$route.query.id) {
      const ids = this.$route.query.id
      this.getProject(ids)
    }
  },
  methods: {
    getProject(id) {
      // 按ID取出对应的对象
      editProjects({ id }).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.id = res.data.id
          this.rankInfo.rank_name = res.data.name
          this.rankInfo.rank_url = res.data.source
          // this.rankInfo.calc_type = res.data.calc_type
          this.rankInfo.rank_method = res.data.ranking_type
          // this.rankInfo.rank_limit = res.data.astrict
          this.rankInfo.run_lottery_hour = res.data.award_time
          this.rankInfo.user_group = res.data.user_group
          this.rankInfo.show_status = res.data.status + ''
          this.rankInfo.rank_backImg = res.data.images
          // this.rankInfo.params = res.show_field
          this.rankInfo.rank_num = res.data.show_num
          this.rankInfo.rank_dec = res.data.role_des
          this.rankInfo.rank_report = res.data.report_url
          this.tableData = res.data.show_field
          /*
          this.tabaleData = [{
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
          }]*/

        }
      })
    },
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
              source: rankInfo.rank_url,
              reckon_type: rankInfo.calc_type, // 计算方式
              ranking_type: rankInfo.rank_method, // 排名方式
              reward_type: rankInfo.award_condition, // 奖励条件

              award_time: rankInfo.run_lottery_hour, // 开奖时间
              account_time: {
                week: rankInfo.sub_account_week,
                time: rankInfo.sub_account_hour
              }, // 分账时间
              user_group: rankInfo.user_group, // 用户组
              status: rankInfo.show_status, // 显示状态
              images: rankInfo.rank_backImg, // 排行榜底图
              show_field: this.tableData, // 排行榜字段
              show_num: rankInfo.rank_num, // 显示名次
              role_des: rankInfo.rank_dec, // 规则描述
              report_url: rankInfo.rank_report // rank_report // 开奖举报
            }
            if (rankInfo.rank_limit == 1) { // 上榜限制
              activeData.astrict = {
                start: rankInfo.rank_limit_start,
                end: rankInfo.rank_limit_end
              }
            } else {
              activeData.astrict = ''
            }
            console.log(activeData)
            this.isLoad = true
            updateProjects(activeData).then(res => {
              this.isLoad = false
              if (res.code === 200) {
                this.$router.push('/rankSetting/index')
              } else {
                this.$message(res.msg)
              }
            })
          } else {
            const activeData = {
              name: rankInfo.rank_name, // 榜单名称
              source: rankInfo.rank_url,
              reckon_type: rankInfo.calc_type, // 计算方式
              ranking_type: rankInfo.rank_method, // 排名方式
              reward_type: rankInfo.award_condition, // 奖励条件
              award_time: rankInfo.run_lottery_hour, // 开奖时间
              account_time: {
                week: rankInfo.sub_account_week,
                time: rankInfo.sub_account_hour
              }, // 分账时间
              user_group: rankInfo.user_group, // 用户组
              status: rankInfo.show_status, // 显示状态
              images: rankInfo.rank_backImg, // 排行榜底图
              show_field: this.tableData, // 排行榜字段
              show_num: rankInfo.rank_num, // 显示名次
              role_des: rankInfo.rank_dec, // 规则描述
              report_url: rankInfo.rank_report // rank_report // 开奖举报
            }
            if (rankInfo.rank_limit == 1) { // 上榜限制
              activeData.astrict = {
                start: rankInfo.rank_limit_start,
                end: rankInfo.rank_limit_end
              }
            } else {
              activeData.astrict = ''
            }
            // console.log(activeData)
            this.isLoad = true
            addProjects(activeData).then(res => {
              console.log(res)
              this.isLoad = false
              if (res.code === 200) {
                this.$message('新增活动成功')
                this.$router.push('/rankSetting/index')
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
        value: '', // 接口url
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

      // this.tableData.push({
      //   name: '姓名',
      //   field: 'name'
      // })
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

<style lang="scss" scoped>
.createrank {
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
