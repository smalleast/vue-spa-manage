<template>
    <section class="my-badge">
        <el-badge :value="text" :max="max" class="my-badge-item f18 c-37" :is-dot="dot" >
            <slot></slot>
        </el-badge>
    </section>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            text: {
                type: [String, Number],
            },
            max: {
                type: [String, Number]
            },
            dot:{
                type: Boolean,
                default: false,
            },
        },
        created() {

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
.my-badge{
    &-item{
        margin-top: 10px;
        margin-right: 40px;
    }
    .el-badge__content.is-dot{
        background: #25CE71;
    }
    .el-badge__content.is-dot{
        width: 12px;
        height: 12px;
    }
    .el-badge__content.is-fixed.is-dot{
        right: -6px;
    }
}
</style>
