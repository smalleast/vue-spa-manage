<template>
    <div class="my-pagination" v-if="hasPagination">
        <el-pagination
            background
            layout="prev, pager, next"
            @current-change="pageChange"
            :current-page="pageNum"
            :page-size="pageSize"
            :total="totalCot">
        </el-pagination>
    </div>
</template>

<script>
import {$app} from './index'
    export default {
        data() {
            return {
                pageSize: 20,
                pageNum: 1,
                hasPagination: false
            }
        },
        props: {
            total: {
                type: Number
            }
        },
        computed: {
            totalCot: function () {
                if (this.total > -1) {
                    return this.total
                } else {
                    return 200000
                }
            }
        },
        created() {
            this.$nextTick(function () {
                let search = $app.getLocationSearch();
                this.pageNum = search.pageNum;
            })
        },

        beforeUpdate() {
            // console.log('beforeUpdate');
            let search = $app.getLocationSearch();
            this.pageNum = search.pageNum;
        },

        beforeDestroy() {
            // console.log('beforeDestroy');
        },
        methods: {
            pageChange(pageNum) {
                this.pageNum = pageNum;
                this.$emit('handleCurrentChange', this.pageNum)
            }
        },
        watch: {
            totalCot: function (curVal, oldVal) {
                if (curVal > 0 && curVal < 200000) {
                    this.hasPagination = true;
                } else {
                    this.hasPagination = false;
                }

            }
        }
    }
</script>
<style rel="stylesheet/scss" lang="scss">
    .my-pagination {
        text-align: center;
        padding-top: 20px;
    }
</style>
