<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-01-10 14:25:20
 * @LastEditTime: 2023-04-07 18:02:39
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="advanF" destroyTooltipOnHide>
    <template #content>
      <div class="title">{{ t('asset.expFilter') }}</div>
      <div class="formitem">
        <div class="items">
          <div class="label">{{ t('operation.blbs') }}</div>
          <businessGroupSelect
            :multiple="false"
            v-model:selectedGroupIds="swtGroupsCmp"
            :placeholder="t('common.selectGroup')"
          />
        </div>
      </div>
    </template>
    <a-button type="text">
      <template #icon>
        <customIcon type="#ax-Filters" class="btnIcon" />
      </template>
      <slot></slot>
    </a-button>
  </a-popover>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import businessGroupSelect from '@/components/business-group-select';
  import { useI18n } from 'vue-i18n';
  import { GROUPENUM } from '@/enums/moveGroup';
  const props = defineProps({
    business_group_id: Number,
  });
  const emit = defineEmits(['update:business_group_id']);
  const { t } = useI18n();
  //分组中介
  const swtGroupsCmp = computed({
    get: () => (props.business_group_id === GROUPENUM.ALL ? undefined : props.business_group_id),
    set: (val: number | undefined): void => {
      emit('update:business_group_id', val ?? GROUPENUM.ALL);
    },
  });
</script>
<style lang="less">
  .advanF {
    .ant-popover-inner {
      padding: 8px 0;
    }
    .ant-popover-inner-content {
      padding: 0;
    }
    .line {
      width: 500px;
      height: 1px;
      background: #eee;
      border-radius: 8px;
      margin: 16px 0 8px 0;
    }

    width: 500px;
    .title {
      height: 36px;
      line-height: 36px;
      padding: 0 16px;
      font-size: @fz12;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
    .label {
      min-width: 100px;
    }
    .items {
      height: 40px;
      display: flex;
      align-items: center;
      margin: 4px 0;
    }
    .jbtn {
      justify-content: space-between;
    }
    .formitem {
      padding: 0 16px;
    }
  }

  .filteractived {
    background: #eee !important;
  }
</style>
