<template>
  <div class="main">
    <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
      <a-tabs :activeKey="customActiveKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
        <a-tab-pane key="tab1" tab="Login">
          <a-alert
            v-if="isLoginError"
            type="error"
            showIcon
            style="margin-bottom: 24px"
            message="User name or password are incorrect!"
          />
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="User name"
              v-decorator="[
                'username',
                { rules: [{ required: true, message: 'User name must be required!' }], validateTrigger: 'change' },
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input-password
              size="large"
              placeholder="Password"
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Password must be required' }], validateTrigger: 'blur' },
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input-password>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]">Remember me</a-checkbox>
        <router-link
          :to="{ name: 'recover', params: { user: 'aaa' } }"
          class="forge-password"
          style="float: right"
        >Forgot my account</router-link
        >
      </a-form-item>

      <a-form-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >Login</a-button
        >
      </a-form-item>

      <div class="user-login-other">
        <span>Other login</span>
        <a>
          <a-icon class="item-icon" type="google"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="facebook"></a-icon>
        </a>
        <a>
          <a-icon class="item-icon" type="twitter"></a-icon>
        </a>
      </div>
    </a-form>
  </div>
</template>
<script>
import storage from 'store'
import { timeFix } from '@/utils/util'
import { RepositoryFactory } from '@/repositories/RepositoryFactory'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import config from '@/config/firebase.config'
import FireBase from 'firebase'
const UserRepository = RepositoryFactory.get('users')

FireBase.initializeApp(config)
export default {
  components: {},
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false
      }
    }
  },
  methods: {
    // handler

    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state
      } = this

      state.loginBtn = true

      const validateFieldsKey = ['username', 'password']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          const user = {
            username: values.username,
            password: values.password,
            'firebase-token': '',
            'request-type': 'default'
          }
          // UserRepository.login(user)
          //           .then((res) => {
          //             if (res.success) this.loginSuccess(res)
          //             if (!res.success) this.isLoginError = true
          //           })
          //           .catch((err) => this.requestFailed(err))
          //           .finally(() => {
          //             state.loginBtn = false
          //           })
          FireBase.auth().signInWithEmailAndPassword(user.username, user.password).then((res) => {
            console.log(res)
            if (res) {
              FireBase.auth().currentUser.getIdToken(true).then((token) => {
                  user['firebase-token'] = token
                  user['request-type'] = 'firebase'
                  UserRepository.login(user).then((res) => {
                      var data = res
                      if (data.success) this.loginSuccess(data)
                      if (!data.success) this.isLoginError = true
                    })
                    .catch((err) => this.requestFailed(err))
                    .finally(() => {
                      state.loginBtn = false
                    })
              })
            }
          }).catch((error) => {
            this.$message.error(error.message)
            state.loginBtn = false
          })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      storage.set(ACCESS_TOKEN, res.results['access-token'], 30 * 60)
      localStorage.user = { name: res.results.name, 'ACCESS-TOKEN': res.results['access-token'] }
      storage.set()
      this.$router.push({ path: '/' })
      setTimeout(() => {
        this.$notification.success({
          message: 'Welcome',
          description: `${timeFix()}，Welcome back`
        })
      }, 1000)
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: 'Error',
        description: err.response?.data?.message || 'There was an error in the request, please try again later',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
