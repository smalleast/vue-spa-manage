<template>
    <section class="order-status">
        <div class="order-status-hd">
            <Steps :lists="detail.processResponseVOList" :activeIndex="detail.currentProcessId"></Steps>
        </div>
        <div class="order-status-bd">
            <div class="f20 bold c-37">
                当前订单状态： {{detail.statusDescResponseVO&&detail.statusDescResponseVO.title}}
            </div>
            <MyLayout :bottom="false" class="mt10">
                <div class="left col f16 c-37">
                     {{detail.statusDescResponseVO&&detail.statusDescResponseVO.desc}}
                </div>
                <div class="right tr px15"
                     v-if="detail.statusDescResponseVO&&detail.statusDescResponseVO.buttonConfirmed">
                    <MyButton type="primary" width="min"
                              @click="handleClickAlert(detail.statusDescResponseVO&&detail.statusDescResponseVO.status)">
                        {{detail.statusDescResponseVO&&detail.statusDescResponseVO.buttonWord}}
                    </MyButton>
                </div>
            </MyLayout>
            <slot></slot>
        </div>
    </section>
</template>

<script>
    import {$api, MyLayout, MyButton} from "../../components/common";
    import Steps from './steps'

    export default {
        data() {
            return {
                steps: [
                    {
                        id: 1,
                        name: '待签合同',
                    }, {
                        id: 2,
                        name: '待付定金',
                    }, {
                        id: 3,
                        name: '工厂生产中',
                    }, {
                        id: 4,
                        name: '待质检',
                    }, {
                        id: 5,
                        name: '待付尾款',
                    }, {
                        id: 6,
                        name: '待发货',
                    }, {
                        id: 7,
                        name: '已发货',
                    }
                ],
            }
        },
        props: {

            detail: {
                type: Object
            }
        },
        components: {
            MyLayout, MyButton, Steps
        },
        methods: {
            handleClickAlert(status = 100) {
                const alertText = this.$store.state.alertTexts.filter(item => item.id === status)[0];
                this.$alert(alertText.content, alertText.title, {
                    confirmButtonText: alertText.buttonText,
                    callback: action => {
                        console.log('action:', action);
                        if (action === 'confirm') {
                            this.handleChangeStatus();
                        }
                    }
                })
            },
            handleChangeStatus() {
                $api.purchase_order('put', '', `${this.$route.params.id}/change_status`).then(res => {
                    this.$emit('success')
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .order-status {
        background: #d9e8ff;
        padding: 20px;
        min-width: 920px;
        &-hd {

        }
        &-bd {
            background: #fff;
            border-radius: 2px;
            padding: 30px;
        }
    }
</style>
