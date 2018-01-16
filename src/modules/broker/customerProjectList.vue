<template>
    <div class="customer-project-list">
        <div class="hd mb20">
            <my-search-box v-model="filter.keyword" @search="getList" placeholder="请输入客户姓名、项目名称、客户手机号"></my-search-box>
            <el-select v-model="filter.status" placeholder="请选择" @change="getList" style="width:200px;margin-left:50px;">
                <el-option
                        v-for="status in projectStatusList"
                        :key="status.id"
                        :label="status.label"
                        :value="status.code">
                </el-option>
            </el-select>
        </div>
        <el-table ref="multipleTable" tooltip-effect="dark" :data="item.list" border fit
                  highlight-current-row>
            <el-table-column label="项目编号" min-width="180" prop="code" align="center">
            </el-table-column>
            <el-table-column label="项目名称" min-width="120" prop="projectName" align="center">
            </el-table-column>
            <el-table-column label="客户姓名" min-width="100" prop="customerName" align="center">
            </el-table-column>
            <el-table-column label="客户手机号" min-width="120" prop="mobilePhone" align="center">
            </el-table-column>
            <el-table-column label="经纪人" min-width="100" prop="broker" align="center">
            </el-table-column>
            <el-table-column label="上线经纪人" min-width="100" prop="higherUpBroker" align="center">
            </el-table-column>
            <el-table-column label="金额" min-width="120" prop="price" align="center">
            </el-table-column>
            <el-table-column label="佣金" min-width="120" prop="commission" align="center">
            </el-table-column>
            <el-table-column label="签单时间" min-width="160" prop="statusTime" align="center">
                <template scope="scope">
                    {{scope.row.signingTime|dateTime}}
                </template>
            </el-table-column>
            <el-table-column label="交付时间" min-width="160" prop="statusTime" align="center">
                <template scope="scope">
                {{scope.row.statusTime|dateTime}}
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="100" prop="statusDisplay" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="100" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/customerProject/detail/'+scope.row.id">
                        <el-button type="primary" size="small">查看详情</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <Pagination ref="page" :total="item.total" :api="'customer_projects'" :filter="filter"
                    @setItem="fetchData" :uploadHref="false"></Pagination>
    </div>
</template>

<script>
    import {Pagination} from 'components/vue/index';
    import {MySearchBox} from 'components/vue/index';
    import $api from '../../components/services/api'
    import {mapGetters} from 'vuex'
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
                    status:'5',
                    keyword:'',
                    userId:this.$route.params.userId
                }
            }
        },
        methods: {
            getList(){
                $api.customer_projects('get', this.filter).then((res) => {
                    this.item = res.data;
                });
            },
            fetchData(item) {
                this.item = item;
            },
        },
        computed:{
            ...mapGetters([
                'projectStatusList'
            ])
        },
        created(){
        },
        components: {
            Pagination,
            MySearchBox
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
</style>

