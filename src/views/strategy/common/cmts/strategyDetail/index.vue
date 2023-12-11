<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-08 14:28:23
 * @LastEditTime: 2023-10-13 15:22:41
-->
<template>
  <div class="container">
    <div class="leftOption">
      <div class="step">
        <span>{{ t('strategy.stepone') }}</span>
        <caret-right-outlined />
      </div>
      <div class="modules" v-if="Object.keys(strategyData).length">
        <a-spin :spinning="loading">
          <template v-for="item in strategyStaticData" :key="item.title">
            <!-- acdr根据后端接口 -->
            <div class="module" v-if="acdr_enabled || item.title !== t('strategy.engskg')">
              <!-- 模块名 start -->
              <module-name :moduleInfo="item" :strategyData="strategyData" />
              <!-- 模块名 end -->
              <template v-for="types in item.types" :key="types.title">
                <!-- label名称 start -->
                <!-- -->
                <label-name :typesInfo="types" :strategyData="strategyData" />
                <!-- label名称 end -->
                <template v-for="node in types.nodes" :key="node.key">
                  <!-- switch和模式 start -->
                  <div class="switchmode" v-if="node.switch || node.switchText">
                    <!-- ！！！！开关！！！！ start -->
                    <switch-mode
                      v-if="node.switch"
                      :isEditing="isEditing"
                      :strategyData="strategyData"
                      :nodeKey="node.key"
                      :switchInfo="node.switch"
                    />
                    <!-- ！！！！开关！！！！ end -->

                    <!-- ！！！！无开关！！！！ start -->
                    <switch-text v-if="node.switchText" :switchTextInfo="node.switchText" />
                    <!-- ！！！！无开关！！！！ end -->

                    <!-- ！！！！防护模式！！！！ start -->
                    <protect-mode
                      v-if="node.modes"
                      :isEditing="isEditing"
                      :strategyData="strategyData"
                      :nodeKey="node.key"
                      :switchInfo="node.switch"
                      :modeInfo="node.modes"
                    />
                    <!-- ！！！！防护模式！！！！ end -->
                  </div>
                  <!-- switch和模式 end -->

                  <!-- ！！！！多选/单选/下拉！！！！ start -->
                  <template v-if="node.checks">
                    <template v-for="check in node.checks" :key="check.name">
                      <div class="checkbox">
                        <!-- 多选单选等的label start -->
                        <label-error-tips
                          :strategyData="strategyData"
                          :nodeKey="node.key"
                          :switchInfo="node.switch"
                          :checkInfo="check"
                        />
                        <!-- 多选单选等的label end -->

                        <!-- ！！！多选框！！！ start -->
                        <template v-if="check.optionType === OptionType.Checkbox">
                          <checkbox-mode
                            :strategyData="strategyData"
                            :isEditing="isEditing"
                            :nodeKey="node.key"
                            :switchInfo="node.switch"
                            :checkInfo="check"
                          />
                        </template>
                        <!-- ！！！多选框！！！ end -->

                        <!-- ！！！下拉框！！！ start -->
                        <template v-if="check.optionType === OptionType.Select">
                          <select-mode
                            :strategyData="strategyData"
                            :isEditing="isEditing"
                            :nodeKey="node.key"
                            :switchInfo="node.switch"
                            :checkInfo="check"
                          />
                        </template>
                        <!-- ！！！下拉框！！！ end -->

                        <!-- ！！！资产更新！！！ start -->
                        <template v-if="check.optionType === OptionType.Asset">
                          <asset-mode
                            :strategyData="strategyData"
                            :isEditing="isEditing"
                            :nodeKey="node.key"
                            :switchInfo="node.switch"
                            :checkInfo="check"
                          />
                        </template>
                        <!-- ！！！资产更新！！！ end -->

                        <!-- ！！！单选框！！！ start -->
                        <template v-if="check.optionType === OptionType.Radio">
                          <radio-mode
                            :strategyData="strategyData"
                            :isEditing="isEditing"
                            :nodeKey="node.key"
                            :switchInfo="node.switch"
                            :checkInfo="check"
                          />
                        </template>
                        <!-- ！！！单选框！！！ end -->

                        <!-- ！！！单选框！！！ start -->
                        <template v-if="check.optionType === OptionType.InputNumber">
                          <input-number-mode
                            :strategyData="strategyData"
                            :isEditing="isEditing"
                            :nodeKey="node.key"
                            :switchInfo="node.switch"
                            :checkInfo="check"
                          />
                        </template>
                        <!-- ！！！单选框！！！ end -->
                      </div>
                      <!-- 多选框 end -->
                    </template>
                  </template>
                  <!-- ！！！！多选/单选/下拉！！！！ end -->
                </template>
              </template>
            </div>
          </template>
        </a-spin>
      </div>
    </div>
    <div class="rightOption">
      <div class="step">
        <span>{{ t('strategy.steptwo') }}</span>
        <caret-right-outlined />
      </div>
      <div class="applytotal">
        <span> {{ t('strategy.appgp') }}{{ applyedGroups.length }} </span>
        <a-button type="text" class="swt_view" @click="switchView">
          <template #icon><WalletOutlined /></template>
          {{ t('asset.swtView') }}
        </a-button>
      </div>
      <!-- 主机分组视图 start -->
      <apply-host-group
        v-show="hostGroupView"
        :isEditing="isEditing"
        :selectedId="selectedId"
        :strategyType="strategyType"
        v-model:applyedGroups="applyedGroups"
        ref="applyHostGroupRef"
      />
      <!-- 主机分组视图 end -->
      <!-- 业务分组视图 start -->
      <apply-business-group
        v-show="!hostGroupView"
        :isEditing="isEditing"
        :selectedId="selectedId"
        :strategyType="strategyType"
        v-model:applyedGroups="applyedGroups"
        ref="applyBusinessGroupRef"
      />
      <!-- 业务分组视图 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, PropType, ref, watchEffect } from 'vue';
  import { StrategyType } from '@/views/strategy/common/types';
  import { HttpData, OptionType } from './type';
  import { getStrategyData } from '.';
  import { CaretRightOutlined, WalletOutlined } from '@ant-design/icons-vue';
  import { getSafeStrategyData } from '@/api/strategy/safe';
  import applyHostGroup from '@/views/strategy/common/cmts/applyHostGroup';
  import applyBusinessGroup from '@/views/strategy/common/cmts/applyBusinessGroup';
  import {
    switchMode,
    switchText,
    protectMode,
    labelErrorTips,
    checkboxMode,
    selectMode,
    inputNumberMode,
    radioMode,
    moduleName,
    labelName,
    assetMode,
  } from './cmts/forms';

  import { useI18n } from 'vue-i18n';
  import { cloneDeep } from 'lodash';
  import { useProductLogo } from '@/store/modules/product-logo';
  const props = defineProps({
    selectedId: {
      type: Number,
      required: true,
    },
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    isViewSelfPolicy: {
      type: Boolean,
      required: true,
    },
  });
  const emit = defineEmits(['update:isViewSelfPolicy']);
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const { t } = useI18n();
  //表单数据loading
  const loading = ref<boolean>(false);
  //渲染表单的数据
  const strategyStaticData = getStrategyData(props.strategyType, t);
  //后端的数据
  const strategyData = ref<HttpData>({});
  //缓存第一次获取的数据
  const initStrategyData = ref<HttpData>({});
  //策略应用的分组
  const applyedGroups = ref<number[]>([]);
  //主机视图元素
  const applyHostGroupRef = ref<any>();
  //业务视图元素
  const applyBusinessGroupRef = ref<any>();
  //获取后端数据
  const getStrategyResData = async () => {
    loading.value = true;
    // 获取策略的详情
    const { pkg, permission } = await getSafeStrategyData({
      id: props.selectedId,
      policy_type: props.strategyType,
    });

    if (pkg) {
      // pkg.nodes['asset-entity'] = {
      //   'baseinfo-period': { ctype: 2, value: 1 },
      //   'baseinfo-day': { ctype: 5, value: [1] },
      //   'baseinfo-time': { ctype: 9, value: ['00:01'] },
      //   mode: { ctype: 2, value: 2 },
      //   switch: { ctype: 1, value: 1 },
      // };
      // initStrategyData.value = cloneDeep(pkg);
      backUpLastedData(pkg);
      Object.assign(strategyData.value, pkg.nodes);
    }
    if (permission) {
      if (permission.has_permission) {
        emit('update:isViewSelfPolicy', true);
      } else {
        emit('update:isViewSelfPolicy', false);
      }
    }
    loading.value = false;
  };
  watchEffect(() => {
    getStrategyResData();
  });
  //恢复初始数据
  const BackStrategyData = () => {
    Object.assign(strategyData.value, cloneDeep(initStrategyData.value.nodes));
  };
  //备份最新的数据
  const backUpLastedData = (pkg) => {
    initStrategyData.value = cloneDeep(pkg);
  };
  //主机分组视图
  const hostGroupView = ref(true);
  //切换视图
  const switchView = () => {
    hostGroupView.value = !hostGroupView.value;
  };
  defineExpose({
    strategyData,
    applyedGroups,
    applyBusinessGroupRef,
    applyHostGroupRef,
    BackStrategyData,
    backUpLastedData,
  });
</script>

<style scoped lang="less">
  .container {
    display: flex;
    .step {
      height: 40px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      background: rgba(0, 0, 0, 0.02);
    }
    .leftOption {
      flex: 65%;
      border-right: 1px solid rgba(0, 0, 0, 0.04);
      .modules {
        height: calc(100vh - 152px);
        overflow: auto;
        &::-webkit-scrollbar-thumb {
          background: none;
        }
        &:hover {
          &::-webkit-scrollbar-thumb {
            background: #ddd;
          }
        }
        .module {
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
          padding-bottom: 16px;

          .switchmode {
            height: 60px;
            display: flex;
            align-items: center;
            padding: 0 48px;
            justify-content: space-between;
          }
          .checkbox {
            padding: 8px 0;
          }
        }
      }
    }
    .rightOption {
      flex: 35%;
      .applytotal {
        font-size: @fz14;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.8);
        padding: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>
