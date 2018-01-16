<template>
    <section id="sidebar">
        <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <div v-for="(item,index) in routes" :key="index">
                <router-link :to="{path:item.path}" exact>
                    <el-menu-item :index="index+''">
                        <i class="el-icon-menu"></i>
                        <span slot="title">{{item.name}}</span>
                    </el-menu-item>
                </router-link>
            </div>
        </el-menu>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: 0,
                routes: [
                    {path: '/home', name: '主页'},
                    {path: '/broker/list', name: '管理'}
                ]
            }
        },
        components: {},
        computed: {},
        methods: {},
        created() {
            let _url = this.$route.path;
            if (_url.indexOf('/home') > -1) {
                this.activeIndex = "0";
            }
            else if (_url.indexOf('/broker/') > -1) {
                this.activeIndex = "1";
            }
            else if (_url.indexOf('/customer/') > -1) {
                this.activeIndex = "2";
            }
            else if (_url.indexOf('/customerProject/') > -1) {
                this.activeIndex = "3";
            }
            else if (_url.indexOf('/project/') > -1) {
                this.activeIndex = "4";
            }
            else if (_url.indexOf('/withdrawals/') > -1) {
                this.activeIndex = "5";
            }
            else if (_url.indexOf('/organization/') > -1) {
                this.activeIndex = "6";
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .el-menu {
        min-height: 100%;
    }


</style>
