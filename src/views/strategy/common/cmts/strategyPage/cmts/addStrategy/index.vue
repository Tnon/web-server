<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-16 09:33:38
 * @LastEditTime: 2022-10-09 14:17:24
-->
<template>
  <PlusOutlined class="addIcon" @click="addStrategyHook" />
</template>

<script setup lang="ts">
  import { PropType, reactive, unref } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  import { useEditing } from '@/views/strategy/common/hooks/useEditing';
  import { StrategyType } from '@/views/strategy/common/types';
  import addModal from '@/views/strategy/common/cmts/addModal';
  import { addSafeStrategy } from '@/api/strategy/safe';
  import { useModal } from '@/hooks';
  const props = defineProps({
    isEditing: {
      type: Boolean,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
    editOrSave: {
      type: Function,
      required: true,
    },
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    getStrategyList: {
      type: Function,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:selectedId', 'update:isEditing']);
  //添加策略的钩子
  const addStrategyHook = () => {
    //编辑状态时候
    if (props.isEditing) {
      useEditing(
        addStrategy,
        async () => {
          //先保存
          await props.editOrSave();
          //再创建
          addStrategy();
        },
        t,
      );
    } else {
      addStrategy();
    }
  };
  // 新增策略方法
  const addStrategy = () => {
    useModal(
      {
        title:
          props.strategyType === StrategyType.Safe
            ? t('strategy.newSafeSta')
            : t('strategy.newAssetSta'),
        contentProps: {
          fields: reactive({}),
        },
        handleOk: async (conRef) => {
          await unref(conRef.formRef).validate();
          const { id } = await addSafeStrategy({
            pkg: {
              name: unref(conRef).fields.name,
              policy_type: props.strategyType,
            },
          });
          if (id) {
            // 刷新策略列表
            await props.getStrategyList();
            //选中新的策略
            emit('update:selectedId', id);
            //变成可编辑状态
            emit('update:isEditing', true);
          }
        },
      },
      addModal,
    );
  };
</script>

<style scoped lang="less">
  .addIcon {
    padding: 8px;
    cursor: pointer;
    font-size: @fz16;
    margin-right: 12px;
    transition: all 0.3s;
    &:hover {
      transform: rotate(90deg);
      color: @primary-color;
    }
  }
</style>
