<template>
    <section class="quote-detail">
        <div class="quote-detail-hd">
            <MyLayout>
                <div class="left pr20 f20 c-3">项目名称：{{detail.projectName}}</div>
                <MyBadgeStatus v-if="detail.periodStatus===2">加急</MyBadgeStatus>
            </MyLayout>
            <MyLayout label="交付日期：">
                <div class="c-35">
                    按照规定日期
                </div>
            </MyLayout>
            <MyLayout label="报价单状态：">
                <div class="c-3" v-if="detail.status===0">
                    待报价
                </div>
                <div class="c-blue" v-if="detail.status===1">
                    已报价
                </div>
                <div class="c-green" v-if="detail.status===2">
                    已确认
                </div>
                <div class="c-red" v-if="detail.status===3">
                    第一次驳回
                </div>
                <div class="c-red" v-if="detail.status===4">
                    第二次驳回
                </div>
            </MyLayout>
            <MyLayout label="报价单编号：">
                <div class="c-35">
                    {{detail.code}}
                </div>
            </MyLayout>
            <MyLayout v-if="detail.reason">
                <div class="f16 c-35">
                    首次驳回理由：
                </div>
                <div class="f16 c-35">
                    {{detail.reason}}
                </div>
            </MyLayout>
            <MyLayout v-if="detail.reasonTwo">
                <div class="f16 c-35">
                    二次驳回理由：
                </div>
                <div class="f16 c-35">
                    {{detail.reasonTwo}}
                </div>
            </MyLayout>
        </div>
        <div class="quote-detail-bd">
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
                                    <div class="f16 c-6 tc mt10">
                                        {{childItem.name}}
                                    </div>
                                </div>
                                <div class="col-20">
                                    <MySpecs :item="childItem"></MySpecs>
                                </div>
                                <div class="col-20">
                                    <MyMaterials :lists="childItem.productionDataList"></MyMaterials>
                                </div>

                                <div class="col-10">
                                    <MyInputMoney v-model="childItem.finalPrice"
                                                  @success="handleChange(childItem)"
                                                  :disabled="[1,2,4].includes(detail.status)"></MyInputMoney>
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
                    <div class="center tr pr20">
                        <MyLayout>
                            <div class="f18">
                                总件数：
                            </div>
                            <div class="c-red f18">
                                {{detail.qtr}}件
                            </div>
                        </MyLayout>
                    </div>
                    <div class="right tr pr20">
                        <MyLayout>
                            <div class="f18">
                                总报价：
                            </div>
                            <div class="c-red f18" v-if="totalPrice===0||!totalPrice">
                                单品金额输入后计算
                            </div>
                            <div class="c-red f18" v-if="totalPrice>0">
                                {{totalPrice | currency('¥', '2')}}
                            </div>
                        </MyLayout>
                    </div>
                </MyLayout>
            </div>

            <div class="mt20" v-if="[1,2,4].includes(detail.status)">
                <MyLayout v-if="detail.warehouse">
                    <div class="f16 c-35">
                        出库仓库：
                    </div>
                    <div class="f16 c-35">
                        {{detail.warehouse}}
                    </div>
                </MyLayout>
                <MyLayout v-if="detail.remark">
                    <div class="f16 c-35">
                        备注信息：
                    </div>
                    <div class="f16 c-35">
                        {{detail.remark}}
                    </div>
                </MyLayout>
                <MyLayout v-if="detail.remarkTwo">
                    <div class="f16 c-35">
                        二次备注：
                    </div>
                    <div class="f16 c-35">
                        {{detail.remarkTwo}}
                    </div>
                </MyLayout>
            </div>
            <div class="mt20" v-if="[0,3].includes(detail.status)">
                <MyLayout label="出库仓库：">
                    <MyInput v-model="detail.warehouse" placeholder="输入信息"></MyInput>
                </MyLayout>
                <MyLayout label="备注信息：" :center="false">
                    <div class="col">
                        <MyInput type="textarea" :rows="4" class="wp-9"
                                 v-model="detail.remark"
                                 placeholder="输入信息，字数不超过500字"></MyInput>
                        <div class="mt20">
                            <MyButton type="primary" width="min" @click="handleSave">
                                提交报价
                            </MyButton>
                        </div>
                    </div>
                </MyLayout>
            </div>
            <div class="wp-bottom-h"></div>
        </div>
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
        MyNext,
        MyMaterials,
        MyInputMoney,
        MySpecs
    } from "../../components/common/index";

    export default {
        data() {
            return {
                tableData: [],
                stock: {
                    name: '',
                    remark: ''
                },
                detail: {},
                lists: [],
                totalPrice: 0,
                productOffers: [],
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                },
                total: undefined,
                busy: false
            }
        },
        components: {
            MyLayout, MyBadgeStatus, MyPhoto, MyInput, MyButton, MyNext, MyMaterials, MyInputMoney, MySpecs
        },
        methods: {
            getDetail() {
                $api.inquiry_sheet('get', this.$route.params.id).then(res => {
                    this.detail = res;
                    this.initNext();
                    this.getLists();
                })
            },
            getLists() {
                $api.inquiry_sheet('get', this.filter, `details/${this.$route.params.id}`, true).then(res => {
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
                    this.calcTotal();
                });
            },
            calcTotal() {
                this.totalPrice = 0;
                this.productOffers = [];
                this.lists.map(item => {
                    item.list.map(childItem => {
                        if (childItem.finalPrice) {
                            this.totalPrice += parseFloat(parseFloat(childItem.finalPrice || 0) * childItem.qtr);
                            this.productOffers.push({
                                id: childItem.id,
                                price: childItem.finalPrice
                            })
                        }
                    });
                })
            },
            handleChange() {
                this.calcTotal();
            },
            verification() {
                if (!this.detail.warehouse) {
                    this.$message.error('出库仓库的地址不能为空！');
                    return false;
                }
                return true;
            },
            handleSave() {
                if (this.verification()) {
                    this.busy = true;
                    const alertText = this.$store.state.alertTexts.filter(item => item.id === 1000)[0];
                    this.$alert(alertText.content, alertText.title, {
                        confirmButtonText: alertText.buttonText,
                        callback: action => {
                            console.log('action:', action);
                            if (action === 'confirm') {
                                this.handleQuote();
                            }
                        }
                    })
                }
            },
            handleQuote() {
                const params = {
                    id: this.$route.params.id,
                    productOffers: this.productOffers,
                    remark: this.detail.remark,
                    warehouse: this.detail.warehouse
                };
                $api.inquiry_sheet('post', params, 'product_offer').then(res => {
                    this.busy = false;
                    this.getDetail();
                }).catch(res => {
                    this.busy = false;
                })
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
    .quote-detail {
        &-hd {

        }
        &-bd {
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
    }

</style>
