<template>
    <div class="service-list p20">
        <div class="service-list-hd mt20">
            <MySearch @search="search" :placeholder="placeholder" v-model="filter.keyword"></MySearch>
        </div>
        <div class="service-list-bd mt40">
            <!--<MyTabs @success="handleClick" :lists="tabLists" class="mb10"></MyTabs>-->
            <div class="service-list-bd-item p15 mb15 cursor item-hover"    v-for="(item, index) in serviceLists" :key="index">
                <MyLayout :bottom="false">
                    <div class="left pr15">
                        <MyPhoto :item="item.coverFile.key" size="min"></MyPhoto>
                    </div>
                    <div class="center col" @click="handleClickItem(item.id)">
                        <MyLayout :bottom="false">
                            <div class="c-37 f18 bold pr10" >{{ item.productName }}</div>
                            <MyStatus :status="{'2':'red','3':'green','1':'blue'}[item.type]"
                                      v-if="[1,2,3].includes(item.type)">
                                {{item.typeDispaly}}
                            </MyStatus>
                        </MyLayout>
                        <MyLayout class="mt5">
                            <div class="f14 c-b5 ls2">采购单号：</div>
                            <div class="f14 c-b5 ls2">{{ item.purchaseOrderCode }}</div>
                            <div class="f14 c-b5 ls2 ml15">数量：</div>
                            <div class="f14 c-b5 ls2">{{ item.num }}</div>
                            <div class="f14 c-b5 ls2">件</div>
                        </MyLayout>
                    </div>
                    <div class="right tr">
                        <!--<div class="f14 c-b5 ls2">申请日期：2018-05-10</div>-->
                        <MyLayout>
                            <div class="f14  c-b5 ls2">
                                申请日期：
                            </div>
                            <div class="c-a5  c-b5 ls2">
                                {{ item.applyTime | toDate}}
                            </div>
                        </MyLayout>
                    </div>
                </MyLayout>
            </div>
            <MyDefault :lists="serviceLists"></MyDefault>
        </div>
        <MyPagination :total="total" @handleCurrentChange="handleCurrentChange"></MyPagination>
        <div class="wp-bottom-h"></div>
    </div>
</template>

<script>
    import {$api, nxStore, $app, MyLayout, MySearch, MyTabs, MyPhoto, MyStatus, MyPagination, MyDefault} from '../../components/common/index'

    export default {
        data() {
            return {
                activeName: '-1',
                placeholder: '输入订单号查找',
                tabLists: [
                    {
                        key: '所有申请',
                        value: '-1',
                        qtr: 0
                    },
                ],
                serviceLists:[],
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    keyword: ''
                },
                total: undefined,
            }
        },
        components: {
            MyLayout, MySearch, MyTabs, MyPhoto, MyStatus, MyPagination,MyDefault
        },
        methods: {
            handleClick(inVal) {
                this.activeName = inVal
            },
            // 点击跳到售后详情页
            handleClickItem(inItem) {
                this.$router.push({name: 'serviceDetail', params: {id: inItem}});
            },
            // 搜索售后服务列表
            search() {
                this.initNum();
                this.getLists();
            },
            // 售后服务列表
            getLists() {
                $app.updateLocationHref(this.filter);
                $api.after_sale('get', this.filter, 'after_sale_list',true).then(res => {
                    this.serviceLists = res.list;
                    this.total = res.total;
                })
            },
            // 处理点击下一页
            handleCurrentChange(val) {
                this.filter.pageNum = val;
                this.getLists();
            },
            // 初始化当前页数
            initNum() {
                this.filter.pageNum = 1;
            }
        },
        created() {
            this.getLists();
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .service-list{
        &-bd{
            .tab-item{
                color: #4D7CFE;
            }
            &-item{
                /*min-width: 1000px;*/
                border: 1px solid #c6c7cc;
                border-radius: 2px;
            }
        }
    }
</style>
