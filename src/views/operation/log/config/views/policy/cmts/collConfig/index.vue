<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-08-29 17:35:10
 * @LastEditTime: 2023-09-14 17:43:23
-->
<template>
  <div class="container">
    <!-- 提示语 start -->
    <div class="tips">
      <InfoCircleFilled class="cicon" />
      <span class="text">{{ t('operation.tipsfsa') }}</span>
    </div>
    <!-- 提示语 end -->

    <!-- 新增配置 start -->
    <div class="btnCon">
      <a-button type="primary" @click="addConfig">{{ t('operation.xzoz') }}</a-button>
    </div>
    <!-- 新增配置 end -->

    <slots-table
      :scroll="{ y: '500px' }"
      ref="tableRef"
      :columns="columns"
      row-key="id"
      :arguments="{ type_id }"
      :get-list-func="getSysHlist"
    />
  </div>
</template>

<script setup lang="ts">
  import { SlotsTable } from '@/components/slots-table';
  import { InfoCircleFilled } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { getSysHlist } from '@/api/operation/syslog';
  import { useColumns } from './index';
  import { reactive, unref, ref } from 'vue';
  import { addConfigPath } from '@/api/operation/syslog';
  import { useModal } from '@/hooks/use-modal';
  import addCollCfg from '../addCollCfg';
  import { E_Enabled } from '@/views/reinforce/file/views/rule/type';
  import { E_Host_Range } from '@/views/reinforce/baseline/cmts/tableContent/type';
  const props = defineProps<{ type_id: number }>();
  const { t } = useI18n();

  const tableRef = ref<any>(null);
  const refreshTable = (bool?) => {
    unref(tableRef).refreshTableData(bool);
  };
  const columns = useColumns(t, refreshTable, props.type_id);

  const addConfig = () => {
    useModal(
      {
        title: t('operation.xzrilxs'),
        contentProps: {
          fields: reactive({ path: '', entities: [], desc: '' }),
        },
        handleOk: async (conRef) => {
          await unref(conRef).validate();
          const { code } = await addConfigPath({
            ...unref(conRef).modelRef,
            type_id: props.type_id,
            apply_type: E_Host_Range.Host,
            enabled: E_Enabled.Open,
          });
          //刷新表格
          !code && refreshTable();
        },
      },
      addCollCfg,
    );
  };
</script>

<style scoped lang="less">
  .container {
    .tips {
      display: flex;
      align-items: center;
      padding: 8px 12px;
      color: rgba(0, 0, 0, 0.6);
      font-size: @fz12;
      border-radius: 8px;
      margin: 0 12px 16px 12px;

      /* 背景/白 - 三级 */
      background: #f4f4f4;
      .cicon {
        margin-right: 8px;
      }
    }
    .btnCon {
      padding-left: 16px;
      margin-bottom: 16px;
    }
  }
</style>
