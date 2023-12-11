<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2022-12-07 11:58:05
-->
<template>
  <div class="box">
    <a-row>
      <a-col :span="5" class="harRbo">
        <!-- 告警or事件标题 start -->
        <div class="header">
          {{ LType === NOTICETYPE.ALARM ? t('overview.alarmDistrib') : t('overview.eventDistrib') }}
        </div>
        <!-- 告警or事件标题 end -->
        <ul class="list">
          <template v-for="item in allType[LType]" :key="item.id">
            <li class="listLi" @click="jumpToAtkRik(item.path)">
              <!-- 类型和状态 start -->
              <span class="badTitle">
                <a-badge
                  :status="item.num ? 'processing' : 'default'"
                  :color="!item.num ? '#ccc' : LType === NOTICETYPE.ALARM ? '#F05064' : '#F8A454'"
                  class="badg"
                />
                {{ item.name }}
              </span>
              <!-- 类型和状态 start -->
              <!-- 数量 start -->
              <countTo
                class="number"
                :class="[!item.num ? 'safNum' : LType === NOTICETYPE.ALARM ? 'atkNum' : 'riskNum']"
                :endVal="item.num"
              />
              <!-- 数量 end -->
            </li>
          </template>
        </ul>
      </a-col>
      <!-- echarts start -->
      <a-col :span="19" class="righOP">
        <line-echarts :RType="RType" :LType="LType" :refreshMethods="refreshMethods" />
      </a-col>
      <!-- echarts end -->
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { PropType, ref, unref, watchEffect } from 'vue';
  import lineEcharts from '../lineEcharts';
  import { getTreeDataApi } from '@/api/attack_risk';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { HANDLETYPE, NOTICETYPE, ROUND } from '@/enums/attack_risk';
  const props = defineProps({
    RType: {
      type: Number as PropType<ROUND>,
      required: true,
    },
    LType: {
      type: Number as PropType<NOTICETYPE>,
      required: true,
    },
    refreshMethods: Object,
  });
  const { t } = useI18n();
  const router = useRouter();
  const allType = ref({});
  //获取告警和事件分布
  const getAttackRisk = async (type) => {
    const [{ items }] = await getTreeDataApi({
      handle: HANDLETYPE.UNHANDLE,
      type,
      deep: 2,
    });
    unref(allType)[props.LType] = items;
  };
  watchEffect(() => {
    getAttackRisk(props.LType);
  });
  // 跳转路径
  const jumpToAtkRik = (path) => {
    router.push({
      name: props.LType === NOTICETYPE.ALARM ? 'attack' : 'acdr',
      query: {
        path,
      },
    });
  };
  props.refreshMethods!.atckrisktypeApi = getAttackRisk;
</script>
<style lang="less" scoped>
  @import url('./index.less');
</style>
