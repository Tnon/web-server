import type { FilterColumns } from './type';
import { getHostViewDetail as processApi } from '@/api/asset/hostInfo/process';
import { getHostViewDetail as portApi } from '@/api/asset/hostInfo/port';
import { getHostViewDetail as accountApi } from '@/api/asset/hostInfo/account';
import { getHostViewDetail as envApi } from '@/api/asset/hostInfo/env';
import { getHostViewDetail as serviceApi } from '@/api/asset/hostInfo/service';
import { getHostViewDetail as kernelApi } from '@/api/asset/hostInfo/kernel';
// import { getHostViewDetail as shareApi } from '@/api/asset/hostInfo/share'; // 1025去掉共享文件夹
import { getHostViewDetail as webserviceApi } from '@/api/asset/hostInfo/webservice';
import { getHostViewDetail as webframeApi } from '@/api/asset/hostInfo/webframe';
import { getHostViewDetail as websiteApi } from '@/api/asset/hostInfo/website';
import { getHostViewDetail as appApi } from '@/api/asset/hostInfo/app';
import { getHostViewDetail as packageApi } from '@/api/asset/hostInfo/package';
import { getHostViewDetail as jarApi } from '@/api/asset/hostInfo/jar';
import { getHostViewDetail as webappApi } from '@/api/asset/hostInfo/webapp';
import { getHostViewDetail as pythonApi } from '@/api/asset/hostInfo/python';
import { getHostViewDetail as databaseApi } from '@/api/asset/hostInfo/database';
import { getHostViewDetail as npmApi } from '@/api/asset/hostInfo/npm';
import { getHostViewDetail as taskApi } from '@/api/asset/hostInfo/task';
import { getHostViewDetail as xinetdApi } from '@/api/asset/hostInfo/xinetd';
import { getHostViewDetail as webapiApi } from '@/api/asset/hostInfo/webapi';
import { getHostViewDetail as webjsApi } from '@/api/asset/hostInfo/webjs';
import { ROLE } from '@/enums/roleEnum';
import { createVNode } from 'vue';
import viewSiteDetail from '@/views/hostAsset/views/assetInfo/ppaske/cmts/viewSiteDetail';
import viewAppDetail from '@/views/hostAsset/views/assetInfo/ppaske/cmts/viewAppDetail';
import viewJarDetail from '@/views/hostAsset/views/assetInfo/ppaske/cmts/viewJarDetail';
import viewFrameDetail from '@/views/hostAsset/views/assetInfo/ppaske/cmts/viewFrameDetail';

export const useColumnsData = (t): FilterColumns => {
  return {
    process: {
      place: t('asset.pInput', [t('asset.processName') + '/PID']),
      api: processApi,
      columns: [
        {
          title: t('asset.processName'),
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('asset.processPath'),
          dataIndex: 'path',
          width: 300,
        },
        {
          title: 'PID',
          dataIndex: 'process_id',
          width: 150,
        },
        {
          title: t('asset.runUser'),
          dataIndex: 'username',
          width: 150,
        },
        {
          title: t('asset.startTime'),
          dataIndex: 'start_time',
          sorter: true,
          width: 200,
        },
        {
          title: t('asset.startArg'),
          dataIndex: 'command_info',
          width: 150,
        },
        {
          title: t('asset.threads'),
          dataIndex: 'thread_num',
          sorter: true,
          width: 150,
        },
        {
          title: t('asset.cpuUtil'),
          dataIndex: 'cpu_util',
          sorter: true,
          width: 150,
        },
        {
          title: t('asset.memUtil'),
          dataIndex: 'mem_util',
          sorter: true,
          width: 150,
        },
        {
          title: t('asset.IOR'),
          dataIndex: 'io_read_bytes',
          sorter: true,
          width: 150,
        },
        {
          title: t('asset.IOW'),
          dataIndex: 'io_write_bytes',
          sorter: true,
          width: 150,
        },
        {
          title: t('asset.psta'),
          dataIndex: 'proc_state',
          width: 150,
        },
        {
          title: t('asset.azlx'),
          dataIndex: 'installation',
          width: 150,
        },
      ],
    },
    port: {
      place: t('asset.pInput', [t('asset.portName')]),
      api: portApi,
      columns: [
        {
          title: t('asset.portName'),
          dataIndex: 'port',
          width: 150,
        },
        {
          title: t('asset.processName'),
          dataIndex: 'process_name',
          width: 200,
        },
        {
          title: 'PID',
          dataIndex: 'process_id',
          width: 150,
        },
        {
          title: t('asset.agreement'),
          dataIndex: 'prococol',
          width: 150,
        },
        {
          title: t('asset.runUser'),
          dataIndex: 'username',
          width: 200,
        },
        {
          title: t('asset.startTime'),
          dataIndex: 'start_time',
          width: 200,
        },
      ],
    },
    account: {
      place: t('asset.pInput', [t('asset.accountName')]),
      api: accountApi,
      columns: [
        {
          title: t('asset.accountName'),
          dataIndex: 'username',
          width: 320,
        },
        {
          title: t('common.description'),
          dataIndex: 'description',
          width: 400,
        },
        {
          title: 'UID',
          dataIndex: 'user_id',
          width: 300,
        },
        {
          title: 'GID',
          dataIndex: 'group_id',
          width: 300,
        },
        {
          title: t('asset.accStatus'),
          dataIndex: 'state',
          width: 200,
        },
        {
          title: t('asset.rootPower'),
          dataIndex: 'role',
          customRender: ({ text }) => {
            return text == ROLE.ADMIN
              ? t('common.admin')
              : text == ROLE.UNADMIN
              ? t('common.unAdmin')
              : text == ROLE.DOMAIN
              ? t('common.domainadmin')
              : t('common.undomainadmin');
          },
          width: 200,
        },
        {
          title: 'Shell',
          dataIndex: 'shell',
          width: 200,
        },
        {
          title: t('common.lastLogin'),
          dataIndex: 'login_time',
          width: 300,
        },
      ],
    },
    service: {
      place: t('asset.pInput', [t('asset.startService')]),
      api: serviceApi,
      columns: [
        {
          title: t('asset.startService'),
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('common.description'),
          dataIndex: 'description',
          width: 600,
        },
        {
          title: 'PID',
          dataIndex: 'process_id',
          width: 100,
        },
        {
          title: t('asset.servStatus'),
          dataIndex: 'state',
          width: 100,
        },
        {
          title: t('asset.startTime'),
          dataIndex: 'start_time',
          width: 200,
        },
        {
          title: t('asset.mapPtth'),
          dataIndex: 'path',
          width: 350,
        },
        {
          title: t('common.fileSha256'),
          dataIndex: 'sha256',
          width: 500,
        },
      ],
    },
    kernel: {
      place: t('asset.pInput', [t('asset.kernelName')]),
      api: kernelApi,
      columns: [
        {
          title: t('asset.kernelName'),
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('common.description'),
          dataIndex: 'description',
          width: 600,
        },
        {
          title: t('asset.corrSerName'),
          dataIndex: 'service_name',
          width: 200,
        },
        {
          title: t('asset.modelSize'),
          dataIndex: 'image_size',
          width: 150,
        },
        {
          title: t('asset.modelPath'),
          dataIndex: 'path',
          width: 200,
        },
        {
          title: t('common.fileSha256'),
          dataIndex: 'sha256',
          width: 400,
        },
        {
          title: t('asset.digiSign'),
          dataIndex: 'signature',
          width: 400,
        },
      ],
    },
    environment: {
      place: t('asset.pInput', [t('asset.envName')]),
      api: envApi,
      columns: [
        {
          title: t('asset.envName'),
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('asset.enValue'),
          dataIndex: 'value',
          width: 400,
        },
      ],
    },
    // 1025去掉共享文件夹
    // share: {
    //   place: t('asset.pInput', [t('asset.shareName')]),
    //   api: shareApi,
    //   columns: [
    //     {
    //       title: t('asset.shareName'),
    //       dataIndex: 'name',
    //       width: 200,
    //     },
    //     {
    //       title: t('asset.sharePath'),
    //       dataIndex: 'path',
    //       width: 400,
    //     },
    //   ],
    // },
    webservice: {
      place: t('asset.pInput', [t('asset.webserviceName')]),
      api: webserviceApi,
      columns: [
        {
          title: t('asset.webserviceName'),
          dataIndex: 'web_name',
          width: 200,
        },
        {
          title: t('asset.appVersion'),
          dataIndex: 'web_version',
          width: 200,
        },
        {
          title: t('asset.startUser'),
          dataIndex: 'start_user',
          width: 200,
        },
        {
          title: t('asset.binaryPath'),
          dataIndex: 'binary_path',
          width: 300,
        },
        {
          title: t('asset.mapPath'),
          dataIndex: 'configuration_path',
          width: 300,
        },
        {
          title: 'PID',
          dataIndex: 'process_id',
          width: 300,
        },
      ],
    },
    webframe: {
      place: t('asset.pInput', [t('asset.webframeName')]),
      api: webframeApi,
      columns: [
        {
          title: t('asset.webframeName'),
          dataIndex: 'frame_name',
          width: 200,
        },
        {
          title: t('common.hostName'),
          dataIndex: 'hostname',
          width: 200,
        },
        {
          title: t('asset.frmkver'),
          dataIndex: 'frame_version',
          width: 200,
        },
        {
          title: t('asset.servtype'),
          dataIndex: 'service_name',
          width: 300,
        },
        {
          title: t('asset.gljarpnum'),
          dataIndex: 'count',
          width: 300,
          customRender: ({ record, text }) =>
            text ? createVNode(viewFrameDetail, { record }) : '-',
        },
        {
          title: t('asset.apppath'),
          dataIndex: 'application_path',
          width: 300,
        },
        {
          title: t('asset.framlang'),
          dataIndex: 'frame_language',
          width: 300,
        },
      ],
    },
    website: {
      place: t('asset.pInput', [t('asset.websiteName')]),
      api: websiteApi,
      columns: [
        {
          title: t('asset.websiteName'), //域名
          dataIndex: 'domain_name',
          width: 200,
        },
        {
          title: t('asset.serviceType'), //服务类型
          dataIndex: 'server_name',
          width: 200,
        },
        {
          title: t('asset.siteport'), //站点端口
          dataIndex: 'port',
          width: 150,
        },
        {
          title: t('asset.runuser'), //运行用户
          dataIndex: 'user',
          width: 150,
        },
        {
          title: t('asset.mainPath'), //主目录
          dataIndex: 'root_dir',
          width: 250,
        },
        {
          title: t('asset.geterpow'), //拥有者权限
          dataIndex: 'root_dir_authority',
          width: 200,
        },
        {
          title: t('asset.sitepathnm'), //站点路径数
          dataIndex: 'site_count',
          width: 100,
        },
        {
          title: t('common.action'), //操作
          dataIndex: 'action',
          width: 150,
          customRender: ({ record }) => createVNode(viewSiteDetail, { record }),
        },
      ],
    },
    webapp: {
      place: t('asset.pInput', [t('asset.webappName')]),
      api: webappApi,
      columns: [
        {
          title: t('asset.webappName'), // web应用名
          dataIndex: 'app_name',
          width: 200,
        },
        {
          title: t('common.version'), // 版本
          dataIndex: 'app_version',
          width: 200,
        },
        {
          title: t('asset.serviceType'), // 服务类型
          dataIndex: 'service_type',
          width: 200,
        },
        {
          title: t('asset.rootPath'), // 根目录
          dataIndex: 'application_path',
          width: 200,
        },
      ],
    },
    app: {
      place: t('asset.pInput', [t('asset.appName')]),
      api: appApi,
      columns: [
        {
          title: t('asset.appName'), //应用名称
          dataIndex: 'app_name',
          width: 200,
        },
        {
          title: t('asset.applyType'), //应用类别
          dataIndex: 'app_type',
          width: 200,
        },
        {
          title: t('common.version'), //版本
          dataIndex: 'version',
          width: 200,
        },
        {
          title: t('asset.startUser'), //启动用户
          dataIndex: 'start_user',
          width: 200,
        },
        {
          title: t('asset.binaryPath'), //二进制路径
          dataIndex: 'path',
          width: 200,
        },
        {
          title: t('asset.mapPath'), //配置文件路径
          dataIndex: 'config_path',
          width: 200,
        },
        {
          title: t('asset.reprnm'), //关联进程数
          dataIndex: 'count',
          width: 150,
          customRender: ({ record }) => createVNode(viewAppDetail, { record, type: 'app' }),
        },
      ],
    },
    database: {
      place: t('asset.pInput', [t('asset.databaseName')]),
      api: databaseApi,
      columns: [
        {
          title: t('asset.databaseName'), //应用名称
          dataIndex: 'database_name',
          width: 200,
        },
        {
          title: t('asset.applyType'), //应用类别
          dataIndex: 'database_type',
          width: 200,
        },
        {
          title: t('common.version'), //版本
          dataIndex: 'version',
          width: 200,
        },
        {
          title: t('asset.startUser'), //启动用户
          dataIndex: 'start_user',
          width: 200,
        },
        {
          title: t('asset.binaryPath'), //二进制路径
          dataIndex: 'path',
          width: 200,
        },
        {
          title: t('asset.mapPath'), //配置文件路径
          dataIndex: 'config_path',
          width: 200,
        },
        {
          title: t('asset.reprnm'), //关联进程数
          dataIndex: 'count',
          width: 150,
          customRender: ({ record }) => createVNode(viewAppDetail, { record, type: 'database' }),
        },
      ],
    },
    package: {
      place: t('asset.pInput', [t('asset.packageName')]),
      api: packageApi,
      columns: [
        {
          title: t('asset.packageName'), //系统安装包名称
          dataIndex: 'package_name',
          width: 200,
        },
        {
          title: t('asset.totaldesc'), //总述
          dataIndex: 'summary',
          width: 200,
        },
        {
          title: t('common.version'), //版本
          dataIndex: 'version',
          width: 200,
        },
        {
          title: t('asset.ajzsj'), //安装时间
          dataIndex: 'creation_time',
          width: 200,
        },
        {
          title: t('asset.azblxty'), //系统安装包类型
          dataIndex: 'package_type',
          width: 200,
        },
        {
          title: t('asset.zzbsize'), //系统安装包大小
          dataIndex: 'size_in_kb',
          width: 200,
        },
      ],
    },
    jar: {
      place: t('asset.pInput', [t('asset.jarName')]),
      api: jarApi,
      columns: [
        {
          title: t('asset.jarName'), // Jar包名
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('asset.type'), // 类型
          dataIndex: 'summary',
          width: 150,
        },
        {
          title: t('asset.executable'), // 是否可执行
          dataIndex: 'is_exec',
          width: 150,
        },
        {
          title: t('asset.version'), // 版本
          dataIndex: 'version',
          width: 150,
        },
        {
          title: t('asset.absolutePath'), // 绝对路径
          dataIndex: 'path',
          width: 200,
        },
        {
          title: t('common.action'), // 操作
          dataIndex: 'action',
          width: 150,
          customRender: ({ record }) => createVNode(viewJarDetail, { record }),
        },
      ],
    },
    python: {
      place: t('asset.pInput', [t('asset.pythonName')]),
      api: pythonApi,
      columns: [
        {
          title: t('asset.pythonName'), // Python包名
          dataIndex: 'python_name',
          width: 200,
        },
        {
          title: t('asset.version'), // 版本
          dataIndex: 'version',
          width: 150,
        },
        {
          title: t('asset.absolutePath'), // 绝对路径
          dataIndex: 'abstract_path',
          width: 200,
        },
        {
          title: t('asset.pythonVersion'), // 所属python版本
          dataIndex: 'python_version',
          width: 150,
        },
      ],
    },
    npm: {
      place: t('asset.pInput', [t('asset.npmName')]),
      api: npmApi,
      columns: [
        {
          title: t('asset.npmName'), // npm包名
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('asset.version'), // 版本
          dataIndex: 'version',
          width: 150,
        },
        {
          title: t('asset.absolutePath'), // 绝对路径
          dataIndex: 'path',
          width: 200,
        },
        {
          title: t('asset.zyyfw'), // 作用域范围
          dataIndex: 'scope',
          width: 200,
        },
        {
          title: t('asset.baoid'), // 包应用PID
          dataIndex: 'pid',
          width: 200,
        },
        {
          title: t('asset.byyczzl'), // 包应用操作指令
          dataIndex: 'command',
          width: 200,
        },
      ],
    },
    task: {
      place: t('asset.pInput', [t('asset.taskName')]),
      api: taskApi,
      columns: [
        {
          title: t('asset.taskName'), // 计划任务
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('report.taskType'), // 任务类型
          dataIndex: 'task_type',
          width: 150,
        },
        {
          title: t('user.enaStu'), // 启用状态
          dataIndex: 'is_enable',
          width: 200,
          customRender: ({ text }) =>
            createVNode('span', null, text ? t('common.enable') : t('common.wenable')),
        },
        {
          title: t('asset.zxsj'), // 执行时间
          dataIndex: 'exec_time',
          width: 150,
        },
        {
          title: t('asset.zxyh'), // 执行用户
          dataIndex: 'exec_user',
          width: 150,
        },
        {
          title: t('asset.mapPath'), // 配置文件路径
          dataIndex: 'etc_path',
          width: 150,
        },
      ],
    },
    xinetd: {
      place: t('asset.pInput', [t('asset.xinetdName')]),
      api: xinetdApi,
      columns: [
        {
          title: t('asset.xinetdName'), // xinetd
          dataIndex: 'name',
          width: 150,
        },
        {
          title: t('reinforce.tqy'), // 启用状态
          dataIndex: 'enabled',
          width: 150,
          customRender: ({ text }) =>
            createVNode('span', null, text ? t('asset.yqy') : t('asset.wqy')),
        },
        {
          title: t('asset.runuser'), //运行用户
          dataIndex: 'username',
          width: 150,
        },
        {
          title: t('asset.ksfjg'), //可执行文件路径
          dataIndex: 'path',
          width: 150,
        },
        {
          title: t('asset.startArg'), //启动参数
          dataIndex: 'args',
          width: 150,
        },
      ],
    },
    webjs: {
      place: t('asset.pInput', [t('asset.webjsName')]),
      api: webjsApi,
      columns: [
        {
          title: t('asset.webjsName'), // webjs
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('arcomn.sizeDraw'), // 文件大小
          dataIndex: 'size',
          width: 150,
        },
        {
          title: t('asset.wjqx'), // 文件权限
          dataIndex: 'permission',
          width: 150,
        },
        {
          title: t('arcomn.file_pathDraw'), // 文件路径
          dataIndex: 'path',
          width: 150,
        },
      ],
    },
    webapi: {
      place: t('asset.pInput', [t('asset.webapiName')]),
      api: webapiApi,
      columns: [
        {
          title: t('asset.webapiName'), // webapi
          dataIndex: 'name',
          width: 200,
        },
        {
          title: t('asset.apifs'), // api请求方式
          dataIndex: 'method',
          width: 150,
        },
        {
          title: t('asset.shym'), // 所属域名
          dataIndex: 'domain',
          width: 150,
        },
        {
          title: t('asset.srihy'), // 7日内活跃
          dataIndex: 'active',
          width: 150,
          customRender: ({ text }) =>
            createVNode('span', null, text ? t('report.is') : t('report.no')),
        },
        {
          title: t('arcomn.disTime'), // 发现时间
          dataIndex: 'first_at',
          width: 150,
        },
        {
          title: t('asset.zjhhy'), // 最近活跃时间
          dataIndex: 'last_at',
          width: 150,
        },
      ],
    },
  };
};
