<template>
  <div class="page">
    <div class="login-panel">
      <div class="login-content">
        <form @submit.prevent>
        <fieldset class="uk-fieldset">
          <legend class="uk-legend">管理员登录</legend>
          <div class="uk-margin">
              <input
                type="text"
                class="uk-input"
                v-model="form.username"
                placeholder="账号"
              />
            </div>
          <div class="uk-margin">
              <input
                type="password"
                class="uk-input"
                v-model="form.password"
                placeholder="密码"
              />
            </div>
          <div class="uk-margin">
            <button
              class="uk-button uk-button-primary"
              v-on:click="do_login"
            >
              登录
            </button>
          </div>
        </fieldset>
      </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { inject, defineComponent } from "vue";
import { login } from "../../api/login";
import { set_token } from "../../utils/auth";
export default defineComponent({
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    do_login() {
      login(this.form.username, this.form.password).then((res) => {
        if (res.code == 0) {
          set_token(res.data.token);
          this.$router.push("/dashborad");
        } else {
          this.uikit.notification({
            message: res.msg,
            status: "warning",
          });
        }
      });
    },
  },
  setup() {
    const uikit = inject("uikit");
    return {
      uikit,
    };
  },
});
</script>

<style scoped>
.page {
  height: 100%;
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  background: rgba(245, 245, 245, 1);
}

.login-panel {
  width: 500px;
  height: 300px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 0 50px;
  border-radius: 5px;
  box-shadow: 0px 2px 12px 0px rgb(105 105 105 / 7%);
  background: rgba(255, 255, 255, 0.5);
}

.login-content {
  width: 450px;
}

/* @media (min-width: 768px) {
}

@media (min-width: 1024px) {
    .login-panel .left {
        width: 524px;
    }
    .login-panel .right {
        width: 424px;
    }
}

@media (min-width: 1200px) {
   
} */
</style>