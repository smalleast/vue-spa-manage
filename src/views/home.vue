<template>
    <div class="wrapper">
        <div class="wrapper-hd">
            <Header @success="handleSuccess"></Header>
        </div>
        <div class="wrapper-bd-left">
            <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo"
                @select="handleSelect">
                <el-menu-item :index="item.index"
                              v-for="(item,index) in items"
                              :key="index"
                              @click="handleClick(item)"
                              v-show="itemNum.includes(item.index)">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.title}}</span>
                    <MyNumber v-if="item.title == '消息通知' &&  msgNotesNum">{{ msgNotesNum }}</MyNumber>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="wrapper-bd-right">
            <transition name="move" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import {$api, Header, MyNumber} from '../components/common/index'

    export default {
        data() {
            return {
                activeIndex: '1',
                items: [
                    {
                        index: '1',
                        title: '报价单',
                        icon: 'el-icon-menu',
                        router: 'quoteList',
                        active: true
                    },
                    {
                        index: '2',
                        title: '订单',
                        icon: 'el-icon-document',
                        router: 'orderList',
                        active: true
                    },
                    {
                        index: '3',
                        title: '售后服务',
                        icon: 'el-icon-setting',
                        router: 'serviceList',
                        active: true
                    },
                    {
                        index: '20',
                        title: '个人中心',
                        icon: 'iconfont icon-user',
                        router: 'userList',
                        active: false
                    },
                    {
                        index: '21',
                        title: '消息通知',
                        icon: 'iconfont icon-news',
                        router: 'messageList',
                        active: false
                    }],
                userMenu: ['messageList', 'userList'],
                itemNum: []
            }
        },
        components: {
            Header,
            MyNumber,
        },
        computed: {
            msgNotesNum(){
                return this.$store.state.msgNotesNum;
            }
        },
        methods: {
            handleSuccess(inRoute) {
                this.init(inRoute);
                this.$router.push({name: inRoute});
            },
            init(inRoute) {
                const routeName = inRoute || this.$route.name;
                if (this.userMenu.includes(routeName)) {
                    this.itemNum = ['20', '21'];
                } else {
                    this.itemNum = ['1', '2', '3'];
                }
                switch (routeName) {
                    case 'userList':
                        this.activeIndex = '20';
                        break;
                    case 'messageList':
                    case 'messageDetail':
                        this.activeIndex = '21';
                        break;
                    case 'quoteList':
                    case 'quoteDetail':
                        this.activeIndex = '1';
                        break;
                    case 'orderList':
                    case 'orderDetail':
                        this.activeIndex = '2';
                        break;
                    case 'serviceList':
                    case 'serviceDetail':
                        this.activeIndex = '3';
                        break;
                    default:
                        this.activeIndex = '1';
                        break;
                }
            },
            handleSelect(inItem) {

            },
            handleClick(inItem) {
                this.$router.push({name: inItem.router})
            },
        },
        created() {
            this.init();
            this.$store.dispatch('setMsgNoteNum');
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .wrapper {
        &-hd {
            position: fixed;
            width: 100%;
            height: 70px;
            background-color: #fff;
            z-index: 3;
        }
        &-bd {
            &-left {
                position: fixed;
                width: 250px;
                top: 70px;
                bottom: 0;
                left: 0;
                background-color: #fff;
                z-index: 2;
                box-shadow: 1px 0 10px 0 rgba(198, 199, 204, 0.80);
                .el-menu {
                    background: #fff;
                    .is-active {
                        color: #4d7cfe;
                    }
                }
                .my-number{
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    left: 137px;
                    top: 17px;
                    background: #FF4F4D;
                    color: #FFFFFF;
                    border:none;
                    line-height: 24px;
                }
            }
            &-right {
                position: absolute;
                left: 270px;
                top: 90px;
                right: 20px;
                background-color: #fff;
                box-shadow: -3px 2px 2px 0 rgba(119, 151, 178, 0.16);
                padding: 20px;
                min-width: 1000px;
            }
            &-content {

            }
        }
    }
</style>
