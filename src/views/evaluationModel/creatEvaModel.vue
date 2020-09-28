<template>
  <div class="creatEvaModel">
    <div class="tits">岗位模型</div>
    <el-form ref="form" :model="modalInfo" label-width="120px">
      <el-form-item
        label="模型名称:"
        :rules="[
          { required: true, message: '请输入模型名称' }
        ]"
        prop="modal_name"
      >
        <el-input v-model="modalInfo.modal_name" style="width: 300px" clearable placeholder="请输入模型名称" />
      </el-form-item>
      <el-form-item
        label="模型类型:"
        label-width="120px"
        :rules="[
          { required: true, message: '请选择模型类型' }
        ]"
      >
        <el-radio-group v-model="modalInfo.modal_type" size="small">
          <div>
            <el-radio style="line-height: 35px" label="1">
              通用模型
            </el-radio>
          </div>
          <div>
            <span style="float: left">
              <el-radio style="line-height: 35px" label="2">
                <span style="display: inline-block">专属模型</span>
              </el-radio>
            </span>
            <span style="float: left">
              <el-form-item
                label="用户组"
                :rules="[
                  { required: modalInfo.modal_type == 2 , message: '请选择用户组' }
                ]"
                :inline="true"
                prop="modal_usergroup"
              >
                <el-select v-model="modalInfo.modal_usergroup" style="width: 200px" placeholder="请选择">
                  <el-option
                    v-for="item in groupList"
                    :key="item.lable"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
            </span>
          </div>
        </el-radio-group>
      </el-form-item>

    <!--  <el-form-item
        label="模型标签:"
        :rules="[
          { required: true , message: '请选择模型标签' }
        ]"
        prop="modal_tag"
        label-width="120px"
      >
        <el-select
          v-model="modalInfo.modal_tag"
          style="width: 200px"
          placeholder="请选择"
          @change="setTag"
        >
          <el-option
            v-for="item in modalTag"
            :key="item.lable"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item
        label="模型标签:"
        :rules="[
          { required: true , message: '请选择模型标签' }
        ]"
        prop="modal_tag"
        label-width="120px"
      >
        <span >{{modal_tagdetail.length}}</span>
       个
        <el-button size="small" type="success" @click="addTags">添加 +</el-button>
      </el-form-item>
      <el-form-item label="数据更新周期:" label-width="120px">
        <el-select v-model="modalInfo.modal_cycle"  style="width: 200px" placeholder="选择周期">
          <el-option
            v-for="item in modalCycle"
            :key="item.lable"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标签:" label-width="100px">
        <div class="tags">
          <div
            v-for="(item, index) in modal_tagdetail"
            :key="index"
            class="tag-item"
          >
            <div class="tag-title">
              标签{{ index+1 }}
              <div class="close"   @click="delTags(index)">删除</div>
            </div>
            <el-form-item
              label="名称:"
              label-width="100px"
              style="margin-top: 10px"
            >
              <el-input v-model="item.name" style="width: 250px" clearable placeholder="请输入标签名称" />
            </el-form-item>
            <el-form-item
              label="数据源设置"
              label-width="100px"
              style="margin-top: 10px"
            >
              <!--              <el-button type="text" @click="add_source(index, 1)">添加接口</el-button>-->
              <el-button type="text" style="color: #2ac06d" @click="add_source(index, 2)">添加分类</el-button>
            </el-form-item>
            <div v-for="(it, idx) in item.source_arr" class=" tag-wrap">
              <el-form-item
                :label="'分类'+idx"
                label-width="100px"
                style="margin-bottom: 20px"
              >
                <el-select v-model="it.classify_id" style="width: 200px" placeholder="请选择">
                  <el-option
                    v-for="item in classList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="贡献权重:"
                label-width="100px"
              >
                <el-input v-model="it.weight" style="width: 100px" clearable placeholder="请输入" />
                %
              </el-form-item>
              <!--              <el-button v-if="idx > 0" class="del-btn" type="danger">删除</el-button>-->
            </div>

            <el-form-item
              label="贡献值阈值"
              label-width="120px"
              style="padding: 10px 0"
            >
              <el-select v-model="item.unlimited_type" style="width: 100px" placeholder="请选择">
                <el-option
                  v-for="item in modalCycle"
                  :key="item.lable"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input v-model="item.unlimited" style="width: 200px" clearable placeholder="请输入阈值" />
            </el-form-item>
            <el-form-item
              label="标签权重"
              label-width="120px"
              style="margin: 10px 0"
            >
              <el-input v-model="item.weight" style="width: 200px" clearable placeholder="请输入贡献值" />
              %
            </el-form-item>
            <el-form-item
              label="说明"
              label-width="120px"
              style="margin: 10px 0"
            >
              <el-input
                v-model="item.explain"
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
              />
            </el-form-item>
          </div>
        </div>
      </el-form-item>

      <el-form-item
        label="生效状态"
        :rules="[
          { required: true, message: '请选择显示状态' }
        ]"
        prop="modal_status"
      >
        <el-radio-group v-model="modalInfo.modal_status" size="small">
          <el-radio label="1">
            启用
          </el-radio>
          <el-radio label="2">
            停用
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="180px">
        <el-button type="default">取消</el-button>
        <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="sureBtn">
          确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userGroupList } from '@/api/userInfo'
import { getClassify } from '@/api/tagSetting'
import { addEvaluate, updateEvaluate, editEvaluate } from '@/api/evaluationModel'

export default {
  name: 'CreatDiscount',
  data() {
    return {
      modalInfo: {
        modal_name: '', // 模型名称
        modal_type: '1', // 模型类型
        modal_usergroup: '', // 专业模型
        modal_tag: '3', // 模型标签
        modal_cycle: '1', // 数据更新周期
        modal_status: '1' // 生效状态
      },
      modal_tagdetail: [{
        id: 1,
        name: '',
        source_arr: [{
          type: 2,
          classify_id: '',
          weight: ''
        }],
        unlimited_type: '', // 阈值类型
        unlimited: '', // 阈值
        explain: '',
        weight: ''
      }, {
        id: 2,
        name: '',
        source_arr: [{
          type: 2,
          classify_id: '',
          weight: ''
        }],
        unlimited_type: '',
        unlimited: '',
        explain: '',
        weight: ''
      }, {
        id: 3,
        name: '',
        source_arr: [{
          type: 2,
          classify_id: '',
          weight: ''
        }],
        unlimited_type: '',
        unlimited: '',
        explain: '',
        weight: ''
      }],
      modalTag: [
        { label: '8个', value: '8' },
        { label: '7个', value: '7' },
        { label: '6个', value: '6' },
        { label: '5个', value: '5' },
        { label: '4个', value: '4' },
        { label: '3个', value: '3' }
      ],
      modalCycle: [
        { label: '月度', value: '1' },
        { label: '季度', value: '2' },
        { label: '年度', value: '3' }
      ],
      id: '', // 要编辑的ID
      shoptype: '0',
      groupList: [], // 用户组
      classList: [], // 接口分类
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
    // 获取用户组列表
    this.getUserGroup()
    // 获取接口分类列表
    this.getclassify()
    if (this.$route.query.id) {
      const ids = this.$route.query.id
      this.getEvaModal(ids)
    }
  },
  watch: {
    modalInfo:{
      handler(nVal) {
        console.log(nVal.modal_tag)
      },
      deep: true
    }
  },
  methods: {
    getUserGroup() {
      userGroupList({
        group_no: '',
        page: 1,
        limit: 0
      }).then(res => {
        this.groupList = res.data
      })
    },
    getclassify() {
      getClassify({
        name: '',
        page: 1,
        limit: 0
      }).then(res => {
        this.classList = res.data
      })
    },
    setTag(num) {
      // 选择模型标签数
      this.modal_tagdetail.length = 0
      const len = parseInt(num)
      for (let i = 0; i < len; i++) {
        this.modal_tagdetail.push({
          id: parseInt(i + 1),
          name: '',
          source_arr: [{
            type: 2,
            classify_id: '',
            weight: ''
          }],
          unlimited_type: '',
          unlimited: '',
          explain: '',
          weight: ''
        })
      }
    },
    addTags() {
      if (this.modal_tagdetail.length < 8) {
        this.modal_tagdetail.push({
          id: parseInt(this.modal_tagdetail.length + 1),
          name: '',
          source_arr: [{
            type: 2,
            classify_id: '',
            weight: ''
          }],
          unlimited_type: '',
          unlimited: '',
          explain: '',
          weight: ''
        })
      } else {
        this.$message('最多支持8个标签')
      }

    },
    delTags(idx) {
      if(this.modal_tagdetail.length > 3) {
        this.modal_tagdetail.splice(idx,1)
      } else  {
        this.$message.warning('标签数最少3个,请勿删除！')
      }
    },
    add_source(idx, type) {
      this.modal_tagdetail[idx].source_arr.push({
        type: type,
        classify_id: '',
        weight: ''
      })
      console.log(this.modal_tagdetail)
    },
    sureBtn() {
      if (this.$route.query.id) {
        this.updateEvaluate()
      } else {
        this.creatEvamoda()
      }
    },
    creatEvamoda() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const data = {
            name: this.modalInfo.modal_name,
            user_group: this.modalInfo.modal_type == 1 ? 0 : this.modalInfo.modal_usergroup,
            label_num: this.modal_tagdetail.length,
            cycle: this.modalInfo.modal_cycle,
            status: this.modalInfo.modal_status,
            label_info: this.modal_tagdetail
          }
          // console.log(data)
          addEvaluate(data).then(res => {
            if (res.code === 200) {
              this.$message('新增模型成功')
              this.$router.push('/evaluationModel/evaModalList')
            } else {
              this.$message.warning(res.msg)
            }
          })
        }
      })
    },
    getEvaModal(id) {
      editEvaluate({ id }).then(res => {
        if (res.code === 200) {
          this.id = res.data.id
          this.modalInfo.modal_name = res.data.name
          if (res.data.user_group !== 0) {
            this.modalInfo.modal_type = '2'
            this.modalInfo.modal_usergroup = res.data.user_group
          } else {
            this.modalInfo.modal_type = '1'
          }
          this.modalInfo.modal_tag = res.data.label_num
          this.setTag(res.data.label_num) // 标签个数
          this.modalInfo.modal_cycle = res.data.cycle + '' // 模型刻度
          this.modal_tagdetail = res.data.label_info // 标签数据
          this.modalInfo.modal_status = res.data.status + ''
        }
      }).catch(err => console.log(err))
    },
    updateEvaluate() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const data = {
            id: this.id,
            name: this.modalInfo.modal_name,
            user_group: this.modalInfo.modal_type == 1 ? 0 : this.modalInfo.modal_usergroup,
            label_num: this.modal_tagdetail.length,
            cycle: this.modalInfo.modal_cycle,
            status: this.modalInfo.modal_status,
            label_info: this.modal_tagdetail
          }

          console.log(data)
          this.isLoad = true
          updateEvaluate(data).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.$message('编辑模型成功')
              this.$router.push('/evaluationModel/evaModalList')
            } else {
              this.$message.warning(res.msg)
            }
          }).catch(err => {
            this.isLoad = false
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .creatEvaModel {
    padding: 10px;
    .tits {
      text-align: center;
    }

    .filter-container {
      padding-top: 10px;
    }

    .tag-item {
      float: left;
      width: 32%;
      margin:0 10px 10px 0;
      border: 1px solid #ccc;
      padding: 10px ;

      .tag-title {
        border-bottom: 1px solid #ccc;
        position: relative;
      }

      .close {
        position: absolute;
        top: 0;
        right: 0;
        padding: 0 20px;
        color: #c0000a;
        cursor: pointer;
      }

    }

    .tag-wrap {
      padding: 10px 0 20px;
      background: #9ff0ff;
      position: relative;
      margin-bottom: 10px;
      .del-btn {
        position: absolute;
        right: 10px;
        bottom: 20px;
      }
    }

    .catg-wrap {
      margin-top: 10px;
      background: #2ac06d;
    }

  }
</style>
