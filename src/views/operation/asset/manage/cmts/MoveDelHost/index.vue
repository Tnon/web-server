<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-07 19:52:38
 * @LastEditTime: 2023-01-10 15:06:33
-->
<template>
  <div class="confitBar">
    <div class="leftOP">
      <span class="label">
        {{ t('asset.selectedHost', [dataTableRef?.tableRef.selectAllNumber]) }}
      </span>
      <div v-if="boxType == 'move'" class="leftOP">
        <span class="label rlabel">{{ t('asset.moveGroupMsg') }}</span>
        <span class="selectTree">
          <hostGroupSelect
            v-model:selectedGroupIds="groupsCmp"
            :placeholder="t('asset.selectMG')"
            :multiple="false"
          />
        </span>
      </div>
      <div v-else>
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
  import { reactive, PropType, computed, unref, ref } from 'vue';
  import hostGroupSelect from '@/components/host-group-select';
  import { useModal, useValidatePwd } from '@/hooks';
  import { move_Group, del_Group } from '@/api/asset/hostInfo/host';
  import { useSelectAll } from '@/store/modules/select-all';
  import { initRowSelection } from '@/components/slots-table/hooks';
  import { message } from 'ant-design-vue';
  import { pwdConfirm } from '@/components/pwdConfirm';
  import { useI18n } from 'vue-i18n';
  import { GroupHost } from '@/api/operation/model';
  import { GROUPENUM } from '@/enums/moveGroup';

  const props = defineProps({
    //全选时候带的条件结构体
    filter: {
      type: Object as PropType<GroupHost>,
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

  //移入的目标组的id as [number]
  const state = reactive<{ groups: number }>({
    groups: GROUPENUM.ALL,
  });
  //分组计算
  const groupsCmp = computed({
    get: () => {
      if (state.groups === GROUPENUM.ALL) {
        return undefined;
      }
      return state.groups;
    },
    set: (v) => {
      state.groups = v ?? GROUPENUM.ALL;
    },
  });
  //初始化init
  const hideBar = () => {
    emit('update:boxType', '');
    emit('update:isCheck', false);
  };

  //移入分组和删除主机 确定按钮
  const confirmMoveDel = async () => {
    //没选分组
    if (state.groups === GROUPENUM.ALL && props.boxType === 'move') {
      message.error(t('asset.selectGroup'));
      return false;
    }
    //移入分组和删除主机 接口
    let sendObj;
    if (unref(isSelectAll)) {
      sendObj = {
        filter: props.filter,
        group_id: state.groups,
        exclude: unref(excludeHostIds).join(','),
      };
      // if (!sendObj.exclude.length) {
      //   message.error('请选择要移动的主机！')
      //   return false
      // }
    } else {
      sendObj = {
        group_id: state.groups,
        host_id_array: unref(selectedIds).join(','),
      };
      if (!sendObj.host_id_array.length) {
        message.error(props.boxType === 'move' ? t('asset.selectHost') : t('asset.seleDelHs'));
        return false;
      }
    }

    //移动
    if (props.boxType === 'move') {
      confirmLoading.value = true;
      await move_Group(sendObj);
      confirmLoading.value = false;
    } else {
      useModal(
        {
          title: t('asset.surDelHs'),
          contentProps: {
            labelText: t('asset.pwdDelVali'),
          },
          handleOk: async (conRef) => {
            await conRef.validate();
            //删除
            delete sendObj['group_id'];
            return useValidatePwd(del_Group, sendObj, conRef, refreshTreeAndTable);
          },
        },
        pwdConfirm,
      );
      return;
    }

    //刷新下
    refreshTreeAndTable();
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
