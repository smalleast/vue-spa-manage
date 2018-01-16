<template>
    <div class="customer-list">
        <div class="hd mb20">
            <my-search-box v-model="filter.keyword" @search="getList" placeholder="请输入客户姓名、手机号"></my-search-box>
            <el-select v-model="filter.status" placeholder="请选择" @change="getList" style="width:200px;margin-left:50px;">
                <el-option
                        v-for="status in customerStatusList"
                        :key="status.id"
                        :label="status.label"
                        :value="status.code">
                </el-option>
            </el-select>
        </div>
        <el-table ref="multipleTable" tooltip-effect="dark" :data="item.list" border fit
                  highlight-current-row>
            <el-table-column label="姓名" min-width="180" prop="customerName" align="center">
                <template scope="scope">
                    <div class="avatar-name">
                        <avatar :src="scope.row.avatarFile.key|toImg" size="50px" radius="50%" v-if="scope.row.avatarFile"></avatar>
                        <div class="avatar" style="width:40px;height:40px;" v-else>
                        </div>
                        <span class="name">{{scope.row.customerName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机号" min-width="120" prop="mobilePhone" align="center">
            </el-table-column>
            <el-table-column label="经纪人" min-width="120" prop="broker" align="center">
            </el-table-column>
            <el-table-column label="推荐时间" min-width="200" prop="recommendDate" align="center">
                <template scope="scope">
                    {{scope.row.recommendDate | dateTime}}
                </template>
            </el-table-column>
            <el-table-column label="项目数量" min-width="150" prop="projectCount" align="center">
            </el-table-column>
            <el-table-column label="状态" min-width="150" prop="statusDisplay" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="180" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/customer/detail/'+scope.row.id">
                        <el-button type="primary" size="small">查看详情</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <Pagination ref="page" :total="item.total" :api="'customers'" :filter="filter"
                    @setItem="fetchData" :uploadHref="false"></Pagination>
    </div>
</template>

<script>
    import {Pagination} from 'components/vue/index';
    import {MySearchBox} from 'components/vue/index';
    import $api from '../../components/services/api'
    import $utils from '../../components/services/utils'
    import {mapGetters} from 'vuex'
    import avatar from 'vue-avatar'
    export default {
        data() {
            return {
                item: {
                    total: undefined,
                },
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    status:'1',
                    keyword:'',
                    userId:this.$route.params.userId
                }
            }
        },
        methods: {
            getList(){
                $api.customers('get', this.filter).then((res) => {
                    this.item = res.data;
                });
            },
            fetchData(item) {
                this.item = item;
            },
        },
        computed:{
            ...mapGetters([
                'customerStatusList'
            ])
        },
        created(){
        },
        components: {
            Pagination,
            MySearchBox,
            avatar
        }
    }
</script>

<style type="text/scss" lang="scss">
</style>

