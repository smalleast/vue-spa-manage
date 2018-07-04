<template>
    <div class="my-input-login">
        <div class="row row-no-padding row-center my-input-login-row">
            <div class="left flex-center-center">
                <i class="iconfont c-b5" :class="icon"></i>
            </div>
            <div class="center col">
                <el-input v-model="inputValue"
                          :type="type"
                          :placeholder="placeholder"
                          @change="handleChange"
                          @keyup.enter.native="handleChangeKeyup" ></el-input>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            icon: {
                type: String,
                default: 'icon-wo'
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            },
            value: {
                type: [String, Number]
            },
            type: {
                type: String,
                default: 'text'
            }
        },
        computed: {
            inputValue: {
                get: function () {
                    return this.value
                },
                set: function (newValue) {
                    return newValue
                }
            }
        },
        methods: {
            handleChange(item) {
                this.$emit('input', item);
                this.$emit('success');
            },
            handleChangeKeyup(){
                this.$emit('keyup');
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-input-login {
        &-row {
            border: 1px solid #bfbfbf;
            border-radius: 2px;
            overflow: hidden;
            > .left {
                width: 60px;
                height: 60px;
                border-right: 1px solid #bfbfbf;
            }
            > .center {
                .el-input {
                    &__inner {
                        height: 60px;
                        font-size: 20px;
                        border: transparent;
                        color: #373737;
                        &::-webkit-input-placeholder {
                            color: #ddd;
                        }
                    }
                }
            }
            &:hover {
                border: 1px solid #dae4ff;
                .left {
                    background-color: #dae4ff;
                    border-right-color: #dae4ff;
                }
                .iconfont {
                    color: #4d7cfe;
                }
            }
        }
    }
</style>
