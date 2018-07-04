<template>
    <section class="my-layout" :class="bottom?'mb10':''">
        <div class="row row-no-padding" :class="[center?'row-center':'',className]">
            <div class="c-red pl5 pr5 pt5" v-if="red">*</div>
            <slot name="left">
                <div v-if="label" class="f14 c-3 wsn left" :left="left">
                    {{label}}
                </div>
            </slot>
            <slot name="center"></slot>
            <slot name="right"></slot>
            <slot></slot>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            red: {
                type: Boolean,
                default: false
            },
            center: {
                type: Boolean,
                default: true
            },
            className: {
                type: String,
                default: ''
            },
            left: {
                type: Boolean,
                default: false
            },
            bottom: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-layout {
        .row {
            .left {
                &[left=true] {
                    min-width: 100px;
                }
            }
        }
    }
</style>
