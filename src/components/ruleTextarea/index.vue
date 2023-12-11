<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 19:34:15
 * @LastEditTime: 2022-10-13 16:49:43
-->
<template>
  <div class="container">
    <div class="header">
      <span>
        <slot name="title"></slot>
      </span>
      <slot name="check"></slot>
    </div>
    <div class="content">
      <div class="tools">
        <div class="msg">
          <slot name="subtitle"></slot>
        </div>
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
      </div>
      <a-form>
        <a-form-item v-bind="validateInfos.textAreaValue">
          <a-textarea v-model:value="modelRef.textAreaValue" :placeholder="placeholder" :rows="4" />
        </a-form-item>
      </a-form>
      <div class="rows">
        <span> {{ rows }}/{{ max }} </span>
        <slot name="confirm"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType, computed, reactive, watch, watchEffect } from 'vue';
  import { message } from 'ant-design-vue';
  import { fileRead } from '@/components/file-read';
  import { useI18n } from 'vue-i18n';
  import { preendTrim } from '@/utils/tools';
  import { fakeClick, validateIpRegs, validatePaths, validatePathLength } from '.';
  import { Form } from 'ant-design-vue';
  //表单hook
  const useForm = Form.useForm;
  const { t } = useI18n();
  //组件接口
  const props = defineProps({
    type: String,
    max: Number,
    placeholder: String,
    fileName: String,
    enabled: {
      type: Number,
      default: 2,
    },
    state: {
      type: Object as PropType<{ value: Array<string> }>,
      required: true,
    },
  });
  //textarea行数正则函数
  const validateRows = () => {
    if (preendTrim(props.state.value).length <= props.max!) {
      return Promise.resolve();
    }
    return Promise.reject();
  };
  //动态正则初始化
  const rulesRef = reactive({
    textAreaValue: [
      {
        required: props.enabled === 1,
        message: t('strategy.stryNemp'),
      },
      {
        validator: validateRows,
        message: t('strategy.ccMax'),
      },
    ],
  });
  //登录IP正则
  if (props.type === 'ip-pattern' || props.type === 'ip') {
    rulesRef.textAreaValue.push({
      validator: validateIpRegs as any,
      message: t('strategy.pipIpr'),
    });
  }
  //自定义路径正则
  if (props.type === 'path-custom' || props.type === 'path-ignore') {
    rulesRef.textAreaValue.push({
      validator: validatePaths as any,
      message: t('strategy.nyxrootp'),
    });
    rulesRef.textAreaValue.push({
      validator: validatePathLength as any,
      message: t('strategy.pathlbih'),
    });
  }
  //表单值state
  const modelRef = reactive({
    textAreaValue: props.state.value.join('\n'),
  });
  //异步获取
  watchEffect(() => {
    modelRef.textAreaValue = props.state.value.join('\n');
  });
  //向外派发最终值
  watch(
    () => modelRef.textAreaValue,
    () => {
      props.state.value = modelRef.textAreaValue.split('\n');
    },
  );
  //表单验证
  const { validateInfos, validate } = useForm(modelRef, rulesRef);
  //动态正则，监听开关，开 校验 关 不校验
  watch(
    () => props.enabled,
    () => {
      rulesRef.textAreaValue[0].required = props.enabled === 1;
      validate('textAreaValue');
    },
    { flush: 'post' },
  );
  //行数
  const rows = computed(() => preendTrim(props.state.value).length);
  //整理文本域
  const resetData = () => {
    modelRef.textAreaValue = preendTrim(props.state.value).join('\n');
  };
  //上传文本，并派发出去结果
  const readTxt = (txt) => {
    const resetData = preendTrim(txt.split('\n'));
    if (!resetData) {
      message.error(t('strategy.notEmpty'));
      return false;
    }
    modelRef.textAreaValue = resetData.join('\n');
  };
  // txt文件导出
  const exportTxt = () => {
    resetData();
    const allStr = preendTrim(props.state.value).join('\n');

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
  //抛出验证
  defineExpose({ validate });
</script>

<style scoped lang="less">
  .container {
    background: #ffffff;
    border-radius: 8px;
    .header {
      display: flex;
      height: 40px;
      padding: 0 24px;
      align-items: center;
      justify-content: space-between;
      font-size: @fz14;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
    }
    .content {
      padding: 0 24px 16px 24px;
      .tools {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 48px;
        .msg {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
        }
        .btns {
          display: flex;
          .btn {
            border: 1px solid #eee;
            margin-right: 16px;
          }
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
