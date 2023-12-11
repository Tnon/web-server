<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-21 18:21:31
 * @LastEditTime: 2023-07-06 11:54:27
-->
<template>
  <div class="container">
    <div class="header">{{ t('asset.hostbaseif') }}</div>
    <div class="content">
      <!-- IP地址(主) start -->
      <div class="formItem">
        <div class="label">{{ t('asset.ipmain') }}</div>
        <div class="value">{{ hostInfoState.ip }}</div>
      </div>
      <!-- IP地址(主) end -->
      <!-- IP地址（其他） start -->
      <div class="formItem">
        <div class="label">{{ t('asset.ipother') }}</div>
        <div class="value">{{ hostInfoState.other_ip }}</div>
      </div>
      <!-- IP地址(主) end -->
      <!-- 系统信息 start -->
      <div class="formItem">
        <div class="label">{{ t('asset.systemInfo') }}</div>
        <div class="value">{{ hostInfoState.os }}</div>
      </div>
      <!-- 系统信息 end -->
      <!-- 标签 start -->
      <div class="formItem">
        <div class="label">{{ t('asset.flag') }}</div>
        <div class="value tag">{{ hostInfoState.tag }}</div>
      </div>
      <!-- 标签 end -->
      <!-- 主机安全状态 start -->
      <div class="formItem">
        <div class="label">{{ t('asset.hsfsta') }}</div>
        <div class="safestatus" v-if="hostInfoState.alarm_count || hostInfoState.event_count">
          <!-- 告警数量 start -->
          <div
            class="type"
            v-if="hostInfoState.alarm_count"
            @click="jumpTo('hostAsset-layout-assetInfo-host-detail-alarm')"
          >
            <div class="typelabel">{{ t('menu.attack') }}:</div>
            <div class="typevalue attack">{{ hostInfoState.alarm_count }}</div>
          </div>
          <!-- 告警数量 end -->
          <!-- 事件数量 start -->
          <div
            class="type"
            v-if="acdr_enabled && hostInfoState.event_count"
            @click="jumpTo('hostAsset-layout-assetInfo-host-detail-acdr')"
          >
            <div class="typelabel">{{ t('menu.ngav') }}:</div>
            <div class="typevalue acdr">{{ hostInfoState.event_count }}</div>
          </div>
          <!-- 事件数量 end -->
        </div>
        <div class="value safe" v-else>{{ t('asset.safe') }}</div>
      </div>
      <!-- 主机安全状态 end -->
      <!-- 资产健康状态 start -->
      <div class="formItem">
        <div class="label">{{ t('asset.assetsafe') }}</div>
        <div class="safestatus" v-if="hostInfoState.weak_pwd_count || hostInfoState.vul_count">
          <!-- 风险数量 start -->
          <div
            class="type"
            v-if="hostInfoState.weak_pwd_count"
            @click="jumpTo('hostAsset-layout-assetInfo-host-detail-risk')"
          >
            <div class="typelabel">{{ t('asset.rskUnit') }}:</div>
            <div class="typevalue acdr">{{ hostInfoState.weak_pwd_count }}</div>
          </div>
          <!-- 风险数量 end -->
          <!-- 漏洞数量 start -->
          <div
            class="type"
            v-if="hostInfoState.vul_count"
            @click="jumpTo('hostAsset-layout-assetInfo-host-detail-vulnerability')"
          >
            <div class="typelabel">{{ t('asset.vulnerability') }}:</div>
            <div class="typevalue acdr">{{ hostInfoState.vul_count }}</div>
          </div>
          <!-- 漏洞数量 end -->
        </div>
        <div class="value safe" v-else>{{ t('common.healthy') }}</div>
      </div>
      <!-- 资产健康状态 end -->
      <!-- 资源使用状态 start -->
      <div class="formItem">
        <div class="label">{{ t('asset.assshiy') }}</div>
        <div class="cpustatus">
          <!-- cpu使用率 start -->
          <div class="type">
            <div class="typelabel">{{ t('asset.cpuUtil') }}:</div>
            <div class="typevalue">{{ hostInfoState.cpu_util }}</div>
          </div>
          <!-- cpu使用率 end -->
          <!-- 内存使用率 start -->
          <div class="type">
            <div class="typelabel">{{ t('asset.memUtil') }}:</div>
            <div class="typevalue">{{ hostInfoState.mem_util }}</div>
          </div>
          <!-- 内存使用率 end -->
          <!-- 硬盘使用率 start -->
          <div class="type">
            <div class="typelabel">{{ t('setting.hadUtil') }}:</div>
            <div class="typevalue">{{ hostInfoState.disk_util }}</div>
          </div>
          <!-- 硬盘使用率 end -->
        </div>
      </div>
      <!-- 资源使用状态 end -->
    </div>
    <div class="footer" @click="jumpHostDetail">
      {{ t('asset.viewHDetail') }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, reactive } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { getHostInfo } from '@/api/asset/overview';
  import { useProductLogo } from '@/store/modules/product-logo';

  const props = defineProps({
    mac: {
      type: String,
      required: true,
    },
    cantJump: {
      type: Boolean,
      default: false,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const hostInfoState = reactive({
    //ip地址（主）
    ip: '',
    //IP地址（其他）
    other_ip: '',
    //系统信息
    os: '',
    // 内核
    kernel_version: '',
    //标签
    tag: '',
    //告警数量
    alarm_count: 0,
    //事件数量
    event_count: 0,
    //风险（应用风险，账户风险，系统风险，系统和应用 弱口令）
    weak_pwd_count: 0,
    //漏洞
    vul_count: 0,
    //cpu
    cpu_util: '',
    //内存
    mem_util: '',
    //硬盘
    disk_util: '',
    //mac
    host_id: '',
  });
  onMounted(async () => {
    const res = await getHostInfo(props.mac);
    Object.assign(hostInfoState, res);
  });
  const jumpHostDetail = () => {
    !props.cantJump &&
      router.push({
        name: 'hostAsset-layout-assetInfo-host-detail-host',
        query: { id: props.mac, ip: hostInfoState.ip },
      });
  };
  //跳转
  const jumpTo = (name) => {
    router.push({
      name,
      query: { id: hostInfoState.host_id, ip: hostInfoState.ip },
    });
  };
</script>

<style scoped lang="less">
  .container {
    padding: 8px 12px;
    width: 400px;
    .header {
      font-size: @fz14;
      font-weight: 600;
      height: 28px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.8);
    }
    .content {
      .formItem {
        display: flex;
        align-items: flex-start;
        margin: 16px 0;
        .label {
          flex: 100px 0 0;
          font-size: @fz12;
          word-break: keep-all;
        }
        .value {
          word-break: break-word;
        }
        .safestatus {
          display: flex;
          align-items: center;
          .type {
            display: flex;
            align-items: center;
            margin-right: 16px;
            .typelabel {
              margin-right: 8px;
              word-break: keep-all;
            }
            .typevalue {
              cursor: pointer;
            }
            .attack {
              color: @danger-color;
            }
            .acdr {
              color: @warn-color;
            }
          }
        }
        .cpustatus {
          .type {
            display: flex;
            align-items: center;
            margin: 0 16px 8px 0;
            .typelabel {
              margin-right: 8px;
              word-break: keep-all;
            }
          }
        }
      }
    }
  }
  .footer {
    display: inline-block;
    color: @primary-color;
    margin: 8px 0;
    cursor: pointer;
  }
  .safe {
    color: @primary-color;
  }
</style>
