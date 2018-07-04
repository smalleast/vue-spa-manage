<template>
    <el-button :type="type"
               :login="login"
               :loading="Loading"
               :size="size"
               :width="width"
               @click="handleClick"
               class="my-button">
        <slot>保存</slot>
    </el-button>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: ''
            },
            login: {
                type: Boolean,
                default: false
            },
            Loading: {
                type: Boolean,
                default: false
            },
            size: {
                type: String,
                default: ''
            },
            width: {
                type: String
            }
        },
        methods: {
            handleClick() {
                this.$emit('click')
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
