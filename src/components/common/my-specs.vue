<template>
    <section class="my-specs">
        <MyLayout :bottom="false" :center="false">
            <div class="f12 c-3 wp-warp">
                尺寸：
            </div>
            <div class="f12 c-6 ls1">
                {{ item.size }}
            </div>
        </MyLayout>
        <MyLayout :bottom="false" :center="false" class="mt5">
            <div class="f12 c-3 wp-warp">
                材质：
            </div>
            <div class="f12 c-6 ls1">
                {{ item.material }}
            </div>
        </MyLayout>
        <MyLayout :bottom="false" :center="false" class="mt5">
            <div class="f12 c-3 wp-warp">
                备注：
            </div>
            <div class="f12 c-6 ls1">
                {{ item.remark }}
            </div>
        </MyLayout>
    </section>
</template>

<script>
    import {MyLayout} from '../../components/common/index'

    export default {
        props: {
            item: {
                type: Object
            }
        },
        components: {
            MyLayout
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
