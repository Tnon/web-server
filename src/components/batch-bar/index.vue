<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-11 10:14:44
 * @LastEditTime: 2023-07-27 19:07:31
-->
<template>
  <div class="batchBar">
    <span class="title">
      <slot name="title"></slot>
    </span>
    <span class="btns">
      <a-button type="text" @click="cancle"> {{ t('common.cancle') }}</a-button>
      <!-- <slot name="button"></slot> -->
      <a-button
        type="primary"
        :danger="danger"
        :loading="batchLoading"
        :disabled="disabled"
        @click="batchHandle"
      >
        {{ okText ?? t('common.confirm') }}
      </a-button>
    </span>
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps({
    isCheck: Boolean,
    batchApi: Function,
    disabled: Boolean,
    okText: String,
    // btnType: {
    //   type: String as PropType<'primary' | 'danger'>,
    //   default: 'primary',
    // },
    danger: Boolean,
  });
  const emit = defineEmits(['update:isCheck']);

  //统一的loading
  const batchLoading = ref<boolean>(false);
  //取消选择
  const cancle = () => {
    emit('update:isCheck', false);
  };
  //批量处理确定
  const batchHandle = async () => {
    batchLoading.value = true;
    await props.batchApi!();
    batchLoading.value = false;
  };
</script>
<style lang="less" scoped>
  .batchBar {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background: rgba(24, 186, 121, 0.1);
    border-radius: 8px;
  }
</style>
