<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-27 17:36:22
 * @LastEditTime: 2023-02-15 13:45:22
-->
<template>
  <div class="tagsContainer">
    <template v-if="successGroup.length">
      <span
        class="tags success"
        v-if="successGroup.length > 1"
        @click="viewDetail(PLIAPPSTATUS.SUCCESS)"
      >
        <span class="label">{{ t('strategy.qbsx') }}</span>
        <span>{{ successGroup.length }}</span>
      </span>
      <span class="tags success" @click="showDraw(successGroup[0])" v-else>
        {{ successGroup[0].group_name }}
      </span>
    </template>
    <template v-if="errorGroup.length">
      <span class="tags faild" v-if="errorGroup.length > 1" @click="viewDetail(PLIAPPSTATUS.ERROR)">
        <span class="label">{{ t('strategy.bfsx') }}</span>
        <span>{{ errorGroup.length }}</span>
      </span>
      <span class="tags faild" v-else @click="showDraw(errorGroup[0])">
        {{ errorGroup[0].group_name }}
      </span>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { PropType, ref } from 'vue';
  import useCreatDraw from '@/hooks/use-click-row';
  import { PLIAPPSTATUS } from '@/enums/pstatus';
  import strategyDraw from '../strategyDraw';
  import { useI18n } from 'vue-i18n';
  import { useModal } from '@/hooks';
  import groupDetial from '../groupDetial';
  import { filter } from '@/utils/tools';
  interface GroupMsg {
    group_id: number;
    group_name: string;
    policy_id: number;
    status: number;
  }
  const props = defineProps({
    policyrecord: {
      type: Array as PropType<any>,
      default: () => [],
    },
    name: String,
    desc: String,
    //策略id
    id: Number,
    reload: Function,
    strategyType: Number,
  });
  const { t } = useI18n();
  //点击分组打开抽屉
  const showDraw = (options: GroupMsg) => {
    props.reload!(true);
    useCreatDraw(
      {
        instanceKey: props.name!,
        title: t('strategy.straName') + '：' + props.name!,
        contentProps: {
          options,
          id: props.id,
        },
      },
      strategyDraw,
    );
  };
  //全部生效数
  const successGroup = ref<any>([]);
  //部分生肖
  const errorGroup = ref<any>([]);

  //全部生效的分组
  successGroup.value = filter(props.policyrecord, (ele) => ele.status === PLIAPPSTATUS.SUCCESS);
  errorGroup.value = filter(props.policyrecord, (ele) => ele.status === PLIAPPSTATUS.ERROR);

  //分组详情查看
  const viewDetail = (type) => {
    useModal(
      {
        title:
          type === PLIAPPSTATUS.SUCCESS
            ? t('strategy.clsfqbfe', [props.name])
            : t('strategy.clsfqbfee', [props.name]),
        contentProps: {
          id: props.id,
          status: type,
          showDraw,
          policy_type: props.strategyType,
        },
        width: 850,
        footer: false,
      },
      groupDetial,
    );
  };
</script>

<style lang="less" scoped>
  .tagsContainer {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .tags {
    display: inline-block;
    padding: 2px 5px;
    font-size: @fz12;
    font-weight: 400;
    cursor: pointer;
    border-radius: 4px;
    margin: 5px;
    min-width: 80px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    transition: all 0.3s;
    box-sizing: content-box;
    .label {
      margin-right: 8px;
    }
  }
  .success {
    background: #18b666;
    color: #fff;
  }
  .faild {
    background: #f8a04c;
    color: #fff;
  }
</style>
