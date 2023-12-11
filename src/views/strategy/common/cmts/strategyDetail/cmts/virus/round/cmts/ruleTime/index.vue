<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 20:54:17
 * @LastEditTime: 2023-10-30 11:26:04
-->
<template>
  <div class="content">
    <div class="header">
      <span class="title">{{ t('strategy.plantround') }}</span>
    </div>
    <div class="subtitle"> {{ t('strategy.plantvcsub') }} </div>

    <!-- 时间周期 start -->
    <div class="round">
      <div class="label">{{ t('strategy.timPrd') }}</div>
      <div class="rdType">
        <a-radio-group v-model:value="state['time-cycle'].value">
          <a-radio class="radioCls" :value="Rounds.EveryDay">{{ t('setting.eveDay') }}</a-radio>
          <div class="formitem">
            <a-radio class="radioCls" :value="Rounds.Weekly">{{ t('setting.weekly') }}</a-radio>
            <a-form>
              <a-form-item v-bind="validateInfos['time-dow']">
                <a-select
                  mode="multiple"
                  :autoClearSearchValue="false"
                  :allowClear="true"
                  @change="changeWeakMonth('time-dow', $event)"
                  v-if="state['time-cycle'].value === Rounds.Weekly"
                  v-model:value="modelRef['time-dow']"
                  class="selectS"
                  :maxTagCount="5"
                  :placeholder="t('strategy.pstmpd')"
                >
                  <a-select-option v-for="item in week" :value="~~item.value" :key="item.value">
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </div>
          <div class="formitem">
            <a-radio class="radioCls" :value="Rounds.Monthly">{{ t('setting.monthly') }}</a-radio>
            <a-form>
              <a-form-item v-bind="validateInfos['time-dom']">
                <a-select
                  :maxTagCount="5"
                  :allowClear="true"
                  @change="changeWeakMonth('time-dom', $event)"
                  mode="multiple"
                  :autoClearSearchValue="false"
                  v-if="state['time-cycle'].value === Rounds.Monthly"
                  v-model:value="modelRef['time-dom']"
                  class="selectS"
                  :placeholder="t('strategy.pstmpd')"
                >
                  <a-select-option v-for="item in month" :value="~~item.value" :key="item.value">
                    {{ item.label + t('strategy.day') }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </div>
        </a-radio-group>
      </div>
    </div>
    <!-- 时间周期 end -->

    <!-- 起止时间 start -->
    <div class="round aligncenter">
      <div class="label">{{ t('strategy.stedTime') }}</div>
      <div class="formitem">
        <mutipleTime
          :modelRef="modelRef"
          @change="changeTimeRange"
          :validateInfos="validateInfos"
        />
      </div>
    </div>
    <!-- 起止时间 end -->
  </div>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect, watch, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useWeekMonthData } from '@/views/strategy/common/cmts/moreInfo';
  import { Form } from 'ant-design-vue';
  import mutipleTime from '../mutipleTime';
  import { timeHHMMbetween, timeHHMMRepeat } from '@/utils/tools';
  import { Rounds } from '@/views/strategy/common/types';
  // {
  //                         name: 'time-cycle', //改动需要同步下面的两个
  //                         ctype: Ctype.Radio,
  //                       },
  //                       {
  //                         name: 'time-dom',
  //                         ctype: Ctype.IntArr,
  //                       },
  //                       {
  //                         name: 'time-dow',
  //                         ctype: Ctype.IntArr,
  //                       },
  //                       {
  //                         name: 'time-range',
  //                         ctype: Ctype.StringArr,
  //                       },
  //表单hook
  const useForm = Form.useForm;
  const props = defineProps({
    state: {
      type: Object as PropType<{
        'time-cycle': { value: number; ctype: number }; // 1: 每日; 2: 每周; 3: 每月
        'time-dom': { value: number[]; ctype: number }; // 每月的日期
        'time-dow': { value: number[]; ctype: number }; // 每周的日期
        'time-range': { value: string[]; ctype: number }; // 开始时间和结束时间
      }>,
      required: true,
    },
  });
  const { t } = useI18n();
  //日期和星期
  const { week, month } = useWeekMonthData(t);

  //表单的值 初始化
  const modelRef = reactive<any>({
    //周
    'time-dow': [],
    //月
    'time-dom': [],
    //时间
    'time-range': [],
  });
  //校验1-2个时间段
  const validatorTime = (_, value) => {
    if (!value.length || value.length > 2) {
      return Promise.reject();
    }
    return Promise.resolve();
  };
  //校验时间段的间隔大于30分钟
  const validatorTime30 = (_, value) => {
    const flag = timeHHMMbetween(unref(value), 30);
    if (!flag) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  //校验时间段重合
  const validatorTimerep = (_, value) => {
    const flag = timeHHMMRepeat(unref(value));
    if (flag) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  //月和周的正则初始化，动态的，开关和选项同时符合，必填
  const rulesRef = reactive<any>({
    //初始化周正则
    'time-dow': [],
    //初始化月正则
    'time-dom': [],
    //初始化时间正则
    'time-range': [
      {
        validator: validatorTime,
        message: t('strategy.timeNosacv'),
      },
      {
        validator: validatorTime30,
        message: t('strategy.timeNosacv30'),
      },
      {
        validator: validatorTimerep,
        message: t('strategy.timeNosacvrepeat'),
      },
    ],
  });
  //时间范围用事件响应
  const changeTimeRange = (dates) => {
    props.state['time-range'].value = [];
    dates.forEach((ele) => {
      props.state['time-range'].value.push(ele.begin + '-' + ele.end);
    });
  };
  //周期用事件响应
  const changeWeakMonth = (type, v) => {
    props.state[type].value = v;
  };
  //由于数据为异步数据，异步副作用赋值和正则
  watchEffect(() => {
    modelRef['time-dow'] = props.state['time-dow'].value;
    modelRef['time-dom'] = props.state['time-dom'].value;
    modelRef['time-range'] = [];
    props.state['time-range'].value.forEach((ele) => {
      modelRef['time-range'].push({
        begin: ele.split('-')[0],
        end: ele.split('-')[1],
      });
    });
    //正则也需要异步
    rulesRef['time-dow'] = [
      {
        required: props.state['time-cycle'].value === Rounds.Weekly,
        message: t('strategy.psltrdwb'),
      },
    ];
    rulesRef['time-dom'] = [
      {
        required: props.state['time-cycle'].value === Rounds.Monthly,
        message: t('strategy.psltrdwb'),
      },
    ];
  });

  //表单验证
  const { validateInfos, validate } = useForm(modelRef, rulesRef);
  //表单验证动态规则，取决开关和当前选的类型
  watch(
    [() => props.state['time-cycle'].value],
    () => {
      rulesRef['time-dow'] = [
        {
          required: props.state['time-cycle'].value === Rounds.Weekly,
          message: t('strategy.psltrdwb'),
        },
      ];
      rulesRef['time-dom'] = [
        {
          required: props.state['time-cycle'].value === Rounds.Monthly,
          message: t('strategy.psltrdwb'),
        },
      ];
      rulesRef['time-range'] = [
        {
          validator: validatorTime,
          message: t('strategy.timeNosacv'),
        },
        {
          validator: validatorTime30,
          message: t('strategy.timeNosacv30'),
        },
        {
          validator: validatorTimerep,
          message: t('strategy.timeNosacvrepeat'),
        },
      ];
      validate(['time-dow', 'time-dom', 'time-range']);
    },
    { flush: 'post' },
  );
  //抛出验证，确定用
  defineExpose({ validate });
</script>

<style scoped lang="less">
  .content {
    background: #ffffff;
    border-radius: 8px;
    .header {
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      .title {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
    }
    .subtitle {
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      padding: 16px 24px;
    }

    .round {
      padding: 0 24px;
      display: flex;
      .label {
        position: relative;
        flex: 80px 0 0;
        &::after {
          position: absolute;
          content: '*';
          left: -10px;
          top: 2px;
          color: @danger-color;
        }
      }
      .rdType {
        .radiogroup {
          display: flex;
        }
      }
      .formitem {
        display: flex;
        align-items: center;
      }
      .radioCls {
        display: flex;
        margin-right: 40px;
        margin-bottom: 24px;
      }
      .selectS {
        width: 270px;
      }
    }
    .aligncenter {
      align-items: baseline;
      padding-bottom: 24px;
    }
  }
</style>
