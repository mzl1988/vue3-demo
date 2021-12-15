<template>
    <a-sub-menu :key="menuInfo.key">
        <template #icon>
            <UserOutlined />
        </template>
        <template #title>{{ menuInfo.title }}</template>
        <template v-for="item in menuInfo.children" :key="item.key">
            <template v-if="!item.children">
                <a-menu-item :key="item.key">
                    <template #icon>
                        <HIcon :icon="item.icon" />
                    </template>
                    {{ item.title }}
                </a-menu-item>
            </template>
            <template v-else>
                <sub-menu :menu-info="item" />
            </template>
        </template>
    </a-sub-menu>
</template>
<script setup lang="ts">
import {
    UserOutlined
} from '@ant-design/icons-vue';
import HIcon from '@/components/HIcon.vue';
const props = defineProps({
    menuInfo: {
        type: Object,
        default: () => ({}),
    },
})
</script>