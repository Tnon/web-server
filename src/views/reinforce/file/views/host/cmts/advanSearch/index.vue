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
        <div class="label">{{ t('operation.hostg') }}</div>
        <hostGroupSelect v-model:selectedGroupIds="agus.host_group" :multiple="true" />
      </div>
      <!-- 分组 end -->

      <!-- 主机 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.impactHost') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('arcomn.ipPlace')"
          v-model:value.trim="agus.ip_list"
        />
      </div>
      <!-- 主机 end -->
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
  import hostGroupSelect from '@/components/host-group-select';
  import { useI18n } from 'vue-i18n';
  import { I_Host_Filter } from '../../type';
  //属性
  defineProps({
    params: {
      type: Object as PropType<I_Host_Filter>,
      required: true,
    },
  });

  const { t } = useI18n();

  //派发事件
  const emit = defineEmits(['confirm']);

  //数据仓
  const agus = reactive<Partial<I_Host_Filter>>({
    host_group: '', // "2,3,5,7"
    ip_list: '', // "ip1,ip2,ip3"
  });

  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus, {
      ip_list: agus.ip_list!.replace(/\//g, ','),
    });
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
