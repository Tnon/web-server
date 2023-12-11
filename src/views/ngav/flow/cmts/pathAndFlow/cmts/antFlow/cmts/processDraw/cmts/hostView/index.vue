<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-22 17:32:18
 * @LastEditTime: 2023-03-02 14:54:37
-->
<template>
  <div class="container low">
    <div class="process">
      <hostIp
        :ip="nodeInfo.host_info.ip"
        :host_id="nodeInfo.host_info.host_id"
        :os="nodeInfo.host_info.os"
        :online="nodeInfo.host_info.online"
        :hostname="nodeInfo.host_info.hostname"
      />
    </div>
    <div class="line"></div>
    <div class="processDetail">
      <!-- 基础信息 start -->
      <div class="header">{{ t('ngav.basinfo') }}</div>
      <div class="content">
        <div class="item">
          <div class="label">{{ t('ngav.hostip') }}</div>
          <div class="value">
            {{ nodeInfo.host_info.ip }}
          </div>
        </div>
        <!-- 系统信息 start -->
        <div class="item">
          <div class="label">{{ t('ngav.sysinfo') }}</div>
          <div class="value">
            {{ nodeInfo.host_info.os }}
          </div>
        </div>
        <!-- 系统信息 end -->
        <!-- 分组 start -->
        <div class="item">
          <div class="label">{{ t('ngav.hgrop') }}</div>
          <div class="value">
            <template
              v-if="nodeInfo.host_info.path_kv_list && nodeInfo.host_info.path_kv_list.length"
            >
              <span>{{ nodeInfo.host_info.path_kv_list[0].name }}</span>
            </template>
          </div>
        </div>
        <!-- 分组 end -->
        <!-- 标签 start -->
        <div class="item">
          <div class="label">{{ t('ngav.htag') }}</div>
          <div class="value">
            {{ nodeInfo.host_info.tag }}
          </div>
        </div>
        <!-- 标签 end -->
        <!-- 最后离线时间 start -->
        <div class="item">
          <div class="label">{{ t('ngav.laoftm') }}</div>
          <div class="value">
            {{ nodeInfo.host_info.last_offline_at }}
          </div>
        </div>
        <!-- 最后离线时间 end -->
      </div>
      <!-- 基础信息 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue';
  import { Node } from '@/views/ngav/flow/cmts/pathAndFlow/cmts/antFlow/tools/type';
  import { useI18n } from 'vue-i18n';
  import hostIp from '@/components/host-ip';
  defineProps({
    nodeInfo: {
      type: Object as PropType<Node>,
      required: true,
    },
  });
  const { t } = useI18n();
</script>

<style scoped lang="less">
  .container {
    display: flex;
    .process {
      flex: 1;
      padding: 24px;
      :deep(.hostIp) {
        align-items: center;
      }
      :deep(.svg-icon) {
        font-size: 58px !important;
      }
    }

    .line {
      width: 1px;
      height: 156px;
      background: #eeeeee;
      margin: 0 24px;
    }
    .processDetail {
      padding: 24px;
      flex: 3;
      .header {
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
      }
      .content {
        display: flex;
        align-items: center;
        .item {
          flex: 1;
          .label {
            font-size: @fz12;
            font-weight: normal;
            /* 文字/黑0.55 */
            color: rgba(0, 0, 0, 0.5);
            margin-top: 24px;
            margin-bottom: 4px;
          }
          .value {
            font-size: @fz14;
            font-weight: 600;
            /* 文字/黑1 */
            color: #000000;
          }
        }
      }
    }
  }
</style>
