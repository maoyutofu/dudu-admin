<template>
  <div class="page">
    <div class="page-header">
      <form class="uk-form-horizontal" @submit.prevent>
        <div uk-grid>
          <div
            class="uk-width-1-2 uk-grid-collapse uk-flex uk-flex-left"
            uk-grid
          >
            <div class="uk-width-1-2 uk-margin-right">
              <input
                type="text"
                class="uk-input"
                v-model="keyword"
                placeholder="请输入检索关键字"
              />
            </div>
            <div>
              <button
                class="uk-button uk-button-default"
                v-on:click="search"
              >
                搜索
              </button>
            </div>
          </div>
          <div
            class="uk-width-1-2 uk-grid-collapse uk-flex uk-flex-right"
            uk-grid
          >
            <div class="uk-width-auto uk-margin-right">
              <button class="uk-button uk-button-default" v-on:click="add">
                新增
              </button>
            </div>
            <div class="uk-width-auto uk-margin-right">
              <button
                class="uk-button uk-button-default"
                v-on:click="update"
              >
                修改
              </button>
            </div>
            <div class="uk-width-auto">
              <button
                class="uk-button uk-button-default"
                v-on:click="remove"
              >
                删除
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="page-body">
      <div class="uk-overflow-auto">
      <table class="uk-table uk-table-justify uk-table-divider">
        <thead>
          <tr>
            <th class="uk-width-small">ID</th>
            <th class="uk-width-small">KEY</th>
            <th class="uk-width-small">NAME</th>
            <th class="uk-width-small">RTSP/MP4</th>
            <th class="uk-width-small">RTMP</th>
            <th class="uk-table-expand">STATUS</th>
            <th class="uk-width-small">ENABLE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="item_data && item_data.id == item.id ? 'active' : ''"
            v-for="item in ipc_list"
            :key="item.id"
            v-on:click="select_item(item)"
          >
            <td>{{ item.id }}</td>
            <td>{{ item.key }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.rtsp }}</td>
            <td>{{ item.rtmp }}</td>
            <td
              v-bind:class="
                item.enable == 1 ? 'success' : item.reason ? 'error' : ''
              "
            >
              {{
                item.enable == 1
                  ? "pushing"
                  : item.enable == 0 && item.reason
                  ? "error (" + item.reason + ")"
                  : "stopped"
              }}
            </td>
            <td>
              <Switch
                v-on:toogle="toogle"
                :idx="item.id"
                :value="item.enable == 1 ? true : false"
              />
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      <div class="paging">
        <ul class="uk-pagination uk-flex-center" uk-margin>
          <li>
            <span>共 {{ total }} 条</span>
          </li>
          <li :class="page == 1 ? 'uk-disabled' : ''">
            <a href="#" v-on:click="prev"
              ><span uk-pagination-previous></span
            ></a>
          </li>
          <li
            :class="page == i ? 'uk-active' : ''"
            v-for="i in page_size"
            :key="i"
          >
            <a href="#" v-on:click="goto_page(i)">{{ i }}</a>
          </li>
          <li :class="page == page_size ? 'uk-disabled' : ''">
            <a href="#" v-on:click="next"><span uk-pagination-next></span></a>
          </li>
          <li>
            <span class="uk-margin-small-right" uk-icon="refresh" v-on:click="refresh"></span>
          </li>
        </ul>
      </div>
    </div>

    <!-- This is the modal -->
    <div id="save-ipc-modal" uk-modal>
      <div class="uk-modal-dialog">
        <button class="uk-modal-close-default" type="button" uk-close></button>
        <div class="uk-modal-header">
          <h2 class="uk-modal-title">{{ modal.title }}</h2>
        </div>
        <div class="uk-modal-body">
          <form class="uk-form-stacked" @submit.prevent>
            <div class="uk-grid-small" uk-grid>
              <div class="uk-width-1-2">
                <label class="uk-form-label" for="key">KEY</label>
                <div class="uk-form-controls-condensed uk-width-1">
                  <input
                    v-model="modal.form.key"
                    class="uk-input"
                    id="key"
                    type="text"
                    placeholder="请输入 KEY"
                    readonly
                  />
                </div>
              </div>
              <div class="uk-width-1-2">
                <label class="uk-form-label" for="name">NAME</label>
                <div class="uk-form-controls">
                  <input
                    v-model="modal.form.name"
                    class="uk-input"
                    id="name"
                    type="text"
                    placeholder="请输入名称"
                  />
                </div>
              </div>

              <div class="uk-width-1-2">
                <label class="uk-form-label" for="rtsp">RTSP/MP4</label>
                <div class="uk-form-controls">
                  <input
                    v-model="modal.form.rtsp"
                    class="uk-input"
                    id="rtsp"
                    type="text"
                    placeholder="请输入 RTSP/MP4 地址"
                  />
                </div>
              </div>

              <div class="uk-width-1-2">
                <label class="uk-form-label" for="rtmp">RTMP</label>
                <div class="uk-form-controls">
                  <input
                    v-model="modal.form.rtmp"
                    class="uk-input"
                    id="rtmp"
                    type="text"
                    placeholder="请输入 RTMP 地址"
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="uk-modal-footer uk-text-right">
          <button class="uk-button uk-button-default uk-modal-close">
            取消
          </button>
          <button class="uk-button uk-button-primary" v-on:click="save">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, inject } from "vue";
import Switch from "../../components/Switch.vue";
import {
  get_ipc_list,
  ipc_start,
  ipc_stop,
  ipc_add,
  ipc_update,
  ipc_remove,
  get_ipc,
  gen_key,
} from "../../api/ipc";

export default defineComponent({
  name: "Home",
  components: {
    Switch,
  },
  data() {
    return {
      interval_id: null,
      total: 0,
      ipc_list: [],
      rows: 10,
      page: 1,
      page_size: 1,
      keyword: "",
      item_data: null,
      modal: {
        title: "",
        form: {
          id: "",
          key: "",
          name: "",
          rtsp: "",
          rtmp: "",
        },
      },
    };
  },
  methods: {
    goto_page(page) {
      this.page = page;
      this.get_ipc_list();
    },
    prev() {
      this.page--;
      this.get_ipc_list();
    },
    next() {
      this.page++;
      this.get_ipc_list();
    },
    refresh() {
      this.get_ipc_list();
      this.uikit.notification({
              message: "操作成功",
              status: "success",
            });
    },
    save() {
      if (this.modal.form.key === "") {
        this.uikit.notification({
          message: "请填写 KEY",
          status: "warning",
        });
        return;
      }
      if (this.modal.form.name === "") {
        this.uikit.notification({
          message: "请填写名称",
          status: "warning",
        });
        return;
      }
      if (this.modal.form.rtsp === "") {
        this.uikit.notification({
          message: "请填写 RTSP",
          status: "warning",
        });
        return;
      }
      if (this.modal.form.rtmp === "") {
        this.uikit.notification({
          message: "请填写 RTMP",
          status: "warning",
        });
        return;
      }

      if (!this.modal.form.id) {
        ipc_add(this.modal.form).then((res) => {
          if (res.code == 0) {
            this.uikit.notification({
              message: "操作成功",
              status: "success",
            });
            this.get_ipc_list();
          } else {
            this.uikit.notification({
              message: res.msg,
              status: "warning",
            });
          }
        });
      } else {
        ipc_update(this.modal.form).then((res) => {
          if (res.code == 0) {
            this.uikit.notification({
              message: "操作成功",
              status: "success",
            });
            this.get_ipc_list();
          } else {
            this.uikit.notification({
              message: res.msg,
              status: "warning",
            });
          }
        });
      }

      this.uikit.modal("#save-ipc-modal").hide();
      this.modal.title = "";
      this.modal.form = this.empty_modal_form();
    },
    empty_modal_form() {
      return {
        id: "",
        key: "",
        name: "",
        rtsp: "",
        rtmp: "",
      };
    },
    add() {
      this.modal.title = "新增";
      this.modal.form = this.empty_modal_form();
      gen_key().then((resp) => {
        this.modal.form.key = resp.data.key
      });
      this.uikit.modal("#save-ipc-modal", { stack: true }).show();
    },
    update() {
      if (!this.item_data) {
        this.uikit.notification({
          message: "请选择一条数据",
          status: "warning",
        });
        return;
      }
      if (this.item_data.enable == 1) {
        this.uikit.notification({
          message: "请先停止推流后在操作",
          status: "warning",
        });
        return;
      }
      this.modal.title = "修改";
      this.modal.form = this.item_data;
      this.uikit.modal("#save-ipc-modal", { stack: true }).show();
    },
    remove() {
      if (!this.item_data) {
        this.uikit.notification({
          message: "请选择一条数据",
          status: "warning",
        });
        return;
      }
      if (this.item_data.enable == 1) {
        this.uikit.notification({
          message: "请先停止推流后在操作",
          status: "warning",
        });
        return;
      }
      const _this = this;
      this.uikit.modal.confirm("确定要选中的删除吗？删除后数据不可恢复。").then(
        () => {
          ipc_remove(_this.item_data.id).then((res) => {
            if (res.code == 0) {
              _this.uikit.notification({
                message: "操作成功",
                status: "success",
              });
              _this.get_ipc_list();
            } else {
              _this.uikit.notification({
                message: res.msg,
                status: "warning",
              });
            }
          });
        },
        () => {}
      );
    },
    get_ipc_list() {
      get_ipc_list(this.page, this.rows, this.keyword).then((res) => {
        if (res.code == 0) {
          this.total = res.data.total;
          this.ipc_list = res.data.rows;
          this.page_size = Math.ceil(this.total / this.rows);
        } else {
          console.log(res);
        }
      });
    },
    search() {
      this.get_ipc_list();
    },
    select_item(item) {
      this.item_data = item;
    },
    toogle(obj) {
      if (!obj.value) {
        ipc_start(obj.idx).then((res) => {
          if (res.code == 0) {
            // 二次判断
            get_ipc(obj.idx).then((res) => {
              if (res.code == 0) {
                if (res.data.enable == 1) {
                  this.uikit.notification({
                    message: "操作成功",
                    status: "success",
                  });

                } else {
                  this.uikit.notification({
                    message: res.data.reason,
                    status: "warning",
                  });
                }
                this.get_ipc_list();
              }
            })
            
          } else {
            this.uikit.notification({
              message: res.msg,
              status: "warning",
            });
          }
        });
      } else {
        ipc_stop(obj.idx).then((res) => {
          if (res.code == 0) {
            this.uikit.notification({
              message: "操作成功",
              status: "success",
            });
          } else {
            this.uikit.notification({
              message: res.msg,
              status: "warning",
            });
          }
          this.get_ipc_list();
        });
      }
    },
    data_refreh() {
      // 计时器正在进行中，退出函数
      if (this.interval_id != null) {
        return;
      }
      // 计时器为空，操作
      this.interval_id = setInterval(() => {
        // console.log("刷新" + new Date());
        this.get_ipc_list(); //加载数据函数
      }, 5000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.interval_id); //清除计时器
      this.interval_id = null; //设置为null
    },
  },
  created() {
    this.get_ipc_list();
    // this.data_refreh();
  },
  // unmounted() {
  //   this.clear();
  // },
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
  background: #f9f9f9;
}
.page-header {
  background: #fff;
  margin-bottom: 10px;
  padding: 20px 10px;
}
.page-body {
  margin-bottom: 10px;
  background: #fff;
}
.success {
  color: #67c23a;
}
.error {
  color: #f0506e;
}
.uk-table thead th {
  padding: 16px 12px;
  /* background: #bc1120; */
  /* background: #1e87f0; */
  /* color: #fff; */
  font-size: 1rem;
  cursor: default;
  }

.uk-table tbody td {
  padding: 16px 12px;
  font-size: 0.8rem;
}

.uk-table tr.active {
  background: #ffd;
  cursor: pointer;
}

.uk-table tr:hover {
  background: #ffd;
  cursor: pointer;
}

.uk-modal-title {
  font-size: 1.4rem;
  line-height: 1.3;
}
</style>