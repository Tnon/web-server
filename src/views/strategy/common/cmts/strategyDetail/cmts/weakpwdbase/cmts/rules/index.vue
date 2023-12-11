<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:25:44
 * @LastEditTime: 2023-09-22 16:22:09
-->
<template>
  <a-form class="cusform">
    <a-form-item v-bind="validateInfos.basic">
      <a-checkbox-group class="checkG" v-model:value="basicCmp">
        <a-checkbox :value="1" name="basic" disabled>{{ t('strategy.nez') }}</a-checkbox>
        <a-checkbox :value="2" name="basic">{{ t('strategy.wbhzmdx') }}</a-checkbox>
        <div class="fitem">
          <a-checkbox :value="3" name="basic" class="checkpre">
            {{ t('strategy.changdu') }}
          </a-checkbox>
          <a-form-item class="iptNumber" v-bind="validateInfos['basic-pwdlen']">
            <a-input-number name="basic-pwdlen" v-model:value="basicPwdlenCmp" />
          </a-form-item>
        </div>
        <a-checkbox :value="4" name="basic">{{ t('strategy.wbhsf') }}</a-checkbox>

        <a-checkbox :value="5" name="basic">{{ t('strategy.wbhtsz') }}</a-checkbox>
        <a-checkbox :value="6" name="basic">
          {{ t('strategy.msjghs') }}
        </a-checkbox>
      </a-checkbox-group>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
  import { Form } from 'ant-design-vue';
  import { PropType, computed, reactive, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    strategyDetal: {
      type: Object as PropType<{
        basic: { value: number[]; ctype: number };
        'basic-pwdlen': { value: number; ctype: number };
      }>,
      required: true,
    },
  });
  const basicCmp = computed({
    get: () => {
      return props.strategyDetal.basic.value;
    },
    set: (v) => {
      props.strategyDetal.basic.value = v;
      modalState.basic = v;
    },
  });
  const basicPwdlenCmp = computed({
    get: () => {
      return props.strategyDetal['basic-pwdlen'].value;
    },
    set: (v) => {
      props.strategyDetal['basic-pwdlen'].value = v;
      modalState['basic-pwdlen'] = v;
    },
  });
  const useForm = Form.useForm;
  const { t } = useI18n();

  const rulesRef = reactive({
    'basic-pwdlen': [
      {
        required: true,
        type: 'number',
        min: 5,
        max: 10,
        message: t('strategy.baspwdkl'),
      },
    ],
  });
  const modalState = reactive({
    basic: unref(basicCmp),
    'basic-pwdlen': unref(basicPwdlenCmp),
  });
  const { validate, validateInfos } = useForm(modalState, rulesRef);

  //抛出
  defineExpose({ validate });
</script>
<style lang="less" scoped>
  .checkG {
    display: flex;
    flex-direction: column;
    justify-content: center;
    :deep(.ant-checkbox-wrapper) {
      margin: 10px 0 10px 10px;
    }
  }
  .fitem {
    display: flex;
    align-items: baseline;
    position: relative;
    justify-content: space-between;
    .checkpre {
      margin-right: 16px;
    }
    .iptNumber {
      position: absolute;
      left: 100%;
    }
  }
  .cusform {
    display: flex;
  }
</style>
