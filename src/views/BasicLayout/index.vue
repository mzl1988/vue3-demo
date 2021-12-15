<template>
    <a-layout>
        <a-layout-sider
            v-model:collapsed="collapsed"
            :trigger="null"
            collapsible
            :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }"
        >
            <div class="logo" />
            <a-menu
                v-model:openKeys="openKeys"
                v-model:selectedKeys="selectedKeys"
                mode="inline"
                theme="dark"
                @click="handleClick"
            >
                <template v-for="item in list" :key="item.key">
                    <template v-if="!item.children">
                        <a-menu-item :key="item.key">
                            <template #icon>
                                <HIcon :icon="item.icon" />
                            </template>
                            {{ item.title }}
                        </a-menu-item>
                    </template>
                    <template v-else>
                        <SubMenu :menu-info="item" />
                    </template>
                </template>
            </a-menu>
        </a-layout-sider>
        <a-layout :style="{ marginLeft: collapsed ? '80px' : '200px' }">
            <a-layout-header
                style="background: #fff; padding: 0"
                :style="{ position: 'fixed', top: 0, right: 0, left: collapsed ? '80px' : '200px' }"
            >
                <menu-unfold-outlined
                    v-if="collapsed"
                    class="trigger"
                    @click="() => (collapsed = !collapsed)"
                />
                <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
            </a-layout-header>
            <a-layout-content :style="{ marginTop: '64px', overflow: 'initial' }">
                <router-view v-slot="{ Component, route }">
                    <keep-alive>
                        <component :is="Component" v-if="route.meta.keepAlive"></component>
                    </keep-alive>
                    <component :is="Component" v-if="!route.meta.keepAlive"></component>
                </router-view>
            </a-layout-content>
            <a-layout-footer :style="{ textAlign: 'center' }">Ant Design ©2018 Created by Ant UED</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs } from "vue"
import SubMenu from '@/components/SubMenu.vue'
import HIcon from '@/components/HIcon.vue'
import {
    PieChartOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'
import _ from 'lodash'
const router = useRouter()


const handleClick = (e: any) => {
    findActiveRouter(e.key, data.list, null, true,)
};

const findActiveRouter = (key: String, menus: any[], parentMenu: any, toPage: boolean) => {

    for (let index = 0; index < menus.length; index++) {
        const menu = menus[index];
        if (menu.key === key) {
            if (!toPage) {
                data.selectedKeys = [menu.key]
                if (parentMenu !== null && data.openKeys.indexOf(parentMenu.key) === -1) {
                    data.openKeys = [parentMenu.key]
                    // console.log(data.openKeys);
                    // console.log(data.selectedKeys);
                }
            } else {
                router.replace({ name: menu.key })
            }
            break
        }
        if (menu.children) {
            findActiveRouter(key, menu.children, menu, toPage)
        }
    }
}




onMounted(async () => {
    findActiveRouter(router.currentRoute.value.name as string, data.list, null, false)
})

interface Data {
    list: any[],
    openKeys: string[],
    selectedKeys: string[],
    collapsed: boolean,
}

const data: Data = reactive({
    list: [
        {
            key: 'Dashboard',
            title: 'Dashboard',
            icon: PieChartOutlined,
        },
        {
            key: 'CKEditor',
            title: 'CKEditor',
            icon: PieChartOutlined,
        },
        {
            key: 'Navigation 3',
            title: 'Navigation 3',
            icon: PieChartOutlined,
            children: [
                {
                    key: 'Navigation 3.1',
                    title: 'Navigation 3.1',
                    icon: PieChartOutlined,
                },
            ],
        },
    ],
    openKeys: [],
    selectedKeys: [],
    collapsed: false,
})
const { list, openKeys, selectedKeys, collapsed } = { ...toRefs(data) }
</script>
<style lang="less" scoped>
.trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
}

.trigger:hover {
    color: #1890ff;
}

.logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.3);
    margin: 16px;
}

.ant-layout-sider,
.ant-layout-header {
    z-index: 10;
}
</style>