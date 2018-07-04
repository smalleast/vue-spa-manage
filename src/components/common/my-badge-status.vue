<template>
    <section class="my-badge-status tc c-red">
        <slot>{{value}}</slot>
    </section>
</template>

<script>
    export default {
        props: {
            value: [String, Number]
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-badge-status {
        min-width: 22px;
        height: 22px;
        line-height: 20px;
        border: 1px solid #ff4f4d;
        border-radius: 20px;
        font-size: 12px;
        padding-left: 8px;
        padding-right: 8px;
    }
</style>
