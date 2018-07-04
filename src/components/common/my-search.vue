<template>
    <div class="my-search">
        <el-input v-model="keyword" :placeholder="placeholder" class="handle-input" :icon="keyword?'close':''"
                  @keyup.enter.native="search" :on-icon-click="clearKeyword" icon="search">
        </el-input>
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
                // this.keyword ='';
                this.$nextTick(()=>{
                    this.search();
                });
            }
        },
        watch: {
            keyword: function (val){
                this.$emit('input',val);
                //this.search();
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
    .my-search {
        display: inline-block;
        position:relative;
        .handle-input {
            width: 300px;
            display: inline-block;
        }
    }
</style>
