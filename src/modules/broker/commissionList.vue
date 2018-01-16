<template>
    <div class="commission-list">
        <div class="hd mb20 mt50 tabs">
            <div :class="{'active':filter.status==6}" @click="changeStatus(6)">
                已结佣金额：{{checkoutCommission|currency('¥','2')}}
            </div>
            <div :class="{'active':filter.status==5}" @click="changeStatus(5)">
                待结佣金额：{{waitCommission|currency('¥','2')}}
            </div>
        </div>
        <el-table tooltip-effect="dark" :data="item.list" border fit
                  highlight-current-row>
            <el-table-column label="项目编号" min-width="180" prop="code" align="center">
            </el-table-column>
            <el-table-column label="项目名称" min-width="120" prop="broker" align="center">
            </el-table-column>
            <el-table-column label="客户姓名" min-width="120" prop="mobilePhone" align="center">
            </el-table-column>
            <el-table-column label="客户手机号" min-width="120" prop="mobilePhone" align="center">
            </el-table-column>
            <el-table-column label="经纪人" min-width="120" prop="broker" align="center">
            </el-table-column>
            <el-table-column label="上线经纪人" min-width="120" prop="higherUpBroker" align="center">
            </el-table-column>
            <el-table-column label="金额" min-width="100" prop="price" align="center">
                <template scope="scope">
                    {{scope.row.price | currency('¥','2')}}
                </template>
            </el-table-column>
            <el-table-column label="应得佣金" min-width="100" prop="recommendDate" align="center">
                <template scope="scope">
                    {{scope.row.commission | currency('¥','2')}}
                </template>
            </el-table-column>
            <el-table-column label="签单时间" min-width="160" prop="statusTime" align="center">
                <template scope="scope">
                    {{scope.row.signingTime | dateTime}}
                </template>
            </el-table-column>
            <el-table-column label="交付时间" min-width="160" prop="statusTime" align="center">
                <template scope="scope">
                    {{scope.row.deliveryTime | dateTime}}
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="150" prop="statusDisplay" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="180" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/customerProject/detail/'+scope.row.id">
                        <el-button type="primary" size="small">查看</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <Pagination ref="page" :total="item.total" :api="'brokers'" :inApi="`${this.filter.userId}/commission_records`" :filter="filter"
                    @setItem="fetchData" :uploadHref="false"></Pagination>
    </div>
</template>

<script>
    import {Pagination} from 'components/vue/index';
    import $api from '../../components/services/api'
    import $utils from '../../components/services/utils'
    export default {
        data() {
            return {
                item: {
                    total: undefined,
                },
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    status:6,
                    userId:this.$route.params.userId
                }
            }
        },
        props:{
            checkoutCommission:{
                type:String|Number
            },
            waitCommission:{
                type:String|Number
            }
        },
        methods: {
            getList(){
                $api.brokers('get',this.filter,`${this.filter.userId}/commission_records`).then((res) => {
                    this.item = res.data;
                });
            },
            changeStatus(status){
                if(status!=this.filter.status){
                    this.filter.status = status;
                    this.getList();
                }
            },
            fetchData(item) {
                this.item = item;
            },
        },
        created(){
        },
        components: {
            Pagination
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .tabs{
        >div{
            display:inline-block;
            width:40%;
            font-size:20px;
            color:#bcbcbc;
            cursor:pointer;
            &.active{
                color:#3366cc;
            }
        }
    }
</style>

