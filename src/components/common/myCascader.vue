<template>
    <el-cascader
        expand-trigger="hover"
        :options="choices"
        v-model="selectValue"
        :show-all-levels="false"
        :change="changeOnSelect"
        :placeholder="placeholder"
        :clearable="clearable"
    >
        <!--:clearable="selectValue!=0?true:false"-->
    </el-cascader>
</template>
<style>

</style>
<script>
    import {mapGetters} from 'vuex'
    export default {
        props: {
            choices: {
                type: Array,
                required: true
            },
            selected: {
                required: true
            },
            changeOnSelect: {
                type: Boolean,
                default: false
            },
            placeholder: {
                type: String,
            },
            filterType: {
                type: String
            },
            clearable: {
                type: Boolean,
                default: true
            }
        },
        data(){
            return {
                selectValue: this.initSelectValue()
            }
        },
        watch: {
            selectValue: {
                handler: function (val) {
                    this.$emit('selectChange', this.filterType, val.join(','));
                },
                deep: true
            },

        },
        methods:{
            initSelectValue(){
                if(!this.selected){
                    return [0];
                }
                let seletedId = this.selected;
                this.choices.forEach((choice)=>{
                    choice.children.forEach((ch)=>{
                        if(ch.id == seletedId){
                            seletedId = ch.parent+','+seletedId;
                        }
                    });
                });
                console.log(this.selected);
                console.log(seletedId);
                return seletedId.split(',').map(function(id){
                    return Number(id);
                });

            },
        },
        created(){
        }
    }
</script>
