<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-14 19:16:54
 * @LastEditTime: 2022-12-28 14:49:13
-->
<template>
  <div class="formContainer">
    <a-form v-bind="formItemLayout">
      <!-- 管理员角色 start -->
      <a-form-item v-bind="validateInfos.u_type" :label="t('log.adminRole')">
        <a-select
          :disabled="isEmbed"
          v-model:value="formDataExtra.u_type"
          :placeholder="t('user.pIptRole')"
          class="select"
          allowClear
        >
          <template v-for="item in u_typeOptions" :key="item.id">
            <a-select-option :value="item.id">{{ item.role_name }}</a-select-option>
          </template>
        </a-select>
      </a-form-item>
      <!-- 管理员角色 end -->
      <!-- 可管理主机组 start -->
      <!-- v-if="formDataExtra.u_type === USERTOKEN.admin" -->
      <a-form-item
        v-bind="validateInfos.group_id"
        v-if="formDataExtra.u_type === USERTOKEN.operation"
        :label="t('operation.keglkzg')"
      >
        <a-tree-select
          :fieldNames="fieldNames"
          multiple
          class="treeselect"
          v-model:value="userGroupIdCmp"
          :tree-data="dataSource"
          treeNodeFilterProp="title"
          :tree-checkable="false"
          show-search
          allow-clear
          :placeholder="t('user.pselfge')"
          :show-checked-strategy="SHOW_PARENT"
        />
      </a-form-item>
      <!-- 可管理主机组 end -->
    </a-form>
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { Form, TreeSelect } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';
  import { GROUPENUM } from '@/enums/moveGroup';
  import { getUtypes } from '@/api/operation/user';
  import { getHostGroups } from '@/api/asset/hostInfo/host';
  import { USERTOKEN } from '@/store/modules/user/type';
  const props = defineProps({
    formDataExtra: {
      type: Object,
      required: true,
    },
    isEmbed: {
      type: Boolean,
      required: true,
    },
  });
  const useForm = Form.useForm;
  const SHOW_PARENT = TreeSelect.SHOW_PARENT;
  const { t } = useI18n();
  //表单布局
  const formItemLayout = {
    labelCol: { span: 6 }, // 表单左侧占位
    wrapperCol: { span: 18 }, // 表单内容的占位
  };
  //树形重定义
  const fieldNames = {
    children: 'items',
    label: 'name',
    key: 'id',
    value: 'id',
  };
  //用户类型数据
  const u_typeOptions = ref<any>([]);
  const openChange = async () => {
    const { code, items } = await getUtypes();
    if (!code) {
      u_typeOptions.value = items;
    }
  };
  //用户管理的主机组中介
  const userGroupIdCmp = computed({
    get: () => {
      if (
        props.formDataExtra.group_id.length === 1 &&
        props.formDataExtra.group_id[0] === GROUPENUM.ALL
      ) {
        return [];
      }
      return props.formDataExtra.group_id;
    },
    set: (v) => {
      props.formDataExtra.group_id = v;
    },
  });
  //获取角色类型
  openChange();
  //规则验证
  const rulesRef = reactive({
    u_type: [
      {
        required: true,
        message: t('user.pIptRole'),
      },
    ],
  });
  const { validate, validateInfos, resetFields } = useForm(props.formDataExtra, rulesRef);
  //树 数据
  let dataSource: any = ref<any>();
  const getTreeData = async () => {
    const { groups } = await getHostGroups(GROUPENUM.ALL, String(GROUPENUM.UNGROUP));
    dataSource.value = groups;
  };
  getTreeData();

  defineExpose({ validate, resetFields, state: props.formDataExtra });
</script>
<style lang="less" scoped>
  .formContainer {
    padding-top: 30px;
    border-top: 1px solid #eee;
  }
</style>
