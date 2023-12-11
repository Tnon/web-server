<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2022-11-11 14:52:38
-->
<template>
  <div class="confitBar">
    <div class="leftOP">
      <span class="label">
        {{ t('asset.selectedHost', [dataTableRef?.tableRef.selectAllNumber]) }}
      </span>
      <div>
        <span class="label">{{ t('asset.delGMsg') }}</span>
      </div>
    </div>
    <div>
      <a-button type="text" @click="hideBar">{{ t('common.cancle') }}</a-button>
      <a-button
        @click="confirmMoveDel"
        :loading="confirmLoading"
        type="primary"
        :danger="boxType !== 'move'"
        :disabled="!dataTableRef?.tableRef.selectAllNumber"
      >
        {{ t('common.confirm') }}
      </a-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, computed, unref, ref } from 'vue';
  import { useModal, useValidatePwd } from '@/hooks';
  import { del_Group } from '@/api/asset/hostInfo/host';
  import { HostList } from '@/api/asset/model/assetsModel';
  import { useSelectAll } from '@/store/modules/select-all';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { message } from 'ant-design-vue';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { useI18n } from 'vue-i18n';

  const props = defineProps({
    //全选时候带的条件结构体
    filter: {
      type: Object as PropType<HostList>,
    },
    //删除 还是 移动
    boxType: {
      type: String,
    },
    //表格开启check
    isCheck: Boolean,
    //表格父的ref,获取内容
    dataTableRef: Object,
  });
  // 外部筛选卡片不显示
  const emit = defineEmits(['update:boxType', 'update:isCheck', 'refreshTable']);
  const { t } = useI18n();
  //批量处理loading
  const confirmLoading = ref<boolean>(false);
  const selectAllStore = useSelectAll();
  //获取选中行
  const selectedIds = computed(() =>
    props.dataTableRef!.tableRef.rowSelection
      ? props.dataTableRef!.tableRef.rowSelection.selectedRowKeys
      : [],
  );
  //获取全局是否全选
  const isSelectAll = computed(() => selectAllStore.isSelectAll);

  //获取取消选择的ids
  const excludeHostIds: any = computed(() => selectAllStore.exclude);

  //初始化init
  const hideBar = () => {
    emit('update:boxType', '');
    emit('update:isCheck', false);
  };

  //移入分组和删除主机 确定按钮
  const confirmMoveDel = async () => {
    //移入分组和删除主机 接口
    let sendObj;
    if (unref(isSelectAll)) {
      sendObj = {
        filter: props.filter,
        exclude: unref(excludeHostIds).join(','),
      };
    } else {
      sendObj = {
        host_id_array: unref(selectedIds).join(','),
      };
      if (!sendObj.host_id_array.length) {
        message.error(props.boxType === 'move' ? t('asset.selectHost') : t('asset.seleDelHs'));
        return false;
      }
    }
    //删除确认
    useModal(
      {
        title: t('asset.surDelHs'),
        contentProps: {
          labelText: t('asset.pwdDelVali'),
        },
        handleOk: async (conRef) => {
          await conRef.validate();
          return useValidatePwd(del_Group, sendObj, conRef, refreshTreeAndTable);
        },
      },
      pwdConfirm,
    );
  };
  const refreshTreeAndTable = async () => {
    //派发刷新表格的事件
    await emit('refreshTable');
    //初始化
    initRowSelection();
  };
</script>
<style lang="less" scoped>
  .confitBar {
    .leftOP {
      display: flex;
      align-items: center;
      .label {
        font-size: @fz12;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }

      .rlabel {
        margin-right: 16px;
      }
      .selectTree {
        width: 200px;
      }
    }
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 32px;
    padding: 0 16px;
    margin-right: 16px;
    background: rgba(24, 186, 121, 0.1);
    border-radius: 8px;
  }
</style>
