<template>
    <MyLayout class="my-status"
              :status="status"
              :bottom="false">
        <div class="my-status-left"></div>
        <div class="my-status-right">
            <slot>
                {{value}}
            </slot>
        </div>
    </MyLayout>
</template>

<script>
    import {MyLayout} from './index'

    export default {
        props: {
            value: [String, Number],
            status: [String, Number],
        },
        components: {
            MyLayout
        },
        methods: {
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-status {
        min-width: 100px;
        &-left {
            display: inline-block;
            width: 0;
            height: 0;
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            border-right: 12px solid #ddd;
        }
        &-right {
            background: #ddd;
            color: #333;
            height: 24px;
            line-height: 25px;
            font-size: 12px;
            padding-left: 10px;
            padding-right: 10px;
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
        &[status='blue'] {
            .my-status {
                &-left {
                    border-right: 12px solid #d9e8ff;
                }
                &-right {
                    background: #d9e8ff;
                    color: #4d7cfe;
                }
            }
        }
        &[status='green'] {
            .my-status {
                &-left {
                    border-right: 12px solid #ffeed4;
                }
                &-right {
                    background: #ffeed4;
                    color: #e2a54a;
                }
            }
        }
        &[status='red'] {
            .my-status {
                &-left {
                    border-right: 12px solid #fad6d6;
                }
                &-right {
                    background: #fad6d6;
                    color: #ff4f4d;
                }
            }
        }
    }
</style>
