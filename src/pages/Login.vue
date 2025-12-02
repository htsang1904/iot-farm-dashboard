<template>

    <div class="c-login-wrapper">
        <img src="/images/suitelogo.svg" alt="Suite App" class="c-login__logo">
        <div class="c-login-box" v-robot-loading="loading">
            <div class="c-login-box__title"></div>
            <el-alert v-if="error && !loading" :title="error.message" type="error" effect="dark">
            </el-alert>
            <DxForm :form-data="form" label-mode="floating" ref="loginform">
                <DxGroupItem>
                    <DxItem data-field="username" :editor-options="{ height: 40 }">
                        <DxLabel text="$t('login_username')" />
                        <DxRequiredRule message="$t('username_required')" />
                    </DxItem>
                    <DxItem data-field="password" :editor-options="{
                        height: 40,
                        mode: passwordMode,
                        buttons: [{
                            name: 'showPassword',
                            location: 'after',
                            options: {
                                type: 'default',
                                icon: (passwordMode == 'text' ? 'eyeopen' : 'eyeclose'),
                                onClick: () => {
                                    this.passwordMode = (this.passwordMode === 'text' ? 'password' : 'text');
                                },
                            },
                        }],
                    }">
                        <DxLabel text="$t('login_password')" />
                        <DxRequiredRule message="$t('please_enter_password')" />
                    </DxItem>
                    <DxItem data-field="remember_me" :editor-options="{ text: 'keep_logged_in' }">
                        <DxLabel text="" :visible="false" />
                    </DxItem>
                    <DxButtonItem :use-submit-behavior="true" cssClass='login-btn' :button-options="{
                        text: 'login',
                        type: 'success',
                        onClick: () => {
                            this.requestLogin();
                        },
                    }" />
                </DxGroupItem>
            </DxForm>
            <div class="c-login-box__footer">
                <div class="c-login-box__forget">
                    <a href="#" @click.stop="showResetPasswordPopup">forgot_password?</a>
                </div>
                <!-- <div class="navbar-lang">
                    <select id="lang-select" v-model="lang" @change="switchLang" class="lang-select">
                        <option value="vi">Tiếng Việt</option>
                        <option value="en">English</option>
                    </select>
                </div> -->
            </div>
        </div>
        <div class="auth-small-logo">
            'developed_by'
            <img src="/images/white-logo.svg" alt="Powered by Cimi.vn">
        </div>

        <SuitePopup :title="$t('recover_password')" width="300px" height="300px" :resizeEnabled="false"
            :visible.sync="showResetPassword" @opened="onShown" :canFullScreen=false>
            <div>
                <DxForm :form-data="resetPwData" label-mode="floating" ref="templateForm">
                    <DxGroupItem>
                        <DxItem data-field="phone_number" :editor-options="{
                            mask: '0000 000 000',
                            height: 40
                        }">
                            <DxLabel text="$t('phone_number')" />
                            <DxPatternRule :pattern="/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/"
                                message="$t('invalid_phone_number')" />
                            <DxRequiredRule message="$t('please_enter_phone')" />
                        </DxItem>
                        <DxItem data-field="email" :editor-options="{
                            height: 40
                        }">
                            <DxRequiredRule :message="$t('please_enter_email')" />
                            <DxEmailRule message="Email không hợp lệ" />
                        </DxItem>
                    </DxGroupItem>
                </DxForm>
            </div>
            <template slot="footer">
                <div>
                    <el-button size="medium" type="primary" @click="onSubmitResetPass">
                        <i class="el-icon-circle-check"></i> recover_password
                    </el-button>
                    <el-button size="medium" @click="onClose"> close</el-button>
                </div>
            </template>
        </SuitePopup>
    </div>

</template>

<script>
import { $ } from '@/utils'
// import '@/assets/scss/pages/login.scss';
import has from 'lodash-es/has';
export default {
    name: 'login',
    data() {
        return {
            lang: 'vi',
            form: {
                username: '',
                password: '',
                remember_me: true
            },
            passwordMode: 'password',
            response: {},
            error: null,
            loading: false,
            showResetPassword: false,
            resetPwData: {
                email: '',
                phone_number: ''
            },
        }
    },

    methods: {
        switchLang() {
            this.$i18n.locale = this.lang;
            localStorage.setItem('lang', this.lang);
        },
        requestLogin() {
            let validate = this.$refs.loginform.instance.validate();
            if (validate.isValid) {
                this.login()
            } else {
                let firstError = validate.brokenRules[0];
                this.$suiteMessage.error(!!firstError ? firstError.message : 'Vui lòng nhập đầy đủ thông tin');
                return false;
            }
        },

        login() {
            this.error = null;
            this.loading = true;

            this.$authStored.login({
                username: this.form.username,
                password: this.form.password,
                remember_me: !!this.form.remember_me
            })
                .then((res) => {
                    console.log(res);
                    location.href = '/';
                })
                .catch((err) => {
                    this.error = getError(err);
                })
                .finally(() => this.loading = false)
        },

        showResetPasswordPopup() {
            this.showResetPassword = true;
        },

        onShown() {

        },

        onClose() {
            this.showResetPassword = false;
        },

        onSubmitResetPass() {
            let valid = this.$refs.templateForm.instance.validate();
        },

        onKeyUp(e) {
            let isInTyping = false
            if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
                isInTyping = true
            }
            if (isInTyping && e.code === 'Enter') {
                this.requestLogin()
            }
        },
    },
    mounted() {
        $.addClass(document.body, 'p-login');
        document.addEventListener("keyup", this.onKeyUp, false)
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            this.lang = savedLang;
            this.$i18n.locale = savedLang;
        }
    },
    beforeDestroy() {
        document.removeEventListener("keyup", this.onKeyUp, false)
    }
}

function getError(err) {
    let error = {};

    if (has(err.response, 'data.message')) {
        error = {
            message: err.response.data.message
        };

        if (has(err.response, 'data.errors')) {
            error.errors = err.response.data.errors;
        }
    } else {
        error = {
            message: err.message
        };
    }

    return error;
}
</script>
<style lang="scss">
@import "@/assets/scss/variables.scss";


.c-login-box__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-top: 1rem; /* tuỳ chỉnh nếu cần */
}

.c-login-box__forget a {
  color: #007bff; /* màu link */
  text-decoration: none;
}

.navbar-lang select {
  padding: 4px 8px;
  width: max-content;
  border: none;
}

.p-login {
    .main-wrapper {
        display: flex;
        align-items: center;
        background: linear-gradient(180deg, $mainColor, $mainColorDarker, $mainColor);
    }
}

.c-login-wrapper {
    .c-login-box {
        overflow: hidden\;
    }

    .login-btn .dx-button {
        margin-top: 10px;
        width: 100%;
        font-weight: bold;
        font-size: 16px;
    }

    .auth-small-logo {
        text-align: center;
        margin: 10px auto;
        font-size: 11px;
        color: #fff;

        img {
            display: block;
            width: 60px;
            margin: auto;
        }
    }

    .c-login-box__forget {
        margin-top: 10px;

        a {
            font-size: 12px;
            color: $mainColor;
        }
    }
}
</style>
