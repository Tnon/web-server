<template>
  <div class="con">
    <div class="heavy-title">{{ t('asset.refLink') }}</div>
    <!-- 补丁编号 start -->
    <div class="dataItem">
      <div class="label">{{ t('reinforce.bdbh') }}</div>
      <div class="value">
        {{ dataSource.patch_code }}
      </div>
    </div>
    <!-- 补丁编号 end -->

    <!-- 补丁发布时间 start -->
    <div class="dataItem">
      <div class="label">{{ t('reinforce.bdfbsj') }}</div>
      <div class="value">
        {{ dataSource.public_date }}
      </div>
    </div>
    <!-- 补丁发布时间 end -->

    <!-- 检测方式 start -->
    <div class="dataItem">
      <div class="label">{{ t('asset.drawerdetectionWay') }}</div>
      <div class="value">
        {{
          ~~dataSource.verify_type === vulDetectionWay.compareVersion
            ? t('asset.compareVersion')
            : t('asset.pocVerify')
        }}
      </div>
    </div>
    <!-- 检测方式 end -->

    <!-- 参考信息 start -->
    <div class="dataItem">
      <div class="label">{{ t('asset.refLink') }}</div>
      <span class="linkItem" v-for="item in dataSource.ref_links" :key="item" :title="item">
        <a :href="item" target="_blank">{{ item }}</a>
      </span>
    </div>
    <!-- 参考信息 end -->

    <!-- 补丁获取链接 start -->
    <div class="dataItem">
      <div class="label">{{ t('reinforce.bdhqlj') }}</div>
      <span class="linkItem" v-for="item in dataSource.acquire_links" :key="item" :title="item">
        <a :href="item" target="_blank">{{ item }}</a>
      </span>
    </div>
    <!-- 补丁获取链接 end -->

    <!-- 雷达图 start -->
    <radar-chart :cvssData="dataSource.cvss" :level="dataSource.vul_level" />
    <!-- 雷达图 end -->
  </div>
</template>

<script setup lang="ts">
  import { vulDetectionWay } from '@/enums/assetsType';
  import radarChart from '@/views/hostAsset/views/assetRisk/draw/radarChart';
  import { useI18n } from 'vue-i18n';
  defineProps({
    dataSource: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .con {
    padding: 0 16px;
  }
  .heavy-title {
    margin: 20px 0 16px 0;
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
  }
  .dataItem {
    margin: 16px 0;
    font-size: @fz12;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);

    display: flex;
    align-items: flex-start;
    .label {
      // flex: 0 0 138px;
      min-width: 138px;
      display: inline-block;
      color: rgb(0 0 0 / 90%);
    }
    .value {
      word-break: break-word;
    }
  }
  .link {
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
  }
  .linkItem {
    width: 100%;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 4px 0;
  }
</style>
