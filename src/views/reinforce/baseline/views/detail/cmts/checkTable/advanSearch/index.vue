<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 检查项名称 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.jcx') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.jcxmcplac')"
          v-model:value.trim="agus.check_name"
        />
      </div>
      <!-- 检查项名称 end -->
      <!-- 检查项类别 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.sgsdf') }}</div>
        <a-select
          class="select"
          style="flex: 1"
          show-search
          allowClear
          v-model:value="agus.check_type"
          :placeholder="t('reinforce.sgsdfplac')"
          :options="check_typeOptions"
          @dropdownVisibleChange="dropdownVisibleChange"
        />
      </div>
      <!-- 检查项类别 end -->

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
  import { PropType, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { I_Check_Filter } from '../type';
  import { getCheckTypeOptions } from '@/api/reinforce';
  //属性
  const props = defineProps({
    params: {
      type: Object as PropType<I_Check_Filter>,
      required: true,
    },
    rule_code: {
      type: String,
      required: true,
    },
  });

  const { t } = useI18n();

  //派发事件
  const emit = defineEmits(['confirm']);
  //检查项
  const check_typeOptions = ref<{ label: string; value: string }[]>([]);

  //数据仓
  const agus = reactive<Omit<I_Check_Filter, 'session_id'>>({
    //检查项名称
    check_name: '',
    //检查项类别
    check_type: undefined,
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
      if (k === 'check_type') {
        agus[k] = undefined;
      } else {
        agus[k] = '';
      }
    }
    effectFlag.value = false;
    emit('confirm', agus);
  };
  //s获取检查项
  const dropdownVisibleChange = async (v) => {
    if (v) {
      const res = await getCheckTypeOptions({ rule: props.rule_code });
      if (!res.code) {
        check_typeOptions.value = res.items.map((ele) => ({ label: ele, value: ele }));
      }
    }
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
