<template>
    <div class="broker-detail">
        <div class="top-info">
            <div class="avatar-name">
                <avatar :src="item.avatarFile.key|toImg" size="90px" radius="50%" v-if="item.avatarFile"></avatar>
                <div class="avatar" style="width:90px;height:90px;" v-else>
                </div>
            </div>
            <div style="margin-left:30px;">
                <p class="name">{{item.realName}}</p>
                <p class="text">{{item.mobilePhone}}</p>
                <p class="text">{{item.identityTypeDisplay}}</p>
            </div>
            <div style="align-self:flex-end;margin-bottom:10px;width:100%;">
                <p style="font-size:20px;color:#6b6b6b;text-align:right">注册时间:{{item.createTime|dateTime}}</p>
            </div>
        </div>
        <div class="bottom-info" v-if="item.realName">
            <el-tabs v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane label="推荐客户" name="customerList">
                    <customer-list></customer-list>
                </el-tab-pane>
                <el-tab-pane label="客户项目" name="customerProjectList">
                    <customer-project-list></customer-project-list>
                </el-tab-pane>
                <el-tab-pane label="发展经纪人" name="brokerList">
                    <broker-list></broker-list>
                </el-tab-pane>
                <el-tab-pane label="银行卡" name="cardList">
                    <card-list></card-list>
                </el-tab-pane>
                <el-tab-pane label="佣金" name="commissionList">
                    <commission-list :checkoutCommission="item.checkoutCommission" :waitCommission="item.waitCommission"></commission-list>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import $api from '../../components/services/api'
    import avatar from 'vue-avatar'
    import customerList from './customerList'
    import customerProjectList from './customerProjectList'
    import cardList from './cardList'
    import commissionList from './commissionList'
    import brokerList from './brokerList'
    export default {
        data() {
            return {
                item: {},
                activeName:'customerList'
            }
        },
        components:{
            avatar,
            customerList,
            customerProjectList,
            cardList,
            commissionList,
            brokerList
        },
        methods: {
            getItem(){
                $api.brokers('get', '', this.$route.params.userId)
                    .then((res) => {
                        this.item = res.data;
                    });
            },
            handleTabClick(){
               //this.$router.replace(`${this.activeName}/`);
            }
        },
        created(){
            console.log('ccreated');
            this.getItem();
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .broker-detail{
        >div{
            &.top-info{
               display:flex;
                padding:30px 50px;
                background-color:#f2f2f2;
                .name{
                    font-size:28px;
                    line-height:40px;
                }
                .text{
                    font-size:20px;
                    line-height:30px;
                }
            }
            &.bottom-info{
                padding:0 40px;
            }
        }
    }
</style>
