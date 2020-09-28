<template>
  <div class="createDiscount">
    <div class="tits">{{ $route.query.id ? '编辑' :'新增' }}标签</div>
    <el-form ref="tagForm" :rules="rules" :model="tagInfo" label-width="180px">
      <el-form-item label="接口说明文档:" prop="tagDoc">
        <div style="width: 600px">{{ tagInfo.tagDoc }}</div>
      </el-form-item>
      <el-form-item label="接口名称:" label-width="180px" prop="name">
        <el-input v-model="tagInfo.name" style="width: 300px" clearable placeholder="请输入活动名称" />
      </el-form-item>
      <el-form-item label="接口地址:" label-width="180px" prop="url">
        <el-input v-model="tagInfo.url" style="width: 300px" clearable placeholder="请输入活动介绍" />
      </el-form-item>
      <el-form-item label="请求方式:" label-width="180px" prop="method">
        <el-select v-model="tagInfo.method" placeholder="请选择">
          <el-option
            label="GET"
            value="get"
          />
          <el-option
            label="POST"
            value="post"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="调取时间:" label-width="180px" prop="request_time">
        <el-select v-model="tagInfo.request_time" placeholder="请选择">
          <el-option
            v-for="item in houroptions"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label-width="180px">
        <el-button type="default" @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" :loading="isLoad" style="width: 280px; margin-left: 80px" @click="createTag">确认
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addInterface, getInterface, updateInterface } from '@/api/tagSetting'
export default {
  name: 'CreatDiscount',
  data() {
    return {
      tagInfo: {
        tagDoc: 'https://www.showdoc.cc/iboa?page_id=3757309684344997', // 接口文档
        name: '', // 接口名称
        url: '', // 请求地址
        method: '', // 请求方法
        request_time: '' // 调取时间
      },
      rules: {
        name: [{ required: true, message: '请填写接口名称', trigger: 'blur' }],
        url: [
          { required: true, message: '请填写接口地址', trigger: 'blur' }
        ],
        method: [
          { required: true, message: '请选择请求方式', trigger: 'blur' }
        ],
        request_time: [
          { required: true, message: '请选择调取时间', trigger: 'blur' }
        ]
      },
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
  watch: {
    shopLi(newVal, oldVal) {
      // 选择的店列表
      this.discountInfo.shopList = this.myFilter(this.shopList, newVal)
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getInterface()
    }
  },
  methods: {
    myFilter(arr1, arr2) {
      // 按ID取出对应的对象
      return arr1.filter((ele) =>
        arr2.filter((x) => x == ele.shop_id).length > 0)
    },
    getInterface() {
      const id = this.$route.query.id
      getInterface({ id }).then(res => {
        if (res.code === 200) {
          this.tagInfo.name = res.data.name
          this.tagInfo.url = res.data.url
          this.tagInfo.method = res.data.method
          this.tagInfo.request_time = res.data.request_time
        }
      })
    },
    createTag() {
      console.log('创建/编辑接口标签。。 ')
      const { name, url, method, request_time } = this.tagInfo
      const tagData = {
        name,
        url,
        method,
        request_time
      }
      const ids = this.$route.query.id
      this.$refs['tagForm'].validate(valid => {
        if (valid) {
          this.isLoad = true

          if (this.$route.query.id) {
            updateInterface({
              id: ids,
              name: tagData.name,
              url: tagData.url,
              method: tagData.method,
              request_time: tagData.request_time
            }).then(res => {
              this.isLoad = false
              if (res.code === 200) {
                this.$message('新增接口标签成功')
                this.$router.push('/tagSetting/index')
              }
            })
          } else {
            addInterface(tagData).then(res => {
              this.isLoad = false
              if (res.code === 200) {
                this.$message('新增接口标签成功')
                this.$router.push('/tagSetting/index')
              }
            })
          }
        }
      })
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
.createDiscount {
  padding: 10px;
  .tits {
    text-align: center;
    padding: 20px 0;
    font-size: 26px;
  }

  .filter-container {
    padding-top: 10px;
  }
}
</style>
