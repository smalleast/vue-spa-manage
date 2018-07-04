<template>
    <div class="flex-center-center">
        <div class="my-photo" :border="border" :class="className" :size="size" >
            <img :src="item|toImg"
                 class="my-photo-img" alt=""
                 @click="open">
            <i class="el-icon-view my-photo-icon" v-if="!disabled" @click="open"></i>
            <el-dialog
                :visible.sync="hasVisible"
                width="80%"
                center
                class="my-dialog">
                <img :src="item|toImg"
                     class="my-dialog-img" alt="">
            </el-dialog>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                hasVisible: false,
            }
        },
        props: {
            item: {
                type: [Object, String]
            },
            size: {
                type: String,
                default: 'normal'
            },
            className: {
                type: String,
                default: ''
            },
            border: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            open() {
                if (!this.disabled) {
                    this.hasVisible = true;
                }
            }
        },
        created() {

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-photo {
        width: 120px;
        height: 120px;
        border-radius: 5px;
        position: relative;
        cursor: pointer;
        display: inline-block;
        text-align: center;
        padding: 5px;
        overflow: hidden;
        &[border=true] {
            border: 1px solid #e4e4e4;
            padding: 0;
        }
        &[size='max'] {
            width: 160px;
            height: 160px;
        }
        &[size='min'] {
            width: 100px;
            height: 100px;
        }
        &[size='mini'] {
            width: 20px;
            height: 20px;
        }
        &-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        &-icon {
            position: absolute;
            right: 5px;
            top: 5px;
            z-index: 8;
            opacity: 0;
            transition: opacity .3s ease-in-out;
            color: #1c8de0;
        }
        &:hover {
            .my-photo-icon {
                opacity: 1;
            }
        }
    }

    .my-dialog {
        .el-dialog__body {
            text-align: center;
        }
    }

</style>
