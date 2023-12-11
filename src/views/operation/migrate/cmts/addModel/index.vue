<template>
  <div>
    <div class="tip">{{ t('setting.migWarnTip') }}</div>
    <a-form class="miForm">
      <a-form-item v-bind="validateInfos.group_id">
        <a-tree-select
          treeNodeFilterProp="title"
          :fieldNames="fieldNames"
          v-model:value="fields.group_id"
          :tree-data="treeData"
          :tree-checkable="false"
          allow-clear
          :show-checked-strategy="SHOW_PARENT"
          :placeholder="t('common.psecGrp')"
        />
      </a-form-item>
      <a-form-item v-bind="validateInfos.new_host">
        <a-input
          :placeholder="t('setting.pIpuMurl')"
          v-model:value.trim="fields.new_host"
          type="text"
        />
      </a-form-item>
      <a-form-item v-bind="validateInfos.new_port">
        <a-input
          :placeholder="t('setting.pIputUrlPort')"
          v-model:value.trim="fields.new_port"
          type="text"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { TreeSelect, Form } from 'ant-design-vue';
  import { getHostGroups } from '@/api/asset/hostInfo/host';
  import { ValidateAddress, ValidatePort } from '@/utils/reg';
  import { useI18n } from 'vue-i18n';
  const useForm = Form.useForm;
  const { t } = useI18n();
  //迁移结构体
  const fields = reactive({
    new_port: '',
    new_host: '',
    group_id: undefined,
  });
  //显示方式
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;
  //替换字段
  const fieldNames = {
    children: 'items',
    label: 'name',
    key: 'id',
    value: 'id',
  };
  //正则
  const rulesRef = reactive({
    group_id: [
      {
        required: true,
        message: t('setting.pMSelGrp'),
      },
    ],
    new_host: [
      {
        message: t('setting.pIptPtDname'),
        validator: ValidateAddress,
      },
    ],
    new_port: [
      {
        required: true,
        message: t('setting.portPlac'),
        validator: ValidatePort,
      },
    ],
  });
  //form hook
  const { validate, validateInfos } = useForm(fields, rulesRef);
  //树数据
  let treeData: any = ref<any>([{ id: -1, name: t('common.GroupAll') }]);
  const getTreeData = async () => {
    const { groups } = await getHostGroups(-1);
    treeData.value = treeData.value.concat(groups);
  };
  getTreeData();

  defineExpose({ validate, fields });
</script>

<style lang="less" scoped>
  .miForm {
    .ant-input {
      border-radius: 8px;
    }
  }
  .tip {
    color: #f8a04c;
    font-size: @fz14;
    margin-bottom: 24px;
  }
</style>
