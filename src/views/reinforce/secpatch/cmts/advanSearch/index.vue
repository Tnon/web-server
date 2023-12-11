<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 危险程度 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.wxcd') }}</div>
        <a-select
          class="select"
          style="flex: 1"
          show-search
          mode="multiple"
          :autoClearSearchValue="false"
          allowClear
          v-model:value="risk_levelCmp"
          :placeholder="t('reinforce.wxcdplac')"
          :options="risk_levelOptions"
        />
      </div>
      <!-- 危险程度 end -->
      <!-- 危险类型 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.wxlx') }}</div>
        <a-select
          class="select"
          style="flex: 1"
          show-search
          optionFilterProp="label"
          allowClear
          mode="multiple"
          :autoClearSearchValue="false"
          v-model:value="risk_typeCmp"
          :placeholder="t('reinforce.wxlxplac')"
          :options="riskTypeOptions"
          @dropdownVisibleChange="dropdownVisibleChange"
        />
      </div>
      <!-- 危险类型 end -->

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
  import { computed, PropType, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { I_Sec_Filter } from '../../type';
  import { getRiskOptionsApi } from '@/api/reinforce';
  import { getRiskLevelOptions } from '.';
  //属性
  defineProps({
    params: {
      type: Object as PropType<I_Sec_Filter>,
      required: true,
    },
  });

  const { t } = useI18n();

  //派发事件
  const emit = defineEmits(['confirm']);
  //危险程度选项
  const risk_levelOptions = getRiskLevelOptions(t);
  // 危险程度 计算属性
  const risk_levelCmp = computed({
    get: () => (agus.vul_level ? agus.vul_level.split(',').map((ele) => ~~ele) : []),
    set: (val) => {
      agus.vul_level = val.join(',');
    },
  });
  //危险类型
  const riskTypeOptions = ref([]);
  const getRiskTypeOptions = async () => {
    const items = await getRiskOptionsApi();
    riskTypeOptions.value = items.map((ele) => ({ label: ele.name, value: ele.code }));
  };

  const dropdownVisibleChange = async (v) => {
    if (v) {
      getRiskTypeOptions();
    }
  };

  //危险类型 计算属性
  const risk_typeCmp = computed({
    get: () => (agus.vul_type_code ? agus.vul_type_code.split(',') : []),
    set: (val) => {
      agus.vul_type_code = val.join(',');
    },
  });

  //数据仓
  const agus = reactive<Partial<I_Sec_Filter>>({
    vul_level: '',
    vul_type_code: '',
  });
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus);
    for (let k in sendStateObj) {
      flag += sendStateObj[k] ?? '';
    }
    effectFlag.value = !!flag;
    emit('confirm', sendStateObj);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      agus[k] = '';
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
    .ant-calendar-picker {
      flex: 1;
    }
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
  }
  .filter {
    position: relative;
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

  .node {
    display: flex;
    justify-content: space-between;
    padding-right: 10px;
  }
  .loadingContainer {
    padding: 30px 0;
    font-size: @fz20;
    text-align: center;
  }
</style>
