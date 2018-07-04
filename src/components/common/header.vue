<template>
    <div class="header">
        <div class="row row-no-padding row-center header-row">
            <div class="left flex-center-center cursor" @click="handleClick('quoteList')">
                <img src="../../assets/image/logo-index.jpg" alt="">
            </div>
            <div class="center col"></div>
            <div class="pr20 cursor" @click="handleClick('messageList')">
                <div class="link-header flex-center-center">
                    <MyBadge :text="msgNotesNum" :max="99" :dot="hideDot">
                        <i class="iconfont icon-news f20 c-blue"></i>
                    </MyBadge>
                </div>
            </div>
            <div class="pr20 cursor">
                <div class="link-header flex-center-center" @click="handleClick('userList')">
                    <i class="iconfont icon-user f20 c-blue"></i>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {nxStore, MyBadge} from '../../components/common/index'

    export default {
        data() {
            return {
                hideDot: false,
            }
        },

        methods: {
            handleClick(inRoute) {
                this.$emit('success', inRoute);
            },
        },
        components: {
            MyBadge
        },
        computed: {
            msgNotesNum() {
                return this.$store.state.msgNotesNum;
            }
        },
        created() {


        },
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .header {
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        color: #fff;
        &-row {
            .left {
                width: 250px;
                height: 70px;
                background: #4d7cfe;
            }
            .link-header {
                width: 40px;
                height: 40px;
                border-radius: 100%;
                background-color: transparent;
                &:hover {
                    background-color: #d9e8ff;
                    i {
                        color: #4d7cfe;
                    }
                }
            }
        }
        .my-badge-item {
            margin-top: 0px;
            margin-right: 0px;
        }
    }
</style>
