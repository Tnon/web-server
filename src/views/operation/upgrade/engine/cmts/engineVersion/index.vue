<template>
  <a-row>
    <template v-for="(item, key) in state" :key="key">
      <a-col :span="24">
        <div class="node">
          <!-- 标题和详情 start -->
          <div class="header">
            <span class="title">
              {{
                filter.type === UPCLIPKGTYPE.HASH || UPCLIPKGTYPE.ACDR
                  ? t('operation.' + key)
                  : t('operation.libver')
              }}
            </span>
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
      </a-col>
    </template>
  </a-row>
</template>

<script setup lang="ts">
  import { PropType, reactive, watchEffect } from 'vue';
  import type { dataState } from '.';
  import { useI18n } from 'vue-i18n';
  import { ENGINESTATUS } from '@/enums/pstatus';
  import { useModal } from '@/hooks';
  import versionDetail from './cmts/versionDetail';
  import { RightOutlined } from '@ant-design/icons-vue';
  import progressPercent from '@/views/operation/components/progress-percent';
  import { EngineFilter } from '@/api/operation/model';
  import { getEngineVersions } from '@/api/operation/upgrade';
  import { UPCLIPKGTYPE } from '@/enums/assetsType';
  const { t } = useI18n();
  const props = defineProps({
    filter: {
      type: Object as PropType<Partial<EngineFilter>>,
      required: true,
    },
  });
  const emit = defineEmits(['update:filter']);
  //数据结构体
  const state = reactive<dataState>({
    engine_upgrade_status: [
      {
        title: t('operation.lastVer'),
        number: 0,
        percent: '0.00',
        color: '#18BA79',
        key: ENGINESTATUS.LATEST,
      },
      {
        title: t('operation.adaupd'),
        number: 0,
        percent: '0.00',
        color: '#F8A556',
        key: ENGINESTATUS.UPGRADEABLE,
      },
      {
        title: t('operation.upgraFail'),
        number: 0,
        percent: '0.00',
        color: '#F75555',
        key: ENGINESTATUS.FAILED,
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
  //获取版本分布
  const getVersions = async () => {
    initData();
    const { engine_count_items } = await getEngineVersions({ type: props.filter.type! });
    if (engine_count_items) {
      engine_count_items.forEach((ele) => {
        state.engine_upgrade_status.forEach((sele) => {
          if (ele.engine_upgrade_status === sele.key) {
            sele.percent = ele.host_percent;
            sele.number = ~~ele.host_count;
          }
        });
      });
    }
  };
  watchEffect(() => {
    getVersions();
  });
  //查看详情
  const viewDetail = async (key) => {
    await getVersions();
    useModal(
      {
        title: t(`operation.${key}title`),
        width: 875,
        contentProps: {
          filter: props.filter,
          title: t('operation.lastVer'),
          type: key,
          state: {
            success: state.engine_upgrade_status[0].number,
            update: state.engine_upgrade_status[1].number,
            error: state.engine_upgrade_status[2].number,
          },
        },
        footer: false,
      },
      versionDetail,
    );
  };
  //抛出刷新方法
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
        .childtitle {
          font-size: @fz14;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          line-height: 24px;
        }
        .childversion {
          display: inline-block;
          margin-left: 8px;
          background: rgba(24, 186, 121, 0.15);
          border-radius: 4px;
          font-size: @fz14;
          font-weight: 400;
          color: #18ba79;
          line-height: 24px;
          padding: 0 8px;
        }
        .childstatic {
          margin: 16px 0 8px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .childnumber {
            font-size: @fz18;
            font-weight: 600;
            line-height: 24px;
          }
          .childpercent {
            font-size: @fz14;
            font-weight: 400;
            line-height: 24px;
          }
        }
      }
    }
  }
</style>
