<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px; overflow-y: hidden;"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
    />
  </div>
</template>
 
<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { DomEditor } from '@wangeditor/editor'
//batchUpload 上传接口
import axios from 'axios'
export default {
    props: ['editorData','dialog'],
    components: { Editor, Toolbar },
    watch: {
        editorData(val) {
            // console.log('------------------------', val);
            this.$nextTick(() => {
                // console.log('------------------------', this.editor);
                setTimeout(()=>{
                    // console.log('------------------------', this.editor);
                    this.editor.setHtml(val)
                },0)
            })
        },
        dialog(val){
            this.$nextTick(() => {
                // console.log('------------------------', this.editor);
                setTimeout(()=>{
                    // console.log('------------------------', this.editor);
                    console.log('-------watch');
                    
                    if(val) {
                        this.editor.disable();
                    } else {
                        this.editor.enable();
                    }
                    // this.editor.setHtml(val)
                },0)
            })
        }
    },
    data() {
        return {
            editor: null,
            html: '',
            toolbarConfig: {
                //toolbarKeys-重新配置工具栏，显示哪些菜单，以及菜单的排序、分组
                toolbarKeys: [
                    'headerSelect', 'bold', 'underline', 'italic', 'color', 'bgColor', 'fontSize', 'fontFamily', 'lineHeight', 'bulletedList', 'numberedList', 'todo', '|', 'emotion', 'uploadImage', 'insertLink', 'insertTable', 'codeBlock', 'divider',
                ],
            },
            editorConfig: { placeholder: '请输入内容...', MENU_CONF: {} },
            mode: 'default', // or 'simple'
            // mode: 'simple', // or 'simple'
        }
    },
    methods: {
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
            // console.log(' 一定要用 Object.seal() ，否则会报错');
        },
        onChange(editor) {
            this.$emit('sendEditor', this.html)
        },
        clear() {
            // console.log('清空编译器----------------');
            this.html = '';
        },
        uploadImg() {
            let that=this;
            this.editorConfig.MENU_CONF['uploadImage'] = {
                // 自定义上传
                async customUpload(file, insertFn) {                   // JS 语法
                    let formData = new FormData()
                    formData.append("file", file);//file 后台接受变量字段 file 
                    let res =await that.$api.batchUpload(formData)
                    console.log(res.data);
                    let { url, alt, href } = res.data;
                    // 最后插入图片
                    insertFn(url, alt, href)
                },
            }
        }
    },
    created() {
        //上传图片
        this.uploadImg()
        
    },
    mounted() {
        
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
}
</script>
 
<style src="@wangeditor/editor/dist/css/style.css">
</style>
<style>
</style>