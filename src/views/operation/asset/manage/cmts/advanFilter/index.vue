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
      <div class="title">{{ t('asset.basFilter') }}</div>
      <div class="formitem">
        <template v-for="item in formItems" :key="item.key">
          <div class="items">
            <div class="label">{{ t(item.label) }}</div>
            <switch-nodes
              size="small"
              v-model:actived="state[item.key]"
              :types="item.filters"
              :style="{ padding: '4px 10px' }"
            />
          </div>
        </template>
      </div>
      <div class="title">{{ t('asset.expFilter') }}</div>
      <div class="formitem">
        <!-- 主机分组 start -->
        <div class="items">
          <div class="label">{{ t('common.group') }}</div>
          <hostGroupSelect
            v-model:selectedGroupIds="swtGroups"
            :placeholder="t('common.selectGroup')"
            :multiple="true"
          />
        </div>
        <!-- 主机分组 end -->
        <!-- 系统信息 start -->
        <div class="items">
          <div class="label">{{ t('asset.systemInfo') }}</div>
          <a-input-search
            style="flex: 1"
            v-model:value.trim="osSelf"
            :placeholder="t('operation.defaultAll')"
            @search="searchSysInfo"
            @change="searchSysInfo"
          />
        </div>
        <!-- 系统信息 end -->
        <!-- 标签 start -->
        <div class="items">
          <div class="label">{{ t('common.tag') }}</div>
          <a-input-search
            style="flex: 1"
            :placeholder="t('common.tagPlace')"
            v-model:value.trim="tagsSelf"
            @change="onSearch"
            @search="onSearch"
          />
        </div>
        <!-- 标签 end -->
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
  import switchNodes from '@/components/switchNodes';
  import hostGroupSelect from '@/components/host-group-select';
  import { PropType, computed, ref, reactive } from 'vue';
  import { formItems } from './index';
  import { useI18n } from 'vue-i18n';
  import { ONLINESTATUS } from '@/enums/assetsType';
  const props = defineProps({
    online: {
      type: Number as PropType<ONLINESTATUS>,
      required: true,
    },
    tags: {
      type: String,
      required: true,
    },
    os: {
      type: String,
      required: true,
    },
    groups: {
      type: String,
    },
  });
  const emit = defineEmits(['update:online', 'update:tags', 'update:os', 'update:groups']);
  const { t } = useI18n();
  //手动控制popover
  const showPop = ref<boolean>(false);
  const openChange = (b) => {
    showPop.value = b;
  };
  //中介可以用对象。此处用的栈存储
  //在线中介
  const swtOnline = computed({
    get: (): ONLINESTATUS => props.online!,
    set: (val: ONLINESTATUS): void => emit('update:online', val),
  });
  //分组中介
  const swtGroups = computed({
    get: (): string => props.groups!,
    set: (val: string): void => emit('update:groups', val),
  });
  // 系统信息（可和下面标签搜索合并）
  const osSelf = ref<string>('');
  // 触发逻辑：1、点击搜索或enter键按钮触发；2、输入框值为空时触发
  const searchSysInfo = (v, e) => {
    const { value } = v.target ?? { value: v };
    // 1、点击搜索或enter键按钮触发，而输入时不触发
    if (e && value) {
      emit('update:os', value.split('/').join(','));
    }
    // 2、输入框值为空时自动触发
    if (!value && !e) {
      emit('update:os', value);
    }
  };
  //标签单独
  const tagsSelf = ref<string>('');
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      emit('update:tags', value.split('/').join(','));
    }
    if (!value && !e) {
      emit('update:tags', value);
    }
  };
  const state = reactive({ swtOnline });
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
