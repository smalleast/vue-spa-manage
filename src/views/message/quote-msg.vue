<template>
    <div>
        <div class="message-list-bd mb15 pl30 pr30 pb20 cursor item-hover"
             v-for="(item, index) in quoteLists.list" :key="index" @click="markRead(item.id, item.oid)">
            <div class="message-item">
                <MyLayout>
                    <div class="message-title mt20 f20" slot="left">{{ item.title }}
                        <div class="sign" slot="left" v-if="!item.status"></div>
                    </div>
                    <div slot="right" class="col tr f14 c-37 mt15 ls2">{{ item.createTime | toDateTime }}</div>
                </MyLayout>
                <MyLayout :bottom="false">
                    <div class="left pr15" v-if="item.coverImage">
                        <MyPhoto
                            border
                            disabled
                            :item="item.coverImage&&item.coverImage.key" size="min"></MyPhoto>
                    </div>
                    <div class="center">
                        <MyLayout :bottom="false">
                            <div class="c-37 f18  pr10">{{ item.name }}</div>
                            <div class="pl5 f14 c-b5">报价单编号:</div>
                            <div class="pl5  f14 c-b5 lh26">{{ item.code }}</div>
                        </MyLayout>
                    </div>
                    <!--<div class="right col tr f14 c-d7 ls2">总报价：{{ item.price | currency('￥', '2') }}元</div>-->
                </MyLayout>
            </div>
        </div>
        <MyPagination :total="total" @handleCurrentChange="handleCurrentChange"></MyPagination>
    </div>
</template>

<script>
    import {$api, $app, MyLayout, MyBadge, MyPhoto, MyPagination} from '../../components/common/index'

    export default {
        data() {
            return {
                imgKey: 'product_image/cpeb27f0405d2b47d08751faa8d01a799c',
                total:undefined,
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    type: '1',
                },
                quoteLists:{},
            }
        },
        components: {
            MyLayout,
            MyBadge,
            MyPhoto,
            MyPagination
        },
        created(){
            this.getQuoteLists();
        },
        methods: {
            // 跳到报价单详情
            handleQuoteItem(id) {
                this.$router.push({name: 'quoteDetail', params: {id: id}});
            },
            markRead(id, oid) {
                $api.message('put', id).then(res => {
                    this.handleQuoteItem(oid);
                })
            },
            // 获取报价单消息
            getQuoteLists() {
                $app.updateLocationHref(this.filter);
                $api.message('get', this.filter).then(res => {
                    // console.log('报价单消息', res);
                    this.quoteLists = res;
                    this.total = res.total;

                })
            },
            handleCurrentChange(val){
                this.filter.pageNum = val;
                this.getQuoteLists();
            }
        },
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
    .message-title {
        position: relative;
        .sign {
            width: 12px;
            height: 12px;
            background-color: #25CE71;
            border-radius: 50%;
            position: absolute;
            right: -15px;
            top: -5px;
        }
    }
</style>
