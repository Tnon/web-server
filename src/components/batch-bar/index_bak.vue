<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-11 10:14:44
 * @LastEditTime: 2023-03-07 17:00:01
-->
<template>
  <div class="batchBar">
    <span class="title">
      <slot name="title"></slot>
    </span>
    <span class="btns">
      <a-button type="text" @click="cancle"> {{ t('common.cancle') }}</a-button>
      <!-- <slot name="button"></slot> -->
      <a-button :type="btnType" :loading="batchLoading" :disabled="disabled" @click="batchHandle">
        {{ okText ?? t('common.confirm') }}
      </a-button>
    </span>
  </div>
</template>
<script lang="ts" setup>
  import { batchHandleFile } from '@/api/reinforce';
  import { useSelectAll } from '@/store/modules/select-all';
  import { HandleType, I_File_Filter } from '@/views/reinforce/file/cmts/tableContent/type';
  import { ref, PropType, computed, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  const { t } = useI18n();
  const props = defineProps({
    isCheck: Boolean,
    disabled: Boolean,
    tableRef: Object,
    okText: String,
    btnType: {
      type: String as PropType<'primary' | 'danger'>,
      default: 'primary',
    },
    handle: {
      type: Number as PropType<HandleType>,
    },
    agms: {
      type: Object as PropType<I_File_Filter>,
      required: true,
    },
    refreshTable: Function,
  });
  const emit = defineEmits(['update:isCheck']);

  //统一的loading
  const batchLoading = ref<boolean>(false);
  //取消选择
  const cancle = () => {
    emit('update:isCheck', false);
  };
  const selectAllStore = useSelectAll();
  //获取全局是否全选
  const isSelectAll = computed(() => selectAllStore.isSelectAll);

  //获取取消选择的ids
  const excludeRowKeys: any = computed(() => selectAllStore.exclude);
  //批量处理确定
  const batchHandle = async () => {
    //批量处理程序
    const sendKesArr = unref(isSelectAll)
      ? unref(excludeRowKeys)
      : unref(props.tableRef!).rowSelection.selectedRowKeys;

    // const sendObj: AttackHandleRecord = {};
    const sendObj = {
      filter: props.agms,
      isall: unref(isSelectAll),
      riskinfolist: sendKesArr,
      set_handle: props.handle === HandleType.HANDLED ? HandleType.UNHANDLE : HandleType.HANDLED, //初始化
    };

    batchLoading.value = true;
    await batchHandleFile(sendObj);
    props.refreshTable!();
    batchLoading.value = false;
  };
</script>
<style lang="less" scoped>
  .batchBar {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
    background: rgba(24, 186, 121, 0.1);
    border-radius: 8px;
  }
</style>
