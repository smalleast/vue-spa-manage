<template>
    <div class="broker-list">
       列表页
    </div>
</template>

<script>
    import {Pagination} from 'components/vue/index';
    import {MySearchBox} from 'components/vue/index';
    import $api from '../../components/services/api'
    import $utils from '../../components/services/utils'
    import {mapGetters} from 'vuex'
    import avatar from 'vue-avatar'
    export default {
        data() {
            return {
                item: {
                    total: undefined,
                },
                filter: {
                    pageNum: 1,
                    pageSize: 20,
                    identityType:'1',
                    keyword:''
                }
            }
        },
        methods: {
            getList(){
                $utils.updateLocationHref(this.filter);
                $api.brokers('get', this.filter).then((res) => {
                    this.item = res.data;
                });
            },
            fetchData(item) {
                this.item = item;
            },
        },
        computed:{
            ...mapGetters([
                'identityTypes'
            ])
        },
        created(){
            this.filter = Object.assign(this.filter,$utils.getLocationSearch());
        },
        components: {
            Pagination,
            MySearchBox,
            avatar
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .broker-list {
        padding: 50px 10px;
    }
</style>

