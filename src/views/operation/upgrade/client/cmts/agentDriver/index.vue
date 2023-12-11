<template>
  <a-row :gutter="16">
    <template v-for="(item, key) in state" :key="key">
      <a-col :span="filter.osver === OSTYPE.LINUX ? 12 : 24">
        <template v-if="!(filter.osver === OSTYPE.WINDOWS && key === 'driver_upgraded_status')">
          <div class="node">
            <!-- 标题和详情 start -->
            <div class="header">
              <span class="title">{{ t('operation.' + key) }}</span>
              <span class="detail" @click="viewDetail(key)">
                <span>{{ t('operation.detail') }}</span>
                <right-outlined />
              </span>
            </div>
            <!-- 标题和详情 end -->
            <div class="content">
              <a-row :gutter="16">
                <template v-for="node in item" :key="node.tite">
                  <a-col :span="8">
                    <!-- 节点 start -->
                    <progressPercent
                      class="block"
                      :node="node"
                      :class="[filter[key] === node.key ? 'actived' : '']"
                      @click="selectedFilter(key, node.key)"
                    />
                    <!-- 节点 end -->
                  </a-col>
                </template>
              </a-row>
            </div>
          </div>
        </template>
      </a-col>
    </template>
  </a-row>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect } from 'vue';
  import type { dataState } from '.';
  import { useI18n } from 'vue-i18n';
  import { UPGRADESTATUS, ADAPTASTATUS } from '@/enums/pstatus';
  import { useModal } from '@/hooks';
  import versionDetail from './cmts/versionDetail';
  import { ClientFilter } from '@/api/operation/model';
  import { getAgentDriverVersion } from '@/api/operation/upgrade';
  import { OSTYPE } from '@/enums/assetsType';
  import { RightOutlined } from '@ant-design/icons-vue';
  import progressPercent from '@/views/operation/components/progress-percent';
  const { t } = useI18n();
  const props = defineProps({
    filter: {
      type: Object as PropType<Partial<ClientFilter>>,
      required: true,
    },
  });
  const emit = defineEmits(['update:filter']);
  //数据结构题
  const state = reactive<dataState>({
    agent_upgraded_status: [
      {
        title: t('operation.lastVer'),
        version: '',
        number: 0,
        percent: '0.00',
        color: '#18BA79',
        key: UPGRADESTATUS.LATEST,
      },
      {
        title: t('operation.Upgradeable'),
        number: 0,
        percent: '0.00',
        color: '#F8A556',
        key: UPGRADESTATUS.UPGRADEABLE,
      },
      {
        title: t('operation.upgraFail'),
        number: 0,
        percent: '0.00',
        color: '#F75555',
        key: UPGRADESTATUS.FAILED,
      },
    ],
    driver_upgraded_status: [
      {
        title: t('operation.adadriv'),
        number: 0,
        percent: '0.00',
        color: '#18BA79',
        key: ADAPTASTATUS.Adapted,
      },
      {
        title: t('operation.adaupd'),
        number: 0,
        percent: '0.00',
        color: '#F8A556',
        key: ADAPTASTATUS.Updateable,
      },
      {
        title: t('operation.adaerr'),
        number: 0,
        percent: '0.00',
        color: '#F75555',
        key: ADAPTASTATUS.Error,
      },
    ],
  });
  //筛选方法
  const selectedFilter = (key, value) => {
    emit(
      'update:filter',
      Object.assign(props.filter, { [key]: value === props.filter[key] ? undefined : value }),
    );
  };
  //初始化
  const initData = () => {
    for (let k in state) {
      state[k].forEach((ele) => {
        ele.number = 0;
        ele.percent = '0.00';
      });
    }
  };
  //获取版本
  const getVersions = async () => {
    initData();
    const { agent_count_items, driver_count_items, agent_last_version } =
      await getAgentDriverVersion({ osver: props.filter.osver! });
    if (agent_count_items) {
      state.agent_upgraded_status.forEach((ele) => {
        agent_count_items.forEach((eles) => {
          if (ele.key === eles.upgrade_status) {
            ele.number = eles.host_count;
            ele.percent = eles.percent;
          }
        });
      });
    }
    if (driver_count_items) {
      state.driver_upgraded_status.forEach((ele) => {
        driver_count_items.forEach((eles) => {
          if (ele.key === eles.upgrade_status) {
            ele.number = eles.host_count;
            ele.percent = eles.percent;
          }
        });
      });
    }

    state.agent_upgraded_status[0].version = agent_last_version;
  };
  watchEffect(() => {
    getVersions();
  });
  //查看详情
  const viewDetail = async (key) => {
    await getVersions();
    useModal(
      {
        title:
          t(`operation.${key}title`) +
          (props.filter.osver === OSTYPE.LINUX ? '（Linux）' : '（Windows）'),
        width: 900,
        wrapClassName: 'modalBodyNopad',
        contentProps: {
          filter: props.filter,
          title: key === 'agent_upgraded_status' ? t('operation.lastVer') : t('operation.adadriv'),
          type: key,
          state:
            key === 'agent_upgraded_status'
              ? {
                  success: state.agent_upgraded_status[0].number,
                  update: state.agent_upgraded_status[1].number,
                  error: state.agent_upgraded_status[2].number,
                }
              : {
                  success: state.driver_upgraded_status[0].number,
                  update: state.driver_upgraded_status[1].number,
                  error: state.driver_upgraded_status[2].number,
                },
        },
        footer: false,
      },
      versionDetail,
    );
  };
  //抛出
  defineExpose({ getVersions });
</script>

<style scoped lang="less">
  .node {
    background: #fafafa;
    border-radius: 8px;
    border: 1px solid rgba(0, 0, 0, 0.02);
    padding: 12px 16px;
    .header {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
      }
      .detail {
        font-size: @fz12;
        font-weight: 400;
        color: #18ba79;
        line-height: 16px;
        cursor: pointer;
      }
    }
    .content {
      .actived {
        box-shadow: 0px 0px 0px 2px @primary-color !important;
      }
      .block {
        padding: 16px;
        background-color: #fff;
        border-radius: 8px;
        cursor: pointer;
      }
    }
  }
</style>
