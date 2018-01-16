<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left"
                 label-width="0px"
                 class="card-box login-form">
            <el-row type="flex" justify="center" align="middle" class="el-row-1">
                <el-col :span="7" class="tc col-logo">
                    <img :src="logoImg" class="logo-img" alt="">
                </el-col>
                <el-col :span="12" class="tc">
                    <output class="login-title">分享家</output>
                </el-col>

            </el-row>

            <el-form-item prop="userName">
                <i class="iconfont icon-people"></i>
                <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="帐号"/>
            </el-form-item>
            <el-form-item prop="password">
                <i class="iconfont icon-lock"></i>
                <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                          autoComplete="on"
                          placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>

            </el-form-item>
            <output class="tips">
                帐号由【住逻辑】提供，欢迎致电400-998-0137
            </output>
        </el-form>
    </div>
</template>

<script>
    import {$api} from '../../components/vue/index'
    import loginLogo from '../../assets/images/logo-03.png'

    export default {
        name: 'login',
        data() {
            const validateUserName = (rule, value, callback) => {
                if (!value || !value.trim()) {
                    console.log(value)
                    callback(new Error('请输入账号'))
                } else {
                    callback()
                }
            };
            const validatePass = (rule, value, callback) => {
                if (!value || value.length < 6) {
                    callback(new Error('密码不能小于6位'))
                } else {
                    callback()
                }
            };
            return {
                loginForm: {
                    userName: '',
                    password: ''
                },
                loginRules: {
                    userName: [{required: true, trigger: 'blur', validator: validateUserName}],
                    password: [{required: true, trigger: 'blur', validator: validatePass}]
                },
                loading: false,
                logoImg: loginLogo
            }
        },
        methods: {
            handleLogin() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        $api.login('post', {userName: this.loginForm.userName, password: this.loginForm.password}).then(res => {
                            this.loading = false;
                            this.$router.push(this.$route.query.redirect || {path: '/home'});
                        })
                    } else {
                        return false
                    }
                })
            }
        },
        created() {
        }
    }
</script>

<style type="text/scss" lang="scss">
    @import "../../components/styles/mixin";

    $bg: #2d3a4b;
    $dark_gray: #889aa4;
    $light_gray: #eee;
    .login-container {
        @include relative;
        height: 100vh;
        background-color: $bg;
        z-index: 10;

        input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px #293444 inset !important;
            -webkit-text-fill-color: #fff !important;
        }

        input {
            background: transparent;
            border: 0;
            -webkit-appearance: none;
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
        }

        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }

        .tips {
            font-size: 14px;
            color: #fff;
            margin-bottom: 10px;
            width: 100%;
            text-align: center;
            display: inline-block
        }

        .svg-container {
            padding: 6px 5px 6px 15px;
            color: $dark_gray;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
            &_login {
                font-size: 20px;
            }
        }

        .login-form {
            position: absolute;
            left: 0;
            right: 0;
            width: 400px;
            padding: 35px 35px 15px 35px;
            margin: 120px auto;
        }

        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            color: $dark_gray;
            cursor: pointer;
        }

        .thirdparty-button {
            position: absolute;
            right: 35px;
            bottom: 28px;
        }

    }

    .icon {
        &-people,
        &-lock {
            color: #fff;
            margin-left: 8px;
        }

    }

    .logo-img {
        height: 36px;
        position: relative;
        top: 2px;
    }

    .col-logo {
        position: relative;
        &:after {
            content: '';
            position: absolute;
            width: 2px;
            height: 18px;
            background: #fff;
            right: 5px;
            top: 13px;
        }
    }

    .el-row-1 {
        margin-bottom: 52px;
    }

    .login-title {
        font-size: 32px;
        color: $light_gray;
        text-align: center;
        letter-spacing: 10px;
    }
</style>
