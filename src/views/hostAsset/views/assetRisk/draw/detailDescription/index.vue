<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-07 16:13:42
 * @LastEditTime: 2023-10-13 16:32:21
-->
<template>
  <div>
    <div class="description">
      <!-- 加粗标题 -->
      <div class="heavy-title">{{ t('asset.vulDescription') }}</div>
      <span class="content">
        {{ detailData.description }}
      </span>
    </div>
    <div class="suggestion">
      <div class="heavy-title">{{ t('asset.repairSuggestion') }}</div>
      <span class="content">
        {{ detailData.proposal }}
      </span>
    </div>
    <div class="link">
      <div class="heavy-title">{{ t('asset.refLink') }}</div>
      <span class="linkItem" v-for="item in detailData.refs" :key="item" :title="item">
        <a :href="item" target="_blank">{{ item }}</a>
      </span>
    </div>
    <!-- 信息验证 start -->
    <div class="details" v-if="!!host_id">
      <div class="heavy-title">{{ t('asset.xxyz') }}</div>
      <label-value :dataSource="msgValidate">
        <template #current_version="{ text }">
          <column-mul-data :dataList="text" />
        </template>
        <template #related_info="{ text }">
          <column-mul-data :dataList="text" />
        </template>
      </label-value>
    </div>
    <!-- 信息验证 end -->

    <!-- 漏洞详情 start -->
    <div class="details">
      <div class="heavy-title">{{ t('asset.vulnerabilityDetail') }}</div>
      <label-value :dataSource="details">
        <template #riskLevel="{ text }">
          {{ text ? t(`asset.${text}`) : '' }}
        </template>
        <template #affectedVersion="{ text }">
          <column-mul-data :dataList="text" />
        </template>
        <template #detectionWay="{ text }">
          {{ text ? t(`asset.${vulDetectionWay[text]}`) : '' }}
        </template>
      </label-value>
    </div>
    <!-- 漏洞详情 end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, watchEffect, PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import labelValue from '../../../../components/labelValue';
  import { vulRiskLevel, vulDetectionWay } from '@/enums/assetsType';
  import columnMulData from '@/views/hostAsset/components/columnMulData';
  import { detailType } from '../type';

  const props = defineProps({
    detailData: {
      type: Object as PropType<detailType>,
      required: true,
    },
    host_id: {
      type: String,
    },
  });
  const { t } = useI18n();
  //信息验证
  const msgValidate = reactive<{ current_version: string[]; related_info: string[] }>({
    current_version: [],
    related_info: [],
  });
  //漏洞详情
  const details = reactive<{
    cveCode: string;
    riskLevel: string;
    affectedVersion: string[];
    detectionWay: vulDetectionWay;
  }>({
    cveCode: '', // CVE编号
    riskLevel: '', // 危险等级
    affectedVersion: [], // 受影响系统/应用版本
    detectionWay: vulDetectionWay.compareVersion, //检测方式
  });
  watchEffect(() => {
    if (Object.keys(props.detailData).length !== 0) {
      const { cve_code, level, scope, verify_type, current_version, related_info } =
        props.detailData;
      details.cveCode = cve_code;
      details.riskLevel = vulRiskLevel[level].split(',')[0];
      details.affectedVersion = scope;
      details.detectionWay = verify_type;

      msgValidate.current_version = current_version ?? ['1', '2', '3', '4'];
      msgValidate.related_info = related_info ?? ['aaaa'];
    }
  });
</script>
<style lang="less" scoped>
  .heavy-title {
    margin: 20px 0 16px 0;
    font-size: @fz14;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
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
  .details {
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
  }
</style>
