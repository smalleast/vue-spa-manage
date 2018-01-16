<template>
    <div class="search-box">
        <el-input v-model="keyword" :placeholder="placeholder" class="handle-input" :icon="keyword?'close':''"
                  @keyup.enter.native="search" :on-icon-click="clearKeyword">
        </el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                keyword: ''
            }
        },
        methods: {
            search(){
                this.$emit('search');
            },
            clearKeyword(){
                this.keyword ='';
                this.$nextTick(()=>{
                    this.search();
                });
            }
        },
        watch: {
            keyword: function (val){
                this.$emit('input',val);
            },
            value: function (val) {
                this.keyword = val || '';
            }
        },
        props: {
            placeholder: {
                type: String,
                default: '请输入关键词'
            },
            value: {
                type: String
            },
        },
        created(){
            this.keyword = this.value;
        }
    }
</script>
<style scoped type="text/scss" lang="scss">
    .search-box {
        display: inline-block;
        position:relative;
        .handle-input {
            width: 300px;
            display: inline-block;
        }
    }
</style>
