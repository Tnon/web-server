<template>
  <a-form class="customForm" v-bind="formItemLayout">
    <template v-for="item in formPropsColumns" :key="item.dataIndex">
      <div class="subTitle" v-if="item.dataIndex === 'slots'">
        {{ item.formProps?.subTitle }}
      </div>

      <a-form-item v-else :label="item.title" v-bind="validateInfos[item.dataIndex]">
        <!-- 动态渲染不同类型的组件例如:input、radio等这些 -->
        <component
          @btnEvent="btnEvent"
          :disabled="disabled"
          v-model:value="fields[item.dataIndex]"
          :form-item="item.formProps"
          :dataIndex="item.dataIndex"
          :is="getComponent(item.formProps?.type)"
          :disKeys="disKeys"
        >
          <slot :validate="validate" :fields="fields"></slot>
        </component>
      </a-form-item>
    </template>
  </a-form>
</template>
<script lang="ts" setup>
  import { Form } from 'ant-design-vue';
  import { reactive, PropType } from 'vue';
  import components from './components';
  import { TableColumn } from '@/types/tableColumn';
  import { filter } from '@/utils/tools';
  const useForm = Form.useForm;
  const props = defineProps({
    // 表单行信息。包括每一项的左侧名称title、dataIndax索引、formProps配置表单项的属性
    colsMap: {
      type: Array as PropType<TableColumn[]>,
      required: true,
    },
    // 表单域和dataIndex值一样
    fields: {
      type: Object,
      default: () => ({}),
    },
    // 单独禁用表单的某一项，根据fields中的一项例如:{oldPassword:true} 表示禁止输入旧密码
    disKeys: {
      type: Object,
      default: () => ({}),
    },
    // form布局设置，span:栅格占位数，offset:栅格左侧的间隔格数
    formItemLayout: {
      type: Object,
      default: () => ({
        labelCol: { span: 6 }, // 表单左侧占位
        wrapperCol: { span: 18 }, // 表单内容的占位
      }),
    },
    // 表单所有项的禁用，false不禁用所有项，true禁用所有项
    disabled: {
      type: Boolean,
      default: false,
    },
  });
  const formPropsColumns = filter<any>(props.colsMap, (ele) => ele.formProps);
  const emit = defineEmits(['btnEvent']);
  //表单验证规则,返回的结果是{emil:[{require:'',message:''}]}
  const rulesRef = reactive(
    filter<TableColumn>(props.colsMap!, (ele) => ele.formProps).reduce((pre, cur: any) => {
      pre[cur.dataIndex] = cur.formProps!.rules || [];
      return pre;
    }, {}),
  );

  //特殊事件
  const btnEvent = () => {
    emit('btnEvent');
  };

  //给filed主动赋键
  props.colsMap!.forEach((ele: any) => {
    if (ele.dataIndex !== 'slots' && ele.formProps) {
      props.fields![ele.dataIndex] = props.fields![ele.dataIndex] ?? undefined;
      props.fields![ele.dataIndex] =
        props.fields![ele.dataIndex] === '-' ? '' : props.fields![ele.dataIndex];
    }
  });

  // useForm(表单域)
  const { resetFields, validate, validateInfos, validateField } = useForm(props.fields!, rulesRef);

  const preset = ['input', 'select', 'radio', 'checkbox', 'textarea', 'password'];
  // 获取组件名称
  const getComponent = (type) => {
    // 预设组件
    if (preset.includes(type)) {
      // type = type === 'password' ? 'input' : type
      return components['hooks-form-' + type];
    }
    return type;
  };

  defineExpose({ resetFields, validate, validateInfos, validateField, fields: props.fields });
</script>
<style lang="less" scoped>
  .subTitle {
    font-size: @fz18;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 20px;
  }
  .customForm {
    ::v-deep(.ant-input) {
      border-radius: 8px;
    }
  }
</style>
