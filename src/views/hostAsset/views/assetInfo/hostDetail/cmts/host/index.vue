<template>
  <div class="scrollContent">
    <!-- 安全提醒 start -->
    <safety-alert :safetyStatus="state.safetyStatus" :host_id="id" :ip="ip" />
    <!-- 安全提醒 end -->

    <!-- cpu 内存 硬盘 start -->
    <allRate :rates="state.rates" />
    <!-- cpu 内存 硬盘 end -->

    <!-- 主机信息 start -->
    <host-info
      :baseInfo="state.baseInfo"
      :agent="state.agent"
      :hostManage="state.hostManage"
      :domainInfo="state.domainInfo"
    />
    <!-- 主机信息 end -->

    <!-- 网卡信息 start -->
    <netcard-info :netcardList="netcardList" />
    <!-- 网卡信息 end -->
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import safetyAlert from './cmts/safetyAlert';
  import allRate from './cmts/allRate';
  import { HostDetail } from '@/api/asset/hostInfo/host';
  import { isArray } from '@/utils/is';
  import hostInfo from './cmts/hostInfo';
  import netcardInfo from './cmts/netcardInfo';

  const props = defineProps({
    id: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
  });
  //状态仓
  const state = reactive({
    //基础信息
    baseInfo: {
      logon_username: '', // 当前登录账户
      recently_logon_user: '', // 最近登录账户
      hostname: '', // 主机名
      os: '', // 操作系统
      kernel_version: '', // 内核版本
      arch: '', // CPU架构
      ip: '', // IP地址(内网)
      other_ip: '', // IP地址(其他)
      mac: '', // MAC地址
      gateway: '', // 网关

      jdk_version: '',
      web_middleware_version: '',
      accounts: '',
    },
    // 客户端（Agent）信息
    agent: {
      host_id: '', // ID号
      last_online_at: '', // 最近上线时间
      last_offline_at: '', // 最近离线时间
      agent_version: '', // Agent版本
      agent_install_time: '', // 初次安装时间(Agent)
      agent_last_upgrade_at: '', // 版本更新日期(Agent)
      drive_version: '', // 驱动版本
      driver_install_time: '', // 初次安装时间(驱动)
      driver_last_upgrade_at: '', // 版本更新日期(驱动)
      // 固定字段
      install_path: '', // 安装路径
      config_path: '', // 配置文件路径
      log_path: '', // 日志路径
      assocProcessName: 'memprotect_guard、memprotect_agent', // 关联进程名
      engine_info_list: [], // 引擎信息

      info_time: '',
      agent_jdk_version: '',
      behavior_lib_version: '',
      created_at: '',
    },
    // 管理信息
    hostManage: {
      group_kv_path: '', // 分组
      tag: '', // 主机标签
      asset_level: '', // 资产等级
      business_group: '', //业务组
      responsible_person: '', // 责任人
      host_location: '', // 机房位置
      asset_number: '', // 资产编号
      description: '',
    },
    //安全提醒
    safetyStatus: {
      // risk_count: 0,
      // attacked_count: 0,
      // 1025版本
      alarm_count: 0,
      event_count: 0,
      risk_total_count: 0, //风险总和 系统/应用/账号/弱密码
      //漏洞-应用漏洞
      app_vul_count: 0,
      //漏洞-web漏洞
      web_vul_count: 0,
      //漏洞-内核漏洞
      kernel_vul_count: 0,
    },
    //cpu 内存 硬盘
    rates: {
      cpu_util: 0,
      cpu_cores: 0,
      mem_util: 0,
      mem_size: 0,
      disk_size: 0,
      disk_util: 0,
    },
    //域控
    domainInfo: {
      has_domain_info: false,
      domain_name: '',
      base_dn: '',
      net_bios: '',
      dns: '',
    },
  });

  const netcardList = ref([]);
  //获取所有信息
  const getHostDetail = async () => {
    const res = await HostDetail(props.id!);
    // 网卡信息单独抽出
    netcardList.value = res.eth_info_list;
    for (let k in state) {
      for (let ak in state[k]) {
        if (ak === 'group_kv_path' && isArray(res[ak])) {
          state[k][ak] = res[ak].map((val) => val.name).join(' / ');
        } else {
          state[k][ak] = res[ak] ?? state[k][ak];
        }
      }
    }
  };
  getHostDetail();
</script>
<style lang="less" scoped>
  .scrollContent {
    height: calc(100vh - 200px);
    overflow: auto;
  }
</style>
