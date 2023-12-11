<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-06 14:18:14
 * @LastEditTime: 2023-08-11 14:18:42
-->
<template>
  <div class="container">
    <template v-for="(item, key) in filterTitle" :key="key">
      <div class="cardFilter" @click="toggleFilter(key)">
        <div class="line" :class="{ active: actived == key }"></div>
        <div class="content">
          <div class="value">{{ item }}</div>
          <div class="num">{{ filterValue[`${key}_count`] }}</div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { HostDetailAssetStatic } from '@/api/asset/hostInfo/host';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    actived: {
      type: String,
      required: true,
    },
    id: String,
  });
  const emit = defineEmits(['update:actived']);
  const { t } = useI18n();
  //筛选节点
  const filterTitle = {
    process: t('asset.process'),
    port: t('asset.port'),
    account: t('asset.account'),
    service: t('asset.service'),
    kernel: t('asset.kernel'),
    environment: t('asset.env'),
    // share: t('asset.share'), // 1025去掉共享文件夹
    webservice: t('asset.webservice'),
    webframe: t('asset.webframe'),
    website: t('asset.website'),
    webapp: t('asset.webapp'),
    app: t('asset.app'),
    database: t('asset.database'),
    package: t('asset.package'),
    jar: t('asset.jar'),
    python: t('asset.python'),
    npm: t('asset.npm'),
    task: t('asset.task'),
    xinetd: t('asset.xinetd'),
    webjs: t('asset.webjs'),
    webapi: t('asset.webapi'),
  };
  //节点值仓
  const filterValue = reactive({
    account_count: 0,
    environment_count: 0,
    kernel_count: 0,
    port_count: 0,
    process_count: 0,
    service_count: 0,
    share_count: 0,
    webservice_count: 0,
    webframe_count: 0,
    website_count: 0,
    webapp_count: 0,
    app_count: 0,
    database_count: 0,
    package_count: 0,
    jar_count: 0,
    python_count: 0,
    npm_count: 0,
    task_count: 0,
    xinetd_count: 0,
    webjs_count: 0,
    webapi_count: 0,
  });
  //切换节点
  const toggleFilter = (key: string): void => {
    emit('update:actived', key);
  };
  //获取值
  const getStatic = async () => {
    const res = await HostDetailAssetStatic(props.id!);
    for (let k in filterValue) {
      filterValue[k] = res[k] || 0;
    }
  };
  getStatic();
</script>

<style lang="less" scoped>
  .container {
    margin: 16px 0px;
    display: flex;
    justify-content: flex-start;
    overflow: auto;
  }
  .cardFilter {
    padding: 10px;
    // min-width: 100px;
    height: 64px;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    justify-content: flex-start;
    margin-right: 10px;

    cursor: pointer;
  }
  .line {
    width: 6px;
    height: 20px;
    border-radius: 8px;
    margin-right: 8px;
    background: #f8f8f8;
  }
  .active {
    background: #18ba79;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: -3px;
    .value {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      line-height: 20px;
      word-break: keep-all;
    }
    .num {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      line-height: 24px;
    }
  }
</style>
