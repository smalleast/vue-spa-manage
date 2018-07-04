<template>
    <div class="user-edit">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 个人信息</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;">旧密码</p>
            <el-input v-model="user.password" type="password"></el-input>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;">新密码</p>
            <el-input v-model="user.newPassword" type="password"></el-input>
        </div>
        <div style="margin-bottom:20px;">
            <el-button class="editor-btn"  type="primary" @click="submit">保存</el-button>
            <el-button type="success">成功按钮</el-button>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                user:{
                    password:'',
                    newPassword:'',
                },
                loading:true
            }
        },
        methods: {
            submit() {
            }
        }
    }
</script>
<style scoped>
    .user-edit{
        width:600px;
    }
</style>
