<template>
    <section class="order-detail">
        <div class="order-detail-hd">
            <div class="mt20">
                <MyLayout>
                    <div class="left col tl f20 c-37 bold">
                        项目名称：{{detail.orderName}}
                    </div>
                </MyLayout>
            </div>
            <div class="mt20">
                <MyLayout>
                    <div class="left c-37 f14 pr20">
                        订单号：{{detail.code}}
                    </div>
                    <div class="center c-37 f14">
                        创建时间：{{detail.createTime|toDate}}
                    </div>
                </MyLayout>
            </div>
            <div class="mt20">
                <OrderStatus
                    :detail="detail"
                    @success="handleSuccess">
                    <div class="mt20" v-if="[100].includes(detail.status)">
                        <MyContract
                            :item="detail.contractFile"
                            v-if="detail.contractFile"></MyContract>
                    </div>
                    <div class="mt20">
                        <MyContract :item="detail.statusDescResponseVO&&detail.statusDescResponseVO.certificateFile">
                            <MyLayout label="支付凭证：">
                                <div
                                    v-if="[200,500].includes(detail.statusDescResponseVO&&detail.statusDescResponseVO.status)&&!detail.statusDescResponseVO&&detail.statusDescResponseVO.certificateFile">
                                    未上传
                                </div>
                                <div class="link" v-else>
                                    {{detail.statusDescResponseVO&&detail.statusDescResponseVO.certificateFile&&detail.statusDescResponseVO.certificateFile.name}}
                                </div>
                            </MyLayout>
                        </MyContract>
                    </div>
                </OrderStatus>

            </div>
            <div class="mt20">
                <MyLayout>
                    <div class="left col f20 c-37 bold">
                        订单信息
                    </div>
                    <div class="right col tr ls2 f16 c-a5 cursor link" @click="handleProcess">
                        <img src="../../assets/image/group.png" class="img-group" alt=""> 订单流程
                    </div>
                </MyLayout>
            </div>
            <div class="mt30">
                <MyLayout label="甲方名称：">
                    斑斓供应链管理（上海）有限公司
                </MyLayout>
                <MyLayout label="乙方名称：">
                    {{detail.supplierName}}
                </MyLayout>
                <MyLayout label="产品数量：">
                    {{detail.totalNum}}件
                </MyLayout>
                <MyLayout label="交付日期：">
                    按照规定日期交付
                </MyLayout>
                <MyLayout label="出货地点：">
                    {{detail.deliveryAddress}}
                </MyLayout>
                <MyLayout label="发票信息：" :center="false">
                    <div v-if="detail.orderInvoiceResponseVO">
                        <MyLayout>
                            <div class="c-3">
                                发票抬头：
                            </div>
                            <div class="c-6">
                                {{detail.orderInvoiceResponseVO&&detail.orderInvoiceResponseVO.title}}
                            </div>
                        </MyLayout>
                        <MyLayout>
                            <div class="c-3">
                                统一社会信用代码：
                            </div>
                            <div class="c-6">
                                {{detail.orderInvoiceResponseVO&&detail.orderInvoiceResponseVO.identityCode}}
                            </div>
                        </MyLayout>
                        <MyLayout>
                            <div class="c-3">
                                账号：
                            </div>
                            <div class="c-6">
                                {{detail.orderInvoiceResponseVO&&detail.orderInvoiceResponseVO.bankAccount}}
                            </div>
                        </MyLayout>
                        <MyLayout>
                            <div class="c-3">
                                开户行：
                            </div>
                            <div class="c-6">
                                {{detail.orderInvoiceResponseVO&&detail.orderInvoiceResponseVO.bankInfo}}
                            </div>
                        </MyLayout>
                        <MyLayout>
                            <div class="c-3">
                                注册地：
                            </div>
                            <div class="c-6">
                                {{detail.orderInvoiceResponseVO&&detail.orderInvoiceResponseVO.registerAddress}}
                            </div>
                        </MyLayout>
                        <MyLayout>
                            <div class="c-3">
                                电话：
                            </div>
                            <div class="c-6">
                                {{detail.orderInvoiceResponseVO&&detail.orderInvoiceResponseVO.registerTel}}
                            </div>
                        </MyLayout>
                    </div>
                    <div v-if="!detail.orderInvoiceResponseVO">不需要发票</div>
                </MyLayout>
            </div>
            <div class="mt30">
                <div class="f16 c-37">
                    订单备注：
                </div>
                <div class="c-37 f14 lh-content mt10">
                    {{detail.remark}}
                </div>
            </div>
            <div class="mt30">
                <MyContract
                    :item="detail.contractFile"
                    v-if="detail.contractFile"></MyContract>
            </div>
        </div>
        <div class="mt20 wp-line"></div>
        <div class="order-detail-bd mt30">
            <div class="mt20">
                <MyLayout>
                    <div class="left col-20 f20 c-37 bold">产品信息</div>
                    <div class="left col f14 c-a5 tr">
                        关联报价单：{{detail.relateDetailedList}}
                    </div>
                </MyLayout>
            </div>
            <div class="mt20">
                <MyNext :total="total" :filter="filter" @success="handleNext">
                    <div class="ship-list mb15" v-for="(item,index) in lists" :key="index">
                        <div class="ship-list-title pl10">
                            交付时间：{{item.deliveryDate|toDate}}
                        </div>
                        <div class="ship-list-content py10" v-for="(childItem,childIndex) in item.list"
                             :key="childIndex">
                            <MyLayout :bottom="false">
                                <div class="col-15">
                                    <MyPhoto
                                        border
                                        size="min"
                                        :item="childItem.coverFile&&childItem.coverFile.key"></MyPhoto>
                                    <div class="f16 c-6 tc mt10 lc-1">
                                        {{childItem.name}}
                                    </div>
                                </div>
                                <div class="col-20">
                                    <MySpecs :item="childItem"></MySpecs>
                                </div>
                                <div class="col-20 pl10">
                                    <MyMaterials :lists="childItem.productionDataList"></MyMaterials>
                                </div>
                                <div class="col-10">
                                    <div class="c-red">
                                        {{childItem.finalPrice| currency('¥', '2')}}
                                    </div>
                                </div>
                                <div class="col-10 tc">
                                    数量： {{childItem.qtr}}
                                </div>
                                <div class="col tc">
                                    <div class="c-red">
                                        {{(childItem.finalPrice*childItem.qtr)| currency('¥', '2')}}
                                    </div>
                                </div>
                            </MyLayout>
                        </div>
                    </div>
                </MyNext>
            </div>
            <div class="mt20">
                <MyLayout>
                    <div class="left col"></div>
                    <div class="right tr pr20">
                        <MyLayout>
                            <div class="f18">
                                产品合计：
                            </div>
                            <div class="c-red f18">
                                {{detail.totalPrice| currency('¥', '2')}}
                            </div>
                        </MyLayout>
                    </div>
                </MyLayout>
            </div>
        </div>
        <OrderProcess ref="op"></OrderProcess>
    </section>
</template>

<script>
    import {
        $api,
        MyLayout,
        MyBadgeStatus,
        MyPhoto,
        MyInput,
        MyButton,
        MyContract,
        MyMaterials,
        MyNext,
        MySpecs
    } from "../../components/common/index";
    import OrderStatus from './order-status'
    import OrderProcess from './process'

    export default {
        data() {
            return {
                tableData: [],
                detail: {},
                lists: [],
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                },
                total: 0,
            }
        },
        components: {
            MyLayout,
            MyBadgeStatus,
            MyPhoto,
            MyInput,
            MyButton,
            OrderStatus,
            MyContract,
            OrderProcess,
            MyMaterials,
            MyNext,
            MySpecs
        },
        methods: {
            getDetail() {
                $api.purchase_order('get', this.$route.params.id).then(res => {
                    this.detail = res;
                    this.initNext();
                    this.getProductDetail();
                })
            },
            getProductDetail() {
                $api.purchase_order('get', '', `${this.$route.params.id}/products`).then(res => {
                    this.tableData = this.tableData.concat(res.list);
                    let newArr = [];
                    this.tableData.map(item => {
                        let index = -1;
                        let hasExists = newArr.some((childItem, j) => {
                            if (item.deliveryDate === childItem.deliveryDate) {
                                index = j;
                                return true;
                            }
                        });
                        if (!hasExists) {
                            newArr.push({
                                deliveryDate: item.deliveryDate,
                                list: [item]
                            });
                        } else {
                            newArr[index].list.push(item);
                        }
                        return newArr;
                    });
                    this.lists = newArr;
                    this.total = res.total;
                })
            },
            handleProcess() {
                this.$refs.op.open();
            },
            handleSuccess() {
                this.getDetail();

            },
            handleNext(index) {
                this.filter.pageNum = index;
                this.getLists();
            },
            initNext() {
                this.tableData = [];
                this.lists = [];
            }
        },
        created() {
            this.getDetail();
            this.$store.dispatch('setMsgNoteNum');
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .order-detail {
        .img {
            &-group {
                width: 28px;
            }
        }
        .ship-list {
            border: 1px solid #d6d8db;
            &-title {
                height: 40px;
                line-height: 40px;
                background: #f5f6fa;
            }
            &-content {
                border-top: 1px solid #e1e2e5;
            }
            &-line {
                border-top: 1px solid #e1e2e5;
            }
        }
    }
</style>
