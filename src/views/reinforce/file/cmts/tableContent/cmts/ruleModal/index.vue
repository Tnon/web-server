<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-03-14 10:34:02
 * @LastEditTime: 2023-03-14 10:40:11
-->
<template>
  <div v-if="!policy_del" @click="openRuleModal" class="name cmn" :title="rule_name">
    {{ rule_name }}
  </div>
  <div class="cmn" v-else :title="rule_name">{{ rule_name }}</div>
</template>

<script setup lang="ts">
  import { useModal } from '@/hooks';
  import { useI18n } from 'vue-i18n';
  import ruleDetail from '../../../ruleDetail';

  const props = defineProps({
    rule_name: String,
    policy_id: Number,
    policy_del: Boolean,
  });
  const { t } = useI18n();
  const openRuleModal = () => {
    useModal(
      {
        title: t('reinforce.rulede'),
        wrapClassName: 'noheadModal',
        footer: false,
        width: 800,
        contentProps: {
          id: props.policy_id,
        },
      },
      ruleDetail,
    );
  };
</script>

<style scoped lang="less">
  .cmn {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .name {
    cursor: pointer;
    width: 100%;
  }
</style>
