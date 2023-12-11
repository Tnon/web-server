<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 主机ip start -->
      <div class="cols">
        <div class="label">{{ t('asset.host') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.ipPlace')"
          v-model:value.trim="agus.ip"
        />
      </div>
      <!-- 主机ip end -->
      <!-- 分组 start -->
      <div class="cols">
        <div class="label">{{ t('operation.hostg') }}</div>
        <hostGroupSelect v-model:selectedGroupIds="agus.host_group" :multiple="true" />
      </div>
      <!-- 分组 end -->

      <!-- 检查结果 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.jcjg') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.jcjgplac')"
          optionFilterProp="label"
          show-search
          allowClear
          v-model:value="agus.check_result"
          :options="check_resultOptions"
        />
      </div>
      <!-- 检查结果 end -->

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
  import { I_Ip_Filter } from '../type';
  import hostGroupSelect from '@/components/host-group-select';
  import { getCheckResult } from '.';
  //属性
  defineProps({
    params: {
      type: Object as PropType<I_Ip_Filter>,
      required: true,
    },
    check_code: {
      type: String,
      required: true,
    },
    session_id: {
      type: Number,
      required: true,
    },
  });

  const { t } = useI18n();

  //派发事件
  const emit = defineEmits(['confirm']);
  //处理结果
  const check_resultOptions = getCheckResult(t);

  //数据仓
  const agus = reactive<I_Ip_Filter>({
    ip: '',
    host_group: '',
    check_result: undefined,
  });
  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus, { ip: agus.ip!.replace(/\//g, ',') });
    for (let k in sendStateObj) {
      flag += sendStateObj[k] ?? '';
    }
    effectFlag.value = !!flag;
    emit('confirm', sendStateObj);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      if (k === 'check_result') {
        agus[k] = undefined;
      } else {
        agus[k] = '';
      }
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
