<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:32
 * @LastEditTime: 2023-07-28 11:22:20
-->
<template>
  <div class="detailInfo">
    <template v-for="item in infoData" :key="item.key">
      <!-- 基础信息 start -->
      <div class="basicInfo" v-if="!(item.key === 'domainInfo' && !domainInfo.has_domain_info)">
        <!-- 标题 start-->
        <h3>{{ item.title }}</h3>
        <!-- 标题 end-->

        <template v-for="(column, columnKey, index) in item.columns" :key="columnKey">
          <!-- 一行三项或四项 end -->
          <div>
            <template v-for="child in column" :key="child.key">
              <div class="infoItem">
                <div class="title">{{ child.label }}</div>
                <!-- 账号 start -->
                <div
                  class="value_name value"
                  v-if="child.key === 'logon_username' || child.key === 'recently_logon_user'"
                >
                  <template v-if="baseInfo[child.key] === '-'"> - </template>
                  <template v-else>
                    <span
                      v-for="(c_item, indexU) in baseInfo[child.key].split(',')"
                      :key="c_item + indexU"
                      class="accountNode"
                    >
                      {{ c_item }}
                      <!-- <span class="domain" v-if="!baseInfo.accounts.split(',').includes(c_item)">
                        {{ t('asset.dyus') }}
                      </span> -->
                    </span>
                  </template>
                </div>
                <!-- 账号 end -->
                <!-- 所属业务组 start -->
                <div class="value" v-else-if="child.key === 'business_group'">
                  <template v-if="$props[item.key][child.key].length">
                    {{ $props[item.key][child.key][0].name }}
                  </template>
                  <template v-else> - </template>
                </div>
                <!-- 所属业务组 end -->
                <div class="value" v-else :title="$props[item.key][child.key]">
                  {{ $props[item.key][child.key] }}
                </div>
              </div>
            </template>
          </div>
          <!-- 一行三项或四项 end -->
          <div class="line" v-if="index < Object.keys(item.columns!).length - 1"></div>
        </template>
        <!-- 主机信息中的引擎卡片 start -->
        <engin-card v-if="item.key === 'agent'" :enginInfo="agent!.engine_info_list" />
        <!-- 主机信息中的引擎卡片 end -->
      </div>
      <!-- 基础信息 end -->
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useInfoData } from './index';
  import { useI18n } from 'vue-i18n';
  import enginCard from '../enginCard';
  defineProps({
    baseInfo: {
      type: Object,
      required: true,
    },
    hostManage: Object,
    agent: Object,
    domainInfo: {
      type: Object,
      required: true,
    },
  });
  const { t } = useI18n();
  const infoData = useInfoData(t);
</script>

<style lang="less" scoped>
  .detailInfo {
    flex: 1;
    border-radius: 8px;
    .basicInfo {
      padding: 24px;
      background: #ffffff;
      border-radius: 8px;
      margin-bottom: 16px;
      h3 {
        margin: 0;
        padding: 0;
        font-size: @fz14;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        line-height: 24px;
        margin-bottom: 24px;
      }

      .infoItem {
        width: 25%;
        display: inline-block;
        vertical-align: top;
        .title {
          font-size: @fz12;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.4);
          line-height: 20px;
          margin-bottom: 5px;
        }
        .value {
          font-weight: 400;
          color: rgba(0, 0, 0, 0.8);
          line-height: 20px;
          min-height: 20px;
          margin: 0 24px 24px 0;
          word-break: break-word;
        }
        .value_name {
          margin-bottom: 8px;
        }
      }
      .ifAcc {
        // width: 100%;
        margin-bottom: 20px;
        .title {
          margin-bottom: 10px;
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      background: #eeeeee;
      border-radius: 8px;
      margin-bottom: 24px;
    }
  }
  .accountNode {
    display: inline-block;
    padding: 5px;
    margin: 0 16px 16px 0;
    background: #eee;
    border-radius: 8px;
    min-width: 120px;
    text-align: center;
    position: relative;
  }
  .domain {
    position: absolute;
    transform: translateX(50%);
    top: -10px;
    right: 5px;
    height: 20px;
    border-radius: 10px;
    min-width: 20px;
    background: #19be6b;
    border: 1px solid transparent;
    color: #fff;
    line-height: 18px;
    text-align: center;
    padding: 0 6px;
    font-size: @fz12;
    white-space: nowrap;
  }
</style>
