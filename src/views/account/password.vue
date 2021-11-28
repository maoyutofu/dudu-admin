<template>
    <div class="page">
        <div class="change-password">
            <form>
                <fieldset class="uk-fieldset">
                    <legend class="uk-legend">修改密码</legend>
                    <div class="uk-margin">
                        <input class="uk-input uk-form-width-large" type="password" v-model="old_password" placeholder="旧密码">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input uk-form-width-large" type="password" v-model="new_password" placeholder="新密码">
                    </div>
                    <div class="uk-margin">
                        <input class="uk-input uk-form-width-large" type="password" v-model="new_password2" placeholder="重新输入新密码">
                    </div>
                    <div class="uk-margin">
                        <button type="button" class="uk-button uk-button-primary" v-on:click="save">保存</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
import { inject, defineComponent } from 'vue'
import { change_password } from '../../api/account'

export default defineComponent({
    name: 'ChangePassword',
    setup() {
         const uikit = inject("uikit");
        return {
            uikit,
        };
    },
    data() {
        return {
            old_password: '',
            new_password: '',
            new_password2: ''
        }
    },
    methods: {
        save() {
            if (this.old_password === '') {
                this.uikit.notification({
                    message: '请输入旧密码',
                    status: "warning",
                });
                return
            }
            if (this.new_password === '') {
                this.uikit.notification({
                    message: '请输入新密码',
                    status: "warning",
                });
                return
            }
            if (this.new_password !== this.new_password2) {
                this.uikit.notification({
                    message: '两次新密码输入不一致',
                    status: "warning",
                });
                return
            }
            change_password(this.old_password, this.new_password).then((res) => {
                if (res.code == 0) {
                    this.uikit.notification({
                        message: "操作成功",
                        status: "success",
                    });
                    this.old_password = '';
                    this.new_password = '';
                    this.new_password2 = '';
                } else {
                    this.uikit.notification({
                        message: res.msg,
                        status: "warning",
                    });
                }
            });
        }
    }
})
</script>

<style scoped>
.page {
  height: 100%;
  background: #fff;
}
.change-password {
    background: #fff;
    padding: 10px;
}
</style>
