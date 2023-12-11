<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-19 11:28:17
 * @LastEditTime: 2023-03-09 11:15:26
-->
<template>
  <div class="userContainer">
    <!-- 返回 start -->
    <div class="backtext" @click="goBack">
      <LeftOutlined class="back" />
      {{ t('reinforce.rule_count') }}：
      <countTo :endVal="totalNum" />
    </div>
    <!-- 返回 end -->
    <slots-table
      :scroll="{ y: 'calc(100vh - 176px)' }"
      ref="tableRef"
      :columns="columns"
      v-model:total-num="totalNum"
      row-key="rule_code"
      :arguments="{}"
      :get-list-func="getRulesList"
    />
  </div>
</template>

<script lang="ts" setup>
  import { SlotsTable } from '@/components/slots-table';
  import { getRulesList } from '@/api/reinforce';
  import { useColumns } from './index';
  import { useI18n } from 'vue-i18n';
  import { LeftOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';
  const { t } = useI18n();
  const columns = useColumns(t);
  const router = useRouter();
  //返回
  const goBack = () => {
    router.go(-1);
  };
  const totalNum = ref(0);
</script>
<style lang="less" scoped>
  .userContainer {
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 16px;
    background: rgba(0, 0, 0, 0.04);

    .backtext {
      padding: 16px 0;
      display: flex;
      align-items: center;
      font-size: @fz16;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;
      .back {
        margin-right: 8px;
      }
    }
  }
</style>
