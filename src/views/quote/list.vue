<template>
    <div class="quote">
        <div class="quote-hd mt20">
            <MySearch v-model="filter.keyword" @search="handleSearch"></MySearch>
        </div>
        <div class="quote-bd mt20">
            <MyTabs @success="handleClick" :lists="status_num"></MyTabs>
            <div class="quote-bd-item p15 mb15 cursor item-hover"
                 v-for="(item,index) in lists" :key="index"
                 @click="handleClickItem(item)">
                <MyLayout>
                    <div class="c-37 f18">报价单编号：{{item.code}}</div>
                </MyLayout>
                <MyLayout :bottom="false">
                    <div class="left pr15">
                        <MyPhoto border :item="item.coverFile&&item.coverFile.key" size="min"></MyPhoto>
                    </div>
                    <div class="center col">
                        <MyLayout :bottom="false">
                            <div class="c-37 f16 pr10 lc-1">{{item.projectName}}</div>
                            <div class="col">
                                <MyStatus :status="{'0':'default','2':'blue','3':'red','4':'green'}[item.status]"
                                          v-if="[0,2,3,4].includes(item.status)">
                                    {{item.statusDisplay}}
                                </MyStatus>
                            </div>
                            <div class="f14 c-b5 ls2 col-40 tr">创建时间：{{item.createTime | toDateTime}}</div>
                        </MyLayout>
                        <MyLayout class="mt10">
                            <div class="f14 c-b5 ls2">共{{item.qtr}}件产品</div>
                            <div class="f14 c-red ls2 col tr" v-if="item.price">总报价：{{item.price | currency('¥',
                                '2')}}元
                            </div>
                        </MyLayout>
                    </div>
                </MyLayout>
            </div>
            <MyDefault :lists="lists"></MyDefault>
        </div>
        <MyPagination :total="total" @handleCurrentChange="handleCurrentChange"></MyPagination>

    </div>
</template>

<script>
    import {
        $api,
        $app,
        MyLayout,
        MySearch,
        MyTabs,
        MyPhoto,
        MyStatus,
        MyPagination,
        MyDefault
    } from '../../components/common/index'

    export default {
        data() {
            return {
                activeName: '-1',
                tabLists: [
                    {
                        label: '所有报价单',
                        value: '-1',
                        num: 2
                    }, {
                        label: '待报价',
                        value: '0',
                        num: 4
                    }, {
                        label: '已确认',
                        value: '1',
                        num: 6
                    }, {
                        label: '已驳回',
                        value: '2',
                        num: 8
                    }
                ],
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    status: -1,
                    keyword: ''
                },
                total: undefined,
                lists: [],
                status_num: []
            }
        },
        components: {
            MyLayout, MySearch, MyTabs, MyPhoto, MyStatus, MyPagination, MyDefault
        },
        methods: {
            handleClick(inVal) {
                this.initNum();
                this.filter.status = inVal;
                this.getLists();
            },
            handleSearch() {
                this.initNum();
                this.getLists();
            },
            handleClickItem(inItem) {
                this.$router.push({name: 'quoteDetail', params: {id: inItem.id}});
            },
            getLists() {
                $app.updateLocationHref(this.filter);
                $api.inquiry_sheet('get', this.filter, '', true).then(res => {
                    this.lists = res.list;
                    this.total = res.total;
                    this.getStatus();
                })
            },
            getStatus() {
                $app.updateLocationHref(this.filter);
                $api.inquiry_sheet('get', this.filter, 'status_num').then(res => {
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
            }
        },
        created() {
            this.getLists();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .quote {
        &-bd {
            &-item {
                border: 1px solid #c6c7cc;
                border-radius: 3px;
            }
        }
    }
</style>
