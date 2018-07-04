<template>
    <div class="my-input" :require="required&&!inputValue">
        <slot>
            <el-input v-model="inputValue" :maxlength="maxlength"
                      :type="type"
                      :size="size"
                      :rows="rows"
                      @change="handleChange" :placeholder="placeholder"></el-input>
        </slot>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: {
            required: {
                type: Boolean,
                default: false
            },
            value: {
                type: [String, Number]
            },
            placeholder: {
                type: String,
                default: '请输入内容'
            },
            type: {
                type: String,
                default: 'text'
            },
            size: {
                type: String,
                default: 'small'
            },
            maxlength: {
                type: [String, Number]
            },
            rows: {
                type: [String, Number]
            }
        },
        computed: {
            inputValue: {
                get: function () {
                    return this.value
                },
                set: function (newValue) {
                    return newValue
                }
            }
        },
        methods: {
            handleChange(item) {
                this.$emit('input', item);
                this.$emit('success');
            }
        },
        watch: {}
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .my-input {
        &[require=true] {
            border: 1px solid #f00;
            padding: 5px;
            border-radius: 5px;
            display: inline-block;
        }
    }
</style>
