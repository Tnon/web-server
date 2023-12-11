<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 20:54:17
 * @LastEditTime: 2022-09-26 09:56:50
-->
<template>
  <div class="content">
    <div class="header">
      <span class="title">{{ t('strategy.logTime') }}</span>
    </div>
    <div class="subtitle"> {{ t('strategy.lotmSb') }} </div>
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
                  @change="changeWeakMonth('time-dow', $event)"
                  :allowClear="true"
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
    <div class="round aligncenter">
      <div class="label">{{ t('strategy.stedTime') }}</div>
      <div class="formitem">
        <a-form>
          <a-form-item v-bind="validateInfos['time-range']">
            <a-time-range-picker
              class="rangepiker"
              @change="changeTimeRange"
              :allowClear="false"
              :format="timeFormat"
              v-model:value="modelRef['time-range']"
            />
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import { PropType, reactive, watchEffect, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useWeekMonthData } from '@/views/strategy/common/cmts/moreInfo';
  import { Form } from 'ant-design-vue';
  import { Rounds } from '@/views/strategy/common/types';
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
  //时间格式
  const timeFormat = 'H:mm';
  //表单的值 初始化
  const modelRef = reactive<any>({
    //周
    'time-dow': [],
    //月
    'time-dom': [],
    //时间
    'time-range': [],
  });

  //校验时间不能一样
  const validatorTime = (_, value) => {
    const [start, end] = value;
    if (start.format(timeFormat) === end.format(timeFormat)) {
      return Promise.reject();
    }
    return Promise.resolve();
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
        message: t('strategy.timeNosam'),
      },
    ],
  });
  //时间范围用事件响应
  const changeTimeRange = (dates) => {
    let daterange: string[] = [];
    const [start, end] = dates;
    daterange = [start.format(timeFormat) + '-' + end.format(timeFormat)];
    props.state['time-range'].value = daterange;
  };
  //周期用事件响应
  const changeWeakMonth = (type, v) => {
    props.state[type].value = v;
  };
  //由于数据为异步数据，异步副作用赋值和正则
  watchEffect(() => {
    modelRef['time-dom'] = props.state['time-dom'].value;

    modelRef['time-dow'] = props.state['time-dow'].value;
    //转化时间格式
    modelRef['time-range'] = [
      dayjs(props.state['time-range'].value[0].split('-')[0], timeFormat),
      dayjs(props.state['time-range'].value[0].split('-')[1], timeFormat),
    ];
    //正则也需要异步
    rulesRef['time-dow'] = [
      {
        required: props.state['time-cycle'].value === Rounds.Weekly,
        message: t('strategy.psltrd'),
      },
    ];
    rulesRef['time-dom'] = [
      {
        required: props.state['time-cycle'].value === Rounds.Monthly,
        message: t('strategy.psltrd'),
      },
    ];
  });
  //表单验证
  const { validateInfos, validate } = useForm(modelRef, rulesRef);
  //表单验证动态规则，取决开关和当前选的类型
  watch(
    () => props.state['time-cycle'].value,
    () => {
      rulesRef['time-dow'][0].required = props.state['time-cycle'].value === Rounds.Weekly;
      rulesRef['time-dom'][0].required = props.state['time-cycle'].value === Rounds.Monthly;
      validate(['time-dow', 'time-dom']);
    },
    { flush: 'post' },
  );
  //抛出验证，确定用
  defineExpose({ validate, modelRef });
</script>

<style scoped lang="less">
  .content {
    background: #ffffff;
    border-radius: 8px;
    margin-top: 16px;
    .header {
      height: 48px;
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
      height: 20px;
      line-height: 20px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      padding: 0 24px;
    }

    .round {
      padding: 0 24px;
      margin-top: 16px;
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
      .formitem {
        display: flex;
        align-items: center;
        .rangepiker {
          width: 220px;
        }
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
    }
  }
</style>
