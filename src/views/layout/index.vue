<template>
    <div class="layout-page">
        <div class="left-panel" v-show="showMenu">
            <div class="header">
                <h1 class="brand">嘟嘟推流</h1>
            </div>
            <div class="uk-card uk-card-default uk-card-body">
                <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
                    <li v-for="(item, idx) in menuList" :key="idx" :class="(item.isParent ? 'uk-parent ':'') + (item.name == openMenu ? ' uk-open':'') " >
                        <a href="#" v-if="item.isParent"><span class="uk-margin-small-right" :uk-icon="'icon:' + item.icon"></span> {{item.name}}</a>
                        <router-link v-else-if="!item.isParent" :to="item.path"><span class="uk-margin-small-right" :uk-icon="'icon:' + item.icon"></span> 首页</router-link>
                        <ul class="uk-nav-sub" v-if="item.isParent">
                            <li v-for="(item2, idx2) in item.children" :key="idx2">
                                <router-link :to="item2.path">{{item2.name}}</router-link>
                            </li>
                        </ul>
                    </li>
                    <!-- <li><router-link to="/dashborad"><span class="uk-margin-small-right" uk-icon="icon: home"></span> 首页</router-link></li>
                    <li class="uk-parent">
                        <a href="#"><span class="uk-margin-small-right" uk-icon="icon: cog"></span> 运维服务</a>
                        <ul class="uk-nav-sub">
                            <li><router-link to="/home">推流管理</router-link></li>
                        </ul>
                    </li>
                    <li class="uk-parent">
                        <a href="#"><span class="uk-margin-small-right" uk-icon="icon: settings"></span> 系统管理</a>
                        <ul class="uk-nav-sub">
                            <li><router-link to="/change-password">修改密码</router-link></li>
                        </ul>
                    </li> -->
                </ul>
            </div>
        </div>  
        <div class="body">
            <div class="main-panel">
                <div class="header">
                    <div class="left">
                        <a href="#" class="uk-icon-link toggle-menu" uk-icon="menu" v-on:click="toggleMenu"></a>
                    </div>
                    <div class="right">
                        <div class="user-info">
                            <span class="name">
                                ADMIN
                            </span>
                            <img src="../..//assets/avatar.jpg" alt="" class="avatar">
                            <div uk-dropdown>
                                <ul class="uk-nav uk-dropdown-nav">
                                    <li><a href="javascript:void(0)" v-on:click="changePassword">修改密码</a></li>
                                    <li class="uk-nav-divider"></li>
                                    <li><a href="javascript:void(0)" v-on:click="logout">注销登录</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-wrap">
                    <router-view></router-view> 
                </div>  
            </div>  
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { remove_token } from '../../utils/auth'

export default defineComponent({
    name: 'LayoutIndex',
    setup() {
    },
    data() {
        return {
            showMenu: true,
            openMenu: '',
            menuList: [
                {
                    path: '/dashborad',
                    name: '首页',
                    icon: 'home'
                },
                {
                    name: '运维服务',
                    icon: 'cog',
                    isParent: true,
                    path: '',
                    children: [
                        {
                            path: '/home',
                            name: '推流管理',
                        }
                    ]
                },
                {
                    name: '系统管理',
                    icon: 'settings',
                    path: '',
                    isParent: true,
                    children: [
                        {
                            path: '/change-password',
                            name: '修改密码',
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        changePassword() {
            this.$router.push('/change-password')
        },
        logout() {
            remove_token()
            this.$router.push('/login')
        },
        toggleMenu () {
            this.showMenu = !this.showMenu
        }
    },
    created() {
        const _this = this;
        var windowWidth = document.body.clientWidth;
        if(windowWidth < 640){
            this.showMenu = false
        }
        const path = this.$route.path
        this.menuList.forEach(item => {
            item.children?.forEach(item2 => {
                if (item2.path === path) {
                    _this.openMenu = item.name
                    return
                }
            });
        });

    }
})
</script>

<style>
html,body {
    height: 100%;
    min-height: 100%;
}
.layout-page {
    height: 100%;
    display: flex;
    background: #f9f9f9;
}
.header {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #1e87f0;
}
.header h1 {
    margin: 0;
    padding: 0;
}
.header .brand {
    color: #fff;
    font-size: 21px;
    cursor: default;
}
.body {
    flex: 1;
    overflow: scroll;
}

.body .header {
    display: flex;
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-between;
    margin-bottom: 20px;
}
.body .header .toggle-menu {
    color: #fff;
    display: block;
    width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.body .header .user-info {
    color: #fff;
}

.body .header .user-info .name {
    font-size: 16px;
    padding-right: 10px;
}

.body .header .user-info .avatar {
    width: 45px;
    height: 45px;
    border-radius: 90px;
    cursor: pointer;
}
.body .header .user-info .uk-dropdown {
    min-width: 110px;
}
.main-panel {
    width: 100%;
    height: 100%;
}
.main-wrap {
    /* border: 1px solid red; */
    padding: 0 20px;
}

.left-panel .header {
    border-right: 1px solid #7eb4e9;
}
.left-panel{
    width: 230px;
    height: 100%;
    background: rgba(238, 241, 246, 1);
}

.left-panel .uk-card-default {
    box-shadow: none;
    border: none;
    background: rgba(238, 241, 246, 1);
}

.left-panel .uk-card-default li {
    margin: 10px 0;
}

.left-panel .uk-card-default a,
.left-panel .uk-parent a {
    font-size: 18px;
    color: #333333;
}
.left-panel .uk-nav-sub a {
    font-size: 16px;
    margin-left: 20px;
    color: #333333;
}

.left-panel .router-link-active {
    color: #222 !important;
}

.uk-button-dudu {
  background-color: #bc1120;
  border: 1px solid transparent;
  color: #f6f7fb;
}
.uk-button-dudu:active {
  background-color: #ac101e;
  color: #f6f7fb;
}
.uk-button-dudu-border {
  border: 1px solid #bc1120;
  /* border-radius: 3px; */
  font-size: 0.8rem;
  font-weight: 400;
  color: #bc1120;
  background-color: transparent;
}
</style>
