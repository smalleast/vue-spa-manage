<template>
    <section class="message-list bg-f p30">
        <div class="message-list-hd">
            <MyTabs :lists="tabLists" @success="handleClick"></MyTabs>
            <!-- 订单消息-->
            <orderMsg   v-if="activeName == 2"></orderMsg>
            <!-- 报价单消息-->
            <quoteMsg   v-if="activeName == -1"></quoteMsg>
            <!-- 通知消息-->
            <InformMsg  v-if="activeName == 4"></InformMsg>
        </div>
    </section>
</template>

<script>
    import {$api, $app, MyTabs} from '../../components/common/index'
    import InformMsg from './inform-msg'
    import orderMsg from './order-msg'
    import quoteMsg from './quote-msg'

    export default {
        data() {
            return {
                activeName: '-1',
            }
        },
        components: {
            MyTabs,
            InformMsg,
            orderMsg,
            quoteMsg,
        },
        computed:{
            tabLists(){
                return this.$store.state.magTabLists;
            }
        },
        methods: {
            handleClick(inVal) {
                this.activeName = inVal;
            },
        },
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .message-list {
        &-bd {
            /*min-width: 1000px;*/
            border: 1px solid #bfbfbf;
            border-radius: 2px;
        }
    }
</style>
