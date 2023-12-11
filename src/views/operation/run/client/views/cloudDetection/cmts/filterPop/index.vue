<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:34:55
 * @LastEditTime: 2023-07-27 14:21:45
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 标签 start -->
        <div class="formitems">
          <div class="label">{{ t('common.tag') }}</div>
          <a-input-search
            :placeholder="t('common.tagPlace')"
            v-model:value.trim="tagsString"
            @change="onSearch"
            @search="onSearch"
          />
        </div>
        <!-- 标签 end -->
        <!-- 在线状态 start -->
        <div class="formitems">
          <div class="label">{{ t('operation.onlinstau') }}</div>
          <a-select
            v-model:value="agms.online"
            :placeholder="t('common.onlineStau')"
            class="select"
            allowClear
          >
            <template v-for="item in onlineOptions" :key="item.key">
              <a-select-option :value="item.key">{{ item.value }}</a-select-option>
            </template>
          </a-select>
        </div>
        <!-- 在线状态 end -->
        <!-- 分组 start -->
        <div class="formitems">
          <div class="label">{{ t('common.group') }}</div>
          <span class="select">
            <hostGroupSelect
              v-model:selectedGroupIds="agms.groups"
              :placeholder="t('common.selectGroup')"
              :multiple="true"
            />
          </span>
        </div>
        <!-- 分组 end -->
      </div>
    </template>
    <!-- 筛选按钮 start -->
    <a-button type="text" class="batchbtn">
      <template #icon>
        <customIcon type="#ax-Filters" class="btnIcon" />
      </template>
      {{ t('common.filter') }}
      <span class="flag" v-if="StateEffect"></span>
    </a-button>
    <!-- 筛选按钮 end -->
  </a-popover>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import hostGroupSelect from '@/components/host-group-select';
  import { PropType, computed, ref } from 'vue';
  import { CloudDetectionFilter } from '@/api/operation/model';
  import { useSelectOptions } from '.';
  const props = defineProps({
    agms: {
      type: Object as PropType<CloudDetectionFilter>,
      required: true,
    },
    refreshTable: Function,
  });
  const { t } = useI18n();
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in props.agms) {
      if (k !== 'searchdata' && k !== 'osver') {
        const kvalue = props.agms[k] === undefined ? '' : props.agms[k];
        flag += kvalue;
      }
    }
    return flag;
  });

  //下拉框数据
  // runingOptions
  const { onlineOptions } = useSelectOptions(t);
  const tagsString = ref<string>('');
  // 触发逻辑：1、点击搜索或enter键按钮触发；2、输入框值为空时触发
  const onSearch = (v, e) => {
    const { value } = v.target ?? { value: v };
    // 1、点击搜索或enter键按钮触发，而输入时不触发
    if (e && value) {
      // emit('update:tags', value.split('/').join(','));
      props.agms.tags = value.split('/').join(',');
    }
    // 2、输入框值为空时自动触发
    if (!value && !e) {
      props.agms.tags = '';
    }
  };
</script>

<style scoped lang="less">
  .container {
    width: 480px;
    padding: 16px 15px;
    .header {
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin-bottom: 8px;
    }
    .line {
      height: 1px;
      background: rgba(0, 0, 0, 0.04);
      margin: 16px 0;
    }
    .formitems {
      display: flex;
      align-items: center;
      padding: 4px 0;
      .label {
        flex: 80px 0 0;
      }
      .select {
        flex: 1;
      }
    }
  }
  .batchbtn {
    position: relative;
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 0px;
      background: #18ba79;
    }
  }
</style>
