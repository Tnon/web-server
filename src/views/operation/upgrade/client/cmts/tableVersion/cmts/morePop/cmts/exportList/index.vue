<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-08 17:32:11
 * @LastEditTime: 2023-07-27 14:24:43
-->
<template>
  <div class="btngroup">
    <!-- 筛选 start -->
    <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
      <template #content>
        <div class="container">
          <div>
            <!-- 系统信息 start -->
            <div class="formitems">
              <div class="label">{{ t('operation.sysMsg') }}</div>
              <a-input-search
                v-model:value.trim="props.state.os_info"
                :placeholder="t('operation.sysMsg')"
                class="search"
                @search="searchData"
                @change="searchData"
              />
            </div>
            <!-- 系统信息 end -->
            <!-- 主机 start -->
            <div class="formitems">
              <div class="label">{{ t('asset.host') }}</div>
              <a-input-search
                v-model:value.trim="props.state.host_info"
                :placeholder="t('common.hostNameIp')"
                class="search"
                @search="searchData"
                @change="searchData"
              />
            </div>
            <!-- 主机 end -->
            <!-- Agent版本 start -->
            <div class="formitems">
              <div class="label">{{ t('operation.agentVersion') }}</div>
              <a-select
                v-model:value="props.state.agent_version"
                :placeholder="t('operation.defaultAll')"
                class="select"
                allowClear
                show-search
                @dropdownVisibleChange="getAgentVersions"
              >
                <template v-for="item in agentVersions" :key="item">
                  <a-select-option :value="item">{{ item }}</a-select-option>
                </template>
              </a-select>
            </div>
            <!-- Agent版本 end -->
          </div>
          <!-- Agent end -->
          <!-- 未适配类型 start -->
          <!-- <div class="formitems">
            <div class="label">{{ t('operation.uadatype') }}</div>
            <a-select
              v-model:value="props.state.status"
              :placeholder="t('operation.defaultAll')"
              class="select"
              allowClear
            >
              <template v-for="item in adapedType" :key="item.key">
                <a-select-option :value="item.key">{{ item.value }}</a-select-option>
              </template>
            </a-select>
          </div> -->
          <!-- 未适配类型 end -->

          <!-- 分组 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.hostGroup') }}</div>
            <span class="select">
              <hostGroupSelect
                v-model:selectedGroupIds="state.groups"
                :placeholder="t('operation.defaultAll')"
                :multiple="true"
              />
            </span>
          </div>
          <!-- 分组 end -->
        </div>
      </template>
      <!-- 筛选按钮 start -->
      <a-button class="batchbtn expbtn" type="text">
        <template #icon>
          <customIcon type="#ax-Filters" class="btnIcon" />
        </template>
        {{ t('common.filter') }}
        <span class="flag" v-if="StateEffect"></span>
      </a-button>
      <!-- 筛选按钮 end -->
    </a-popover>
    <!-- 筛选 end -->
    <div class="line"></div>
    <!-- 导出 start -->
    <!-- -->
    <export-data :showLoading="false" api="/api/report/noadaptedlist" :params="state">
      <template #default="{ loading }">
        <a-button class="expbtn lastchild" :loading="!loading" type="text">
          <template #icon>
            <custom-icon type="#ax-Download" />
          </template>
        </a-button>
      </template>
    </export-data>
    <!-- 导出 end -->
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { computed, PropType, ref, watch } from 'vue';
  import hostGroupSelect from '@/components/host-group-select';
  // import { useAdapedType } from '.';
  import { getallvers } from '@/api/operation/upgrade';
  import { UnadapFilter } from '@/api/operation/model';
  import exportData from '@/components/exportData';
  const { t } = useI18n();
  const props = defineProps({
    refreshTable: Function,
    state: {
      type: Object as PropType<UnadapFilter>,
      required: true,
    },
  });

  //未适配类型
  // const adapedType = useAdapedType(t);
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in props.state) {
      if (k !== 'os' && k !== 'host') {
        const kvalue = props.state[k] === undefined ? '' : props.state[k];
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

  //引擎全部版本
  const agentVersions = ref<string[]>([]);
  //获取引擎所有版本，下拉框
  const getAllVersions = async () => {
    const vers = await getallvers();
    agentVersions.value = vers;
  };
  //pop显示 请求
  const getAgentVersions = (v) => {
    v && getAllVersions();
  };

  // 监听变化刷新表格
  watch(
    [() => props.state!.groups, () => props.state!.agent_version, () => props.state!.status],
    () => {
      //刷新表格
      props.refreshTable!();
    },
  );
</script>

<style scoped lang="less">
  .btngroup {
    display: flex;
    align-items: center;
    height: 48px;
    position: absolute;
    top: 0;
    right: 0;
    .line {
      width: 1px;
      height: 16px;
      background-color: rgba(0, 0, 0, 0.1);
      margin-right: 8px;
    }
    .lastchild {
      margin-right: 40px;
    }
  }
  .container {
    padding: 16px;
    .formitems {
      display: flex;
      align-items: center;
      padding: 4px 0;
      width: 400px;
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
      right: 2px;
      top: 2px;
      background: #18ba79;
    }
  }
</style>
