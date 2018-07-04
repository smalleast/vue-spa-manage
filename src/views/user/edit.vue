<template>
    <div class="user-edit">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;"><span class="red-font">*</span>用户名称</p>
            <el-input v-model="user.userName"></el-input>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;"><span class="red-font">*</span>用户手机号</p>
            <el-input v-model="user.mobilePhone" placeholder="11位数字"></el-input>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;"><span class="red-font">*</span>用户密码</p>
            <el-input v-model="user.password"></el-input>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;">用户邮箱</p>
            <el-input v-model="user.email"></el-input>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;">用户角色</p>
            <el-tree
                v-if="!loading"
                :data="roles"
                :props="props"
                node-key="id"
                :default-checked-keys="user.roleIdList"
                @check-change="handleCheckChange"
                show-checkbox>
            </el-tree>
        </div>
        <div style="margin-bottom:20px;">
            <p style="margin-bottom:10px;">首页 iframe url</p>
            <el-input v-model="user.iframeUrl" type="textarea"></el-input>
        </div>
        <div style="margin-bottom:20px;">
            <el-button class="editor-btn" type="primary" @click="submit">保存</el-button>
            <el-button class="editor-btn" type="default" @click="goList">返回</el-button>
        </div>
    </div>
</template>
<script>

    export default{
        data(){
            return {
                user:{
                    userName:'',
                    mobilePhone:'',
                    password:'',
                    email:'',
                    roleIdList:[]
                },
                roles:[],
                props:{
                    label:'roleName',
                    children:'children'
                },
                loading:true
            }
        },
        methods: {
            submit(){

            },
            getAllRoles(){

            },
            handleCheckChange(val,checked){

            },
            goList(){
                this.$router.go(-1);
            },
        },
        created(){
            if(this.$route.query.id){
                api.users.getUser(this.$route.query.id)
                    .then((res)=>{
                        res.roleIdList = Array.from(new Set(res.roleIdList));
                        this.user = res;
                        this.loading = false;
                    });
            }else{
                this.loading = false;
            }
            this.getAllRoles();
        }
    }
</script>
<style scoped>
    .user-edit{
        width:600px;
    }
</style>
