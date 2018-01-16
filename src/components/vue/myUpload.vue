<template>
    <div class="my-upload">
        <!--:on-remove="handleRemove"-->
        <el-upload
                :action="action"
                :data="data"
                :multiple="multiple"
                :with-credentials="true"
                :drag="true"
                :show-file-list="false"
                :on-success="handleSuccess"
                :disabled="disabled||progress>0"
                :before-upload="handleBeforeUpload">
            <slot name="style">
                <div class="default-style">
                    <img :src="imgKey|toImg" alt="预览" v-if="format=='image'&&imgKey">
                    <i class="el-icon-plus" v-else></i>
                </div>
            </slot>
            <span v-loading.body="progress>0" class="loading"></span>
        </el-upload>
    </div>
</template>
<script>
    import {$api, $utils} from '../../components/vue/index';

    export default {
        data() {
            return {
                action: '',
                headers: '',
                data: {
                    'x:type': 1,
                    'x:originname': '',
                    key: '',
                    policy: '',
                    OSSAccessKeyId: '',
                    callback: '',
                    signature: '',
                    success_action_status: 200,
                },
                progress: 0,
                filenameSuffix: '',
                dir: '',
                imgKey: this.fileKey || ''
            }
        },
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            type: {
                type: Number | String,
                default: 1
            },
            format: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            fileKey:{
                type: String
            }
        },
        methods: {
            getOss() {
                $api.files('get', {type: this.type}, 'policy').then(res => {
                    let policy = res.data;
                    this.action = policy.action;
                    this.dir = policy.dir;
                    this.data.policy = policy.policy;
                    this.data.OSSAccessKeyId = policy.OSSAccessKeyId;
                    this.data.callback = policy.callback;
                    this.data.signature = policy.signature;
                    Object.assign(this.data, {'x:type': policy.type});

                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handleSuccess(data) {
                this.progress = 0;
                this.imgKey = data.data[0].key;
                this.$emit('success', data.data[0])
            },
            handleBeforeUpload(file) {
                this.$emit('beforeUpload');
                if (this.format == 'image' && file.type.indexOf('image/') == -1) {
                    this.$message.error('请选择 jpg,jpeg,png 或 gif 格式的文件');
                    return false;
                }
                if (this.format == 'excel' && file.name.indexOf('xls') == -1) {
                    this.$message.error('请选择 excel 格式的文件');
                    return false;
                }
                if (this.format == 'pdf' && file.name.indexOf('pdf') == -1) {
                    this.$message.error('请选择 pdf 格式的文件');
                    return false;
                }
                this.filenameSuffix = file.name.split('.')[1];
                this.data.key = this.dir + $utils.randomString() + '.' + this.filenameSuffix;
                Object.assign(this.data, {'x:originname': file.name});
            }
        },
        created() {
            this.getOss();
        }
    }
</script>
<style scoped type="text/scss" lang="scss">
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 42px;
        height: 42px;
        margin-left: -21px;
        margin-top: -21px;
    }

    .my-upload {
        width: 360px;
        height: 180px;
       .default-style{
           line-height: 180px;
       }
    }
</style>
<style type="text/scss" lang="scss">
    .my-upload {
        .default-style {
            width: 100%;
            height: 100%;
            position: relative;
            text-align: center;
            i {
                font-size: 38px;
                color: #8c939d;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -20px;
                margin-left: -20px;
            }
        }
    }
</style>
