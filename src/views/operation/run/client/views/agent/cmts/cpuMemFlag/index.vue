<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-07-24 15:35:35
 * @LastEditTime: 2023-07-24 16:42:04
-->
<template>
  <div class="cont">
    <a-form layout="vertical">
      <!-- CPU使用上限 (%) start -->
      <a-form-item v-bind="validateInfos.cpu" name="cpu">
        <template #label>
          <div class="label">{{ t('operation.cpusx') }}</div>
        </template>
        <a-input-number
          class="iptNum"
          v-model:value="modelRef.cpu"
          :placeholder="t('operation.range', ['3%', '50%'])"
        />
      </a-form-item>
      <!-- CPU使用上限 (%) end -->

      <!-- 内存使用上限 (MB) start -->
      <a-form-item v-bind="validateInfos.memory" name="memory">
        <template #label>
          <div class="label">{{ t('operation.ncsx') }}</div>
        </template>
        <a-input-number
          class="iptNum"
          v-model:value="modelRef.memory"
          :placeholder="t('operation.range', ['400M', '1024M'])"
        />
      </a-form-item>
      <!-- 内存使用上限 (MB) end -->
    </a-form>
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { Form } from 'ant-design-vue';
  import { reactive, toRefs } from 'vue';
  const props = defineProps<{
    cpu?: number;
    memory?: number;
  }>();
  const useForm = Form.useForm;
  const { t } = useI18n();
  const modelRef = reactive({
    cpu: props.cpu ?? 5,
    memory: props.memory ?? 500,
  });
  const rulesRef = reactive({
    cpu: [
      {
        required: true,
        type: 'number',
        min: 3,
        max: 50,
        message: t('operation.cpumax'),
      },
    ],
    memory: [
      {
        required: true,
        type: 'number',
        min: 400,
        max: 1024,
        message: t('operation.memmax'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(modelRef, rulesRef);
  defineExpose({ ...toRefs(modelRef), validate });
</script>

<style scoped lang="less">
  .cont {
    margin-top: 16px;
    .label {
      font-size: @fz13;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
    .iptNum {
      width: 100%;
    }
  }
</style>
