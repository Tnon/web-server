<template>
  <div class="header">
    <!-- 头部 start -->
    <div class="title">
      <LeftOutlined class="back" @click="goBack" />
      <custom-icon size="48" class="cusicon" :type="osLogo" />
      <div class="riOp">
        <div class="riRow">
          <span class="ip">{{ state.ip }}</span>
          <span class="isOnline offline" v-if="state.online === ONLINESTATUS.OFFLINE">
            <a-badge color="#ddd" />
            {{ t('common.offLine') }}
          </span>
          <span class="isOnline offline" v-else-if="state.online === ONLINESTATUS.UNINSTALL">
            <a-badge color="#ddd" />
            {{ t('common.uninstall') }}
          </span>
          <span class="isOnline online" v-else>
            <a-badge status="processing" color="#18BA79" />
            {{ t('common.onLine') }}
          </span>
        </div>
        <div class="riRow">
          <span class="host_time">{{ state.hostname }}</span>
          <span class="host_time" v-if="state.online !== ONLINESTATUS.ONLINE">
            <span> {{ t('common.offLineTime') }}：</span>
            <span>{{ state.last_offline_at }}</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 头部 end -->

    <!-- 菜单栏开始 -->
    <div class="topMenu">
      <div class="assTopMenu">
        <top-menu :menus="allRouters" mode="horizontal" :needPermission="false" />
      </div>
      <div v-if="!currentRoute.meta.title!.includes('policyMenu')">
        <span class="timeText">{{ t('asset.updDate') }}：{{ updateTime }}</span>
        <a-button
          type="link"
          :loading="loading"
          @click="refresh"
          :disabled="loading || state.online === ONLINESTATUS.OFFLINE"
        >
          {{ loading ? t('asset.dataUpdating') : t('asset.updataNow') }}
        </a-button>
      </div>
    </div>
    <!-- 菜单栏结束 -->
  </div>
</template>

<script lang="ts" setup>
  import { computed, onUnmounted, reactive, ref, unref } from 'vue';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import { assetRoutes } from '@/router/modules/hostAsset/assetInfo/detail';
  import TopMenu from '@/setLayout/menu.vue';
  import { useRouter, useRoute } from 'vue-router';
  import { hostDetailHead, isCanRefreshAsset, getHostUpdateTime } from '@/api/asset/hostInfo/host';
  import { hostDetai } from './index';
  import { deleteNode, osLogoType } from '@/utils/tools';
  import { useI18n } from 'vue-i18n';
  import { ONLINESTATUS } from '@/enums/assetsType';
  import { useProductLogo } from '@/store/modules/product-logo';
  import { cloneDeep } from 'lodash';
  const props = defineProps({
    id: String,
  });
  const emit = defineEmits(['refreshContent']);
  const { t } = useI18n();
  const osLogo = ref<string>('');
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  // 路由跳转
  const router = useRouter(),
    currentRoute: any = useRoute();
  const goBack = () => {
    router.go(-1);
  };
  let timer: any = null;
  //立即更新
  const loading = ref<boolean>(false);
  const updateTime = ref<string>('');
  // 获取更新时间
  const getUpdateTime = async () => {
    const { info_time } = await getHostUpdateTime(props.id!);
    updateTime.value = info_time;
  };
  getUpdateTime();

  const refresh = async () => {
    loading.value = true;
    //判断是否可以进入轮询
    const { code } = await isCanRefreshAsset({ type: 1, mac: props.id! });
    //可以轮询
    if (!code) {
      timer = setInterval(async () => {
        const { is_success, code } = await isCanRefreshAsset({ type: 2, mac: props.id! });
        if (code) {
          clearInterval(timer);
        }
        if (is_success === 1) {
          await getDetail();
          emit('refreshContent');
          getUpdateTime();
          loading.value = false;
          clearInterval(timer);
        }
      }, 5000);
    }
  };
  //状态仓
  const state = reactive<hostDetai>({
    online: ONLINESTATUS.OFFLINE,
    last_offline_at: '',
    os: '',
    hostname: '',
    ip: '',
  });
  //请求接口
  const getDetail = async () => {
    const res = await hostDetailHead(props.id!);
    for (let k in state) {
      state[k] = res[k];
    }
    osLogo.value = unref(osLogoType(state.os, state.online));
  };
  getDetail();
  //全部路由
  const allRouters = computed(() =>
    unref(acdr_enabled)
      ? assetRoutes
      : deleteNode(cloneDeep(assetRoutes), 'hostAsset-layout-assetInfo-host-detail-acdr'),
  );

  onUnmounted(() => {
    clearInterval(timer);
  });
</script>

<style lang="less" scoped>
  @import url('./index.less');
</style>
