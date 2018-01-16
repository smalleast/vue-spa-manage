<template>
    <el-pagination
            :layout="this.$store.getters.pagination.layout"
            :page-sizes="this.$store.getters.pagination.pageSizes"
            :page-size="Number(filter.pageSize)"
            :current-page="Number(filter.pageIndex)"
            :total="total"
            @current-change="currentChange"
            @size-change="sizeChange">
    </el-pagination>
</template>
<script>
    import {$api} from './index'
    import $utils from '../services/utils'

    export default {
        data() {
            return {}
        },
        props: {
            total: {
                type: Number,
                default: 1
            },
            api: {
                type: String
            },
            inApi: {
                type: String
            },
            filter: {
                type: Object
            },
            uploadHref:{
                type:Boolean,
                default:true
            }
        },
        methods: {
            fetchData() {
                this.uploadHref&&$utils.updateLocationHref(this.filter);
                $api[this.api]('get', this.filter,this.inApi).then(res => {
                    this.item = res.data;
                    this.$emit('setItem', this.item)
                })
            },
            currentChange(index) {
                this.filter.pageNum = index || 1;
                this.fetchData();
            },
            sizeChange(size) {
                this.filter.pageSize = size || 20;
                this.fetchData();
            }
        },
        created() {
            this.fetchData();
        },
        filters: {}

    }
</script>
<style type="text/scss" lang="scss">

</style>
