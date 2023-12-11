<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:34:55
 * @LastEditTime: 2023-07-27 14:22:16
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 在线状态 start -->
        <div class="formitems">
          <div class="label">{{ t('operation.onlinstau') }}</div>
          <a-select
            v-model:value="agms.online"
            :placeholder="t('operation.defaultAll')"
            class="select"
            allowClear
          >
            <template v-for="item in onlineOptions" :key="item.key">
              <a-select-option :value="item.key">{{ item.value }}</a-select-option>
            </template>
          </a-select>
        </div>
        <!-- 在线状态 end -->
        <!-- 运行状态 start -->
        <div class="formitems">
          <div class="label">{{ t('operation.ijtStu') }}</div>
          <a-select
            v-model:value="agms.show_status"
            :placeholder="t('operation.ijtStu')"
            class="select"
            allowClear
          >
            <template v-for="item in injectOptions" :key="item.key">
              <a-select-option :value="item.key">{{ item.value }}</a-select-option>
            </template>
          </a-select>
        </div>
        <!--  运行状态 end -->
        <!-- 驱动 start -->
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
  import { PropType, computed } from 'vue';
  import { RaspFilter } from '@/api/operation/model';
  import { useSelectOptions } from '.';
  const props = defineProps({
    agms: {
      type: Object as PropType<RaspFilter>,
      required: true,
    },
    refreshTable: Function,
  });
  const { t } = useI18n();
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in props.agms) {
      if (k !== 'searchdata') {
        const kvalue = props.agms[k] === undefined ? '' : props.agms[k];
        flag += kvalue;
      }
    }
    return flag;
  });

  //在线状态和注入状态
  const { onlineOptions, injectOptions } = useSelectOptions(t);
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
