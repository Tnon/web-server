import { createVNode } from 'vue';
import hostIp from '@/components/host-ip';
import { TableColumn } from '@/types/tableColumn';
import { ROLE } from '@/enums/roleEnum';
import viewSiteDetail from './cmts/viewSiteDetail';
import viewAppDetail from './cmts/viewAppDetail';
import viewFrameDetail from './cmts/viewFrameDetail';
import viewJarDetail from './cmts/viewJarDetail';
export const getapi_columnsDetail = (type, T) => {
  const api_columnsDetail: {
    [k: string]: TableColumn[];
  } = {
    processPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.processPath'),
        dataIndex: 'path',
        width: 300,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 150,
      },
      {
        title: T('asset.runUser'),
        dataIndex: 'username',
        width: 150,
      },
      {
        title: T('asset.startTime'),
        dataIndex: 'start_time',
        width: 200,
      },
      {
        title: T('asset.startArg'),
        dataIndex: 'command_info',
        width: 150,
      },
      {
        title: T('asset.threads'),
        dataIndex: 'thread_num',
        width: 150,
      },
      {
        title: T('asset.cpuUtil'),
        dataIndex: 'cpu_util',
        width: 150,
      },
      {
        title: T('asset.memUtil'),
        dataIndex: 'mem_util',
        width: 150,
      },
      {
        title: T('asset.IOR'),
        dataIndex: 'io_read_bytes',
        width: 150,
      },
      {
        title: T('asset.IOW'),
        dataIndex: 'io_write_bytes',
        width: 150,
      },
      {
        title: T('asset.psta'),
        dataIndex: 'proc_state',
        width: 150,
      },
      {
        title: T('asset.azlx'),
        dataIndex: 'installation',
        width: 150,
      },
    ],
    processIp: [
      {
        title: T('asset.processPath'),
        dataIndex: 'path',
        width: 300,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 150,
      },
      {
        title: T('asset.runUser'),
        dataIndex: 'username',
        width: 150,
      },
      {
        title: T('asset.startTime'),
        dataIndex: 'start_time',
        width: 200,
      },
      {
        title: T('asset.startArg'),
        dataIndex: 'command_info',
        width: 150,
      },
      {
        title: T('asset.threads'),
        dataIndex: 'thread_num',
        width: 150,
      },
      {
        title: T('asset.cpuUtil'),
        dataIndex: 'cpu_util',
        width: 150,
      },
      {
        title: T('asset.memUtil'),
        dataIndex: 'mem_util',
        width: 150,
      },
      {
        title: T('asset.IOR'),
        dataIndex: 'io_read_bytes',
        width: 150,
      },
      {
        title: T('asset.IOW'),
        dataIndex: 'io_write_bytes',
        width: 150,
      },
      {
        title: T('asset.psta'),
        dataIndex: 'proc_state',
        width: 150,
      },
      {
        title: T('asset.azlx'),
        dataIndex: 'installation',
        width: 150,
      },
    ],
    portPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.processName'),
        dataIndex: 'process_name',
        width: 200,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 150,
      },
      {
        title: T('asset.agreement'),
        dataIndex: 'prococol',
        width: 150,
      },
      {
        title: T('asset.runUser'),
        dataIndex: 'username',
        width: 200,
      },
      {
        title: T('asset.startTime'),
        dataIndex: 'start_time',
        width: 200,
      },
    ],
    portIp: [
      {
        title: T('asset.portName'),
        dataIndex: 'port',
        width: 150,
      },
      {
        title: T('asset.processName'),
        dataIndex: 'process_name',
        width: 200,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 150,
      },
      {
        title: T('asset.agreement'),
        dataIndex: 'prococol',
        width: 150,
      },
      {
        title: T('asset.runUser'),
        dataIndex: 'username',
        width: 200,
      },
      {
        title: T('asset.startTime'),
        dataIndex: 'start_time',
        width: 200,
      },
    ],

    servicePro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('common.description'),
        dataIndex: 'description',
        width: 600,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 100,
      },
      {
        title: T('asset.servStatus'),
        dataIndex: 'state',
        width: 150,
      },
      {
        title: T('asset.startTime'),
        dataIndex: 'start_time',
        width: 200,
      },
      {
        title: T('asset.mapPtth'),
        dataIndex: 'path',
        width: 350,
      },
      {
        title: T('common.fileSha256'),
        dataIndex: 'sha256',
        width: 500,
      },
    ],
    serviceIp: [
      {
        title: T('asset.startService'),
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('common.description'),
        dataIndex: 'description',
        width: 600,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 100,
      },
      {
        title: T('asset.servStatus'),
        dataIndex: 'state',
        width: 150,
      },
      {
        title: T('asset.startTime'),
        dataIndex: 'start_time',
        width: 200,
      },
      {
        title: T('asset.mapPtth'),
        dataIndex: 'path',
        width: 350,
      },
      {
        title: T('common.fileSha256'),
        dataIndex: 'sha256',
        width: 500,
      },
    ],

    envPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },

      {
        title: T('asset.enValue'),
        dataIndex: 'value',
        width: 800,
      },
    ],
    envIp: [
      {
        title: T('asset.envName'),
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('asset.enValue'),
        dataIndex: 'value',
        width: 800,
      },
    ],

    kernelPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('common.description'),
        dataIndex: 'description',
        width: 600,
      },
      {
        title: T('asset.corrSerName'),
        dataIndex: 'service_name',
        width: 200,
      },
      {
        title: T('asset.modelSize'),
        dataIndex: 'image_size',
        width: 150,
      },
      {
        title: T('asset.modelPath'),
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('common.fileSha256'),
        dataIndex: 'sha256',
        width: 400,
      },
      {
        title: T('asset.digiSign'),
        dataIndex: 'signature',
        width: 400,
      },
    ],
    kernelIp: [
      {
        title: T('asset.kernelName'),
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('common.description'),
        dataIndex: 'description',
        width: 600,
      },
      {
        title: T('asset.corrSerName'),
        dataIndex: 'service_name',
        width: 200,
      },
      {
        title: T('asset.modelSize'),
        dataIndex: 'image_size',
        width: 150,
      },
      {
        title: T('asset.modelPath'),
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('common.fileSha256'),
        dataIndex: 'sha256',
        width: 400,
      },
      {
        title: T('asset.digiSign'),
        dataIndex: 'signature',
        width: 400,
      },
    ],

    accountPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('common.description'),
        dataIndex: 'description',
        width: 600,
      },
      {
        title: 'UID',
        dataIndex: 'user_id',
        width: 150,
      },
      {
        title: 'GID',
        dataIndex: 'group_id',
        width: 150,
      },
      {
        title: T('asset.accStatus'),
        dataIndex: 'state',
        width: 150,
      },
      {
        title: T('asset.rootPower'),
        dataIndex: 'role',
        customRender: ({ text }) => {
          return text == ROLE.ADMIN
            ? T('common.admin')
            : text == ROLE.UNADMIN
            ? T('common.unAdmin')
            : text == ROLE.DOMAIN
            ? T('common.domainadmin')
            : T('common.undomainadmin');
        },
        width: 200,
      },
      {
        title: 'Shell',
        dataIndex: 'shell',
        width: 200,
      },
      {
        title: T('common.lastLogin'),
        dataIndex: 'login_time',
        width: 200,
      },
    ],
    accountIp: [
      {
        title: T('asset.accountName'),
        dataIndex: 'username',
        width: 200,
      },
      {
        title: T('common.description'),
        dataIndex: 'description',
        width: 600,
      },
      {
        title: 'UID',
        dataIndex: 'user_id',
        width: 150,
      },
      {
        title: 'GID',
        dataIndex: 'group_id',
        width: 150,
      },
      {
        title: T('asset.accStatus'),
        dataIndex: 'state',
        width: 150,
      },
      {
        title: T('asset.rootPower'),
        dataIndex: 'role',
        width: 200,
        customRender: ({ text }) => {
          return text == ROLE.ADMIN
            ? T('common.admin')
            : text == ROLE.UNADMIN
            ? T('common.unAdmin')
            : text == ROLE.DOMAIN
            ? T('common.domainadmin')
            : T('common.undomainadmin');
        },
      },
      {
        title: 'Shell',
        dataIndex: 'shell',
        width: 200,
      },
      {
        title: T('common.lastLogin'),
        dataIndex: 'login_time',
        width: 200,
      },
    ],
    sharePro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },

      {
        title: T('asset.sharePath'),
        dataIndex: 'path',
        width: 400,
      },
    ],
    shareIp: [
      {
        title: T('asset.shareName'),
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('asset.sharePath'),
        dataIndex: 'path',
        width: 400,
      },
    ],
    webservicePro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.appVersion'),
        dataIndex: 'web_version',
        width: 200,
      },
      {
        title: T('asset.startUser'),
        dataIndex: 'start_user',
        width: 200,
      },
      {
        title: T('asset.binaryPath'),
        dataIndex: 'binary_path',
        width: 300,
      },
      {
        title: T('asset.mapPath'),
        dataIndex: 'configuration_path',
        width: 300,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 300,
      },
    ],
    webserviceIp: [
      {
        title: T('asset.webserviceName'),
        dataIndex: 'web_name',
        width: 200,
      },
      {
        title: T('asset.appVersion'),
        dataIndex: 'web_version',
        width: 200,
      },
      {
        title: T('asset.startUser'),
        dataIndex: 'start_user',
        width: 200,
      },
      {
        title: T('asset.binaryPath'),
        dataIndex: 'binary_path',
        width: 300,
      },
      {
        title: T('asset.mapPath'),
        dataIndex: 'configuration_path',
        width: 300,
      },
      {
        title: 'PID',
        dataIndex: 'process_id',
        width: 300,
      },
    ],
    webframePro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.frmwkname'),
        dataIndex: 'frame_name',
        width: 200,
      },
      {
        title: T('asset.frmkver'),
        dataIndex: 'frame_version',
        width: 200,
      },
      {
        title: T('asset.servtype'),
        dataIndex: 'service_name',
        width: 300,
      },
      {
        title: T('asset.gljarpnum'),
        dataIndex: 'count',
        width: 300,
        customRender: ({ record, text }) => (text ? createVNode(viewFrameDetail, { record }) : '-'),
      },
      {
        title: T('asset.apppath'),
        dataIndex: 'application_path',
        width: 300,
      },
      {
        title: T('asset.framlang'),
        dataIndex: 'frame_language',
        width: 300,
      },
    ],
    webframeIp: [
      {
        title: T('asset.webframeName'),
        dataIndex: 'frame_name',
        width: 200,
      },
      {
        title: T('asset.frmkver'),
        dataIndex: 'frame_version',
        width: 200,
      },
      {
        title: T('asset.servtype'),
        dataIndex: 'service_name',
        width: 300,
      },
      {
        title: T('asset.gljarpnum'),
        dataIndex: 'count',
        width: 300,
        customRender: ({ record, text }) => (text ? createVNode(viewFrameDetail, { record }) : '-'),
      },
      {
        title: T('asset.apppath'),
        dataIndex: 'application_path',
        width: 300,
      },
      {
        title: T('asset.framlang'),
        dataIndex: 'frame_language',
        width: 300,
      },
    ],
    websitePro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.serviceType'), //服务类型
        dataIndex: 'server_name',
        width: 200,
      },
      {
        title: T('asset.siteport'), //站点端口
        dataIndex: 'port',
        width: 150,
      },
      {
        title: T('asset.runuser'), //运行用户
        dataIndex: 'user',
        width: 150,
      },
      {
        title: T('asset.mainPath'), //主目录
        dataIndex: 'root_dir',
        width: 200,
      },
      {
        title: T('asset.geterpow'), //拥有者权限
        dataIndex: 'root_dir_authority',
        width: 200,
      },
      {
        title: T('asset.sitepathnm'), //站点路径数
        dataIndex: 'site_count',
        width: 150,
      },
      {
        title: T('common.action'), //操作
        dataIndex: 'action',
        width: 150,
        customRender: ({ record }) => createVNode(viewSiteDetail, { record }),
      },
    ],
    websiteIp: [
      {
        title: T('asset.websiteName'),
        dataIndex: 'domain_name',
        width: 200,
      },
      {
        title: T('asset.serviceType'), //服务类型
        dataIndex: 'server_name',
        width: 200,
      },
      {
        title: T('asset.siteport'), //站点端口
        dataIndex: 'port',
        width: 150,
      },
      {
        title: T('asset.runuser'), //运行用户
        dataIndex: 'user',
        width: 150,
      },
      {
        title: T('asset.mainPath'), //主目录
        dataIndex: 'root_dir',
        width: 250,
      },
      {
        title: T('asset.geterpow'), //拥有者权限
        dataIndex: 'root_dir_authority',
        width: 200,
      },
      {
        title: T('asset.sitepathnm'), //站点路径数
        dataIndex: 'site_count',
        width: 150,
      },
      {
        title: T('common.action'), //操作
        dataIndex: 'action',
        width: 150,
        customRender: ({ record }) => createVNode(viewSiteDetail, { record }),
      },
    ],
    webappPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('common.version'), // 版本
        dataIndex: 'app_version',
        width: 200,
      },
      {
        title: T('asset.serviceType'), // 服务类型
        dataIndex: 'service_type',
        width: 200,
      },
      {
        title: T('asset.rootPath'), // 根目录
        dataIndex: 'application_path',
        width: 200,
      },
    ],
    webappIp: [
      {
        title: T('asset.webappName'), // web应用名
        dataIndex: 'app_name',
        width: 200,
      },
      {
        title: T('common.version'), // 版本
        dataIndex: 'app_version',
        width: 200,
      },
      {
        title: T('asset.serviceType'), // 服务类型
        dataIndex: 'service_type',
        width: 200,
      },
      {
        title: T('asset.rootPath'), // 根目录
        dataIndex: 'application_path',
        width: 200,
      },
    ],
    appPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },

      {
        title: T('common.version'), //版本
        dataIndex: 'version',
        width: 200,
      },
      {
        title: T('asset.startUser'), //启动用户
        dataIndex: 'start_user',
        width: 200,
      },
      {
        title: T('asset.binaryPath'), //二进制路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('asset.mapPath'), //配置文件路径
        dataIndex: 'config_path',
        width: 200,
      },
      {
        title: T('asset.reprnm'), //关联进程数
        dataIndex: 'count',
        width: 150,
        customRender: ({ record }) => createVNode(viewAppDetail, { record, type: 'app' }),
      },
    ],
    appIp: [
      {
        title: T('asset.appName'), //应用名称
        dataIndex: 'app_name',
        width: 200,
      },
      {
        title: T('asset.applyType'), //应用类别
        dataIndex: 'app_type',
        width: 200,
      },
      {
        title: T('common.version'), //版本
        dataIndex: 'version',
        width: 200,
      },
      {
        title: T('asset.startUser'), //启动用户
        dataIndex: 'start_user',
        width: 200,
      },
      {
        title: T('asset.binaryPath'), //二进制路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('asset.mapPath'), //配置文件路径
        dataIndex: 'config_path',
        width: 200,
      },
      {
        title: T('asset.reprnm'), //关联进程数
        dataIndex: 'count',
        width: 150,
        customRender: ({ record }) => createVNode(viewAppDetail, { record, type: 'app' }),
      },
    ],
    databasePro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },

      {
        title: T('common.version'), //版本
        dataIndex: 'version',
        width: 200,
      },
      {
        title: T('asset.startUser'), //启动用户
        dataIndex: 'start_user',
        width: 200,
      },
      {
        title: T('asset.binaryPath'), //二进制路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('asset.mapPath'), //配置文件路径
        dataIndex: 'config_path',
        width: 200,
      },
      {
        title: T('asset.reprnm'), //关联进程数
        dataIndex: 'count',
        width: 150,
        customRender: ({ record }) => createVNode(viewAppDetail, { record, type: 'database' }),
      },
    ],
    databaseIp: [
      {
        title: T('asset.databaseName'), //数据库类别
        dataIndex: 'database_name',
        width: 200,
      },
      {
        title: T('common.version'), //版本
        dataIndex: 'version',
        width: 200,
      },
      {
        title: T('asset.startUser'), //启动用户
        dataIndex: 'start_user',
        width: 200,
      },
      {
        title: T('asset.binaryPath'), //二进制路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('asset.mapPath'), //配置文件路径
        dataIndex: 'config_path',
        width: 200,
      },
      {
        title: T('asset.reprnm'), //关联进程数
        dataIndex: 'count',
        width: 150,
        customRender: ({ record }) => createVNode(viewAppDetail, { record, type: 'database' }),
      },
    ],
    packagePro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.totaldesc'), //总述
        dataIndex: 'summary',
        width: 200,
      },
      {
        title: T('common.version'), //版本
        dataIndex: 'version',
        width: 200,
      },
      {
        title: T('asset.ajzsj'), //安装时间
        dataIndex: 'creation_time',
        width: 200,
      },
      {
        title: T('asset.azblxty'), //系统安装包类型
        dataIndex: 'package_type',
        width: 200,
      },
      {
        title: T('asset.zzbsize'), //系统安装包大小
        dataIndex: 'size_in_kb',
        width: 200,
      },
    ],
    packageIp: [
      {
        title: T('asset.packageName'), //安装包名称
        dataIndex: 'package_name',
        width: 200,
      },
      {
        title: T('asset.totaldesc'), //总述
        dataIndex: 'summary',
        width: 200,
      },
      {
        title: T('common.version'), //版本
        dataIndex: 'version',
        width: 200,
      },
      {
        title: T('asset.ajzsj'), //安装时间
        dataIndex: 'creation_time',
        width: 200,
      },
      {
        title: T('asset.azblxty'), //安装包类型
        dataIndex: 'package_type',
        width: 200,
      },
      {
        title: T('asset.zzbsize'), //安装包大小
        dataIndex: 'size_in_kb',
        width: 200,
      },
    ],
    // 新增jar包
    jarPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.type'), // 类型
        dataIndex: 'summary',
        width: 150,
      },
      {
        title: T('asset.executable'), // 是否可执行
        dataIndex: 'is_exec',
        width: 150,
      },
      {
        title: T('asset.version'), // 版本
        dataIndex: 'version',
        width: 150,
      },
      {
        title: T('asset.absolutePath'), // 绝对路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('common.action'), // 操作
        dataIndex: 'action',
        width: 150,
        customRender: ({ record }) => createVNode(viewJarDetail, { record }),
      },
    ],
    jarIp: [
      {
        title: T('asset.jarName'), // Jar包名
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('asset.type'), // 类型
        dataIndex: 'summary',
        width: 150,
      },
      {
        title: T('asset.executable'), // 是否可执行
        dataIndex: 'is_exec',
        width: 150,
      },
      {
        title: T('asset.version'), // 版本
        dataIndex: 'version',
        width: 150,
      },
      {
        title: T('asset.absolutePath'), // 绝对路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('common.action'), // 操作
        dataIndex: 'action',
        width: 150,
        customRender: ({ record }) => createVNode(viewJarDetail, { record }),
      },
    ],
    // python包
    pythonPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.version'), // 版本
        dataIndex: 'version',
        width: 150,
      },
      {
        title: T('asset.absolutePath'), // 绝对路径
        dataIndex: 'abstract_path',
        width: 200,
      },
      {
        title: T('asset.pythonVersion'), // 所属python版本
        dataIndex: 'python_version',
        width: 150,
      },
    ],
    pythonIp: [
      {
        title: T('asset.pythonName'), // Python包名
        dataIndex: 'python_name',
        width: 200,
      },
      {
        title: T('asset.version'), // 版本
        dataIndex: 'version',
        width: 150,
      },
      {
        title: T('asset.absolutePath'), // 绝对路径
        dataIndex: 'abstract_path',
        width: 200,
      },
      {
        title: T('asset.pythonVersion'), // 所属python版本
        dataIndex: 'python_version',
        width: 150,
      },
    ],
    // npm包
    npmPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.version'), // 版本
        dataIndex: 'version',
        width: 150,
      },
      {
        title: T('asset.absolutePath'), // 绝对路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('asset.zyyfw'), // 作用域范围
        dataIndex: 'scope',
        width: 200,
      },
      {
        title: T('asset.baoid'), // 包应用PID
        dataIndex: 'pid',
        width: 200,
      },
      {
        title: T('asset.byyczzl'), // 包应用操作指令
        dataIndex: 'command',
        width: 200,
      },
    ],
    npmIp: [
      {
        title: T('asset.npmName'), // npm
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('asset.version'), // 版本
        dataIndex: 'version',
        width: 150,
      },
      {
        title: T('asset.absolutePath'), // 绝对路径
        dataIndex: 'path',
        width: 200,
      },
      {
        title: T('asset.zyyfw'), // 作用域范围
        dataIndex: 'scope',
        width: 200,
      },
      {
        title: T('asset.baoid'), // 包应用PID
        dataIndex: 'pid',
        width: 200,
      },
      {
        title: T('asset.byyczzl'), // 包应用操作指令
        dataIndex: 'command',
        width: 200,
      },
    ],
    // 计划任务
    taskPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('report.taskType'), // 任务类型
        dataIndex: 'task_type',
        width: 150,
      },
      {
        title: T('user.enaStu'), // 启用状态
        dataIndex: 'is_enable',
        width: 200,
        customRender: ({ text }) =>
          createVNode('span', null, text ? T('common.enable') : T('common.wenable')),
      },
      {
        title: T('asset.zxsj'), // 执行时间
        dataIndex: 'exec_time',
        width: 150,
      },
      {
        title: T('asset.zxyh'), // 执行用户
        dataIndex: 'exec_user',
        width: 150,
      },
      {
        title: T('asset.mapPath'), // 配置文件路径
        dataIndex: 'etc_path',
        width: 150,
      },
    ],
    taskIp: [
      {
        title: T('asset.taskName'), // 计划任务名
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('report.taskType'), // 任务类型
        dataIndex: 'task_type',
        width: 150,
      },
      {
        title: T('user.enaStu'), // 启用状态
        dataIndex: 'is_enable',
        width: 200,
        customRender: ({ text }) =>
          createVNode('span', null, text ? T('common.enable') : T('common.wenable')),
      },
      {
        title: T('asset.zxsj'), // 执行时间
        dataIndex: 'exec_time',
        width: 150,
      },
      {
        title: T('asset.zxyh'), // 执行用户
        dataIndex: 'exec_user',
        width: 150,
      },
      {
        title: T('asset.mapPath'), // 配置文件路径
        dataIndex: 'etc_path',
        width: 150,
      },
    ],
    // xinetd
    xinetdPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('reinforce.tqy'), // 启用状态
        dataIndex: 'enabled',
        width: 150,
        customRender: ({ text }) =>
          createVNode('span', null, text ? T('asset.yqy') : T('asset.wqy')),
      },
      {
        title: T('asset.runuser'), //运行用户
        dataIndex: 'username',
        width: 150,
      },
      {
        title: T('asset.ksfjg'), //可执行文件路径
        dataIndex: 'path',
        width: 150,
      },
      {
        title: T('asset.startArg'), //启动参数
        dataIndex: 'args',
        width: 150,
      },
    ],
    xinetdIp: [
      {
        title: T('asset.xinetdName'), // xinetd
        dataIndex: 'name',
        width: 150,
      },
      {
        title: T('reinforce.tqy'), // 启用状态
        dataIndex: 'enabled',
        width: 150,
        customRender: ({ text }) =>
          createVNode('span', null, text ? T('asset.yqy') : T('asset.wqy')),
      },
      {
        title: T('asset.runuser'), //运行用户
        dataIndex: 'username',
        width: 150,
      },
      {
        title: T('asset.ksfjg'), //可执行文件路径
        dataIndex: 'path',
        width: 150,
      },
      {
        title: T('asset.startArg'), //启动参数
        dataIndex: 'args',
        width: 150,
      },
    ],
    // xinetd
    webapiPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('asset.apifs'), // api请求方式
        dataIndex: 'method',
        width: 150,
      },
      {
        title: T('asset.shym'), // 所属域名
        dataIndex: 'domain',
        width: 150,
      },
      {
        title: T('asset.srihy'), // 7日内活跃
        dataIndex: 'active',
        width: 150,
        customRender: ({ text }) =>
          createVNode('span', null, text ? T('report.is') : T('report.no')),
      },
      {
        title: T('arcomn.disTime'), // 发现时间
        dataIndex: 'first_at',
        width: 150,
      },
      {
        title: T('asset.zjhhy'), // 最近活跃时间
        dataIndex: 'last_at',
        width: 150,
      },
    ],
    webapiIp: [
      {
        title: T('asset.webapiName'), // webapi
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('asset.apifs'), // api请求方式
        dataIndex: 'method',
        width: 150,
      },
      {
        title: T('asset.shym'), // 所属域名
        dataIndex: 'domain',
        width: 150,
      },
      {
        title: T('asset.srihy'), // 7日内活跃
        dataIndex: 'active',
        width: 150,
        customRender: ({ text }) =>
          createVNode('span', null, text ? T('report.is') : T('report.no')),
      },
      {
        title: T('arcomn.disTime'), // 发现时间
        dataIndex: 'first_at',
        width: 150,
      },
      {
        title: T('asset.zjhhy'), // 最近活跃时间
        dataIndex: 'last_at',
        width: 150,
      },
    ],
    // xinetd
    webjsPro: [
      {
        title: T('common.hostIp'),
        dataIndex: 'ip',
        width: 200,
        customRender: ({ record }) =>
          createVNode(hostIp, {
            ip: record.ip,
            host_id: record.host_id,
            os: record.os || record.osver,
            online: record.online,
            hostname: record.hostname,
          }),
      },
      {
        title: T('arcomn.sizeDraw'), // 文件大小
        dataIndex: 'size',
        width: 150,
      },
      {
        title: T('asset.wjqx'), // 文件权限
        dataIndex: 'permission',
        width: 150,
      },
      {
        title: T('arcomn.file_pathDraw'), // 文件路径
        dataIndex: 'path',
        width: 150,
      },
    ],
    webjsIp: [
      {
        title: T('asset.webjsName'), // webjs
        dataIndex: 'name',
        width: 200,
      },
      {
        title: T('arcomn.sizeDraw'), // 文件大小
        dataIndex: 'size',
        width: 150,
      },
      {
        title: T('asset.wjqx'), // 文件权限
        dataIndex: 'permission',
        width: 150,
      },
      {
        title: T('arcomn.file_pathDraw'), // 文件路径
        dataIndex: 'path',
        width: 150,
      },
    ],
  };
  return api_columnsDetail[type];
};
