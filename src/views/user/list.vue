<template>
    <section class="user-list">
        <div class="quote-detail-hd">
            <MyLayout>
                <div class="left col c-35 f22">账号</div>
                <div class="right tr pr20">
                    <MyLayout>
                        <div class="f14 c-8c mt10">
                            温馨提示：帐号由【住逻辑】提供，欢迎致电400-998-0137
                        </div>
                    </MyLayout>
                </div>
            </MyLayout>
            <MyLayout label="登录账号：" class="mt30">
                <div class="c-35">
                    {{ userInfo.loginName }}
                </div>
            </MyLayout>
            <MyLayout label="登录密码：" class="mt20">
                <div class="c-35">
                    <!--<MyInput :type="type" v-model="loginPwd" :disabled="true"></MyInput>-->
                    <el-input
                        :type="type"
                        v-model="newPassword"
                        placeholder="重置密码，最多输入6个字符"
                        class="login-pwd">
                    </el-input>

                </div>
            </MyLayout>
            <MyLayout class="mt30">
                <MyButton  type="primary" @click="save" width="mini">保存</MyButton>
                <MyButton type="danger" width="mini"  @click="handleExit">退出</MyButton>
            </MyLayout>
        </div>
        <div class="quote-detail-bd mt60 mb100">
            <MyLayout>
                <div class="left  c-35 f22">
                    实名制认证
                </div>
                <div class="center c-red">
                    （未进行实名制认证将无法签单）
                </div>
            </MyLayout>
            <MyLayout label="企业名称：" class="mt30">
                <div class="c-35">
                    {{ userInfo.company }}
                </div>
            </MyLayout>
            <MyLayout label="营业执照注册号：" class="mt25">
                <div class="c-35">
                    {{ userInfo.taxNum }}
                </div>
            </MyLayout>
            <MyLayout label="法人姓名：" class="mt25">
                <div class="c-35">
                    {{ userInfo.legalName }}
                </div>
            </MyLayout>
            <MyLayout label="法人身份证号：" class="mt25">
                <div class="c-35">
                    {{ userInfo.legalIdNum }}
                </div>
            </MyLayout>
            <MyLayout label="法人手机号：" class="mt25">
                <div class="c-35">
                    {{ userInfo.legalPhone }}
                </div>
            </MyLayout>
            <MyLayout label="企业工商营业执照：" class="mt25" :center="false">
                <div>
                    <MyPhoto border :item="imgKey" size="max" class="ml10"></MyPhoto>
                </div>
            </MyLayout>
        </div>
    </section>
</template>

<script>
    import {$api, MyLayout, MyBadgeStatus, MyPhoto, MyInput, MyButton, nxStore} from "../../components/common/index";

    export default {
        data() {
            return {
                type: 'password',
                imgKey: 'product_image/cpeb27f0405d2b47d08751faa8d01a799c',
                userInfo: {},
                newPassword: '',
            }
        },
        components: {
            MyLayout,
            MyInput,
            MyButton,
            MyPhoto,
        },
        methods: {
            save() {
                if (this.newPassword == '' || this.newPassword == null) {
                    this.$message.warning('修改密码不能为空');
                    return;
                }
                if (this.newPassword.length < 6) {
                    this.$message.warning('密码长度不能少于6位');
                    return;
                }
                $api.user('put', {newPassword: this.newPassword}, 'reset').then((res) => {
                    if (res) {
                        this.newPassword = '';
                        this.$message.success('修改密码成功');
                    }
                })
            },
            getUserInfo() {
                $api.user('get', '', 'info').then((res) => {
                    this.userInfo = res;
                    this.imgKey = res.bussinessLicenceFile.key;
                    this.newPassword = res.password;
                })
            },
            handleExit() {
                nxStore.clear('toke' +
                    '' +
                    '' +
                    'n');
                this.$router.push('/login');
            }
        },
        created() {
            this.getUserInfo();
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
    .user-list {
        .wsn {
            color: #35383F;
        }
        .el-input__inner {
            background: #F5F6FA;
            border: 1px solid #EAEBED;
        }
        .login-pwd{
            width: 300px;
        }
    }

</style>
