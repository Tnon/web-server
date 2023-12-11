<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-19 22:48:18
 * @LastEditTime: 2023-08-24 11:19:09
-->
<template>
  <div class="container">
    <!-- 左侧模板卡片 start -->
    <div class="left">
      <div
        class="title"
        @click="initIndex"
        :class="{ actived: selectedCardId === undefined && isViewMode }"
      >
        <div class="lefto">
          <custom-icon type="#ax-reportemail" class="cic" />
          <span class="text">{{ t('report.ztmb') }}</span>
        </div>
        <!-- 搜索模板 start -->
        <a-input-search
          class="search"
          v-model:value.trim="searchTitle"
          :title="t('report.templateNamePlhder')"
          :placeholder="t('report.templateNamePlhder')"
          @search="searchData"
          @change="searchData"
        />
        <!-- 搜索模板 end -->
      </div>
      <div class="operate">
        <div class="mytmp">{{ t('report.mytmp') }}</div>

        <!-- 新建按钮 start -->
        <a-button class="addButton" type="text" @click="initData">
          <template #icon>
            <PlusOutlined class="addIcon" />
          </template>
          {{ t('report.createTemplate') }}
        </a-button>
        <!-- 新建按钮 end -->
      </div>
      <div class="allTemplate">
        <card-list
          v-model:selectedCardId="selectedCardId"
          v-model:selectedCardCategory="selectedCardCategory"
          v-model:isViewMode="isViewMode"
          v-model:isHasXunjian="isHasXunjian"
          :searchTitle="searchTitle"
          ref="cardListRef"
        />
      </div>
    </div>
    <!-- 左侧模板卡片 end -->
    <!-- 右侧表单 start -->
    <form-right
      class="formRight"
      v-model:selectedCardId="selectedCardId"
      v-model:isViewMode="isViewMode"
      :selectedCardCategory="selectedCardCategory"
      :refeshFunc="getTemplateList"
      :closeModal="closeModal"
      :isHasXunjian="isHasXunjian"
      :initData="initData"
      :initIndex="initIndex"
      :filter="filter"
    />
    <!-- 右侧表单 end -->
  </div>
</template>
<script lang="ts" setup>
  import { PropType, ref, unref, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { TaskFilter } from '@/api/report/model';
  import formRight from './formRight';
  import cardList from './cardList';
  import { ReportType } from '@/enums/reportType';

  defineProps({
    closeModal: {
      type: Function,
      required: true,
    },
    filter: {
      type: Object as PropType<TaskFilter>,
      required: true,
    },
  });
  const { t } = useI18n();
  //巡检日报是否创建
  const isHasXunjian = ref(false);
  //卡片列表dom
  const cardListRef = ref<any>();
  //搜索的值
  const searchTitle = ref('');
  //选择的卡片id
  const selectedCardId = ref<number | undefined>(undefined);
  //选择卡片的类型
  const selectedCardCategory = ref<number | undefined>(undefined);
  //浏览还是新建或编辑
  const isViewMode = ref(true);
  //获取卡片列表
  const getTemplateList = async (isShowLoad?: boolean) => {
    const res = await unref(cardListRef).getTemplateList(isShowLoad);
    return Promise.resolve(res);
  };
  //初始化表单和选中数据
  const initData = () => {
    isViewMode.value = false;
    selectedCardId.value = undefined;
    selectedCardCategory.value = ReportType.Word;
  };
  const initIndex = () => {
    isViewMode.value = true;
    selectedCardId.value = undefined;
    selectedCardCategory.value = undefined;
  };
  // search Event
  function searchData(v, e) {
    const { value } = v.target ?? { value: v };
    if (e && value) {
      getTemplateList(true);
    }
    if (!value && !e) {
      nextTick(() => {
        getTemplateList(true);
      });
    }
  }
</script>
<style lang="less" scoped>
  .container {
    border-top: 1px solid rgba(0, 0, 0, 0.08);
    display: flex;
  }
  .left {
    width: 35%;
    padding: 8px;
    border-right: 1px solid rgba(0, 0, 0, 0.08);
    .title {
      cursor: pointer;
      padding: 6px 16px;
      display: flex;
      align-items: center;

      border-radius: 8px;
      justify-content: space-between;
      margin-bottom: 16px;
      .lefto {
        display: flex;
        align-items: center;
        .text {
          font-size: @fz13;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
          margin-left: 8px;
        }
        .cic {
          color: rgba(0, 0, 0, 0.8);
        }
      }
      .search {
        width: 200px;
      }
    }
    .actived {
      background: rgba(0, 0, 0, 0.08);
    }
    .operate {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding-left: 16px;
      .mytmp {
        color: rgba(0, 0, 0, 0.4);
        font-size: @fz12;
      }
    }

    .allTemplate {
      height: 600px;
      overflow: auto;
    }
  }
</style>
