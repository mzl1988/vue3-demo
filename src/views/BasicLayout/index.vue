<template>
    <a-layout>
        <a-layout-header :style="{ position: 'fixed', zIndex: 2, width: '100%', padding: 0 }">
            <div class="logo" />
            <div class="header-spaces">
                <a-dropdown placement="bottomCenter">
                    <div class="space-item">
                        <img
                            src="@/assets/images/user.png"
                            :style="{ width: '30px', height: '30px' }"
                        />
                        <span class="ml-2">Serati Ma</span>
                    </div>
                    <template #overlay>
                        <a-menu>
                            <a-menu-item>1st menu item</a-menu-item>
                            <a-menu-item>1st menu item</a-menu-item>
                            <a-menu-divider />
                            <a-menu-item>1st menu item</a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider
                :style="{ width: '200px', height: '100vh', position: 'fixed', zIndex: 1, overflow: 'auto', paddingTop: '64px' }"
                v-model:collapsed="collapsed"
                collapsible
                theme="light"
            >
                <a-menu
                    v-model:selectedKeys="selectedKeys"
                    v-model:openKeys="openKeys"
                    mode="inline"
                    @click="handleClick"
                    :style="{ height: '100%', borderRight: 0 }"
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
            <a-layout
                style="padding: 0 24px 24px; margin-top: 64px;"
                :style="{ marginLeft: collapsed ? '80px' : '200px' }"
            >
                <router-view v-slot="{ Component, route }">
                    <keep-alive>
                        <component :is="Component" v-if="route.meta.keepAlive"></component>
                    </keep-alive>
                    <component :is="Component" v-if="!route.meta.keepAlive"></component>
                </router-view>
                <a-layout-footer
                    :style="{ textAlign: 'center' }"
                >Ant Design ©2018 Created by Ant UED</a-layout-footer>
            </a-layout>
        </a-layout>
    </a-layout>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs, watch } from "vue"
import SubMenu from '@/components/SubMenu.vue'
import {
    PieChartOutlined,
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'
import _ from 'lodash'
import { useWindowResize } from "@/hooks"
const { width, height } = useWindowResize()
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
                router.push({ name: menu.key })
            }
            break
        }
        if (menu.children) {
            findActiveRouter(key, menu.children, menu, toPage)
        }
    }
}




onMounted(async () => {
    router.afterEach((to) => {
        findActiveRouter(to.name as string, data.list, null, false)
    })
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

watch(
    () => width.value,
    (numNew, numOld) => {
        data.collapsed = numNew > 768 ? false : true
    },
    { immediate: true }
)


const { list, openKeys, selectedKeys, collapsed } = { ...toRefs(data) }
</script>
<style lang="less" scoped>
.logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 40px;
    background: rgba(255, 255, 255, 0.3);
}

.header-spaces {
    float: right;

    .space-item {
        display: flex;
        align-items: center;
        height: 64px;
        padding: 12px;
        color: #fff;
        cursor: pointer;
    }
}

.site-layout-background {
    background: #fff;
}

/deep/ .ant-layout-sider-trigger {
    border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
}
</style>