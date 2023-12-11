<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-04-26 19:53:09
 * @LastEditTime: 2023-04-26 20:44:20
-->
<template>
  <div class="hostCon">
    <!-- 防护主机 start -->
    <div class="prohost" @click="jumpHostPage">
      <custom-icon class="hicon" type="#ax-host" />
      <div class="labelcount">
        <div class="numRi">
          <span class="label">{{ t('common.allHost') }}</span>
          <RightOutlined class="ricon" />
        </div>
        <count-to class="num" :endVal="countState.total" />
      </div>
    </div>
    <!-- 防护主机 end -->

    <!-- 安全和风险 start -->
    <div class="safeatt">
      <!-- 安全 start -->
      <div
        class="node"
        @click="
          jumpHostPage({ secure_status: SECURESTATUS.HEALTHY, asset_status: ASSETSTATUS.SAFE })
        "
      >
        <div class="label">{{ t('asset.safeHost') }}</div>
        <div class="val success">{{ countState.healthy_count }}</div>
      </div>
      <!-- 安全 end -->
      <div class="cline"></div>

      <div class="row">
        <!-- 待处理告警 start -->
        <div class="node" @click="jumpHostPage({ secure_status: SECURESTATUS.ALARM })">
          <div class="label">{{ t('common.czattacked') }}</div>
          <div class="val warn">{{ countState.alarm_count }}</div>
        </div>
        <!-- 待处理告警 end -->
        <div class="line"></div>

        <!-- 待处理事件 start -->
        <div class="node" @click="jumpHostPage({ secure_status: SECURESTATUS.ACDR })">
          <div class="label">{{ t('common.czatRisk') }}</div>
          <div class="val warn">{{ countState.event_count }}</div>
        </div>
        <!-- 待处理事件 end -->
      </div>
      <div class="linecon">
        <div class="fline f"></div>
        <div class="fline s"></div>
      </div>

      <div class="row">
        <!-- 待处理漏洞 start -->
        <div class="node" @click="jumpHostPage({ asset_status: ASSETSTATUS.HAVEVULTY })">
          <div class="label">{{ t('asset.haveVulty') }}</div>
          <div class="val danger">{{ countState.vul_count }}</div>
        </div>
        <!-- 待处理漏洞 end -->
        <div class="line"></div>
        <!-- 待处理风险 start -->
        <div class="node" @click="jumpHostPage({ asset_status: ASSETSTATUS.HAVERISK })">
          <div class="label">{{ t('asset.haveRisk') }}</div>
          <div class="val danger">{{ countState.risk_count }}</div>
        </div>
        <!-- 待处理风险 end -->
      </div>
    </div>
    <!-- 安全和风险 end -->

    <!-- 在线离线 start -->
    <div class="safeatt">
      <div class="row">
        <!-- 在线 start -->
        <div class="node" @click="jumpHostPage({ online: ONLINESTATUS.ONLINE })">
          <div class="label">
            <a-badge status="processing" color="#18BA79" />
            {{ t('common.onLine') }}
          </div>
          <div class="val">{{ countState.online_count }}</div>
        </div>
        <!-- 在线 end -->
        <div class="line"></div>
        <!-- 离线 start -->
        <div class="node" @click="jumpHostPage({ online: ONLINESTATUS.OFFLINE })">
          <div class="label">
            <a-badge color="#eee" />
            {{ t('common.offLine') }}
          </div>
          <div class="val">{{ countState.offline_count }}</div>
        </div>
        <!-- 离线 end -->
      </div>
    </div>
    <!-- 在线离线 end -->
  </div>
</template>

<script setup lang="ts">
  import { RightOutlined } from '@ant-design/icons-vue';
  import { reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getHostStatistic } from '@/api/asset/overview';
  import { useRouter } from 'vue-router';
  import { ASSETSTATUS, ONLINESTATUS, SECURESTATUS } from '@/enums/assetsType';
  const props = defineProps({
    refreshMethods: Object,
  });
  const { t } = useI18n();
  const router = useRouter();
  const countState = reactive({
    total: 0,
    online_count: 0,
    offline_count: 0,
    uninstalled_count: 0,
    healthy_count: 0,
    vul_count: 0,
    risk_count: 0,
    alarm_count: 0,
    event_count: 0,
  });

  // 获取主机统计数据
  const getStatisticData = async () => {
    const res = await getHostStatistic();
    Object.assign(countState, res);
  };
  getStatisticData();

  // 点击跳转到主机页面并筛选
  const jumpHostPage = (query?) => {
    router.push({
      name: 'hostAsset-layout-assetInfo-host-index',
      query,
    });
  };

  props.refreshMethods!.hostStaticApi = getStatisticData;
</script>

<style scoped lang="less">
  .hostCon {
    .prohost {
      display: flex;
      align-items: center;
      margin: 32px 0;
      justify-content: center;
      .hicon {
        color: #fff;
        padding: 12px;
        border-radius: 12px;
        margin-right: 12px;
        background-color: @primary-color;
        width: 32px;
        height: 32px;
        box-sizing: content-box;
      }
      .labelcount {
        cursor: pointer;
        .numRi {
          .label {
            font-size: @fz14;
            font-weight: 600;
            line-height: 24px;
            color: rgba(0, 0, 0, 0.8);
            margin: 0 8px 8px 0;
            transition: all 0.3s;
          }
          .ricon {
            font-size: @fz12;
            color: rgba(0, 0, 0, 0.2);
          }
        }
        .num {
          font-size: @fz18;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
    .safeatt {
      border: 1px solid rgba(0, 0, 0, 0.04);
      border-radius: 8px;
      padding: 16px;
      margin: 0 16px;
      margin-bottom: 16px;
      .node {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        .label {
          font-size: @fz13;
          color: rgba(0, 0, 0, 0.7);
          margin-bottom: 8px;
          display: flex;
          align-items: center;
        }
        .val {
          font-size: @fz16;
          font-weight: 600;
        }
      }
      .cline {
        background: rgba(0, 0, 0, 0.04);
        width: 100%;
        height: 1px;
        margin: 16px 0;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-around;
        .line {
          background-color: rgba(0, 0, 0, 0.04);
          width: 1px;
          height: 48px;
        }
      }
      .linecon {
        display: flex;
        align-items: center;
        margin: 16px 0;
        .fline {
          height: 1px;
          background-color: rgba(0, 0, 0, 0.04);
          flex: 1;
        }
        .f {
          margin-right: 16px;
        }
        .s {
          margin-left: 16px;
        }
      }
    }
  }
  .success {
    color: @primary-color;
  }
  .warn {
    color: @warn-color;
  }
  .danger {
    color: @danger-color;
  }
</style>
