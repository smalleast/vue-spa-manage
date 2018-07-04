<template>
    <section class="process">
        <el-dialog title="接单报价流程" :visible.sync="hasVisible">
            <MyLayout
                v-for="(item,index) in lists" :key="index"
                className="process-row" :center="false">
                <div class="left">
                    <div class="number">{{item.index}}</div>
                    <div class="dot" v-if="index<5">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="right f14 c-6">
                    {{item.text}}
                </div>
            </MyLayout>
        </el-dialog>
    </section>
</template>

<script>
    import {MyLayout} from "../../components/common";

    export default {
        data() {
            return {
                hasVisible: false,
                lists: [
                    {
                        index: 1,
                        text: '住逻辑发送订货单合同，工厂签订合同'
                    },
                    {
                        index: 2,
                        text: '住逻辑支付定金（订货单总额的50%）'
                    },
                    {
                        index: 3,
                        text: '工厂生产完毕，住逻辑质量检查'
                    },
                    {
                        index: 4,
                        text: '住逻辑支付尾款（订货单总额的50%）'
                    },
                    {
                        index: 5,
                        text: '工厂联系住逻辑交付部门发货'
                    },
                    {
                        index: 6,
                        text: '订货单产品全部发货，交易完成'
                    }
                ]
            }
        },
        components: {
            MyLayout
        },
        methods: {
            handleClose() {
                this.hasVisible = false
            },
            open() {
                this.hasVisible = true;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .process {
        .el-dialog {
            &--small {
                width: 480px;
            }
            &__body{
                padding-left: 30px;
            }
        }
        &-row {
            > .left {
                width: 40px;
                > .number {
                    width: 20px;
                    height: 20px;
                    line-height: 20px;
                    text-align: center;
                    border-radius: 100%;
                    font-size: 14px;
                    color: #4d7cfe;
                    background: #d9e8ff;
                }
                > .dot {
                    width: 20px;
                    > span {
                        width: 6px;
                        height: 6px;
                        display: block;
                        background: #4d7cfe;
                        border-radius: 100%;
                        margin-top: 8px;
                        margin-left: auto;
                        margin-right: auto;
                    }
                }
            }
            > .right {

            }
        }
    }
</style>
