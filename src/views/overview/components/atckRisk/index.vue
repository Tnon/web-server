<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2022-11-02 11:08:49
-->
<template>
  <a-row :gutter="16">
    <template v-for="(value, item) in types" :key="item">
      <a-col
        class="ncol"
        :span="acdr_enabled ? 12 : 24"
        :class="{ hidden: item === 'event' && !acdr_enabled }"
      >
        <a-spin :spinning="headLoading">
          <!-- 告警和事件 start -->
          <!-- acdr根据后端接口 -->
          <template v-if="item === 'alarm' || (item === 'event' && acdr_enabled)">
            <div class="node">
              <div
                class="content"
                @click="jumpToPtModal(item === 'alarm' ? 'attack' : 'acdr', HANDLETYPE.UNHANDLE)"
                :class="judgeClass(item, value)"
              >
                <div class="leftOption">
                  <dync-atk-risk-img :imgType="item" :danger="!!value.num" />
                  <span class="title">{{ value.title }}</span>
                </div>
                <!-- 告警及事件右侧 start -->
                <div class="nodes">
                  <div class="number">
                    <!-- {{ value.num }} -->
                    <countTo :endVal="value.num" />
                  </div>
                  <div class="msg" :title="~~value.num! ? value.prob_msg : value.heal_msg">
                    {{ ~~value.num! ? value.prob_msg : value.heal_msg }}
                  </div>
                </div>
                <!-- 告警及事件右侧 end -->
              </div>
            </div>
          </template>
          <!-- 告警和事件 end -->
          <!-- 运维 start -->
          <template v-if="item === 'ops'">
            <div class="node" style="display: none">
              <div class="content" :class="judgeClass(item, value)">
                <div class="leftOption">
                  <dync-atk-risk-img :imgType="item" :danger="!!value.num" />
                  <span class="title">{{ value.title }}</span>
                </div>
                <!-- 运维右侧 start -->
                <div class="righOption">
                  <div class="nodes txtCenter" @click="jumpToPtModal('attack', HANDLETYPE.CONFIRM)">
                    <div class="number">
                      <countTo :endVal="value.handledAlarm" />
                      <!-- {{ value.handledAlarm }} -->
                    </div>
                    <div class="msg">{{ value.handledAmsg }}</div>
                  </div>
                  <div class="line" v-if="acdr_enabled"></div>
                  <div
                    class="nodes txtCenter"
                    v-if="acdr_enabled"
                    @click="jumpToPtModal('acdr', HANDLETYPE.CONFIRM)"
                  >
                    <div class="number">
                      <!-- {{ value.handledEvent }} -->
                      <countTo :endVal="value.handledEvent" />
                    </div>
                    <div class="msg">{{ value.handledRmsg }}</div>
                  </div>
                </div>
                <!-- 运维右侧 end -->
              </div>
            </div>
          </template>
          <!-- 运维 end -->
        </a-spin>
      </a-col>
    </template>
  </a-row>
</template>
<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import { staticData } from './type';
  import { dyncAtkRiskImg } from '@/components/attack-risk-cmts/';
  import { getAttRiskNum } from '@/api/overview';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { HANDLETYPE } from '@/enums/attack_risk';
  //acdr根据后端接口
  import { useProductLogo } from '@/store/modules/product-logo';
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const props = defineProps({
    refreshMethods: Object,
  });
  const { t } = useI18n();
  const headLoading = ref<boolean>(false);

  //数据结构体
  const types = reactive<staticData>({
    // 告警
    alarm: {
      title: t('overview.alarm'),
      num: 0,
      prob_msg: t('overview.findAlarm'),
      heal_msg: t('overview.handledAllAlarm'),
    },
    //事件
    event: {
      title: t('overview.event'),
      num: 0,
      prob_msg: t('overview.findEvent'),
      heal_msg: t('overview.handledAllEvent'),
    },
    //运维
    ops: {
      title: t('overview.operation'),
      handledAlarm: 0,
      handledEvent: 0,
      handledAmsg: t('overview.handledAlarm'),
      handledRmsg: t('overview.handledEvent'),
    },
  });

  //判断类
  const judgeClass = (key: string, item: any): string => {
    if (key == 'alarm') {
      if (item.num) {
        return 'alarmBG';
      } else {
        return 'healBG';
      }
    } else if (key == 'event') {
      if (item.num) {
        return 'eventBG';
      } else {
        return 'healBG';
      }
    } else {
      return 'healBG ntrContent';
    }
  };
  //获取风险攻击数量
  const getData = async (silence?) => {
    if (!silence) {
      headLoading.value = true;
    }
    //未处理
    const { alarm_num, event_num } = await getAttRiskNum({
      handle: HANDLETYPE.UNHANDLE,
    });
    types.alarm.num = alarm_num;
    types.event.num = event_num;
    //已处理
    const { alarm_num: handledAlarmNum, event_num: handledEventNum } = await getAttRiskNum({
      handle: HANDLETYPE.CONFIRM,
    });
    types.ops.handledAlarm = handledAlarmNum;
    types.ops.handledEvent = handledEventNum;
    headLoading.value = false;
  };
  getData();
  // 路由跳转
  const router = useRouter();
  const jumpToPtModal = (name, handleType) => {
    router.push({ name, query: { handleType } });
  };
  //刷新的方法
  props.refreshMethods!.atckriskApi = () => {
    getData(true);
  };
</script>
<style lang="less" scoped>
  @import url('./index');
</style>
