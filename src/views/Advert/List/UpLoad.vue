<template>
  <div>
    <el-upload
      ref="upload"
      class="upload-demo"
      :action="upload"

      :on-success="handleSuccess"
      :on-remove="handleRemove"

      :file-list="fileList"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import {upload,host} from '@/api/base'

export default {
  data() {
    return {
      upload,
      fileList: []
      
    };
  },
  props:['imageList'],

  components: {},

  methods: {
    handleRemove(file, fileList) {
      console.log('文件移除---------',file, fileList);
      this.$emit('removeImage',file.url)

    },
    handleSuccess(response, file, fileList) {
      console.log('文件上传--------',response, file, fileList);
      let url = response.url.slice(7);
      let imgUrl = host +'/'+url;
      this.$emit('sendIamge',imgUrl)
    },
    submitUpload() {
      this.$refs.upload.submit();
    },

  },

  watch:{
    imageList(val){
      if(!val.length){
        this.fileList = [];
      }
    }
  }
};
</script> 

<style scoped></style>
