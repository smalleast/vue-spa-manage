<template>
    <div class="container">
        {{}}
        <avatar ></avatar>
    </div>
</template>
<script>
    import Avatar from'vue-avatar'
    export default{
        data(){
            return {}
        },
        props:{
            name:{
                type:String
            }
        }
    }
</script>
<style scoped type="text/scss" lang="scss">

</style>
