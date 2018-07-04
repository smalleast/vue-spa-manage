<template>
    <div class="login">
        <div class="login-content">
            <div class="login-hd">
                <img src="../../assets/image/logo.png" class="logo" alt="">
            </div>
            <div class="login-bd">
                <div class="f26 c-3 bold">登录</div>
                <div class="c-8 f14 mt7">欢迎加入住逻辑斑斓智造</div>
                <div class="mt35">
                    <MyInputLogin
                        v-model="userName"
                        icon="icon-user f24"
                        placeholder="请输入用户名"></MyInputLogin>
                </div>
                <div class="mt15">
                    <MyInputLogin
                        type="password"
                        v-model="password"
                        icon="icon-lock f28"
                        placeholder="请输入密码"
                        @keyup="handleKeyup"
                    ></MyInputLogin>
                </div>
                <div class="mt15">
                    <MyButton type="primary" width="max" @click="submit" :Loading="busy">登录</MyButton>
                </div>
                <div class="mt15 tc c-c8 f16">
                    温馨提示：帐号由【住逻辑】提供，欢迎致电400-998-0137
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {$api, nxStore, MyInputLogin, MyButton} from '../../components/common/index'

    export default {
        data() {
            return {
                userName: '',
                password: '',
                busy: false
            }
        },
        components: {
            MyInputLogin, MyButton
        },
        methods: {
            submit() {
                if (this.verification()) {
                    this.busy = true;
                    let params = {
                        "password": this.password,
                        "userName": this.userName
                    };

                    $api.user('post', params, 'info/login').then(res => {
                        this.busy = false;
                        console.log('success:', res);
                        nxStore.local = {
                            token: res
                        };
                        setTimeout(()=>{
                            this.$router.push({name:'quoteList'})
                        },1000);
                    }).catch(res => {
                        this.busy = false;
                        console.log('err:', res);
                    })
                }

            },
            verification() {
                if (!this.userName) {
                    this.$message.warning('用户名为必填项');
                    return false
                }
                if (!this.password) {
                    this.$message.warning('密码为必填项');
                    return false
                }
                return true
            },
            handleKeyup() {
                this.submit();
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .login {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background: url("../../assets/image/mask.jpg");
        &-content {
            position: absolute;
            width: 560px;
            height: 521px;
            left: 50%;
            top: 50%;
            margin-top: -260px;
            margin-left: -280px;
            background-color: #fff;
        }
        &-hd {
            position: absolute;
            left: 50%;
            top: -46px;
            margin-left: -146.5px;
        }
        &-bd {
            position: relative;
            width: 460px;
            top: 100px;
            margin-left: auto;
            margin-right: auto;
        }
    }
</style>
