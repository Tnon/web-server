<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-14 19:16:54
 * @LastEditTime: 2023-04-07 17:55:22
-->
<template>
  <a-form>
    <a-form-item v-bind="validateInfos.group_id">
      <hostGroupSelect
        v-model:selectedGroupIds="group_idState!.group_id"
        :placeholder="t('common.selectGroup')"
        :multiple="false"
      />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Form } from 'ant-design-vue';
  import hostGroupSelect from '@/components/host-group-select';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;
  const props = defineProps({
    group_idState: Object,
  });
  const { t } = useI18n();
  const rulesRef = reactive({
    group_id: [
      {
        required: true,
        message: t('asset.selectGroup'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(props.group_idState!, rulesRef);
  //树 数据
  defineExpose({ validate, group_idState: props.group_idState });
</script>
<style lang="less" scoped>
  .suffixIcon {
    position: absolute;
    top: 5px;
    right: 10px;
    color: #666;
  }
  .subtitle {
    margin-bottom: 24px;
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
</style>
