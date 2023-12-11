<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-09-12 11:10:01
 * @LastEditTime: 2023-09-14 18:41:47
-->
<template>
  <a-form layout="vertical" hideRequiredMark>
    <a-form-item v-bind="validateInfos.path">
      <template #label>
        <div class="label">{{ t('operation.sjlj') }}</div>
      </template>
      <a-input
        type="text"
        v-model:value.trim="modelRef.path"
        :placeholder="t('operation.sjljplac')"
      />
    </a-form-item>
    <a-form-item v-bind="validateInfos.entities">
      <template #label>
        <div class="label">{{ t('operation.yyfw') }}</div>
      </template>
      <hostSelect v-model:selectedMacs="fields.entities" />
    </a-form-item>
    <a-form-item v-bind="validateInfos.desc">
      <template #label>
        <div class="label">{{ t('operation.rzsm') }}</div>
      </template>
      <a-textarea v-model:value.trim="modelRef.desc" :placeholder="t('operation.rzsmplac')" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { Form } from 'ant-design-vue';
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import hostSelect from '@/components/hostSelect';
  import { validateName } from '.';
  const props = defineProps({
    fields: {
      type: Object,
      required: true,
    },
  });
  const useForm = Form.useForm;
  const { t } = useI18n();
  const modelRef = reactive(props.fields);
  const rulesRef = reactive({
    path: [{ validator: validateName, message: t('operation.skflgyip') }],
    entities: [
      {
        required: true,
        message: t('reinforce.hstplac'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  defineExpose({ modelRef, validate });
</script>
<style lang="less" scoped>
  .label {
    color: rgba(0, 0, 0, 0.8);
    font-size: 13px;
    font-weight: 600;
  }
</style>
