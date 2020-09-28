<template>
  <div class="createEvaluation">
    <div class="tits">综合评分模型</div>
    <el-form ref="form" :model="evaModel" label-width="120px">
      <el-form-item
        label="模型名称"
        :rules="[
          { required: true, message: '请输入模型名称', trigger: 'blur' }
        ]"
        prop="name"
      >
        <el-input v-model="evaModel.name" style="width: 300px" clearable placeholder="请输入模型名称" />

      </el-form-item>

      <el-form-item
        label="用户组"
        label-width="120px"
        :rules="[
          { required: true , message: '请选择用户组' }
        ]"
        prop="userGroup"
      >
        <el-select v-model="evaModel.userGroup" style="width: 300px" placeholder="请选择">
          <el-option
            v-for="item in usrGroup"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="关联模型评价数"
        :rules="[
          { required: true, message: '请填选择关联模型数' }
        ]"
        label-width="120px"
      >
        <div style="margin-bottom: 10px">
          <el-select v-model="evaModel.molNum" style="width: 200px" placeholder="请选择" @change="setTag">
            <el-option
              v-for="item in modalNum"
              :key="item.lable"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-select v-model="evaModel.modal_cycle" style="width: 200px" placeholder="选择周期">
            <el-option
              v-for="item in modalCycle"
              :key="item.lable"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="tags">
          <div v-for="(item, index) in modalList" class="tag-item">
            <div class="tag-title">
              标签{{ index +1 }}
            </div>
            <div class="tag-wrap">
              <el-form-item
                label="岗位模型"
                label-width="100px"
                style="margin-bottom: 20px"
              >
                <el-select v-model="item.evaluate_id" style="width: 200px" placeholder="请选择">
                  <el-option
                    v-for="item in molist"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>
              <el-form-item
                label="评分权重"
                label-width="100px"
              >
                <el-input v-model="item.weight" style="width: 100px" clearable placeholder="请输入" />

              </el-form-item>
            </div>

          </div>
        </div>
      </el-form-item>
      <el-form-item
        label="评分说明"
        :rules="[
          { required: true, message: '请输入评分说明' }
        ]"
        prop="desc"
        label-width="120px"
        style="margin: 10px 0"
      >
        <el-input
          v-model="evaModel.desc"
          type="textarea"
          style="width: 500px"
          :rows="4"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item
        label="匹配排行榜:"
        :rules="[
          { required: true , message: '请选择模型标签' }
        ]"
        prop="project_evaluate_id"
        label-width="120px"
      >
        <el-select
          v-model="evaModel.project_evaluate_id"
          style="width: 200px"
          placeholder="请选择"
        >
          <el-option
            v-for="items in modalRank"
            :key="items.name"
            :label="items.name"
            :value="items.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="生效状态"
        :rules="[
          { required: true, message: '请选择显示状态' }
        ]"
        prop="state"
      >
        <el-radio-group v-model="evaModel.state" size="small">
          <el-radio label="1">
            启用
          </el-radio>
          <el-radio label="2">
            停用
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="180px">
        <el-button type="default" @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 80px" @click="sureBtn">确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { userGroupList } from '@/api/userInfo'
import { addGrade, getEvaluate, editGrade, updateGrade } from '@/api/evaluationModel'
import { getModalRank } from '@/api/rankSetting'
export default {
  name: 'CreatDiscount',
  data() {
    return {
      evaModel: {
        name: '',
        userGroup: '',
        molNum: '1',
        modal_cycle: '1',
        desc: '',
        project_evaluate_id: '',
        state: '1'
      },
      modalNum: [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }],
      modalCycle: [
        { label: '月度', value: '1' },
        { label: '季度', value: '2' },
        { label: '年度', value: '3' }
      ],
      modalList: [
        {
          evaluate_id: '',
          weight: ''
        }
      ],
      usrGroup: [], // 用户组
      molist: [],
      id: '', // 要编辑的id
      modalRank: [], // 模型排行榜
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
    this.getGroups() // 用户组
    this.getModals() // 模型
    this.getModalRank() // 获取模型排行榜
    // 添加评价模型
    if (this.$route.query.id) {
      const ids = this.$route.query.id
      this.getEditGrade(ids)
    }
  },
  methods: {
    getEditGrade(id) {
      editGrade({ id }).then(res => {
        if (res.code === 200) {
          this.id = res.data.id
          this.evaModel.name = res.data.name
          this.evaModel.userGroup = res.data.user_group
          this.evaModel.molNum = res.data.evaluate_num
          this.modalList = res.data.evaluate_info
          this.evaModel.desc = res.data.explain
          this.evaModel.state = res.data.status + ''
          this.evaModel.project_evaluate_id = res.data.project_evaluate_id
          // this.setTag(res.data.evaluate_num)
        }
      }).catch(res => {
        console.log(res)
      })
    },
    getModalRank() {
      // 获取模型排行榜列表
      getModalRank({
        name: '',
        page: 1,
        limit: 0
      }).then(res => {
        this.modalRank = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    getGroups() {
      userGroupList({
        group_no: '',
        page: 1,
        limit: 0
      }).then(res => {
        this.usrGroup = res.data
      })
    },
    getModals() {
      getEvaluate({
        name: '',
        status: 1,
        page: 1,
        limit: 0

      }).then(res => {
        this.molist = res.data
      })
    },
    creatEva() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.isLoad = true
          const data = {
            name: this.evaModel.name,
            user_group: this.evaModel.userGroup,
            evaluate_num: this.evaModel.molNum,
            evaluate_info: this.modalList,
            explain: this.evaModel.desc,
            status: this.evaModel.state,
            cycle: this.evaModal.modal_cycle, // 周期
            project_evaluate_id: this.evaModel.project_evaluate_id
          }
          addGrade(data).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.$message('新增综合评分成功')
              this.$router.push('/evaluationModel/evaluation')
            }
          })
        }
      })
    },
    sureBtn() {
      if (this.$route.query.id) {
        this.updateEva()
      } else {
        this.creatEva()
      }
    },
    updateEva() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.isLoad = true
          const data = {
            id: this.id,
            name: this.evaModel.name,
            user_group: this.evaModel.userGroup,
            evaluate_num: this.evaModel.molNum,
            evaluate_info: this.modalList,
            explain: this.evaModel.desc,
            status: this.evaModel.state,
            project_evaluate_id: this.evaModel.project_evaluate_id
          }
          updateGrade(data).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.$message('编辑综合评分成功')
              this.$router.push('/evaluationModel/evaluation')
            }
          })
        }
      })
    },
    setTag(num) {
      // 色字模型标签数
      console.log(num)
      this.modalList.length = 0
      for (let i = 0; i < num; i++) {
        this.modalList.push({
          modal: '',
          per: ''
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .createEvaluation {
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
      margin:10px 10px 10px 0;
      border: 1px solid #ccc;
      padding: 10px ;

      .tag-title {
        border-bottom: 1px solid #ccc;
      }

    }

    .tag-wrap {
      padding: 10px 0 20px;
      position: relative;
      margin-top: 10px
    }

  }
</style>
