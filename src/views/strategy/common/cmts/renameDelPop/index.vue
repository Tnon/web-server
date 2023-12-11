<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-08 10:08:40
 * @LastEditTime: 2022-11-25 16:02:14
-->
<template>
  <a-popover
    placement="bottomRight"
    trigger="click"
    destroyTooltipOnHide
    overlayClassName="popNoPad"
    autoAdjustOverflow
  >
    <template #content>
      <div>
        <!-- 策略重命名 start -->
        <a-button class="wbbtn" @click="reNameStrategy" type="text">
          {{ t('strategy.straRnm') }}
        </a-button>
        <!-- 策略重命名 end -->
      </div>
      <div>
        <!-- 策略删除 start -->
        <a-button class="wbbtn" @click="deleteStrategy" type="text">
          {{ t('strategy.delete') }}
        </a-button>
        <!-- 策略删除 end -->
      </div>
    </template>
    <EllipsisOutlined class="moreIcon" />
  </a-popover>
</template>

<script setup lang="ts">
  import { delSafeStrategy, editSafeStrategy } from '@/api/strategy/safe';
  import { StrategyType } from '@/views/strategy/common/types';
  import { useModal } from '@/hooks';
  import { createVNode, PropType, reactive, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import addModal from '@/views/strategy/common/cmts/addModal';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  const props = defineProps({
    globalID: {
      type: Number,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
    //正在操作的策略id
    activedId: {
      type: Number,
      required: true,
    },
    activedName: {
      type: String,
      required: true,
    },
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    refreshStrategyList: {
      type: Function,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
  });
  const { t } = useI18n();
  const emit = defineEmits(['update:selectedId', 'update:isEditing']);
  //策略重命名
  const reNameStrategy = () => {
    useModal(
      {
        title: t('strategy.renmStra'),
        contentProps: {
          fields: reactive({ name: props.activedName }),
        },
        handleOk: async (conRef) => {
          await unref(conRef.formRef).validate();
          const { id } = await editSafeStrategy({
            name: unref(conRef).fields.name,
            id: props.activedId,
            policy_type: props.strategyType,
          });
          if (id) {
            props.refreshStrategyList(); // 刷新策略列表
          }
        },
      },
      addModal,
    );
  };
  //策略删除
  const deleteStrategy = () => {
    useModal(
      {
        title: t('strategy.deleteStra'),
        handleOk: async () => {
          const { code } = await delSafeStrategy({
            id_string: props.activedId + '',
            policy_type: props.strategyType,
          });
          if (!code) {
            //若删除的策略id和选中的策略id一样，默认选中全局策略
            if (props.activedId === props.selectedId) {
              emit('update:selectedId', props.globalID);
              //删除当前编辑的策略，恢复未编辑状态
              emit('update:isEditing', false);
            }
            props.refreshStrategyList(); // 刷新策略列表
          }
        },
      },
      createVNode('span', null, t('strategy.delstrCfm')),
    );
  };
</script>

<style scoped lang="less">
  .moreIcon {
    cursor: pointer;
    font-size: @fz16;
  }
  .wbbtn {
    width: 180px;
    height: 40px;
    justify-content: left;
    border-radius: 0;
  }
</style>
