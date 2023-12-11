<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-06 10:34:55
 * @LastEditTime: 2023-07-27 14:24:56
-->
<template>
  <a-popover trigger="click" placement="bottomRight" overlayClassName="batchM">
    <template #content>
      <div class="container">
        <!-- 引擎 start -->
        <div>
          <div class="header">
            {{
              agms.type === UPCLIPKGTYPE.HASH ? t('operation.engineLabel') : t('operation.libver')
            }}
          </div>
          <!-- 更新状态 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.updstau') }}</div>
            <a-select
              v-model:value="agms.engine_upgrade_status"
              :placeholder="t('operation.defaultAll')"
              class="select"
              allowClear
            >
              <template v-for="item in upgradeStatus" :key="item.key">
                <a-select-option :value="item.key">{{ item.value }}</a-select-option>
              </template>
            </a-select>
          </div>
          <!-- 更新状态 end -->
          <!-- 引擎版本 start -->
          <div class="formitems">
            <div class="label">{{ t('operation.agtvs') }}</div>
            <a-select
              v-model:value="agms.engine_version"
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
          <!-- 引擎版本 end -->
        </div>
        <!-- 引擎 end -->

        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->

        <!-- 基础 start -->
        <div>
          <div class="header">{{ t('operation.basics') }}</div>
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
            <div class="label">{{ t('operation.hostGroup') }}</div>
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
    <!-- 批量按钮 start -->
    <a-button type="text" class="batchbtn">
      <template #icon>
        <customIcon type="#ax-Filters" class="btnIcon" />
      </template>
      {{ t('common.filter') }}
      <span class="flag" v-if="StateEffect"></span>
    </a-button>
    <!-- 批量按钮 end -->
  </a-popover>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { useUpgradeStatus } from './index';
  import { getallEnginevers } from '@/api/operation/upgrade';
  import hostGroupSelect from '@/components/host-group-select';
  import { PropType, ref, computed } from 'vue';
  import { EngineFilter } from '@/api/operation/model';
  import { UPCLIPKGTYPE } from '@/enums/assetsType';
  const props = defineProps({
    agms: {
      type: Object as PropType<Partial<EngineFilter>>,
      required: true,
    },
    refreshTable: Function,
  });

  const { t } = useI18n();

  //选择没选择
  const StateEffect = computed(() => {
    let flag = '';
    for (let k in props.agms) {
      if (k !== 'searchdata' && k !== 'type') {
        const kvalue = props.agms[k] === undefined ? '' : props.agms[k];
        flag += kvalue;
      }
    }
    return flag;
  });
  // const upgradeStatus = useUpgradeStatus(t);
  //升级状态,适配状态，在线状态
  const { upgradeStatus, onlineStatus } = useUpgradeStatus(t);
  //引擎全部版本
  const agentVersions = ref<string[]>([]);
  //获取引擎所有版本，下拉框
  const getAllVersions = async () => {
    const vers = await getallEnginevers({ type: props.agms.type! });
    agentVersions.value = vers;
  };
  //pop显示 请求
  const getAgentVersions = (v) => {
    v && getAllVersions();
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
      top: 2px;
      background: #18ba79;
    }
  }
</style>
