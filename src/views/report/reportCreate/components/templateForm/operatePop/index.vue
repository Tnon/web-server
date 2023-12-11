<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-22 23:21:49
 * @LastEditTime: 2023-10-13 10:22:57
-->
<template>
  <div>
    <a-popover trigger="click" placement="leftTop" destroyTooltipOnHide>
      <template #content>
        <a-popconfirm
          disabled
          destroyTooltipOnHide
          :title="t('report.templateDeleteTip', [itemInfo.title])"
          :ok-text="t('common.confirm')"
          :cancel-text="t('common.cancle')"
          v-model:open="confirmVisible"
          @confirm="confirmDelete(itemInfo.id)"
        >
          <span class="popContent" @click="confirmVisibleFn">
            {{ t('common.delete') }}
          </span>
        </a-popconfirm>
      </template>
      <EllipsisOutlined class="elIcon" @click="(e) => popClick(e)" />
    </a-popover>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { message } from 'ant-design-vue';
  import { EllipsisOutlined } from '@ant-design/icons-vue';
  import { TemplateStatus } from '@/enums/reportType';

  const props = defineProps({
    itemInfo: {
      type: Object,
      required: true,
    },
    refeshFunc: {
      type: Function as PropType<(loading: boolean) => void>,
      required: true,
    },
  });
  const emit = defineEmits(['confirmDelete']);
  const { t } = useI18n();
  const confirmVisible = ref<boolean>(false);
  // 点击删除字样，判断是否能删除
  const confirmVisibleFn = async () => {
    // 如果popConfirm已经出现，此时再点击删除字样，则将popConfirm隐藏
    if (confirmVisible.value) {
      confirmVisible.value = false;
      return;
    }
    // 如果popConfirm还没出现，则调取接口获取最新状态，判断是否能删除
    await props.refeshFunc(false);
    if (props.itemInfo.status === TemplateStatus.DeleteUpdate) {
      confirmVisible.value = true;
    } else {
      confirmVisible.value = false;
      message.error(t('report.templateUnableDeleteTip'));
    }
  };
  // 删除字样展示
  const popClick = (e) => {
    // 将删除确认pop保持关闭
    confirmVisible.value = false;
    e.stopPropagation();
  };
  // 不能删除的提醒
  // const unableWaring = () => {
  //   message.error('当前模板已被执行中或者已暂停的任务使用，请先删除任务再删除该模板');
  // };
  // 确认删除
  const confirmDelete = (id) => {
    emit('confirmDelete', id);
  };
</script>
<style lang="less" scoped>
  .popContent {
    width: 80px;
    display: block;
    &:hover {
      cursor: pointer;
    }
  }
</style>
