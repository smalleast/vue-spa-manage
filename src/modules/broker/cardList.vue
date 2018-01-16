<template>
    <div class="bank-cards">
        <div class="bank-card-info" v-for="card in items">
            <p>
                <span class="label">卡号:</span>
                <span>{{card.cardNum}}</span>
            </p>
            <p>
                <span class="label">开户行:</span>
                <span>{{card.bankName}}</span>
            </p>
            <p>
                <span class="label">开户人:</span>
                <span>{{card.cardholderName}}</span>
            </p>
            <p>
                <span class="label">预留手机号:</span>
                <span>{{card.reserveMobilePhone}}</span>
            </p>
        </div>
    </div>
</template>
<script>
    import $api from '../../components/services/api'

    export default{
        data(){
            return {
                items:[],
            }
        },
        methods:{
            getItem(){
                $api.brokers('get','',`${this.$route.params.userId}/bank_cards`)
                    .then((res)=>{
                        this.items = res.data;
                    });
            }
        },
        created(){
            this.getItem();
        }
    }
</script>
<style scoped type="text/scss" lang="scss">
    .bank-cards{
        width:600px;
        .bank-card-info{
            margin-top:20px;
            padding:20px;
            background-color:#d7d7d7;
            p{
                line-height:20px;
                span{
                    font-size:14px;
                    color:#434343;
                }
            }
        }
    }
</style>
