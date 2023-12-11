<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    overlayClassName="advanCard"
    destroyTooltipOnHide
  >
    <template #content>
      <!-- 规则名称 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.rulena') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.rulenaPlac')"
          v-model:value.trim="agus.rule_name"
        />
      </div>
      <!-- 规则名称 end -->
      <!-- 文件目录 start -->
      <div class="cols">
        <div class="label">{{ t('arcomn.file_dir') }}</div>
        <a-textarea
          class="selecTree"
          auto-size
          :placeholder="t('reinforce.filepapalcaa')"
          v-model:value.trim="agus.file_path"
        />
      </div>
      <!-- 文件目录 end -->

      <!--监控状态 start -->
      <div class="cols">
        <div class="label">{{ t('reinforce.jkzt') }}</div>
        <a-select
          style="width: 100%; flex: 1"
          :placeholder="t('reinforce.jkztPalc')"
          optionFilterProp="label"
          allowClear
          v-model:value="agus.monitor_state"
          :options="monitor_stateOptions"
        />
      </div>
      <!-- 监控状态 end -->

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
  import { getStatusData } from '../../../ruleMonitor/cmts/advanSearch/datasource';
  import { I_File_Monitor_Filter } from '../../type';
  //属性

  const { t } = useI18n();

  //派发事件
  const emit = defineEmits(['confirm']);

  const { monitor_stateOptions } = getStatusData(t);

  //数据仓
  const agus = reactive<I_File_Monitor_Filter>({
    //规则名称
    rule_name: '',
    //文件路径 输入 精确匹配
    file_path: '',
    //监控状态 单选 1/2
    monitor_state: undefined,
  });

  //flag 标记是否筛选了
  const effectFlag = ref<boolean>(false);
  //派发确定事件
  const confirm = () => {
    let flag = '';
    const sendStateObj = Object.assign({}, agus);
    for (let k in sendStateObj) {
      if (k === 'monitor_state') {
        if (sendStateObj[k]) {
          flag += sendStateObj[k] + '';
        }
      } else {
        flag += sendStateObj[k] ?? '';
      }
    }
    effectFlag.value = !!flag;
    emit('confirm', sendStateObj);
  };
  //重置init
  const cancle = () => {
    for (let k in agus) {
      if (k === 'monitor_state') {
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
