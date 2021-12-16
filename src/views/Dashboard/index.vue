<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item>Home</a-breadcrumb-item>
    <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
  </a-breadcrumb>
  <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }">
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
    <div class="mt-4">
      <a-input placeholder="Basic usage" />
    </div>
    <img src="@/assets/images/cat.jpg" />
  </a-layout-content>
</template>
