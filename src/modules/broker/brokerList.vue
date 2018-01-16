<template>
    <div class="broker-list">
        <div class="hd mb20">
            <my-search-box v-model="filter.keyword" placeholder="请输入推客姓名、手机号" @search="getList"></my-search-box>
        </div>
        <el-table ref="multipleTable" tooltip-effect="dark" :data="item.list" border fit
                  highlight-current-row>
            <el-table-column label="姓名" min-width="180" prop="realName" align="center">
                <template scope="scope">
                    <div class="avatar-name">
                        <avatar :src="scope.row.avatarFile.key|toImg" size="50px" radius="50%" v-if="scope.row.avatarFile"></avatar>
                        <div class="avatar" style="width:40px;height:40px;" v-else>
                        </div>
                        <span class="name">{{scope.row.realName}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="手机号" min-width="120" prop="mobilePhone" align="center">
            </el-table-column>
            <el-table-column label="注册时间" min-width="200" prop="createTime" align="center">
                <template scope="scope">
                    {{scope.row.createTime|dateTime}}
                </template>
            </el-table-column>
            <el-table-column label="推荐客户数量" min-width="150" prop="customerCount" align="center">
            </el-table-column>
            <el-table-column label="客户项目数量" min-width="150" prop="projectCount" align="center">
            </el-table-column>
            <el-table-column label="操作" min-width="180" align="center">
                <template slot-scope="scope">
                    <router-link :to="'/broker/detail/'+scope.row.id">
                        <el-button type="primary" size="small">查看详情</el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <Pagination ref="page" :total="item.total" :api="'brokers'" :filter="filter" :inApi="'development_brokers'"
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
                    keyword:'',
                    userId:this.$route.params.userId
                }
            }
        },
        methods: {
            getList(){
                $api.brokers('get',this.filter,'development_brokers').then((res) => {
                    this.item = res.data;
                });
            },
            fetchData(item) {
                this.item = item;
            },
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

