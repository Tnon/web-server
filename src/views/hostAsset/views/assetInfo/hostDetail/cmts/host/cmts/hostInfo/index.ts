import hostInfo from './index.vue';
export default hostInfo;
export const useInfoData = (t) => [
  {
    title: t('asset.hostInfoAsset'), // 主机信息
    key: 'baseInfo',
    columns: {
      column1: [
        {
          label: t('asset.curLogAcc'),
          key: 'logon_username', // 当前登录账户
        },
        {
          label: t('asset.lastedLoginUser'),
          key: 'recently_logon_user', // 最近登录账户
        },
        {
          label: t('common.hostName'),
          key: 'hostname', // 主机名
        },
      ],
      column2: [
        {
          label: t('common.system'),
          key: 'os', // 操作系统
        },
        {
          label: t('asset.kerVer'),
          key: 'kernel_version', // 内核版本
        },
        {
          label: t('asset.cpuArc'),
          key: 'arch', // CPU架构
        },
      ],
      column3: [
        {
          label: t('asset.ipAddIn'),
          key: 'ip', // IP地址(内网)
        },
        {
          label: t('asset.ipOther'),
          key: 'other_ip', // IP地址(其他)
        },
        {
          label: t('asset.macAdd'),
          key: 'mac', // MAC地址
        },
        {
          label: t('asset.geteWay'),
          key: 'gateway', // 网关
        },
      ],
    },
  },
  {
    title: t('asset.agtInfo'), // 客户端信息
    key: 'agent',
    columns: {
      column1: [
        {
          label: t('asset.idNUm'),
          key: 'host_id', // ID号
        },
        {
          label: t('asset.lastOnliTm'),
          key: 'last_online_at', // 最近上线时间
        },
        {
          label: t('asset.lastOffLineTime'),
          key: 'last_offline_at', // 最近离线时间
        },
      ],
      column2: [
        {
          label: t('asset.mainVersion'),
          key: 'agent_version', // Agent版本
        },
        {
          label: t('asset.firstInstallTime'),
          key: 'agent_install_time', // 初次安装时间(Agent)
        },
        {
          label: t('asset.versionUpdateDate'),
          key: 'agent_last_upgrade_at', // 版本更新日期(Agent)
        },
      ],
      column3: [
        {
          label: t('asset.driverVersion'),
          key: 'drive_version', // 驱动版本
        },
        {
          label: t('asset.firstInstallTime'),
          key: 'driver_install_time', // 初次安装时间(驱动)
        },
        {
          label: t('asset.versionUpdateDate'),
          key: 'driver_last_upgrade_at', // 版本更新日期(驱动)
        },
      ],
      column4: [
        {
          label: t('asset.installPath'),
          key: 'install_path', // 安装路径
        },
        {
          label: t('asset.mapPath'), // 配置文件路径
          key: 'config_path',
        },
        {
          label: t('asset.logPath'),
          key: 'log_path', // 日志路径
        },
        {
          label: t('asset.assocProcessName'),
          key: 'assocProcessName', // 关联进程名
        },
      ],
    },
  },
  {
    title: t('asset.hostMana'), // 管理信息
    key: 'hostManage',
    columns: {
      column1: [
        {
          label: t('common.group'),
          key: 'group_kv_path', // 分组
        },
        {
          label: t('common.tag'),
          key: 'tag', // 主机标签
        },
        {
          label: t('asset.assetClass'),
          key: 'asset_level', // 资产等级
        },
        {
          label: t('operation.blbs'),
          key: 'business_group', // 所属业务组
        },
      ],
      column2: [
        // {
        //   label: t('user.dep'),
        //   key: 'dept', // 所属部门
        // },
        {
          label: t('asset.perLi'),
          key: 'responsible_person', // 责任人
        },
        {
          label: t('asset.macRoom'),
          key: 'host_location', // 机房位置
        },
        {
          label: t('asset.assetNum'),
          key: 'asset_number', // 资产编号
        },
        {
          label: t('common.remarks'),
          key: 'description', // 备注
        },
      ],
    },
  },
  {
    title: t('asset.domainInfo'),
    key: 'domainInfo',
    children: [
      {
        label: t('asset.domainName'),
        key: 'domain_name',
        value: '',
      },
      {
        label: 'Base DN',
        key: 'base_dn',
        value: '',
      },
      {
        label: 'NetBIOS',
        key: 'net_bios',
        value: '',
      },
      {
        label: t('asset.dnsServer'),
        key: 'dns',
        value: '',
      },
    ],
  },
];
