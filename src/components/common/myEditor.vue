<template>
    <div class="editor">
        <quill-editor v-model="text" ref="textEditor"></quill-editor>
        <my-upload
            :type="14"
            :host="host"
            :multiple="true"
            format="image"
            @success="handleSuccess"
            @beforeUpload="handleBeforeUpload"
            >
            <div slot="style">
                <i class="el-icon-picture image-icon" style="color:#000;font-size:18px;"></i>
            </div>
        </my-upload>
    </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor';
    import myUpload from './myUpload'
    import api from '../../api'
    export default{
        data(){
            return {
                text: '',
                length:0,
                host:api.files.uploadContentUrl()
            }
        },
        props:{
            value:{
                type:String
            }
        },
        computed: {
            editor() {
                return this.$refs.textEditor.quill
            }
        },
        methods:{
            handleSuccess(data){
                let url = data.key; // Get url from response
                this.editor.insertEmbed(this.length, 'image', url);
            },
            handleBeforeUpload(file){
                let range = this.editor.getSelection(true);
                this.length = range.index;
                if (this.length===undefined) {
                    this.length = this.text.length;
                }
            },
        },
        watch:{
            text:function(val){
                this.$emit('input',val);
            },
            value:function(val){
                this.text = val || '';
            }
        },
        components:{
            quillEditor,
            myUpload
        },
    }
</script>
<style>
    .editor .ql-snow .ql-editor{
        height:660px;
    }
    .editor .ql-snow .ql-editor img{
        max-width:600px;
    }

    .editor .ql-snow.ql-toolbar{
        padding-left:30px;
    }
    .editor .ql-snow.ql-toolbar button.ql-image{
        display:none;
    }

</style>
<style scoped>
   .editor{
       position:relative;
   }
    .image-icon-container{
        width:18px;
        height:18px;
        position:absolute;
        top:12px;
        left:8px;
        overflow: hidden;
        /*background: transparent;*/
    }
</style>
