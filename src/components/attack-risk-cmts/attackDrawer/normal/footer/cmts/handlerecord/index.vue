<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-15 14:08:35
 * @LastEditTime: 2023-03-03 19:50:55
-->
<template>
  <div class="container">
    <template v-if="records.length">
      <a-timeline class="timeContainer">
        <template v-for="record in records" :key="record.time">
          <a-timeline-item>
            <div class="timeNode">
              <div class="time">{{ record.dispose_at }}</div>
              <!-- 处置策略变更 start -->
              <template v-if="record.type === 3">
                <div class="action">
                  <!-- 加入全局自动拦截名单 start -->
                  <template v-if="record.dispose_result === 1">
                    <div class="autoblack">{{ t('arcomn.jqjljmd') }}</div>
                  </template>
                  <!-- 加入全局自动拦截名单 end -->
                  <!-- 加入攻击检测白名单 start -->
                  <template v-if="record.dispose_result === 2">
                    <div class="remblack">{{ t('arcomn.joinbai') }}</div>
                  </template>
                  <!-- 加入攻击检测白名单 start -->
                  <!-- 从全局自动拦截名单移除 start -->
                  <template v-if="record.dispose_result === 3">
                    <div class="remblack">{{ t('arcomn.ycqjngd') }}</div>
                  </template>
                  <!-- 从全局自动拦截名单移除 start -->
                  <!-- 从攻击检测白名单移除 start -->
                  <template v-if="record.dispose_result === 4">
                    <div class="remwhite">{{ t('arcomn.fkngasf') }}</div>
                  </template>
                  <!-- 从攻击检测白名单移除 start -->
                </div>
                <div class="formitem">
                  <!-- 处理人 start -->
                  <div class="label">{{ t('arcomn.handp') }}</div>
                  <div class="value">{{ record.dispose_user }}</div>
                  <!-- 处理人 end -->
                </div>
                <div class="formitem">
                  <!-- 策略id start -->
                  <div class="label">{{ t('strategy.ruleid') }}</div>
                  <div class="value">{{ record.dispose_content }}</div>
                  <!-- 策略id end -->
                </div>
                <div class="formitem">
                  <!-- 批注 start -->
                  <div class="label">{{ t('arcomn.piz') }}</div>
                  <div class="value">{{ record.note }}</div>
                  <!-- 批注 start -->
                </div>
              </template>

              <!-- 处置策略变更 end -->

              <!-- 人工处置结果 start -->
              <template v-if="record.type === 1">
                <div class="result">
                  <template v-if="record.dispose_result === E_PeopleHandleResult.Injecting">
                    <!-- 进程拦截中 start -->
                    <div class="lanjie">
                      <LoadingOutlined />
                      <span class="text">{{ t('arcomn.jcljz') }}</span>
                    </div>
                    <!-- 进程已拦截 end -->
                  </template>
                  <template v-if="record.dispose_result === E_PeopleHandleResult.Injected">
                    <!-- 进程已拦截 start -->
                    <div class="lanjie">
                      <CheckCircleFilled />
                      <span class="text">{{ t('arcomn.jcylj') }}</span>
                    </div>
                    <!-- 进程已拦截 end -->
                  </template>
                  <template v-if="record.dispose_result === E_PeopleHandleResult.InjectPartError">
                    <!-- 部分进程拦截失败 start -->
                    <div class="part">
                      <ExclamationCircleFilled />
                      <span class="text">{{ t('arcomn.jcparer') }}</span>
                    </div>
                    <!-- 部分进程拦截失败 end -->
                  </template>
                  <template v-if="record.dispose_result === E_PeopleHandleResult.InjectError">
                    <!-- 进程拦截失败 start -->
                    <div class="error">
                      <WarningOutlined />
                      <span class="text">{{ t('arcomn.jcljsb') }}</span>
                    </div>
                    <!-- 进程拦截失败 end -->
                  </template>
                  <template v-if="record.dispose_result === E_PeopleHandleResult.InjectTimeOut">
                    <!-- 进程拦截超时 start -->
                    <div class="error">
                      <ClockCircleOutlined />
                      <span class="text">{{ t('arcomn.jcljcs') }}</span>
                    </div>
                    <!-- 进程拦截失败 end -->
                  </template>
                </div>
                <!-- 处理人 start -->
                <div class="formitem">
                  <div class="label">{{ t('arcomn.handp') }}</div>
                  <div class="value">{{ record.dispose_user }}</div>
                </div>
                <!-- 处理人 end -->
                <!-- 处理内容 start -->
                <div class="formitem">
                  <div class="label">{{ t('arcomn.hdncnt') }}</div>
                  <div class="value">{{ record.dispose_content }}</div>
                </div>
                <!-- 处理内容 end -->
                <!-- 处理结果 start -->
                <div class="formitem">
                  <div class="label">{{ t('arcomn.handres') }}</div>
                  <div class="value">{{ record.fail_reason }}</div>
                </div>
                <!-- 处理结果 start -->
                <!-- 批注 start -->
                <div class="formitem">
                  <div class="label">{{ t('arcomn.piz') }}</div>
                  <div class="value">{{ record.note }}</div>
                </div>
                <!-- 批注 start -->
              </template>
              <!-- 人工处置结果 end -->

              <!-- 处理状态变更 start -->
              <template v-if="record.type === 2">
                <div class="status">
                  <!-- 已确认 start -->
                  <template v-if="record.dispose_result === 3">
                    <div class="cfm"> {{ t('arcomn.ycnf') }} </div>
                  </template>
                  <!-- 已确认 start -->
                  <!-- 待处理 start -->
                  <template v-if="record.dispose_result === 1">
                    <div class="cfm"> {{ t('common.attrisUnhandle') }} </div>
                  </template>
                  <!-- 待处理 start -->
                  <!-- 已忽略 start -->
                  <template v-if="record.dispose_result === 4">
                    <div class="ign">{{ t('arcomn.yjhl') }} </div>
                  </template>
                  <!-- 已忽略 end -->
                  <!-- 处理中 start -->
                  <template v-if="record.dispose_result === 2">
                    <div class="handling">{{ t('arcomn.clz') }}</div>
                  </template>
                  <!-- 处理中 end -->
                </div>
                <!-- 处理人 start -->
                <div class="formitem">
                  <div class="label">{{ t('arcomn.handp') }}</div>
                  <div class="value">{{ record.dispose_user }}</div>
                </div>
                <!-- 处理人 end -->
                <!-- 处理条数 start -->
                <div class="formitem">
                  <div class="label">{{ t('arcomn.clsts') }}</div>
                  <div class="value">{{ record.dispose_num }}</div>
                </div>
                <!-- 处理条数 end -->
                <!-- 批注 start -->
                <div class="formitem">
                  <div class="label">{{ t('arcomn.piz') }}</div>
                  <div class="value">{{ record.note }}</div>
                </div>
                <!-- 批注 end -->
              </template>
              <!-- 处理状态变更 end -->
            </div>
          </a-timeline-item>
        </template>
      </a-timeline>
      <div class="footer">
        <a-pagination
          v-model:current="pageOption.page_index"
          v-model:pageSize="pageOption.page_size"
          :total="recordsTotal"
          @change="paginationChange"
          showSizeChanger
        />
      </div>
    </template>

    <Empty v-else />
  </div>
</template>

<script setup lang="ts">
  import { PropType, reactive, ref } from 'vue';
  import {
    CheckCircleFilled,
    ExclamationCircleFilled,
    ClockCircleOutlined,
    WarningOutlined,
    LoadingOutlined,
  } from '@ant-design/icons-vue';
  import { getAllRecordApi } from '@/api/attack_risk';
  import { useI18n } from 'vue-i18n';
  import { HANDLETYPE } from '@/enums/attack_risk';
  import { Empty } from 'ant-design-vue';
  import { T_HandleRecord } from '.';
  import { E_PeopleHandleResult } from '@/components/attack-risk-cmts/dataTable/cmts/peopleResult';
  const props = defineProps({
    id: {
      type: String,
    },
    handle: {
      type: Number as PropType<HANDLETYPE>,
    },
    node_id: {
      type: String,
    },
  });
  const { t } = useI18n();
  const records = ref<T_HandleRecord[]>([]);
  const recordsTotal = ref();
  //分页state
  const pageOption = reactive({
    page_index: 1,
    page_size: 20,
  });
  const getReecords = async () => {
    const { op_list, total } = await getAllRecordApi({
      filter: {
        handle: props.handle,
        id: props.id,
        node_id: props.node_id,
      },
      page: pageOption,
    });
    records.value = op_list ?? [];
    recordsTotal.value = total;
  };
  //改变页码的cb
  const paginationChange = (page_index, page_size) => {
    pageOption.page_index = page_index;
    pageOption.page_size = page_size;
    getReecords();
  };
  getReecords();
</script>

<style scoped lang="less">
  .container {
    padding: 20px 0;
    .timeContainer {
      max-height: 600px;
      overflow: auto;
    }

    .timeNode {
      margin-bottom: 16px;
      .time {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
      }
      .action {
        margin: 4px 0 0 0;
        .autoblack {
          background-color: @primary-color;
          padding: 0 8px;
          font-size: @fz12;
          font-weight: 500;
          color: #ffffff;
          line-height: 24px;
          border-radius: 4px;
          display: inline-block;
        }
        .remblack,
        .remwhite {
          display: inline-block;
          background: rgba(0, 0, 0, 0.16);
          font-size: @fz12;
          font-weight: 500;
          color: rgba(0, 0, 0, 0.8);
          line-height: 24px;
          border-radius: 4px;
          padding: 0 8px;
        }
      }
      .result {
        margin-top: 4px;
        .lanjie,
        .part,
        .error {
          display: flex;
          align-items: center;
          .text {
            margin-left: 4px;
            font-size: @fz12;
            font-weight: 400;
            line-height: 16px;
          }
        }
        .lanjie {
          color: @primary-color;
        }
        .part {
          color: @warn-color;
        }
        .error {
          color: @danger-color;
        }
      }
      .status {
        .cfm,
        .ign,
        .handling {
          display: inline-block;
          font-size: @fz12;
          font-weight: 500;
          line-height: 24px;
          padding: 0 8px;
          border-radius: 4px;
        }
        .cfm {
          background: rgba(24, 186, 121, 0.15);
          color: @primary-color;
        }
        .ign {
          background: rgba(0, 0, 0, 0.04);
          color: rgba(0, 0, 0, 0.8);
        }
        .handling {
          background: rgba(248, 164, 84, 0.15);
          color: @warn-color;
        }
      }
      .formitem {
        margin: 8px 0;
        display: flex;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.7);
        line-height: 20px;
        .label {
          flex: 128px 0 0;
          margin-right: 8px;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
