<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-21 11:16:04
 * @LastEditTime: 2023-03-24 11:07:59
-->
<template>
  <div class="container">
    <!-- 第几次攻击 start -->
    <a-popover trigger="click" placement="bottomLeft" destroyTooltipOnHide>
      <template #content>
        <!-- 攻击次数列表 start -->
        <a-timeline class="customTimeLine">
          <a-timeline-item>
            <!-- 自定义时间点 start -->
            <template #dot>
              <div class="dotted"></div>
            </template>
            <!-- 自定义时间点 end -->
            <div class="timeLastNode">
              <!-- 最后攻击时间 start -->
              <div class="timeLab">{{ t('ngav.lastatm') }}</div>
              <div class="timeValue">{{ seletedPathInfo.path_end_time }}</div>
              <!-- 最后攻击时间 end -->
              <!-- 时间轴次数 start -->
              <div class="times" v-if="select_options && select_options.length">
                <template
                  v-for="(item, index) in cloneDeep(seletedPathInfo.item).reverse()"
                  :key="item.detail_id"
                >
                  <a-popover color="#fff" overlayClassName="globalPopClass" destroyTooltipOnHide>
                    <template #content>
                      <!-- 客户端发现时间 start -->
                      <div class="item">
                        <div class="label">{{ t('ngav.kfnghs') }}</div>
                        <div class="value">{{ item['agent_event_at'] }}</div>
                      </div>
                      <!-- 客户端发现时间 end -->
                      <!-- 服务端上报时间：start -->
                      <div class="item">
                        <div class="label">{{ t('ngav.fnkhds') }}</div>
                        <div class="value">{{ item['server-create-at'] }}</div>
                      </div>
                      <!-- 服务端上报时间：end -->
                    </template>
                    <div
                      class="timeNode"
                      :class="{ actived: item.detail_id === selectedCiInfo.detail_id }"
                      @click="changeSeletedPathTimeId(seletedPathInfo.item.length - index, item)"
                    >
                      <div class="durat">
                        <div class="timesCi">
                          <!-- 第 几 次 start-->
                          {{ t('ngav.wtimes', [seletedPathInfo.item.length - index]) }}
                          <!-- 第 几 次 end-->
                        </div>
                        <!-- 开始 start -->
                        <div class="start">
                          {{ t('ngav.sttme') }}
                          {{ item.start_time }}
                        </div>
                        <!-- 开始 end -->

                        <!-- 持续时间 start -->
                        <div class="duration">{{ item.duration }}</div>
                        <!-- 持续时间 end -->

                        <!-- 结束 start -->
                        <div class="end">
                          {{ t('ngav.edtme') }}
                          {{ item.end_time }}
                        </div>
                        <!-- 结束 end -->
                      </div>
                    </div>
                  </a-popover>
                </template>
              </div>
              <!-- 时间轴次数 end -->
            </div>
          </a-timeline-item>
          <a-timeline-item>
            <template #dot>
              <div class="dotted"></div>
            </template>
            <!-- 首次攻击时间 start -->
            <div class="timeStartNode">
              <div class="timeLab">{{ t('ngav.firtm') }}</div>
              <div class="timeValue">{{ seletedPathInfo.path_start_time }}</div>
            </div>
            <!-- 首次攻击时间 start -->
          </a-timeline-item>
        </a-timeline>
        <!-- 攻击次数列表 end -->
      </template>
      <!-- 第 几 次 start-->
      <span class="viewCi">
        {{ selectedCiInfo!.seletedCiText }}
        <down-outlined />
      </span>
      <!-- 第 几 次 end-->
    </a-popover>
    <!-- 第几次攻击 end -->
  </div>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash';
  import { PropType, watchEffect, reactive } from 'vue';
  import { SelectOption, PathCi } from '@/views/ngav/flow/type';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useI18n } from 'vue-i18n';
  const props = defineProps({
    select_options: {
      type: Array as PropType<SelectOption[]>,
      required: true,
    },
    seletedPathSha256: {
      type: String,
      required: true,
    },
    selectedCiInfo: {
      type: Object as PropType<PathCi>,
      required: true,
    },
  });
  const { t } = useI18n();
  //当前选择的路径对象
  const seletedPathInfo = reactive<SelectOption>({
    //下拉框label
    act_path_name: '',
    //下拉框value
    act_path_sha256: '',
    //攻击路径的开始时间
    path_start_time: '',
    //攻击路径的结束时间
    path_end_time: '',
    //下拉框选项的攻击次数
    item: [],
  });
  //根据选择的路径 找出选择的路径对象
  watchEffect(() => {
    Object.assign(
      seletedPathInfo,
      props.select_options.find((ele) => ele.act_path_sha256 === props.seletedPathSha256),
    );
    //默认选中次数的最后一次
    if (seletedPathInfo.item && seletedPathInfo.item.length) {
      const lastTimeInfo = seletedPathInfo.item[seletedPathInfo.item.length - 1];
      Object.assign(props.selectedCiInfo, lastTimeInfo);
      props.selectedCiInfo!.seletedCiText = t('ngav.wtimes', [seletedPathInfo.item.length]);
    }
  });
  //选择第几次,更新当前次数的开始时间、结束时间和持续时间
  const changeSeletedPathTimeId = (seletedCiText, lastTimeInfo) => {
    Object.assign(props.selectedCiInfo, lastTimeInfo);
    props.selectedCiInfo!.seletedCiText = t('ngav.wtimes', [seletedCiText]);
  };
</script>

<style scoped lang="less">
  .container {
    .attackPath {
      padding: 4px 8px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.04);
      .switchBar {
        border: none;
        :deep(.defaultS) {
          padding: 4px 16px;
          border-radius: 8px;
        }
        :deep(.actived) {
          background: rgba(0, 0, 0, 0.08);
        }
      }
    }
  }

  :deep(.ant-timeline-item) {
    padding: 0;
  }
  :deep(.ant-timeline-item-tail) {
    border-left: 1px dashed #f75555;
  }
  .timeLastNode {
    margin-top: 16px;
  }
  .dotted {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    display: inline-block;
    background-color: #f75555;
  }
  .timeLab {
    margin-bottom: 4px;
  }
  .timeLab,
  .timeValue {
    font-size: @fz12;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.5);
  }
  .times {
    padding: 16px 0;
    max-height: 500px;
    overflow: auto;
    &::-webkit-scrollbar-thumb {
      background: none;
    }
    &::-webkit-scrollbar-track-piece {
      background: #fff !important;
    }
    &:hover {
      &::-webkit-scrollbar-thumb {
        background: #ddd;
      }
    }
    .timeNode {
      padding: 8px 16px;
      cursor: pointer;
      border-radius: 8px;
      transition: all 0.3s;
      margin: 4px 0;
      .durat {
        display: flex;
        align-items: flex-end;
        .timesCi {
          margin-right: 16px;
          font-size: @fz14;
          font-weight: 600;
        }
        .duration {
          margin: 0 16px;
        }
      }
    }
    .actived {
      background: rgba(0, 0, 0, 0.04);
    }
  }
  .viewCi {
    font-size: @fz13;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
  }
</style>
