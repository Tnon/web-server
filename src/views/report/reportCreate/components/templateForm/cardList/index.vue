<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-31 16:59:10
 * @LastEditTime: 2023-08-24 10:17:33
-->
<template>
  <a-spin :spinning="loading">
    <template v-if="emailTemplateList.length">
      <div
        class="card"
        v-for="item in emailTemplateList"
        :key="item.id"
        :class="{ selectdCard: selectedCardId === item.id }"
        @click="cardSelected(item.id, ReportType.Email)"
      >
        <div class="cardName">{{ item.title }}</div>
      </div>
    </template>
    <template v-if="templateList.length">
      <div
        class="card"
        v-for="item in templateList"
        :key="item.id"
        :class="{ selectdCard: selectedCardId === item.id }"
        @click="cardSelected(item.id, ReportType.Word)"
      >
        <div class="cardName">{{ item.title }}</div>
      </div>
    </template>
    <template v-if="!emailTemplateList.length && !templateList.length">
      <a-empty :image="Empty.PRESENTED_IMAGE_SIMPLE" />
    </template>
  </a-spin>
</template>

<script setup lang="ts">
  import { getTemplateListApi } from '@/api/report';
  import { PropType, ref } from 'vue';
  import { Empty } from 'ant-design-vue';
  import { ReportType } from '@/enums/reportType';
  const props = defineProps({
    searchTitle: {
      type: String,
      required: true,
    },
    selectedCardId: {
      type: Number,
    },
    isViewMode: {
      type: Boolean,
      required: true,
    },
    isHasXunjian: {
      type: Boolean,
      required: true,
    },
    selectedCardCategory: {
      type: Number as PropType<ReportType>,
    },
  });
  //派发
  const emit = defineEmits([
    'update:selectedCardId',
    'update:selectedCardCategory',
    'update:isViewMode',
    'update:isHasXunjian',
  ]);
  // 模板列表
  const templateList = ref<any>([]);
  //邮箱模板列表
  const emailTemplateList = ref<any>([]);
  //异步loading
  const loading = ref<boolean>(false);
  // 接口获取模板列表
  const getTemplateList = async (isShowLoad?: boolean) => {
    loading.value = !!isShowLoad;
    const { email, word } = await getTemplateListApi({
      filter: { title: props.searchTitle },
    });
    templateList.value = word ?? [];
    emailTemplateList.value = email ?? [];
    loading.value = false;
    if (emailTemplateList.value.length) {
      emit('update:isHasXunjian', true);
    } else {
      emit('update:isHasXunjian', false);
    }
    return Promise.resolve({ items: word ?? [] });
  };
  getTemplateList(true);
  // 卡片（模板）选择或选择变化
  const cardSelected = async (id, category) => {
    emit('update:selectedCardId', id);
    emit('update:selectedCardCategory', category);
    emit('update:isViewMode', true);
  };

  defineExpose({ getTemplateList });
</script>

<style scoped lang="less">
  .card {
    padding: 10px 16px;
    border-radius: 8px;
    display: flex;
    margin-bottom: 2px;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.08);
      .cardTime {
        display: none;
      }

      .deleteBtn {
        display: block;
      }
    }
  }

  .selectdCard {
    background: rgba(0, 0, 0, 0.08);
  }
</style>
