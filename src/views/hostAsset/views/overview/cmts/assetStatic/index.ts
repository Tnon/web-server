import assetStatic from './index.vue';
import { StaticType } from './type';

export const getAssetState = (t: any): StaticType => ({
  vul: {
    kernel: {
      title: t('asset.assetRiskkernel'),
      number: 0,
      icon: '#ax-icon_fengxian-loudong-neihe',
      router: 'assetRisk-kernelvul-viewPro',
    },
    app: {
      title: t('asset.assetRiskapp'),
      number: 0,
      icon: '#ax-icon_fengxian-loudong-xitong',
      router: 'assetRisk-appvul-viewPro',
    },
    web: {
      title: t('asset.assetRiskweb'),
      number: 0,
      icon: '#ax-icon_fengxian-loudong-Web',
      router: 'assetRisk-webvul-viewPro',
    },
  },
  risk: {
    apprisk: {
      title: t('asset.accountRiskapprisk'),
      number: 0,
      icon: '#ax-weakpassword', //图标占用
      router: 'accountRisk-apprisk-viewPro',
    },
    sysrisk: {
      title: t('asset.accountRisksysrisk'),
      number: 0,
      icon: '#ax-weakpassword', //图标占用
      router: 'accountRisk-sysrisk-viewPro',
    },
    accrisk: {
      title: t('asset.accountRiskaccrisk'),
      number: 0,
      icon: '#ax-weakpassword', //图标占用
      router: 'accountRisk-accrisk-viewPro',
    },
    weakpwd: {
      title: t('asset.accountRiskweakpwd'),
      number: 0,
      icon: '#ax-fx-weakpassword-os',
      router: 'accountRisk-weakpwd-viewPro',
    },
    appweakpwd: {
      title: t('asset.accountRiskappweakpwd'),
      number: 0,
      icon: '#ax-fx-weakpassword-app',
      router: 'accountRisk-appweakpwd-viewPro',
    },
  },
  asset: {
    host: {
      title: t('asset.host'),
      number: 0,
      icon: '#ax-host',
      router: 'assetInfo-host',
    },
    process: {
      title: t('asset.process'),
      number: 0,
      icon: '#ax-process',
    },
    port: {
      title: t('asset.port'),
      number: 0,
      icon: '#ax-port',
    },
    account: {
      title: t('asset.account'),
      number: 0,
      icon: '#ax-user',
    },
    service: {
      title: t('asset.service'),
      number: 0,
      icon: '#ax-runningservice',
    },
    kernel: {
      title: t('asset.kernel'),
      number: 0,
      icon: '#ax-kernel',
    },
    env: {
      title: t('asset.env'),
      number: 0,
      icon: '#ax-environmentvariable',
    },
    // 1025去掉共享文件夹
    // share: {
    //   title: t('asset.share'),
    //   number: 0,
    //   icon: '#ax-sharefolder',
    // },
    webservice: {
      title: t('asset.webservice'),
      number: 0,
      icon: '#ax-web',
    },
    // web应用框架
    webframe: {
      title: t('asset.webframe'),
      number: 0,
      icon: '#ax-zc-webframework',
    },

    website: {
      title: t('asset.website'),
      number: 0,
      icon: '#ax-zc-webside',
    },
    webapp: {
      title: t('asset.webapp'),
      number: 0,
      icon: '#ax-zc-webapplication',
    },
    app: {
      title: t('asset.app'),
      number: 0,
      icon: '#ax-applications',
    },
    database: {
      title: t('asset.database'),
      number: 0,
      icon: '#ax-applications',
    },
    package: {
      title: t('asset.package'),
      number: 0,
      icon: '#ax-zc-ospackage',
    },

    jar: {
      title: t('asset.jar'),
      number: 0,
      icon: '#ax-zc-jarpackage',
    },
    python: {
      title: t('asset.python'),
      number: 0,
      icon: '#ax-zc-pythonpackage',
    },
    npm: {
      title: t('asset.npm'),
      number: 0,
      icon: '#ax-zc-npmpackage',
    },
    task: {
      title: t('asset.task'),
      number: 0,
      icon: '#ax-zc-task',
    },
    xinetd: {
      title: t('asset.xinetd'),
      number: 0,
      icon: '#ax-zc-xinet',
    },
    webjs: {
      title: t('asset.webjs'),
      number: 0,
      icon: '#ax-zc-jsfile',
    },
    webapi: {
      title: t('asset.webapi'),
      number: 0,
      icon: '#ax-zc-api',
    },
  },
});
export default assetStatic;
