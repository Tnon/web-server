<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-14 19:16:54
 * @LastEditTime: 2023-01-10 16:07:59
-->
<template>
  <div>
    <div class="subtitle" v-if="warning">{{ t('operation.mogsubt') }}</div>
    <a-form>
      <a-form-item v-bind="validateInfos.business_group_id">
        <businessGroupSelect
          :multiple="false"
          v-model:selectedGroupIds="business_group_idState!.business_group_id"
          :placeholder="t('common.selectGroup')"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Form } from 'ant-design-vue';
  import { getBusinessGroups } from '@/api/operation/asset';
  import { useI18n } from 'vue-i18n';
  import { GROUPENUM } from '@/enums/moveGroup';
  import businessGroupSelect from '@/components/business-group-select';
  const useForm = Form.useForm;
  const props = defineProps({
    placeholder: {
      type: String,
    },
    business_group_idState: Object,
    business_group_id: Number,
    warning: {
      type: Boolean,
      default: false,
    },
  });
  const { t } = useI18n();
  const rulesRef = reactive({
    business_group_id: [
      {
        required: true,
        message: t('asset.selectGroup'),
      },
    ],
  });
  const { validate, validateInfos } = useForm(props.business_group_idState!, rulesRef);
  //树 数据
  let dataSource: any = ref<any>();
  const getTreeData = async () => {
    const { items } = await getBusinessGroups({
      filter: {
        id: GROUPENUM.ALL,
      },
      exclude_host: true,
      exclude_id:
        props.business_group_id !== undefined
          ? props.business_group_id + ',' + GROUPENUM.UNGROUP
          : '',
      page: {
        page_index: -1,
        page_size: 20,
      },
    } as any);
    dataSource.value = items;
  };
  getTreeData();
  defineExpose({ validate, business_group_idState: props.business_group_idState });
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
