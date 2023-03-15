<template>
  <div>
    <el-upload
      ref="upload"
      :action="upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-change="handleChange"
      multiple
      :limit="4"
      :file-list="imgList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，不超过5张图片</div>
  </div>
</template>

<script>
import {upload,host} from '@/api/base'
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      upload,
      imgList:[]

    };
  },

  components: {},

  props:{
    fileList:{
      type:Array,
      default:function(){
        return []
      }
    }
  },

  methods: {
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      // console.log('文件列表移除文件时的钩子',file, fileList);
      this.$emit('removeImage',file.url)
    },
    // 已上传的文件时的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件上传成功时的钩子
    handleSuccess(response, file, fileList){
      // console.log('文件上传成功时的钩子',response, file, fileList);
      
      // this.fileList = fileList;
      let url = response.url.slice(7);
      let imgUrl = host +'/'+url;
      // this.imgList.push(imgUrl);
      this.$emit('sendIamge',imgUrl)
    // 文件添加文件、上传成功和上传失败
    },
    handleChange(file, fileList) {
      // this.fileList = fileList.slice(-3);
      // console.log('onchange方法 添加文件、上传成功和上传失败',file, fileList);
      
    }
  },

  watch: {
    fileList(val,Oval){
      // console.log(val,'触发watch---');
      
      this.imgList = val
    }
  }

};
</script>

<style scoped></style>
