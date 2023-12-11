<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-11 14:39:57
 * @LastEditTime: 2023-01-16 16:31:46
-->
<template>
  <a-popover
    trigger="click"
    placement="bottomRight"
    @openChange="openChange"
    overlayClassName="batchM"
  >
    <template #content>
      <div class="container">
        <div class="nodes" @click="useCheckBox('del')" :class="{ actived: boxType == 'del' }">
          {{ t('asset.delHost') }}
        </div>
      </div>
    </template>
    <a-button type="text" :class="{ remdelactived: boxType || showPop }">
      <template #icon>
        <CarryOutOutlined />
      </template>
      <slot></slot>
    </a-button>
  </a-popover>
</template>
<script lang="ts" setup>
  import { ref, PropType } from 'vue';
  import { CarryOutOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { ONLINESTATUS } from '@/enums/assetsType';
  const props = defineProps({
    boxType: String,
    isCheck: Boolean,
    //哪些key在等于谁的情况下 disable
    // disKey: {
    //   type: Object as PropType<{ disabled_keys: { key: string; value: any }[] }>,
    // },
    disabledKeys: Array as PropType<{ key: string; value: any }[]>,
  });
  const emit = defineEmits([
    'update:disabledKeys',
    'update:isCheck',
    'update:boxType',
    'refreshTable',
  ]);
  const { t } = useI18n();
  const showPop = ref<boolean>(false);
  //pop openChange
  const openChange = (b) => {
    showPop.value = b;
  };

  //del or move
  const useCheckBox = async (type) => {
    //
    if (type === props.boxType) {
      emit('update:isCheck', false);
      emit('update:boxType', '');
      emit('update:disabledKeys', []);
    } else {
      emit('update:isCheck', true);
      emit('update:boxType', type);
      emit('update:disabledKeys', [{ key: 'online', value: ONLINESTATUS.ONLINE }]);
    }
    //刷新 重绘
    emit('refreshTable', true);
  };
</script>
<style lang="less" scoped>
  .batchM {
    .ant-popover-inner-content {
      padding: 0;
    }
    .container {
      padding: 8px 0;
      .line {
        width: 200px;
        height: 1px;
        background: #eeeeee;
        border-radius: 8px;
        margin: 8px 0;
      }
      .actived {
        background: #eee !important;
      }
      .nodes {
        width: 200px;
        padding: 0 16px;
        line-height: 40px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        cursor: pointer;
        &:hover {
          background: #eee;
        }
      }
    }
  }
  .remdelactived {
    background: #eee !important;
  }
</style>
