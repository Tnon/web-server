<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 分组 start -->
      <div class="cols">
        <div class="label">{{ t('operation.belGrp') }}</div>
        <hostGroupSelect :multiple="true" v-model:selected-group-ids="agus.groups" />
      </div>
      <!-- 分组 end -->
      <!-- Agent版本 start -->
      <div class="cols">
        <div class="label">{{ t('common.agentVersion') }}</div>
        <a-select
          v-model:value="agus.agent_version"
          :placeholder="t('operation.defaultAll')"
          class="select"
          allowClear
          show-search
          @dropdownVisibleChange="getAgentVersions"
          :options="agentVersions"
        />
      </div>
      <!-- Agent版本 end -->
      <!-- 确定和重置 start -->
      <div class="footer">
        <a-button class="confirm" @click="confirm" type="primary">
          {{ t('common.confirm') }}
        </a-button>
        <a-button class="reset" @click="cancle">
          {{ t('common.reset') }}
        </a-button>
      </div>
      <!-- 确定和重置 end -->
    </template>
    <a-button class="filter" type="text">
      <template #icon>
        <customIcon type="#ax-Filters" class="btnIcon" />
      </template>
      {{ t('common.filter') }}
      <span class="flag" v-if="effectFlag"></span>
    </a-button>
  </a-popover>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import hostGroupSelect from '@/components/host-group-select';
  import { getallvers } from '@/api/operation/upgrade';

  const agus = reactive({
    groups: '',
    agent_version: undefined,
  });
  //派发事件
  const emit = defineEmits(['confirm']);
  const { t } = useI18n();
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
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    for (let k in agus) {
      flag += agus[k] ?? '';
    }
    effectFlag.value = !!flag;
    emit('confirm', agus);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      agus[k] = undefined;
    }
    effectFlag.value = false;
    emit('confirm', agus);
  };
</script>
<style lang="less" scoped>
  .cols {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    .label {
      width: 100px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
    .selecTree {
      flex: 1;
      position: relative;
      border-radius: 8px;
    }
    .select {
      flex: 1;
      border-radius: 8px;
    }
  }
  .filter {
    position: relative;
    margin: 0 8px;
    .flag {
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      right: 2px;
      top: 5px;
      background: #18ba79;
    }
  }
  .footer {
    display: flex;
    margin-top: 24px;
    .confirm {
      flex: 1;
    }
    .reset {
      margin-left: 16px;
    }
  }
</style>
