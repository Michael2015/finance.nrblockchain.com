<template>
  <div class="pub-tab-panle" style="width: 100%">
    <div v-if=" type==='CN' " class="platform">
      <div v-for="(item, idx) in imgList" :key="item.id" class="wrap">
        <img :src="item" class="imgs" alt="">
        <div class="btn-wrap">
          第{{ idx | indexFilter }}张 <el-button type="primary" icon="el-icon-edit" @click="iprShow(idx)">替换</el-button>
        </div>
      </div>
    </div>
    <div v-else class="restaurant">
      <div class="wrap">
        <img :src="imgList[0]" class="imgs" alt="">
        <div class="btn-wrap">
          <el-button type="primary" icon="el-icon-edit" @click="iprShow()">替换</el-button>
        </div>
      </div>
    </div>
    <image-cropper
      v-if="imagecropperShow"
      :ki="imagecropperKey"
      :field=" 'file' "
      :width="cropWith"
      :height="300"
      :pic-type="this.type === 'CN' ? 'PublicityPictures' : 'AlfBrandImage'"
      url="picture/upload_picture"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
    <!-- <el-dialog title="上传图片" :visible.sync="dialogVisible">
        <upload v-model="imgUrl"></upload>
        <div style="margin-top: 20px"><el-button type="primary" @click="dialogVisible = false">保存</el-button></div>
        <ImgCrop></ImgCrop>
    </el-dialog>-->
  </div>
</template>

<script>
import { getPicByKey, updataImg } from '@/api/operationsManagement'
// import Upload from '@/components/Upload/SingleImage'
import ImageCropper from '@/components/ImageCropper'
// import ImgCrop from '@/components/ImageCropper/index'
export default {
  filters: {
    indexFilter(status) {
      const statusMap = ['一', '二', '三', '四', '五']
      return statusMap[status]
    }
  },
  components: {
    // Upload,
    ImageCropper
  },
  props: {
    type: {
      type: String,
      default: 'CN'
    }
  },
  data() {
    return {
      dialogVisible: false,
      imgUrl: '',
      list: [
      ],
      imgList: [],
      wxImg: 'http://47.107.74.8:8080/group1/default/20190624/09/58/1/coffe.5b7988d.png',
      listQuery: {
        page: 1,
        limit: 5,
        type: this.type,
        sort: '+id'
      },
      loading: false,
      imagecropperShow: false,
      imagecropperKey: 0,
      cropWith: this.type === 'CN' ? 700 : 200,
      fileObj: {
        queue: 1
      },
      image: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    }
  },
  computed: {
    imgType: function() {
      return this.type === 'CN' ? 'PublicityPictures' : 'AlfBrandImage'
    }
  },
  created() {
    this.getPicList()
    // this.getList()
    // test({ keyword: this.type === 'CN' ? 'PublicityPictures' : 'AlfBrandImage',
    //   index: this.imagecropperKey}).then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    getPicList() {
      // this.$emit('create') // for test
      getPicByKey({
        keyword: this.type === 'CN' ? 'PublicityPictures' : 'AlfBrandImage'
      }).then(res => {
        if (res.code === 0) {
          console.log(res.data)
          this.imgList = res.data
        }
      })
    },
    iprShow(idx) {
      this.imagecropperShow = true
      if (idx) this.imagecropperKey = idx
    },
    cropSuccess(resData) {
      updataImg({
        url: resData,
        keyword: this.type === 'CN' ? 'PublicityPictures' : 'AlfBrandImage',
        index: this.imagecropperKey
      }).then(res => {
        // 从新获取图片列表
        this.getPicList()
        this.imagecropperShow = false
      })

      // this.image = resData.files.avatar
    },
    close() {
      this.imagecropperShow = false
    }
  }
}
</script>
<style lang="scss">
  .pub-tab-panle {
    width: 100%;
    .platform {
      display: flex;
      flex-direction: row;

    }
    .restaurant {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      /*.wrap {
        padding: 10px;
        width: 50%;
        text-align: center;
      }

      .imgs {
         max-width: 100%;
        max-height: 500px;
      }
      .btn-wrap {
        padding: 10px;
        text-align: center;
      }*/
    }

    .wrap {
      padding: 10px;
      text-align: center;
      flex: 1;
      position: relative;
      padding-top: 300px;
    }

    .imgs {
      position: absolute;
      top: 0;
      left: 50%;
      width: 500px;
      transform: translateX(-50%);
      max-height: 300px;
    }
    .btn-wrap {
      padding: 10px;
      text-align: center;
    }
  }
</style>

