<template>
    <section class="my-tabs mt20">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :name="item.value+''" v-for="(item,index) in lists"
                         :key="index">
                <div slot="label" class="tc">
                    <div class="pr2 f18 tab-item dib">{{item.key}}</div>
                    <MyNumber v-if="item.qtr" class="dib">{{item.qtr}}</MyNumber>
                </div>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import {MyLayout, MyNumber} from './index'

    export default {
        data() {
            return {
                activeName: '-1'
            }
        },
        props: {
            lists: {
                type: [String, Array, Object]
            }
        },
        components: {
            MyLayout,
            MyNumber,
        },
        methods: {
            handleClick(tab, event) {
                // console.log(tab);
            }
        },
        watch: {
            activeName(curVal) {
                this.$emit('success', curVal)
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .el-tabs {
        &__item.is-active {
            color: #4d7cfe;
        }
        &__item {
            padding: 0;
            width: 120px;
            //border-right: 1px solid red;
        }
    }

    .my-tabs {
        &-number {
            width: 20px;
        }
    }
</style>
