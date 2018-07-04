<template>
    <div class="my-default c-8" v-if="!lists||lists.length===0">
        暂无数据
    </div>
</template>

<script>
    export default {
        props: {
            lists: {
                type: Array
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-default {
        border: 1px solid #e4e4e4;
        border-radius: 3px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
</style>
