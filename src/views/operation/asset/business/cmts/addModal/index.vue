<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-14 19:16:54
 * @LastEditTime: 2022-10-27 15:43:04
-->
<template>
  <a-form class="form" v-bind="formLayout">
    <a-form-item v-bind="validateInfos.group_name" :label="t('operation.yewname')">
      <a-input v-model:value="fields.group_name" :placeholder="t('operation.yewnameerm')" />
    </a-form-item>

    <a-form-item :label="t('operation.busg')">
      <a-tree-select
        :fieldNames="fieldNames"
        class="treeselect"
        v-model:value="fields.parent_id"
        :tree-data="dataSource"
        treeNodeFilterProp="title"
        :tree-checkable="false"
        show-search
        allow-clear
        :placeholder="t('operation.qxlgjh')"
        :show-checked-strategy="SHOW_PARENT"
      />
    </a-form-item>
    <a-form-item :label="t('operation.mark')">
      <a-input v-model:value="fields.desc_info" :placeholder="t('operation.pinmat')" />
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Form, TreeSelect } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { getBusinessGroups } from '@/api/operation/asset';
  import { GROUPENUM } from '@/enums/moveGroup';
  import { validateName } from '.';
  const useForm = Form.useForm;
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;
  const fieldNames = {
    children: 'items',
    label: 'name',
    key: 'id',
    value: 'id',
  };
  const formLayout = {
    labelCol: { span: 6 }, // 表单左侧占位
    wrapperCol: { span: 18 }, // 表单内容的占位
  };
  const { t } = useI18n();
  const fields = reactive({
    group_name: '',
    parent_id: undefined,
    desc_info: '',
  });

  const rulesRef = reactive({
    group_name: [
      {
        required: true,
        message: t('operation.yewnameerm'),
      },
      { validator: validateName, message: t('operation.newGPlacNext') },
    ],
    // parent_id: [
    //   {
    //     required: true,
    //     message: t('operation.qxlgjh'),
    //   },
    // ],
  });
  const { validate, validateInfos } = useForm(fields, rulesRef);
  //树 数据
  let dataSource: any = ref<any>();
  const getTreeData = async () => {
    const { items } = await getBusinessGroups({
      filter: {
        id: GROUPENUM.ALL,
      },
      exclude_id: GROUPENUM.UNGROUP + '',
      page: {
        page_index: -1,
        page_size: 20,
      },
    } as any);
    dataSource.value = items;
  };
  getTreeData();
  defineExpose({ validate, fields });
</script>
<style lang="less" scoped>
  .suffixIcon {
    position: absolute;
    top: 5px;
    right: 10px;
    color: #666;
  }
  .header {
    font-size: @fz20;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    padding: 16px 24px 16px;
  }
  .subtitle {
    padding: 0 24px;
    margin-bottom: 24px;
    font-size: @fz14;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
  }
  .form {
    padding: 0 24px;
    ::v-deep(.ant-input) {
      border-radius: 8px;
    }
  }
</style>
