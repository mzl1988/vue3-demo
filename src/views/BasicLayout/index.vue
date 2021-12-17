<template>
    <a-layout>
        <a-layout-header
            :style="{ position: 'fixed', zIndex: 2, width: '100%', padding: 0 }"
            class="flex flex-row items-center"
        >
            <img src="@/assets/images/logo.png" width="30" class="mx-4" />
            <span v-if="screens !== 'sm'" class="text-white text-xl">Ant Design Pro</span>
            <template v-if="screens === 'sm'">
                <MenuUnfoldOutlined
                    v-if="opened"
                    class="trigger"
                    @click="() => (opened = !opened)"
                />
                <MenuFoldOutlined v-if="!opened" class="trigger" @click="() => (opened = !opened)" />
            </template>

            <div class="flex-1 flex flex-row justify-end">
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
                            <a-menu-item @click="signOut()">
                                <LogoutOutlined />
                                <span class="ml-2">Sign out</span>
                            </a-menu-item>
                        </a-menu>
                    </template>
                </a-dropdown>
            </div>
        </a-layout-header>
        <a-layout>
            <a-layout-sider
                v-if="screens !== 'sm'"
                v-model:collapsed="collapsed"
                collapsible
                theme="light"
                :width="siderWidth"
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
                :style="{ marginLeft: screens === 'sm' ? '0' : collapsed ? '80px' : siderWidth + 'px' }"
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
    <a-drawer
        :width="siderWidth"
        :bodyStyle="{ padding: 0 }"
        :visible="opened"
        :closable="closable"
        placement="left"
        @close="onClose"
    >
        <a-menu
            v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            mode="inline"
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
    </a-drawer>
</template>
<script lang="ts" setup>
import { onMounted, reactive, toRefs, watch } from "vue"
import SubMenu from '@/components/SubMenu.vue'
import {
    PieChartOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router'
import _ from 'lodash'
import { useWindowResize } from "@/hooks"
const { width } = useWindowResize()
const router = useRouter()
import { useUserStore } from '@/stores/user'
import { ItemGroup } from "ant-design-vue/lib/menu";
const userStore = useUserStore()

const onClose = () => {
    data.opened = false;
};

const signOut = () => {
    userStore.logout()
}
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
    screens: string,
    siderWidth: number,
    list: any[],
    openKeys: string[],
    selectedKeys: string[],
    collapsed: boolean,
    opened: boolean,
    closable: boolean,
}

const data: Data = reactive({
    screens: 'lg',
    siderWidth: 220,
    list: [
        {
            key: 'dashboard_page',
            title: 'Dashboard',
            icon: PieChartOutlined,
        },
        {
            key: 'terms_and_conditions_page',
            title: 'Terms And Conditions',
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
    opened: false,
    closable: false,
})

watch(
    () => width.value,
    (numNew, numOld) => {
        if (numNew <= 768) {
            data.screens = 'sm'
            data.collapsed = true
        } else if (numNew < 988) {
            data.screens = 'md'
            data.collapsed = true
        } else {
            data.screens = 'lg'
            data.collapsed = false
        }
    },
    { immediate: true }
)


const { screens, siderWidth, list, openKeys, selectedKeys, collapsed, opened, closable } = { ...toRefs(data) }
</script>
<style lang="less" scoped>
.trigger {
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
    color: #ffffff;
}
.trigger:hover {
    color: #1890ff;
}

.logo {
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 40px;
    background: rgba(255, 255, 255, 0.3);
}

.space-item {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    color: #fff;
    cursor: pointer;
}

.site-layout-background {
    background: #fff;
}

.ant-layout-sider {
    height: 100vh;
    position: fixed;
    z-index: 1;
    overflow: auto;
    padding-top: 64px;
}

/deep/ .ant-layout-sider-trigger {
    border-top: 1px solid rgba(0, 0, 0, 0.06) !important;
}
</style>