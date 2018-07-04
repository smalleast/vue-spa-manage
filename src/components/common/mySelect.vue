<template>
    <el-select v-model="selectValue" :clearable="true" :placeholder="placeholder">
        <el-option
            v-for="choice in choices"
            :key="choice[valueStr]"
            :label="choice.label||choice.name"
            :value="choice[valueStr]"
        >
        </el-option>
    </el-select>
</template>
<style>

</style>
<script>
    export default {
        props: {
            choices: {
                type: Array,
                required: true
            },
            selected: {
                required: true
            },
            placeholder: {
                type: String,
            },
            filterType: {
                type: String
            },
            valueStr: {
                type: String,
                default: 'id'
            }
        },
        data(){
            return {
                selectValue: isNaN(Number(this.selected)) ? this.selected : Number(this.selected),
            }
        },
        watch: {
            selectValue: {
                handler: function (val) {
                    this.$emit('selectChange', this.filterType, val);
                },
                deep: true
            },
        },
    }
</script>
