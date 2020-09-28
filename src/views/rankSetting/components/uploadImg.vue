<template>
  <div class="upload-img">
    <div class="pictue">
      <el-upload
        class="el-upload--picture-card el-upload--picture-img"
        :class="imgClass"
        action="posts/"
        :show-file-list="false"
        :http-request="upImg"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <template v-if="!isLoading">
          <img v-if="imgUrl !== ''" :src="imgUrl" class="avatar-uploader">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </template>
        <template v-else>
          <i class="el-icon-loading " />
        </template>
      </el-upload>
      <p>{{ imgName }}</p>
    </div>
  </div>
</template>

<script>
import { uploadPlatPic } from '@/api/rankSetting'
export default {
  name: 'UploadImg',
  props: {
    imgName: {
      type: String,
      default: ''
    },
    imgUrl: {
      type: String,
      default: ''
    },
    imgClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  methods: {
    upImg(file) {
      // console.log(file)
      // 上传选择的图片
      this.isLoading = true
      uploadPlatPic(file).then(res => {
        this.isLoading = false
        // 上传卡的logo
        if (res.code === 200) {
          this.$emit('update:imgUrl', res.data)
        } else {
          console.log(res.data)
        }
      }).catch(err => {
        this.isLoading = false
        console.log(err)
      })
    },
    handleAvatarSuccess() {

    },
    beforeAvatarUpload() {

    }
  }
}
</script>

<style scoped lang="scss">
  .upload-img {
    max-width: 300px;

  }
  .el-upload--picture-card {
    position: relative;
    img {
      position: absolute;
      max-width: 100%;
      height: 100%;;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
    .el-upload--picture-img {
      width: 150px;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }

    .el-upload--picture-logo {
      width: 80px;
      height: 80px;
      text-align: center;
      line-height: 80px;
    }

    .pictue {
      flex: 1;
      text-align: center;
      .el-upload--picture-img {
        margin: 0 auto;
      }
    }
</style>
