<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-19 16:04:11
 * @LastEditTime: 2023-02-06 17:15:29
-->
<template>
  <div class="container">
    <!-- 属性 start -->
    <template v-if="column === 'attr'">
      <template v-for="(item, index) in attrRuleValue" :key="index">
        <div class="tdNode" :title="item.attribute">
          {{ item.attribute ? t(`arcomn.${item.attribute}`) : '-' }}
        </div>
      </template>
    </template>
    <!-- 属性 end -->
    <!-- 规则 start -->
    <template v-if="column === 'rule'">
      <template v-for="(item, index) in attrRuleValue" :key="index">
        <div class="tdNode" v-if="item.attr_values.length">
          {{ getRuleName(t, item.attr_values[0].rules!) }}
        </div>
      </template>
    </template>
    <!-- 规则 end -->
    <!-- 属性值 start -->
    <template v-if="column === 'value'">
      <template v-for="(item, index) in attrRuleValue" :key="index">
        <div
          class="tdNode primary"
          @click="openAttrValues(index, item.attr_values[0].logic)"
          v-if="item.attr_values.length > 1"
        >
          {{
            item.attr_values.length +
            ' (' +
            (item.attr_values[0].logic === 'or' ? t('arcomn.or') : t('arcomn.and')) +
            ')'
          }}
        </div>
        <div
          class="tdNode"
          :title="item.attr_values[0]['value']"
          v-else-if="item.attr_values.length === 1"
        >
          {{ item.attr_values[0]['value'] }}
        </div>
      </template>
    </template>
    <!-- 属性值 end -->
  </div>
</template>

<script setup lang="ts">
  import { IThreatRules } from '@/components/handle-dymic-form/handleWhite/type';
  import { useModal } from '@/hooks';
  import { PropType, createVNode } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getRuleName } from '.';
  import attrValues from '../attrValues';
  const props = defineProps({
    column: {
      type: String,
    },
    attrRuleValue: {
      type: Array as PropType<IThreatRules[]>,
      required: true,
    },
  });
  const { t } = useI18n();
  //打开属性值弹框
  const openAttrValues = (index, logic) => {
    useModal(
      {
        title: t('strategy.attr') + '(' + (logic === 'or' ? t('arcomn.or') : t('arcomn.and')) + ')',
        footer: false,
        width: 800,
        contentProps: {
          attrValues: props.attrRuleValue[index].attr_values,
          logic,
        },
      },
      createVNode(attrValues),
    );
  };
</script>

<style scoped lang="less">
  .container {
    margin: -12px !important;
  }
  .tdNode {
    padding: 20px 12px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    &:last-child {
      border-bottom: none;
    }
  }
  .primary {
    color: @primary-color;
    cursor: pointer;
  }
</style>
