<template>
  <div class="createIncomeModel">
    <div class="tits">收入模型</div>
    <el-form ref="form" :model="modalInfo" label-width="120px">
      <el-form-item
        label="模型名称"
        :rules="[
          { required: true, message: '请输入模型名称', trigger: 'blur' }
        ]"
        prop="name"
      >
        <el-input v-model="modalInfo.name" style="width: 300px" clearable placeholder="请输入模型名称" />
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
          <el-select v-model="modalInfo.num" style="width: 200px" placeholder="请选择" @change="setTag">
            <el-option
              v-for="item in modalNum"
              :key="item.lable"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
        :rules="[
          { required: true, message: '请选择计算方式' }
        ]"
        prop="calc_type"
        label-width="120px"
        style="margin: 10px 0"
      >
        <el-radio-group v-model="modalInfo.calc_type" size="small">
          <div class="item-wrap">
            <div>
              <el-radio style="line-height: 35px" label="1">
                销售人员
              </el-radio>
            </div>
            <div class="item-desc">
<!--              <el-form-item label="计算方式">-->
<!--                提成金额 * 当前用户评分-->
<!--              </el-form-item>-->
              <el-form-item label="销售人员提成：">
                接口贡献值 × <el-input v-model="count_rule.ratio" style="width: 100px" clearable placeholder="请输入" />
                × 当前用户评分 ÷ 10
              </el-form-item>
              <el-form-item
                style="margin:10px 0 20px"
                label="选择分类："
              >
                <el-select v-model="count_rule.classify_id" style="width: 300px" placeholder="请选择">
                  <el-option
                    v-for="item in cagList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  />
                </el-select>
              </el-form-item>

            </div>
            <div />
          </div>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="收入说明"
        :rules="[
          { required: true, message: '请输入说明' }
        ]"
        prop="desc"
        label-width="160px"
        style="margin: 10px 0"
      >
        <el-input
          v-model="modalInfo.desc"
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
        prop="state"
      >
        <el-radio-group v-model="modalInfo.state" size="small">
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
import { getGrade, addIncome, updateIncome, editIncome } from '@/api/evaluationModel'
import { getClassify } from '@/api/tagSetting'
export default {
  name: 'CreatDiscount',
  data() {
    return {
      modalInfo: {
        name: '',
        userGroup: '',
        num: '1',
        calc_type: '1',
        state: '1',
        desc: ''
      },
      count_rule: {
        classify_id: '',
        ratio: ''
      },
      modalList: [{
        modal: ''
      }], // 评分模型列表
      modalLi: [], // 综合评分模型列表
      cagList: [], // 接口分类列表
      modalNum: [{ label: '1个', value: '1' }, { label: '2个', value: '2' }, { label: '3个', value: '3' }, { label: '4个', value: '4' }],
      shoptype: '0',
      selectModal: '', // 选中的模板
      id: '', // 要编辑的Id
      isLoad: false
    }
  },
  computed: {
    checkShop: function() {
      this.discountInfo.shopList.forEach(item => {
        console.log(item)
      })
      return 3
    }
  },
  mounted() {
    // 添加评价模型
    this.getGradeList() // 获取综合积分列表
    this.getTagList() // 获取接口分类列表
    if (this.$route.query.id) {
      const ids = this.$route.query.id
      this.getIncomeModal(ids)
    }
  },
  methods: {
    getIncomeModal(id) {
      editIncome({ id }).then(res => {
        if (res.code === 200) {
          console.log(res)
          this.id = res.data.id
          this.modalInfo.name = res.data.name
          this.modalInfo.grade_num = res.data.grade_num
          this.setTag(res.data.grade_num) // 设置模型数
          this.modalInfo.calc_type = res.data.count_type + ''
          this.modalInfo.desc = res.data.explain || ''
          this.modalInfo.state = res.data.status + ''
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
          this.count_rule = res.data.count_rule
        }
      }).catch(err => {
        console.log(err)
      })
    },
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
    getTagList() {
      getClassify({
        name: '',
        page: 1,
        limit: 0
      }).then(res => {
        if (res.code === 200) {
          this.cagList = res.data
        }
      })
    },
    sureBtn() {
      if (this.$route.query.id) {
        this.updteIncom()
      } else {
        this.createIncomeModal()
      }
    },
    createIncomeModal() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const arr = []
          this.modalList.forEach(item => {
            arr.push(item.modal)
          })
          const data = {
            name: this.modalInfo.name,
            grade_num: this.modalInfo.num,
            grade_info: arr,
            count_type: this.modalInfo.calc_type,
            count_rule: this.count_rule,
            explain: this.modalInfo.desc,
            status: 1
          }
          this.isLoad = true
          console.log(data)
          addIncome(data).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.$message('添加收入模型成功！')
              this.$router.push('/evaluationModel/incomeModelList')
            }
          })
        }
      })
    },
    updteIncom() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          const arr = []
          this.modalList.forEach(item => {
            arr.push(item.modal)
          })
          const data = {
            id: this.id,
            name: this.modalInfo.name,
            grade_num: this.modalInfo.num,
            grade_info: arr,
            count_type: this.modalInfo.calc_type,
            count_rule: this.count_rule,
            explain: this.modalInfo.desc,
            status: 1
          }
          this.isLoad = true
          updateIncome(data).then(res => {
            this.isLoad = false
            if (res.code === 200) {
              this.$message('编辑收入模型成功！')
              this.$router.push('/evaluationModel/incomeModelList')
            }
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
  .createIncomeModel {
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
      background: #91d2ff;
      position: relative;
      margin-top: 10px
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

  }
</style>
