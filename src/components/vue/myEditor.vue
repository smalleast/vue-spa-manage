<template>
    <div class="editor">
        <quill-editor v-model="content" ref="textEditor"></quill-editor>
        <my-upload
                class="image-icon-container"
                :type="type"
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
    import {$api} from 'components/vue/index'
    import {quillEditor} from 'vue-quill-editor';
    import myUpload from './myUpload';
    import config from 'components/services/config'
    export default {
        data() {
            return {
                content:this.value||'',
                length: 0,
                imgBaseUrl: config['IMG_SERVER']
            }
        },
        computed: {
            editor() {
                return this.$refs.textEditor.quill
            }
        },
        props: {
            value: {
                type: String
            },
            type: {
                type: Number | String,
                default: 1
            }
        },
        methods: {
            handleSuccess(data){
                let url = this.imgBaseUrl + data.key; // Get url from response
                this.editor.insertEmbed(this.length, 'image', url);
            },
            handleBeforeUpload(file){
                let range = this.editor.getSelection(true);
                this.length = range.index;
                if (this.length === undefined) {
                    this.length = this.text.length;
                }
            },
        },
        watch: {
            content: function (val) {
                this.$emit('input', val);
            },
            value: function (val) {
                this.content = val || '';
            }
        },
        components: {
            quillEditor,
            myUpload
        },
        created() {

        },

    }
</script>
<style type="text/scss" lang="scss">
    .editor {
        .quill-editor {
            .ql-editor {
                height: 400px;
            }
            .ql-snow.ql-toolbar {
                padding-left: 30px;
                button.ql-image {
                    display: none;
                }
            }
            img {
                max-width: 600px;
            }
        }
        .image-icon-container {
            .el-upload-dragger,
            .el-upload--text {
                width: 18px;
                height: 18px;
                line-height: 18px;
                z-index: 4;
                border: 0 none;
            }
        }
    }
</style>
<style scoped>
    .editor {
        position: relative;
    }

    .my-upload.image-icon-container {
        width: 18px;
        height: 18px;
        line-height: 18px;
        position: absolute;
        top: 18px;
        left: 8px;
        overflow: hidden;
        /*background: transparent;*/
    }
</style>
