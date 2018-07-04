<template>
    <section class="order-ship">
        <div class="order-ship-hd">
            <MyLayout>
                <div class="left f18 bold c-3 pr10">发货管理</div>
                <div class="right f12 c-6">(待质检：10件，待发货：13件)</div>
            </MyLayout>
            <div class="mt10 c-red f12">
                生产完成的产品需要通过住逻辑质检，才能正式发货
            </div>
            <MyLayout label="订单号：" class="mt10">
                123456789
            </MyLayout>
        </div>
        <div class="order-ship-bd">
            <div v-for="(topItem,topIndex) in lists" :key="topIndex">
                <div class="ship-list-line mt40 "></div>
                <div class="pl10 mt20">
                    <el-checkbox v-model="topItem.active" @change="handleChangeTop(topItem)">
                        {{topItem.title}}：{{topItem.qtr}}件
                    </el-checkbox>
                </div>
                <div class="mt10">
                    <div class="ship-list mb15" v-for="(item,index) in topItem.list" :key="index">
                        <div class="ship-list-title pl10">
                            <el-checkbox v-model="item.active" @change="handleChangeParent(item,topItem)">
                                交付时间：{{item.date}}
                            </el-checkbox>
                        </div>
                        <div class="ship-list-content py10" v-for="(childItem,childIndex) in item.list"
                             :key="childIndex">
                            <MyLayout :bottom="false">
                                <div class="pl10">
                                    <el-checkbox v-model="childItem.active"
                                                 @change="handleChangeItem(item,topItem)"></el-checkbox>
                                </div>
                                <div class="col-20">
                                    <MyPhoto
                                        border
                                        size="min"
                                        :item="childItem.coverFile&&childItem.coverFile.key"></MyPhoto>
                                    <div class="f16 c-6 tc mt10">
                                        {{childItem.name}}
                                    </div>
                                </div>
                                <div class="col-40">
                                    <MyLayout label="尺寸：" :bottom="false">
                                        {{childItem.size}}
                                    </MyLayout>
                                    <MyLayout label="材质：" :bottom="false">
                                        {{childItem.material}}
                                    </MyLayout>
                                    <MyLayout label="备注：" :bottom="false">
                                        {{childItem.remark}}
                                    </MyLayout>
                                </div>
                                <div class="col-10">
                                    {{childItem.qtr}}
                                </div>
                                <div class="col tc">
                                    生产完成
                                </div>
                            </MyLayout>
                        </div>
                    </div>
                </div>
                <div class="mt10">
                    <MyButton type="primary" width="mini" v-if="topIndex===0">
                        <div class="f14">
                            申请质检
                        </div>
                    </MyButton>
                    <MyButton type="primary" width="mini" v-if="topIndex===1">
                        <div class="f14">申请发货</div>
                    </MyButton>
                </div>
            </div>
        </div>
        <div class="wp-bottom-h"></div>
    </section>
</template>

<script>
    import {MyLayout, MyPhoto, MyButton} from "../../components/common";

    export default {
        data() {
            return {
                topChecked: false,
                lists: [
                    {
                        title: '待质检',
                        qtr: 23,
                        active: false,
                        list: [
                            {
                                date: '2018-09-24',
                                active: false,
                                list: [
                                    {
                                        "id": 7,
                                        "finalPrice": 100,
                                        "name": "三人沙发",
                                        "coverFile": {
                                            "id": 7884,
                                            "name": "46.png",
                                            "key": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "keyTwo": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "src": null,
                                            "size": null,
                                            "price": 0,
                                            "downloads": 0,
                                            "type": 1,
                                            "height": 1416,
                                            "width": 3000,
                                            "suffix": "png",
                                            "imageLabels": null
                                        },
                                        "material": "桦木+布艺",
                                        "size": "W2400×D900×H880",
                                        "remark": null,
                                        "qtr": 20,
                                        "productPrice": 2000,
                                        active: false
                                    },
                                    {
                                        "id": 7,
                                        "finalPrice": 100,
                                        "name": "三人沙发",
                                        "coverFile": {
                                            "id": 7884,
                                            "name": "46.png",
                                            "key": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "keyTwo": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "src": null,
                                            "size": null,
                                            "price": 0,
                                            "downloads": 0,
                                            "type": 1,
                                            "height": 1416,
                                            "width": 3000,
                                            "suffix": "png",
                                            "imageLabels": null
                                        },
                                        "material": "桦木+布艺",
                                        "size": "W2400×D900×H880",
                                        "remark": null,
                                        "qtr": 20,
                                        "productPrice": 2000,
                                        active: false
                                    }
                                ]
                            },
                            {
                                date: '2018-09-25',
                                active: false,
                                list: [
                                    {
                                        "id": 7,
                                        "finalPrice": 100,
                                        "name": "三人沙发",
                                        "coverFile": {
                                            "id": 7884,
                                            "name": "46.png",
                                            "key": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "keyTwo": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "src": null,
                                            "size": null,
                                            "price": 0,
                                            "downloads": 0,
                                            "type": 1,
                                            "height": 1416,
                                            "width": 3000,
                                            "suffix": "png",
                                            "imageLabels": null
                                        },
                                        "material": "桦木+布艺",
                                        "size": "W2400×D900×H880",
                                        "remark": null,
                                        "qtr": 20,
                                        "productPrice": 2000,
                                        active: false
                                    },
                                    {
                                        "id": 7,
                                        "finalPrice": 100,
                                        "name": "三人沙发",
                                        "coverFile": {
                                            "id": 7884,
                                            "name": "46.png",
                                            "key": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "keyTwo": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "src": null,
                                            "size": null,
                                            "price": 0,
                                            "downloads": 0,
                                            "type": 1,
                                            "height": 1416,
                                            "width": 3000,
                                            "suffix": "png",
                                            "imageLabels": null
                                        },
                                        "material": "桦木+布艺",
                                        "size": "W2400×D900×H880",
                                        "remark": null,
                                        "qtr": 20,
                                        "productPrice": 2000,
                                        active: false
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        title: '待发货',
                        qtr: 23,
                        active: false,
                        list: [
                            {
                                date: '2018-09-24',
                                active: false,
                                list: [
                                    {
                                        "id": 7,
                                        "finalPrice": 100,
                                        "name": "三人沙发",
                                        "coverFile": {
                                            "id": 7884,
                                            "name": "46.png",
                                            "key": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "keyTwo": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "src": null,
                                            "size": null,
                                            "price": 0,
                                            "downloads": 0,
                                            "type": 1,
                                            "height": 1416,
                                            "width": 3000,
                                            "suffix": "png",
                                            "imageLabels": null
                                        },
                                        "material": "桦木+布艺",
                                        "size": "W2400×D900×H880",
                                        "remark": null,
                                        "qtr": 20,
                                        "productPrice": 2000,
                                        active: false
                                    },
                                    {
                                        "id": 7,
                                        "finalPrice": 100,
                                        "name": "三人沙发",
                                        "coverFile": {
                                            "id": 7884,
                                            "name": "46.png",
                                            "key": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "keyTwo": "7169ace9-2151-a660-c66a-6b5179649e7e?x-oss-process=style/w660",
                                            "src": null,
                                            "size": null,
                                            "price": 0,
                                            "downloads": 0,
                                            "type": 1,
                                            "height": 1416,
                                            "width": 3000,
                                            "suffix": "png",
                                            "imageLabels": null
                                        },
                                        "material": "桦木+布艺",
                                        "size": "W2400×D900×H880",
                                        "remark": null,
                                        "qtr": 20,
                                        "productPrice": 2000,
                                        active: false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            MyLayout, MyPhoto, MyButton
        },
        methods: {
            handleChangeTop(topItem) {
                topItem.list.map(item => {
                    item.active = topItem.active;
                    item.list.map(childItem => {
                        childItem.active = item.active
                    })
                })
            },
            handleChangeParent(parentItem, topItem) {
                parentItem.list.map(item => {
                    item.active = parentItem.active
                });
                this.checkTop(topItem);
            },
            handleChangeItem(parentItem, topItem) {
                let childItem = parentItem.list.filter(item => !item.active);
                parentItem.active = childItem.length === 0;
                this.checkTop(topItem);
            },
            checkTop(topItem) {
                let childItem = topItem.list.filter(item => !item.active);
                topItem.active = childItem.length === 0;
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .order-ship {
        &-hd {

        }
        &-bd {
            .ship-list {
                border: 1px solid #d6d8db;
                &-title {
                    height: 40px;
                    line-height: 40px;
                    background: #f5f6fa;
                }
                &-content {
                    border-top: 1px solid #e1e2e5;
                }
                &-line{
                    border-top: 1px solid #e1e2e5;
                }
            }
        }
    }
</style>
