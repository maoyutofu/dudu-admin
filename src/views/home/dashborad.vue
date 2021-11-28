<template>
    <div class="page">
        <div class="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid>
            <div>
                <div class="uk-card uk-card-default uk-card-body card">
                    <div>
                        <h3 class="uk-card-title">{{total}}</h3>
                        <p class="name">设备总数</p>
                    </div>
                    <div>
                        <p>
                            <a href="#" class="uk-icon-link" uk-icon="icon: camera; ratio: 2"></a>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-card uk-card-primary uk-card-body card">
                    <div>
                        <h3 class="uk-card-title">{{enable_num}}</h3>
                        <p class="name">正在推流数</p>
                    </div>
                    <div>
                        <p>
                            <a href="#" class="uk-icon-link" uk-icon="icon: video-camera; ratio: 2"></a>
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div class="uk-card uk-card-secondary uk-card-body card">
                     <div>
                        <h3 class="uk-card-title">{{reason_num}}</h3>
                        <p class="name">异常数</p>
                    </div>
                    <div>
                        <p>
                            <a href="#" class="uk-icon-link" uk-icon="icon: image; ratio: 2"></a>
                        </p>
                    </div>
                </div>
            </div>
        </div>


        <div class="version">
            <div class="uk-overflow-auto">
                <table class="uk-table uk-table-divider">
                    <tbody>
                        <tr>
                            <td>软件名称</td>
                            <td>嘟嘟推流器</td>
                        </tr>
                        <tr>
                            <td>软件版本</td>
                            <td>V1.0.0</td>
                        </tr>
                        <tr>
                            <td>技术支持</td>
                            <td>dev-tang@foxmail.com</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { get_ipcs_num } from '../../api/ipc'

export default defineComponent({
    name: 'Dashborad',
    setup() {
        
    },
    data() {
        return {
            total: 0,
            enable_num: 0,
            reason_num: 0,
        }
    },
    methods: {
        
    },
    created() {
        get_ipcs_num().then((res) => {
        if (res.code == 0) {
            this.total = res.data.total
            this.enable_num = res.data.enable_num
            this.reason_num = res.data.reason_num
        } else {
          this.uikit.notification({
            message: res.msg,
            status: "warning",
          });
        }
        });
    }
})
</script>

<style scoped>
.card {
    display: flex;
    justify-content: space-between;
}
.version {
    margin-top: 60px;
}
</style>