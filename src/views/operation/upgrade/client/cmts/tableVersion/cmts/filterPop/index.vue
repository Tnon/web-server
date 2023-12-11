<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:34:55
 * @LastEditTime: 2023-08-25 15:15:26
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- Agent start -->
        <div>
          <div class="header">{{ t('operation.agtname') }}</div>
          <!-- 升级状态 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.agentupgrade') }}</div>
            <a-select
              v-model:value="agms.agent_upgraded_status"
              :placeholder="t('operation.defaultAll')"
              class="select"
              allowClear
            >
              <template v-for="item in upgradeStatus" :key="item.key">
                <a-select-option :value="item.key">{{ item.value }}</a-select-option>
              </template>
            </a-select>
          </div>
          <!-- 升级状态 end -->
          <!-- Agent版本 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.agtvs') }}</div>
            <a-select
              v-model:value="agms.agent_version"
              :placeholder="t('operation.defaultAll')"
              class="select"
              allowClear
              show-search
              @dropdownVisibleChange="getAgentVersions"
              :options="agentVersions"
            />
            <!-- <template v-for="item in agentVersions" :key="item">
                <a-select-option :value="item">{{ item }}</a-select-option>
              </template>
            </a-select> -->
          </div>
          <!-- Agent版本 end -->
        </div>
        <!-- Agent end -->

        <!-- 分割线 start -->
        <div class="line" v-if="agms.osver === OSTYPE.LINUX"></div>
        <!-- 分割线 end -->

        <!-- 驱动 start -->
        <div v-if="agms.osver === OSTYPE.LINUX">
          <div class="header">{{ t('operation.safeDir') }}</div>

          <!-- 适配状态 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.dirverupgrade') }}</div>
            <a-select
              v-model:value="agms.driver_upgraded_status"
              :placeholder="t('operation.defaultAll')"
              class="select"
              allowClear
            >
              >
              <template v-for="item in adapedStatus" :key="item.key">
                <a-select-option :value="item.key">{{ item.value }}</a-select-option>
              </template>
            </a-select>
          </div>
          <!-- 适配状态 end -->
          <!-- 驱动版本 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.agtvs') }}</div>
            <a-select
              v-model:value="agms.driver_version"
              :placeholder="t('operation.defaultAll')"
              class="select"
              allowClear
              show-search
              @dropdownVisibleChange="getDriverersions"
            >
              <a-select-option v-for="item in versOptions" :key="item" :value="item">
                {{ item }}
              </a-select-option>
            </a-select>
          </div>
          <!-- 驱动版本 end -->
        </div>
        <!-- 驱动 end -->

        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->

        <!-- 基础 start -->
        <div>
          <div class="header">{{ t('operation.basics') }}</div>
          <!-- 系统信息 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.sysMsg') }}</div>

            <a-input-search
              v-model:value.trim="agms.os_info"
              :placeholder="t('operation.defaultAll')"
              class="search"
              @search="searchData"
              @change="searchData"
            />
          </div>
          <!-- 系统信息 end -->
          <!-- 在线状态 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.onlinstau') }}</div>
            <a-select
              v-model:value="agms.online"
              :placeholder="t('operation.defaultAll')"
              class="select"
              allowClear
            >
              <template v-for="item in onlineStatus" :key="item.key">
                <a-select-option :value="item.key">{{ item.value }}</a-select-option>
              </template>
            </a-select>
          </div>
          <!-- 在线状态 end -->

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
        </div>
        <!-- 基础 end -->
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
  import { useUpgradeStatus } from './index';
  import { getallvers, getadaEnvVersion } from '@/api/operation/upgrade';
  import hostGroupSelect from '@/components/host-group-select';
  import { PropType, ref, computed } from 'vue';
  import { ClientFilter } from '@/api/operation/model';
  import { OSTYPE } from '@/enums/assetsType';
  const props = defineProps({
    agms: {
      type: Object as PropType<ClientFilter>,
      required: true,
    },
    refreshTable: Function,
  });
  const { t } = useI18n();
  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in props.agms) {
      if (k !== 'searchdata' && k !== 'osver' && k !== 'os_info') {
        const kvalue = props.agms[k] === undefined ? '' : props.agms[k];
        flag += kvalue;
      }
    }
    return flag;
  });

  //升级状态,适配状态，在线状态
  const { upgradeStatus, adapedStatus, onlineStatus } = useUpgradeStatus(t);
  //agent全部版本
  const agentVersions = ref<string[]>([]);
  //获取agent所有版本，下拉框
  const getAllVersions = async () => {
    const vers = await getallvers();
    agentVersions.value = vers.map((ele) => ({ label: ele, value: ele }));
  };
  //pop显示 请求
  const getAgentVersions = (v) => {
    v && getAllVersions();
  };

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
  //下拉框动态数据
  const versOptions = ref<string[]>([]);
  //获取适配环境下拉框
  const getOptions = async () => {
    const res = await getadaEnvVersion();
    versOptions.value = res.code ? [] : res;
  };
  //pop显示 请求
  const getDriverersions = (v) => {
    v && getOptions();
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
      right: 4px;
      top: 2px;
      background: #18ba79;
    }
  }
</style>
