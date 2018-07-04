<template>
    <section class="order">
        <div class="order-hd mt20">
            <MySearch v-model="filter.keyword" @search="handleSearch"></MySearch>
        </div>
        <div class="order-bd mt20">
            <MyTabs @success="handleClick" :lists="status_num"></MyTabs>
            <div class="mt20">
                <div class="order-bd-item mb10" v-for="(item,index) in lists" :key="index">
                    <div class="order-bd-item-title">
                        <MyLayout>
                            <div class="left col-40">
                                订单编号：{{item.code}}
                            </div>
                            <div class="center col">
                                报价日期：{{item.quoteDate | toDate}}
                            </div>
                            <div class="right col tr" v-if="[100,800].includes(item.status)">
                                <div class="link-del" @click="handleDel(item)"><i class="icon-shanchu iconfont"></i>
                                </div>
                            </div>
                        </MyLayout>
                    </div>
                    <div class="order-bd-item-content">
                        <MyLayout>
                            <div class="px15">
                                <div v-for="(childItem,childIndex) in item.coverFiles"
                                     :key="childIndex">
                                    <MyPhoto border :item="childItem.key" size="min"
                                             v-if="childIndex===0"></MyPhoto>
                                </div>
                            </div>
                            <div class="col">
                                <MyLayout>
                                    <div class="c-37 f16">
                                        {{item.orderName}}
                                    </div>
                                </MyLayout>
                            </div>
                            <div class="px10 tc" style="width: 210px">
                                <div class="c-b5 f12 tc">订单状态</div>
                                <div class="c-3 f14 tc mt5">
                                    {{item.statusDescResponseVO&&item.statusDescResponseVO.title}}
                                </div>
                            </div>
                            <div class="col-20 tc">
                                <MyButton type="primary" size="small"
                                          @click="handleClickAlert(item)"
                                          v-if="item.statusDescResponseVO&&item.statusDescResponseVO.buttonConfirmed">
                                    <div class="f12">
                                        {{item.statusDescResponseVO&&item.statusDescResponseVO.buttonWord}}
                                    </div>
                                </MyButton>
                            </div>
                            <div class="col-15 left-border flex-middle">
                                <div class="pl20">
                                    <MyLayout label="总额：" :bottom="false">
                                        <div class="c-red">
                                            {{item.totalPrice| currency('¥', '2')}}
                                        </div>
                                    </MyLayout>
                                    <MyLayout label="交付周期：" :bottom="false" class="mt10">
                                        {{item.shippingDays}}天
                                    </MyLayout>
                                </div>
                            </div>
                            <div class="col-10 tc left-border flex-center-center">
                                <div>
                                    <div class="link" @click="handleClickDetail(item)">
                                        查看详情
                                    </div>
                                    <div class="link mt20" hidden @click="handleClickShip(item)">
                                        发货管理
                                    </div>
                                </div>
                            </div>
                        </MyLayout>
                    </div>
                </div>
                <MyDefault :lists="lists"></MyDefault>
            </div>
        </div>
        <MyPagination :total="total" @handleCurrentChange="handleCurrentChange"></MyPagination>
        <div class="wp-bottom-h"></div>
    </section>
</template>

<script>
    import {
        $api,
        $app,
        MyLayout,
        MySearch,
        MyTabs,
        MyPhoto,
        MyButton,
        MyPagination,
        MyDefault
    } from "../../components/common";

    export default {
        data() {
            return {
                activeName: '-1',
                tabLists: [
                    {
                        key: '所有报价单',
                        value: '-1',
                        qtr: 2
                    },
                    {
                        key: '待签合同',
                        value: '0',
                        qtr: 4
                    },
                    {
                        key: '待付定金',
                        value: '1',
                        qtr: 6
                    },
                    {
                        key: '生产中',
                        value: '2',
                        qtr: 8
                    },
                    {
                        key: '待付尾款',
                        value: '3',
                        qtr: 8
                    },
                    {
                        key: '待发货',
                        value: '4',
                        qtr: 8
                    },
                    {
                        key: '已发货',
                        value: '5',
                        qtr: 8
                    }
                ],
                imgKey: 'product_image/cpeb27f0405d2b47d08751faa8d01a799c',
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    status: 0,
                    keyword: ''
                },
                total: undefined,
                lists: [],
                status_num: []
            }
        },
        components: {
            MyLayout, MySearch, MyTabs, MyPhoto, MyButton, MyPagination, MyDefault
        },
        methods: {
            handleClick(inVal) {
                this.initNum();
                this.filter.status = inVal;
                this.getLists();
            },
            handleClickDetail(inItem) {
                this.$router.push({name: 'orderDetail', params: {id: inItem.id}})
            },
            handleClickShip(inItem) {
                this.$router.push({name: 'orderShip', params: {id: inItem.id}})
            },
            handleClickAlert(item) {
                const status = item.statusDescResponseVO && item.statusDescResponseVO.status;
                const alertText = this.$store.state.alertTexts.filter(item => item.id === status)[0];
                this.$alert(alertText.content, alertText.title, {
                    confirmButtonText: alertText.buttonText,
                    callback: action => {
                        console.log('action:', action);
                        if (action === 'confirm') {
                            this.handleChangeStatus(item.id);
                        }
                    }
                })
            },
            handleChangeStatus(itemId) {
                $api.purchase_order('put', '', `${itemId}/change_status`).then(res => {
                    this.getLists()
                })
            },
            getLists() {
                $app.updateLocationHref(this.filter);
                $api.purchase_order('get', this.filter, '', true).then(res => {
                    this.lists = res.list;
                    this.total = res.total;
                    this.getStatus();
                })
            },
            getStatus() {
                $app.updateLocationHref(this.filter);
                $api.purchase_order('get', this.filter, 'status_num').then(res => {
                    this.status_num = res;
                })
            },
            handleCurrentChange(val) {
                this.filter.pageNum = val;
                this.getLists();
            },
            initNum() {
                this.filter.pageNum = 1;
                this.filter.status = -1;
            },
            handleDel(item) {
                this.$confirm('你确认删除该采购订单吗', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                    customClass: 'el-message-box-confirm'
                }).then(() => {
                    $api.purchase_order('delete', '', `${item.id}/delete`).then(res => {
                        this.$message.success('删除成功')
                    })
                });

            },
            handleSearch() {
                this.initNum();
                this.getLists();
            }
        },
        created() {
            this.getLists();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .order {
        &-hd {

        }
        &-bd {
            &-item {
                border: 1px solid #c6c7cc;
                height: 200px;
                &-title {
                    height: 60px;
                    border-bottom: 1px solid #c6c7cc;
                    background: #f5f6fa;
                    padding-left: 20px;
                    padding-right: 20px;
                    .row {
                        height: 60px;
                    }
                }
                &-content {
                    height: 140px;
                    > .my-layout {
                        > .row {
                            height: 140px;
                            .left-border {
                                height: 140px;
                                border-left: 1px solid #c6c7cc;
                            }
                        }
                    }

                }
            }
        }
    }


</style>
