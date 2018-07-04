<template>
    <div class="order-msg">
        <div class="message-list-bd mb15 pl30 pr30 pb20 cursor item-hover" v-for="(item, index) in orderLists.list"
             :key="index" @click="markRead(item.id, item.oid)">
            <div class="message-item">
                <MyLayout class="pt20">
                    <div class="message-title f20" slot="left"> {{ item.title }}
                        <div class="sign"  v-if="!item.status"></div>
                    </div>
                    <div slot="right" class="col tr f14 c-37 ls2">{{ item.createTime | toDateTime }}</div>
                </MyLayout>
                <MyLayout :bottom="false">
                    <div class="left pr15" v-if="item.coverImage">
                        <MyPhoto
                            border
                            disabled
                            :item="item.coverImage&&item.coverImage.key" size="min"></MyPhoto>
                    </div>
                    <div class="center col">
                        <MyLayout :bottom="false">
                            <div class="c-37 f18  pr15" v-if="item.name">{{ item.name }}</div>
                            <div class="f14 c-b5 pr10">订单编号：</div>
                            <div class="f14 c-b5 lh26 ">{{ item.code }}</div>
                        </MyLayout>
                        <MyLayout class="mt5">
                            <div class="f14 c-b5 ls2 mr15">共{{ item.totalNum }}件产品</div>
                            <div class="f14 c-b5 ls2" v-if="item.deliveryDate">交付日期：{{ item.deliveryDate | toDateTime }}</div>
                        </MyLayout>
                    </div>
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
                orderLists: {},
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    type: '2',
                },
            }
        },
        components: {
            MyLayout,
            MyBadge,
            MyPhoto,
            MyPagination
        },
        created(){
            this.getOrderLists();
        },
        methods: {
            // 跳到订单详情
            handleOrderItem(id) {
                this.$router.push({name: 'orderDetail', params: {id: id}})
            },
            markRead(id, oid) {
                $api.message('put', id).then(res => {
                    this.handleOrderItem(oid);
                })
            },
            // 获取订单消息
            getOrderLists() {
                $app.updateLocationHref(this.filter);
                $api.message('get', this.filter).then(res => {
                    // console.log('订单消息', res.list);
                    this.orderLists = res;
                    this.total = res.total;
                })
            },
            handleCurrentChange(val){
                this.filter.pageNum = val;
                this.getOrderLists();
            }
        }
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
