<template>
    <section class="my-number tc c-blue">
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
    .my-number {
        min-width: 20px;
        height: 20px;
        line-height: 20px;
        border: 1px solid #4d7cfe;
        border-radius: 100%;
        font-size: 13px;
    }
</style>
