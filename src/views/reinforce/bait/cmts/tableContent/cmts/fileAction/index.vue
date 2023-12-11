<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-27 14:13:35
 * @LastEditTime: 2023-03-07 12:02:17
-->
<template>
  <div> {{ labelName }}</div>
</template>

<script setup lang="ts">
  import { getFileActionName } from '@/views/reinforce/file/views/ruleForm/cmts/fileActions';
  import { E_File_Action } from '@/views/reinforce/file/views/ruleForm/cmts/form/type';
  import { PropType, ref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    type: {
      type: Number as PropType<E_File_Action>,
      required: true,
    },
  });
  const { t } = useI18n();
  const labelName = ref('');
  watchEffect(() => {
    labelName.value = getFileActionName(props.type, t);
  });
</script>

<style scoped></style>
