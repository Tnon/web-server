<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:34:55
 * @LastEditTime: 2023-07-27 14:21:20
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
          <div class="label">{{ t('operation.runstau') }}</div>
          <a-select
            v-model:value="agms.self_verify"
            :placeholder="t('operation.defaultAll')"
            class="select"
            allowClear
          >
            <template v-for="item in selfDeteOptions" :key="item.key">
              <a-select-option :value="item.key">{{ item.value }}</a-select-option>
            </template>
          </a-select>
        </div>
        <!--  运行状态 end -->

        <!-- 分组 start -->
        <div class="formitems">
          <div class="label">{{ t('operation.belGrp') }}</div>
          <span class="select">
            <hostGroupSelect
              v-model:selectedGroupIds="agms.groups"
              :placeholder="t('operation.defaultAll')"
              :multiple="true"
            />
          </span>
        </div>
        <!-- 分组 end -->
        <!-- 系统信息 start -->
        <div class="formitems">
          <div class="label">{{ t('operation.sysMsg') }}</div>
          <a-input-search
            v-model:value.trim="agms.os"
            :placeholder="t('operation.sysMsg')"
            class="search"
            @search="searchData"
            @change="searchData"
          />
        </div>
        <!-- 系统信息 end -->
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
  import { RunAgentFilter } from '@/api/operation/model';
  import { useSelectOptions } from '.';
  const props = defineProps({
    agms: {
      type: Object as PropType<RunAgentFilter>,
      required: true,
    },
    refreshTable: Function,
  });
  const { t } = useI18n();
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in props.agms) {
      //屏蔽windows
      if (k !== 'searchdata' && k !== 'os' && k !== 'osver') {
        const kvalue = props.agms[k] === undefined ? '' : props.agms[k];
        flag += kvalue;
      }
    }
    return flag;
  });

  // 搜索框变化刷新表格
  const searchData = (v, e) => {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      props.refreshTable!();
    }
    if (!value && !e) {
      props.refreshTable!();
    }
  };
  //下拉框 自检测状态，操作系统，在线状态
  const { selfDeteOptions, onlineOptions } = useSelectOptions(t);
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
      top: 3px;
    }
  }
</style>
