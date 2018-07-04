<template>
    <div class="my-input-money" :active="hasInput" :data-disabled="disabled"
         @mouseover="handleMouseover" @mouseout="handleMouseout">
        <div class="c-red tc my-input-money-hd" v-show="!hasInput">
            {{inputValue | currency('¥', '2')}}
        </div>
        <div v-show="hasInput" class=" my-input-money-bd">
            <el-input type="number"
                      v-model="Math.abs(inputValue)"
                      @change="handleChange"
                      :min="0"
                      placeholder="输入金额"></el-input>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                hasInput: false,
            }
        },
        props: {
            value: [String, Number],
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            inputValue: {
                get: function () {
                    if (!this.value && !this.disabled) {
                        this.hasInput = true
                    }
                    return this.value;
                },
                set: function (val) {
                    return Math.abs(val)
                }
            }
        },
        methods: {
            handleChange(item) {
                this.$emit('input', Math.abs(item));
                this.$emit('success')
            },
            handleMouseover(item) {
                if (!this.disabled) {
                    this.hasInput = true;
                }
            },
            handleMouseout() {
                if (this.inputValue) {
                    this.hasInput = false;
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-input-money {
        width: 80px;
        border-bottom: 1px solid #ff4f4d;
        &[data-disabled=true] {
            border-bottom: transparent;
        }
        &[active=true] {
            border-bottom: 1px solid #4d7cfe;
        }
        .el-input {
            &__inner {
                border: transparent;
                color: #4d7cfe;
                text-align: center;
                height: 28px;
            }
        }
        &-hd {
            height: 28px;
            line-height: 28px;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }
        input[type="number"] {
            -moz-appearance: textfield;
        }
    }
</style>
