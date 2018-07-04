<template>
    <div class="my-contract cursor" v-if="item" @click="download(item.key)">
        <slot>
            <div class="f20 c-37 bold">
                {{text}}
            </div>
            <div class="c-blue f14 mt10 link">
                {{item.name}}
            </div>
        </slot>
    </div>
</template>

<script>
    import {$app} from './index'

    export default {
        props: {
            item: {
                type: [String, Number, Object]
            },
            text: {
                type: [String],
                default: '合同信息'
            }
        },
        methods: {
            download(key) {
                $app.downloadFileByKey(key)
                    .then((res) => {
                        if (res !== 'success') {
                            this.$message.error('下载失败');
                        }
                    });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-contract {
        display: inline-block;
    }
</style>
