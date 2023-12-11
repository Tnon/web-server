<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    @openChange="openChange"
    overlayClassName="advanF"
    destroyTooltipOnHide
    :open="showPop"
  >
    <template #content>
      <div class="formitem">
        <div class="items">
          <div class="label">{{ t('log.adminRole') }}</div>
          <a-select
            v-model:value="u_typeCmp"
            :placeholder="t('operation.defaultAll')"
            class="select"
            allowClear
          >
            <template v-for="item in u_typeOptions" :key="item.id">
              <a-select-option :value="item.id">{{ item.role_name }}</a-select-option>
            </template>
          </a-select>
        </div>
      </div>
      <div class="formitem">
        <div class="items">
          <div class="label">{{ t('user.enaStu') }}</div>
          <a-select
            v-model:value="enableCmp"
            :placeholder="t('operation.defaultAll')"
            class="select"
            allowClear
          >
            <template v-for="item in enableOptions" :key="item.key">
              <a-select-option :value="item.key">{{ item.value }}</a-select-option>
            </template>
          </a-select>
        </div>
      </div>
    </template>
    <a-button type="text" :class="{ filteractived: showPop }">
      <template #icon>
        <customIcon type="#ax-Filters" class="btnIcon" />
      </template>
      <slot></slot>
    </a-button>
  </a-popover>
</template>
<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { getUtypes } from '@/api/operation/user';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    u_type: {
      type: Number,
    },
    enable: {
      type: Number,
    },
  });
  const emit = defineEmits(['update:u_type', 'update:enable']);
  const { t } = useI18n();
  //用户类型数据
  const u_typeOptions = ref<any>([]);
  //启用类型数据
  const enableOptions = [
    {
      value: t('common.enable'),
      key: 1,
    },
    {
      value: t('common.unEnable'),
      key: 2,
    },
  ];
  //手动控制popover
  const showPop = ref<boolean>(false);
  const openChange = async (b) => {
    if (b) {
      const { code, items } = await getUtypes();
      if (!code) {
        u_typeOptions.value = items;
      }
    }
    showPop.value = b;
  };
  //启用状态中介
  const enableCmp = computed({
    get: (): number => props.enable!,
    set: (val: number): void => emit('update:enable', val),
  });
  //角色类型中介
  const u_typeCmp = computed({
    get: (): number => props.u_type!,
    set: (val: number): void => emit('update:u_type', val),
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
      width: 400px;
      height: 1px;
      background: #eee;
      border-radius: 8px;
      margin: 16px 0 8px 0;
    }

    width: 400px;
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
      .select {
        flex: 1;
      }
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
