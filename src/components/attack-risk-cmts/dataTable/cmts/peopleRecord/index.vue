<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-08 09:55:04
 * @LastEditTime: 2023-08-08 18:50:11
-->
<template>
  <a-button type="text" class="precord" @click="openRecord">
    <template #icon>
      <align-left-outlined />
    </template>
    {{ t('arcomn.perrecod') }}
  </a-button>
</template>

<script setup lang="ts">
  import { MODELTYPE } from '@/enums/attack_risk';
  import { useModal } from '@/hooks';
  import { AlignLeftOutlined } from '@ant-design/icons-vue';
  import { PropType } from 'vue';
  import { useI18n } from 'vue-i18n';
  import recordDetail from './cmts/recordDetail';
  const props = defineProps({
    source: {
      type: Number as PropType<MODELTYPE>,
      required: true,
    },
    fromAsset: {
      type: Boolean,
    },
    search_data: {
      type: String,
    },
  });
  const { t } = useI18n();
  //打开人工处置弹窗
  const openRecord = () => {
    useModal(
      {
        title: t('arcomn.perrecod'),
        width: 1080,
        footer: false,
        wrapClassName: 'noheadModal',
        contentProps: {
          source: props.source,
          fromAsset: props.fromAsset,
          search_data: props.search_data,
        },
      },
      recordDetail,
    );
  };
</script>

<style scoped></style>
