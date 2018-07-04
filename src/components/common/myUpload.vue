<template>
    <div>
        <el-upload
            :action="host"
            :drag="true"
            :data="data"
            :with-credentials="true"
            :multiple="multiple"
            :show-file-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
            :on-progress="handleProgress"
            :disabled="disabled||progress>0"
            :before-upload="beforeUpload"
            class="my-upload"
            :size="size"
            :hasBg="hasBg">
            <div class="row row-no-padding row-center myUpload-row">
                <div class="col tc">
                    <slot name="style"></slot>
                </div>
            </div>
            <span v-loading.body="progress>0" class="loading"></span>
        </el-upload>
    </div>
</template>
<script>
    import api from '../../api'

    export default {
        data() {
            return {
                imageUrl: api.common.imgBaseUrl,
                data: {
                    type: this.type
                },
                progress: 0
            }
        },
        props: {
            multiple: {
                type: Boolean,
                default: false
            },
            type: {
                type: Number | String,
            },
            format: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            host: {
                type: String,
                default: api.files.uploadUrl()
            },
            keyName: {
                type: String | Number,
            },
            size: {
                type: String,
                default: 'normal'
            },
            hasBg: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleSuccess(data) {
                this.progress = 0;
                this.$emit('success', data.data[0], this.keyName);
            },
            beforeUpload(file) {
                //验证图片类型和大小
                this.$emit('beforeUpload', file);
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
            },
            handleProgress(progress) {
                this.progress = progress.percent;
                this.$emit('progress', progress.percent);
            },
            handleError(error) {
                this.$message.error(error);
            },
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 42px;
        height: 42px;
        margin-left: -21px;
        margin-top: -21px;
    }

    .myUpload-row {
        width: 100%;
        height: 100%;
    }

    .my-upload {
        display: inline-block;
        &[size='normal'] {
            width: auto;
            height: auto;
        }
        &[size='max'] {
            width: 240px;
            height: 240px;
            img {
                height: 240px;
            }
        }
        &[size='min'] {
            width: 140px;
            height: 140px;
            img {
                height: 140px;
            }
        }
        &[size='width'] {
            width: 220px;
            height: 140px;
            img {
                height: 140px;
            }
        }
        &[hasBg='true'] {
            .el-upload-dragger {
                background-color: #efefef;
            }
        }

    }
</style>
