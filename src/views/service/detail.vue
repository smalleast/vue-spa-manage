<template>
    <section class="service-detail">
        <div class="service-detail-hd">
            <MyLayout>
                <div class="left col c-37 f22">售后申请</div>
                <div class="center tr pr30">
                    <MyLayout>
                        <div class="f14 c-a5">
                            采购单号：
                        </div>
                        <div class="c-a5 f14">
                            {{ detailList.purchaseOrderCode }}
                        </div>
                    </MyLayout>
                </div>
                <div class="right tr pr20">
                    <MyLayout>
                        <div class="f14 c-a5">
                            项目名称：
                        </div>
                        <div class="c-a5 f14">
                            {{ detailList.orderName }}
                        </div>
                    </MyLayout>
                </div>
            </MyLayout>
        </div>
        <div class="service-detail-bd">
            <div class="mt20 service-detail-item">
                <el-table
                    :data="tableData"
                    class="no-hover">
                    <el-table-column
                        label="产品"
                        width="160">
                        <template slot-scope="scope">
                            <div class="p10">
                                <MyLayout :bottom="false">
                                    <MyPhoto border :item="imgKey" size="min"></MyPhoto>
                                </MyLayout>
                                <div class="mt10 c-37">
                                    {{ product.name }}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="规格">
                        <template slot-scope="scope">
                            <MySpecs :item="product"></MySpecs>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="生产资料">
                        <template slot-scope="scope">
                            <MyMaterials :lists="product.productionDataList"></MyMaterials>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="单价"
                        width="160">
                        <template slot-scope="scope">
                            <div class="c-d1">
                                {{ product.unitPrice | currency('¥', '2')}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="数量" width="100">
                        <template slot-scope="scope">
                            {{ product.num }}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="mt30 pl20">
                    <MyLayout :center="false">
                        <div class="f16 c-37 pr10">
                            问题描述：
                        </div>
                        <div class="f16 c-37 col-80">
                            <div class="content">
                                {{ detailList.remark }}
                            </div>
                            <div class="mt20">
                                <myLayout>
                                    <MyPhoto border :item="item.key" size="max" class="mr20"
                                             v-for="(item, index) in detailList.images" :key="index"></MyPhoto>
                                </myLayout>
                            </div>
                        </div>
                    </MyLayout>
                </div>
            </div>
            <div class="wp-bottom-h"></div>
        </div>
    </section>
</template>

<script>
    import {
        $api,
        nxStore,
        MyLayout,
        MyBadgeStatus,
        MyPhoto,
        MyInput,
        MyButton,
        MyMaterials,
        MySpecs
    } from "../../components/common/index";

    export default {
        data() {
            return {
                tableData: [{
                    src: 'product_image/cpeb27f0405d2b47d08751faa8d01a799c',
                    name: '现代双人沙发',
                    size: '100*100',
                    caizi: '纯棉/不锈钢',
                    remark: '符合人机工程学',
                    draw: '111.zip',
                    price: 0,
                    qtr: 1,
                    time: '2018-08-18',
                    status: '生产完成',
                }],
                stock: {
                    name: '',
                    remark: ''
                },
                imgKey: '',
                detailList: {},
                product: {},
                productionDataList: [],
            }
        },
        components: {
            MyLayout, MyBadgeStatus, MyPhoto, MyInput, MyButton, MyMaterials,MySpecs
        },
        methods: {
            linkOur() {
                alert('联系住逻辑');
            },
            getDetails() {
                $api.after_sale('get', this.$route.params.id, 'details').then(res => {
                    this.detailList = res;
                    this.product = res.product;
                    this.imgKey = res.product.coverFile.key;
                    this.productionDataList = res.product.productionDataList;
                })
            }
        },
        created() {
            this.getDetails();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
