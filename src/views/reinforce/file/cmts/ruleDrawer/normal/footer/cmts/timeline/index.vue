<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-12-08 19:37:17
 * @LastEditTime: 2023-08-03 11:01:56
-->
<template>
  <a-timeline class="timeLine" v-if="dataList.length">
    <template v-for="item in dataList" :key="item.event_at + item.num">
      <a-timeline-item color="#F05064">
        <p class="title">{{ t('common.timeRecord', [item.num]) }}</p>
        <p class="time">{{ item.event_at }}</p>
        <p class="desc">{{ item.desc }}</p>
      </a-timeline-item>
    </template>
    <a-pagination
      v-if="dataList.length"
      v-model:current="pageOption.page_index"
      v-model:pageSize="pageOption.page_size"
      :total="totalNumber"
      @change="paginationChange"
      showSizeChanger
    />
  </a-timeline>
</template>
<script lang="ts" setup>
  import { PropType, reactive, ref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getBlHisDraw } from '@/api/reinforce';
  import { E_Reinforce_Type, HandleType } from '@/views/reinforce/file/cmts/tableContent/type';
  // //属性
  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    handle: {
      type: Number as PropType<HandleType>,
      required: true,
    },
  });
  // 国际化;
  const { t } = useI18n();
  //分页state
  const pageOption = reactive({
    page_index: 1,
    page_size: 10,
  });
  const totalNumber = ref(0);
  const dataList = ref<any>([]);
  //获取攻击记录
  const getAttackRecord = async () => {
    const { list, total, page_index } = await getBlHisDraw({
      filter: {
        handle: props.handle,
        id: props.id,
        risk_type: E_Reinforce_Type.File,
      },
      page: pageOption,
    });
    dataList.value = list;
    totalNumber.value = total;
    pageOption.page_index = page_index;
  };
  getAttackRecord();
  //改变页码的cb
  const paginationChange = (page_index, page_size) => {
    pageOption.page_index = page_index;
    pageOption.page_size = page_size;
    getAttackRecord();
  };
</script>
<style lang="less" scoped>
  .timeLine {
    padding: 24px;
    .title {
      font-size: @fz12;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.8);
    }
    .time,
    .desc {
      font-size: @fz12;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.6);
      line-height: 20px;
    }
    .desc {
      font-size: @fz12;
    }
  }
</style>
