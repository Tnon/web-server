<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:34:15
 * @LastEditTime: 2023-08-28 09:54:18
-->
<template>
  <div class="container">
    <div class="header">
      <slot name="title"></slot>
      <div class="btns">
        <a-button class="btn" type="text" @click="resetData">
          {{ t('strategy.tidyUp') }}
        </a-button>
        <file-read @readTxt="readTxt">
          <a-button class="btn" type="text">
            {{ t('strategy.impFile') }}
          </a-button>
        </file-read>
        <a-button class="btn" type="text" @click="exportTxt">
          {{ t('strategy.expFile') }}
        </a-button>
      </div>
      <slot name="check"></slot>
    </div>
    <div class="content">
      <div class="tools">
        <div class="msg">
          <slot name="subtitle"></slot>
        </div>
      </div>
      <a-textarea
        v-model:value="textAreaValueCmp"
        :disabled="disabled"
        :placeholder="placeholder"
        :rows="4"
      />
      <div class="rows">
        <span> {{ rows }}/{{ max }} </span>
        <slot name="confirm"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed } from 'vue';
  import { message } from 'ant-design-vue';
  import { fileRead } from '@/components/file-read';
  import { useI18n } from 'vue-i18n';
  import { preendTrim } from '@/utils/tools';
  import { fakeClick } from '.';
  const { t } = useI18n();
  //组件接口
  const props = defineProps({
    max: Number,
    placeholder: String,
    fileName: String,
    value: {
      type: Array as PropType<Array<string>>,
    },
    disabled: {
      type: Boolean,
    },
  });
  const emit = defineEmits(['update:value']);
  //textarea行数正则函数
  // const validateRows = () => {
  //   if (preendTrim(props.state.value).length <= props.max!) {
  //     return Promise.resolve();
  //   }
  //   return Promise.reject();
  // };

  //表单值state
  // const modelRef = reactive({
  //   c: props.state.value.join('\n'),
  // });
  // //异步获取
  // watchEffect(() => {
  //   modelRef.textAreaValue = props.state.value.join('\n');
  // });
  // //向外派发最终值
  // watch(
  //   () => modelRef.textAreaValue,
  //   () => {
  //     props.state.value = modelRef.textAreaValue.split('\n');
  //   },
  // );
  const textAreaValueCmp = computed({
    get: () => (props.value ? props.value.join('\n') : ''),
    set: (v) => emit('update:value', v ? v.split('\n') : []),
  });
  //行数
  const rows = computed(() => preendTrim(props.value).length);
  //整理文本域
  const resetData = () => {
    textAreaValueCmp.value = preendTrim(props.value).join('\n');
  };
  //上传文本，并派发出去结果
  const readTxt = (txt) => {
    const resetData = preendTrim(txt.split('\n'));
    if (!resetData) {
      message.error(t('strategy.notEmpty'));
      return false;
    }
    textAreaValueCmp.value = resetData.join('\n');
  };
  // txt文件导出
  const exportTxt = () => {
    resetData();
    const allStr = preendTrim(props.value).join('\n');

    if (!allStr) {
      message.error(t('strategy.dicEmp'));
      return false;
    }
    var export_blob = new Blob([allStr]);
    var save_link = document.createElement('a');
    save_link.href = window.URL.createObjectURL(export_blob);
    save_link.download = props.fileName + '.txt';
    fakeClick(save_link);
  };
</script>

<style scoped lang="less">
  .container {
    background: #ffffff;
    border-radius: 8px;
    margin-top: 16px;
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: @fz13;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      .btns {
        display: flex;
        .btn {
          border: 1px solid #eee;
          margin-right: 16px;
        }
      }
    }
    .content {
      padding: 0 24px 16px 24px;
      .tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 8px 0;
        .msg {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
        }
      }
      .rows {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
