<template>
    <div class="inform-message">
        <div class="message-list-bd mb15 pl30 pr30 pb20 cursor item-hover" @click="markRead(item.id)" v-for="(item, index) in noticeLists.list" :key="index">
            <div class="inform-message-item" >
                <MyLayout>
                    <div class="mt20 message-title f20" slot="left"> {{ item.title }}
                        <div class="sign" slot="left" v-if="!item.status"></div>
                    </div>
                    <div class="col tr f14 c-37 mt20 ls2 right">{{ item.createTime | toDateTime }}</div>
                </MyLayout>
                <div class="mt15 c-b5 f16 ls2">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <MyPagination :total="total" @handleCurrentChange="handleCurrentChange"></MyPagination>
    </div>
</template>

<script>
    import {$api, $app, MyLayout, MyPagination} from '../../components/common/index'
    export default {
         data() {
             return {
                 filter: {
                     pageNum: 1,
                     pageSize: 20,
                     type: '4',
                 },
                 noticeLists:{},
                 total:undefined,
             }
         },
        components: {
            MyLayout,
            MyPagination
        },
        methods:{
            markRead(id){
                $api.message('put',id).then( res => {
                    this.getNoticeInfo();
                    this.$store.dispatch('setMsgNoteNum');
                })
            },
            // 获取通知消息
            getNoticeInfo() {
                $app.updateLocationHref(this.filter);
                $api.message('get', this.filter).then(res => {
                    this.noticeLists = res;
                    this.total = res.total;

                })
            },
            handleCurrentChange(val){
                this.filter.pageNum = val;
                this.getQuoteLists();
            }
        },
        created(){
             this.getNoticeInfo();
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
