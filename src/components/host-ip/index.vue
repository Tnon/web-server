<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-08-09 21:05:31
 * @LastEditTime: 2023-07-24 10:42:36
-->
<template>
  <a-popover destroyTooltipOnHide trigger="click">
    <template v-if="!nopop" #content>
      <host-info :mac="host_id!" :cantJump="cantJump" />
    </template>
    <div class="hostIp hostIpJ">
      <custom-icon :type="logoType" v-if="os && os !== '-'" class="icon hostIpJ" />
      <div class="ipname hostIpJ">
        <div class="ip hostIpJ">{{ ip }}</div>
        <div class="hostname hostIpJ">{{ hostname }}</div>
        <div class="groupname hostIpJ" :title="groupname" v-if="groupname">
          <custom-icon type="#ax-wh-grouping" class="gicon" />
          <span>{{ groupname }}</span>
        </div>
      </div>
    </div>
  </a-popover>
</template>

<script lang="ts" setup>
  import { PropType, ref, unref, watchEffect } from 'vue';
  import { osLogoType } from '@/utils/tools';
  import { ONLINESTATUS, OSTYPE } from '@/enums/assetsType';
  import hostInfo from './cmts/hostInfo';
  const props = defineProps({
    ip: String,
    host_id: String,
    os: [String, Number] as PropType<OSTYPE | string>,
    online: Number as PropType<ONLINESTATUS>,
    hostname: String,
    groupname: String,
    cantJump: {
      type: Boolean,
      default: false,
    },
    nopop: {
      type: Boolean,
      default: false,
    },
  });
  //logoType
  const logoType = ref<string>('');
  watchEffect(() => {
    logoType.value = unref(osLogoType(props.os!, props.online!));
  });
</script>

<style lang="less" scoped>
  .hostIp {
    display: flex;
    cursor: pointer;
    .icon {
      font-size: @fz24 !important;
    }
    .ipname {
      transition: all 0.3s;
      margin-left: 8px;
      font-size: @fz12;
      overflow: hidden;
      .ip {
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .hostname {
        font-weight: 400;
        color: rgba(0, 0, 0, 0.4);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .groupname {
        margin-top: 8px;
        background: rgba(0, 0, 0, 0.04);
        display: inline-block;
        padding: 2px 6px;
        border-radius: 4px;
        max-width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    // &:hover {
    //   .ipname {
    //     margin-left: 8px;
    //   }
    // }
    .gicon {
      margin-right: 4px;
      font-size: @fz13!important;
    }
  }
</style>
