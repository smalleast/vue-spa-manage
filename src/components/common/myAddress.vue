<template>
    <div class="address">
        <el-select name="province" @change="changeProvince" v-model="provinceId">
            <el-option :value="p.id" :key="p.id" :label="p.name" v-for="p in locations"></el-option>
        </el-select>
        <el-select name="city" @change="changeCity" v-model="cityId">
            <el-option :value="c.id" :key="c.id" :label="c.name" v-for="c in cityData"></el-option>
        </el-select>
        <el-select name="zone" @change="changeLocation"  v-model="locationId">
            <el-option :value="z.id" :key="z.id" :label="z.name" v-for="z in zoneData"></el-option>
        </el-select>
    </div>
</template>
<script>
    import api from '../../api'
    import {mapGetters} from 'vuex'
    export default{
        data(){
            return {
                provinceId: '',
                cityId: '',
                locationId: '',
                cityData: [],
                zoneData: [],
            }
        },
        props:{
            value:{
                type:String|Number
            }
        },
        computed:{
            ...mapGetters(['locations'])
        },
        watch:{
            'locations':function(){
                if(this.value!=undefined){
                    this.initAddress();
                }
            },
            'value':function(){
                console.log(this.value);
            }
        },
        methods:{
            initAddress(){
                this.locations.forEach((province) => {
                    province.cities.forEach((city) => {
                        city.cities.forEach((zone)=>{
                            if(zone.id == this.value) {
                                this.provinceId = province.id;
                                this.cityDate = province.cities;
                                this.zoneDate = city.cities;
                                this.cityId = city.id;
                                this.locationId = zone.id;
                            }
                        });
                    });
                });
            },
            changeProvince(pid){
                this.cityId = '';
                this.locationId = '';
                this.changeLocation(this.locationId);
                this.locations.forEach((province) => {
                    if (province.id == pid) {
                        this.cityData = province.cities;
                    }
                });
            },
            changeCity(cid){
                this.cityData.forEach((city) => {
                    if (city.id == cid) {
                        this.zoneData = city.cities;
                    }
                });
            },
            changeLocation(val){
                this.$emit('input',val);
            },
        },
        created(){
            console.log(111);
            if(!this.$store.state.locations){
                this.$store.dispatch('getLocations');
            }
        },
    }
</script>
<style scoped>
    .address{
       display:inline-block;
    }
</style>
