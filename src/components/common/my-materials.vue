<template>
    <section class="my-materials py10">
        <div v-for="(item,index) in lists" :key="index">
            <div v-if="item.type===5" class="mb10">
                <MyLayout :bottom="false" :center="false">
                    <div class="left f12 c-3">图纸：</div>
                    <div class="right">
                        <div v-if="item.display!='已确认'" class="f12 c-8">{{item.display}}</div>
                        <div v-for="(childItem,childIndex) in item.materialFile" :key="childIndex">
                            <MyContract :item="childItem.colorOrMaterial">
                                <div class="link draw lc-1 ">
                                    {{childItem.colorOrMaterial&&childItem.colorOrMaterial.name}}
                                </div>
                            </MyContract>
                        </div>
                    </div>
                </MyLayout>
            </div>
            <div v-if="item.type===6" class="mb10">
                <MyLayout :bottom="false" :center="false">
                    <div class="left f12 c-3">色板：</div>
                    <div class="right">
                        <div v-if="item.display!='已确认'" class="f12 c-8">{{item.display}}</div>
                        <div
                            class="mb5"
                            v-for="(childItem,childIndex) in item.materialFile" :key="childIndex">
                            <MyLayout :bottom="false">
                                <MyPhoto
                                    border
                                    :item="childItem.colorOrMaterial&&childItem.colorOrMaterial.key"
                                    size="mini"></MyPhoto>
                                <div class="center pl5">
                                    {{childItem.name}}
                                </div>
                                <div class="right pl5"
                                     v-if="childItem.usePosition">
                                    | {{childItem.usePosition}}
                                </div>
                            </MyLayout>
                        </div>
                    </div>
                </MyLayout>
            </div>
            <div v-if="item.type===7">
                <MyLayout :bottom="false" :center="false">
                    <div class="left f12 c-3">面料：</div>
                    <div class="right">
                        <div v-if="item.display!='已确认'" class="f12 c-8">{{item.display}}</div>
                        <div class="mb5"
                             v-for="(childItem,childIndex) in item.materialFile" :key="childIndex">
                            <MyLayout :bottom="false">
                                <MyPhoto
                                    border
                                    :item="childItem.colorOrMaterial&&childItem.colorOrMaterial.key"
                                    size="mini"></MyPhoto>
                                <div class="center pl5 f12 c-6">
                                    {{childItem.name}}
                                </div>
                                <div class="right pl5 f12 c-6"
                                     v-if="childItem.usePosition">
                                    | {{childItem.usePosition}}
                                </div>
                            </MyLayout>
                        </div>
                    </div>
                </MyLayout>
            </div>
        </div>
    </section>
</template>

<script>
    import {MyLayout, MyContract, MyPhoto} from "./index";

    export default {
        data() {
            return {}
        },
        props: {
            lists: {
                type: Array
            }
        },
        components: {
            MyLayout, MyContract, MyPhoto
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .draw {
        width: 100px;
        overflow: hidden;
    }
</style>
