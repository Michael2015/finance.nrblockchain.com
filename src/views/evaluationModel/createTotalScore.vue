<template>
  <div class="creatToatalScore">
    <div class="tits">评分模型</div>
    <el-form ref="form" :model="scoreInfo" label-width="160px">
      <el-form-item
        label="模型名称"
        :rules="[
          { required: true, message: '请填写模型名称',trigger: 'blur' }
        ]"
        prop="name"
      >
        <el-input v-model="scoreInfo.name" style="width: 300px" clearable placeholder="请输入模型名称" />

      </el-form-item>
      <el-form-item
        label="关联综合积分模型数"
        :rules="[
          { required: true, message: '请填写模型名称',trigger: 'blur' }
        ]"
        prop="num"
        label-width="160px"
      >
        <div style="margin-bottom: 10px">
          <el-select v-model="scoreInfo.num" style="width: 200px" placeholder="请选择" @change="setTag">
            <el-option
              v-for="item in modalNum"
              :key="item.lable"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
<!--          <el-select v-model="scoreInfo.modal_cycle" style="width: 200px" placeholder="选择周期">
            <el-option
              v-for="item in modalCycle"
              :key="item.lable"
              :label="item.label"
              :value="item.value"
            />
          </el-select>-->
        </div>
        <div class="tags">
          <div class="tag-item">
            <div v-for="(item, index) in modalList" :key="index" class="tag-wrapper">

              <el-form-item
                :label="'综合积分模型'+ parseInt(index+1)"
                label-width="150px"
              >
                <el-select v-model="item.modal" style="width: 250px" placeholder="请选择">
                  <el-option
                    v-for="it in modalLi"
                    :key="it.id"
                    :label="it.name"
                    :value="it.id"
                  />
                </el-select>
              </el-form-item>

            </div>

          </div>
        </div>
      </el-form-item>
      <el-form-item
        label="计算方式"
        label-width="160px"
        style="margin: 10px 0;"
      >
        <div class="calc-wrap">
          <div class="calc-tit">评分=  10 ×  个人综合评分 ÷   标准分</div>
          <div class="calc-desc">
            <p>标准分：已选择综合积分模型中用户的前三名，取平均值为标准分  (a+b+c)÷3</p>
            <p>（若个人评分超过10分，则显示为10分） </p>
            <p> （评分保留2位小数）</p>
          </div>
        </div>

      </el-form-item>
      <el-form-item
        label="评分说明"
        :rules="[
          { required: true, message: '请输入评分说明' }
        ]"
        prop="desc"
        label-width="160px"
        style="margin: 10px 0"
      >
        <el-input
          v-model="scoreInfo.desc"
          type="textarea"
          style="width: 500px"
          :rows="4"
          placeholder="请输入内容"
        />
      </el-form-item>
      <el-form-item
        label="生效状态"
        :rules="[
          { required: true, message: '请选择显示状态' }
        ]"
        prop="modal_status"
      >
        <el-radio-group v-model="scoreInfo.modal_status" size="small">
          <el-radio label="1">
            启用
          </el-radio>
          <el-radio label="2">
            停用
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="160px" style="margin-top: 20px">
        <el-button style="width: 120px" type="default" @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" :loading="isLoad" style="width: 180px; margin-left: 60px" @click="sureBtn">确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getGrade, addScore, editScore, updateScore } from '@/api/evaluationModel'
export default {
  name: 'CreatDiscount',
  data() {
    return {
      scoreInfo: {
        name: '',
        num: '1',
        desc: '',
        modal_status: '1'
      },
      modalList: [{
        modal: ''
      }], // 评分模型列表
      modalLi: [], // 综合评分模型列表
      modalCycle: [
        { label: '月度', value: '1' },
        { label: '季度', value: '2' },
        { label: '年度', value: '3' }
      ],
      modalNum: [{ label: '1个', value: '1' }, { label: '2个', value: '2' }, { label: '3个', value: '3' }, { label: '4个', value: '4' }],
      selectModal: '', // 选中的模板
      id: '',
      isLoad: false
    }
  },
  mounted() {
    // 添加评价模型
    this.getGradeList() // 获取列表
    if (this.$route.query.id) {
      const ids = this.$route.query.id
      this.getEditScore(ids)
    }
  },
  methods: {
    getGradeList() {
      getGrade({
        name: '',
        status: 1,
        page: 1,
        limit: 0

      }).then(res => {
        if (res.code === 200) {
          this.modalLi = res.data
        }
      })
    },
    getEditScore(id) {
      editScore({ id }).then(res => {
        if (res.code === 200) {
          this.id = res.data.id
          this.scoreInfo.name = res.data.name
          this.scoreInfo.num = res.data.grade_num
          this.setTag(res.data.grade_num) // 设置模型数
          if (res.data.grade_info.length > 0) {
            res.data.grade_info.forEach(item => {
              console.log(item)
              this.modalList.length = 0
              this.modalList.push({
                modal: item,
                per: ''
              })
            })
          }
          // this.modalList = res.data.grade_info
          this.scoreInfo.desc = res.data.explain
          this.scoreInfo.modal_status = res.data.status + ''
        }
      }).catch(err => console.log(err))
    },
    createTotalScore() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const arr = []
          this.modalList.forEach(item => {
            arr.push(item.modal)
          })
          const data = {
            name: this.scoreInfo.name,
            grade_num: this.scoreInfo.num,
            grade_info: arr,
            explain: this.scoreInfo.desc,
            status: this.scoreInfo.modal_status
          }
          this.isLoad = true
          addScore(data).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.$message('添加评分模型成功！')
              this.$router.push('/evaluationModel/totalScoreList')
            }
          })
        }
      })
    },
    sureBtn() {
      if (this.$route.query.id) {
        this.updataScore()
      } else {
        this.createTotalScore()
      }
    },
    updataScore() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const arr = []
          this.modalList.forEach(item => {
            arr.push(item.modal)
          })
          const data = {
            id: this.id,
            name: this.scoreInfo.name,
            grade_num: this.scoreInfo.num,
            grade_info: arr,
            explain: this.scoreInfo.desc,
            status: 1
          }
          this.isLoad = true
          updateScore(data).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.$message('编辑评分模型成功！')
              this.$router.push('/evaluationModel/totalScoreList')
            }
          }).catch(err => {
            this.isLoad = false
            console.log(err)
          })
        }
      })
    },
    setTag(num) {
      // 设置模型标签数
      this.modalList.length = 0
      for (let i = 0; i < num; i++) {
        this.modalList.push({
          modal: '',
          per: ''
        })
      }
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
  .creatToatalScore {
    padding: 10px;
    .tits {
      text-align: center;
    }

    .filter-container {
      padding-top: 10px;
    }

    .tag-item {
      float: left;
      width: 500px;
      border: 1px solid #ccc;
      padding: 10px;
      .tag-title {
        border-bottom: 1px solid #ccc;
      }

    }

    .tag-wrapper {
      padding: 10px ;
      background: #9ff0ff;
      position: relative;
      margin-bottom: 5px;
    }

    .calc-wrap {
      width: 500px;
      border: 1px solid #ccc;
      .calc-tit {
        padding: 10px;
        border-bottom: 1px solid #ccc;
      }
      .calc-desc {
        padding: 10px;
      }
      p {
        margin: 0;
        padding: 0;
      }
    }
  }
</style>
