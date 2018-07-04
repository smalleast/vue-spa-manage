<template>
    <MyLayout :bottom="false">
        <div class="col"></div>
        <section class="steps"
                 v-for="(item,index) in lists"
                 :key="index"
                 :active="activeIndex>=item.id">
            <div class="steps-hd f16">
                {{item.title}}
            </div>
            <div class="steps-bd mt10">
                <MyLayout>
                    <div class="left number">{{index+1}}</div>
                    <div class="center dot pl10 pr5" v-if="(index+1)<8">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </MyLayout>
            </div>
            <div class="steps-fd" :active="activeIndex===item.id">
            </div>
        </section>
        <div class="col"></div>
    </MyLayout>

</template>

<script>
    import {MyLayout} from "../../components/common";

    export default {
        data() {
            return {

            }
        },
        props: {
            lists: {
                type: Array
            },
            activeIndex: {
                type: [String, Number]
            }
        },
        components: {
            MyLayout
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .steps {
        &[active=true] {
            .steps {
                &-hd {
                    color: #4d7cfe;
                }
                &-bd {
                    .number {
                        background: #4d7cfe;
                        border: transparent;
                        color: #fff;
                    }
                    .dot {
                        > span {
                            background: #4d7cfe;
                        }
                    }
                }
                &-fd {
                    &[active=true] {
                        visibility: visible;
                    }
                }
            }
        }
        &-hd {
            color: #35383f;
        }
        &-bd {
            .number {
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: #fff;
                border: 1px solid #a5a9b4;
                border-radius: 100%;
                font-size: 26px;
                color: #bfbfbf;
            }
            .dot {
                > span {
                    width: 6px;
                    height: 6px;
                    display: inline-block;
                    background: #a5a9b4;
                    border-radius: 100%;
                    margin-right: 5px;
                }
            }
        }
        &-fd {
            width: 0;
            height: 0;
            display: inline-block;;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-bottom: 10px solid #fff;
            margin-bottom: -3px;
            margin-left: 10px;
            visibility: hidden;
        }
    }
</style>
