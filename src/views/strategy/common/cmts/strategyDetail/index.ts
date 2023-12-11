/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-08 14:28:05
 * @LastEditTime: 2023-11-02 13:56:32
 */
import strategyDetail from './index.vue';
import { OptionType, StrategyPackage, Ctype, Modes, AssetModes } from './type';
import abnorlLogin from './cmts/abnorLogin';
import webshellPath from './cmts/webshell/path';
import webshellRound from './cmts/webshell/round';
import virusPath from './cmts/virus/path';
import virusRound from './cmts/virus/round';
import weakpwdRegRule from './cmts/weakpwd';
import weakpwdBaseRule from './cmts/weakpwdbase';
import { StrategyType } from '@/views/strategy/common/types';
import customIp from './cmts/ipConfig/ip';
import customNet from './cmts/ipConfig/net';
import { createVNode, h } from 'vue';
import ipShow from './cmts/forms/helpTips/ipShow';
export const getStrategyData = (strategyType: StrategyType, t): StrategyPackage[] => {
  if (strategyType === StrategyType.Safe) {
    return [
      {
        title: t('strategy.basesafe'), //基础安全策略  t('strategy.')
        icon: '#ax-Protection',
        types: [
          {
            title: t('strategy.fhnl'), //防护能力
            nodes: [
              {
                key: 'rasp-java',
                switch: {
                  title: t('strategy.raspjava'), //RASP模块（Java）raspjava
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOn') +
                    '</span><br>' +
                    t('strategy.raspjavamsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.webtype'), //Web应用类型
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Tomcat',
                        value: 1,
                      },
                      {
                        label: 'WebLogic',
                        value: 2,
                      },
                      {
                        label: 'WebSphere',
                        value: 3,
                      },
                      {
                        label: 'Jetty',
                        value: 4,
                      },
                      {
                        label: 'Resin',
                        value: 5,
                      },
                      {
                        label: 'JBoss/WildFly',
                        value: 6,
                      },
                      {
                        label: 'Spring',
                        value: 7,
                      },
                      {
                        label: 'TongWeb',
                        value: 8,
                      },
                      {
                        label: 'BES Application Server',
                        value: 9,
                      },
                    ],
                    name: 'app-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'rasp-php',
                switch: {
                  title: t('strategy.raspphp'), //'RASP模块（PHP）'
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOn') +
                    '</span><br>' +
                    t('strategy.raspphpmsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
              },
              {
                key: 'rasp-performance-mode',
                switch: {
                  title: t('strategy.raspxn'), //RASP性能模式
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOn') +
                    '</span><br>' +
                    t('strategy.raspxnmsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
              },
              {
                key: 'rasp-fusing', //待调试
                switchText: {
                  title: t('strategy.rasprdsz'), //'RASP熔断设置',
                  tips: t('strategy.rasprdsztips'),
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.zdysz'), //'自定义设置',
                      value: AssetModes.Custom,
                    },
                    {
                      label: t('strategy.tjsz'), //'推荐设置',
                      value: AssetModes.Recommend,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.memsyl'), //'内存使用率',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.InputNumber,
                    selectText: t('strategy.raspyufj'), //'RASP触发自动熔断机制阈值',
                    options: [],
                    name: 'mem-usage', //待调试
                    ctype: Ctype.Float,
                  },
                  {
                    label: {
                      title: t('strategy.cpusyl'), //'CPU使用率',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.InputNumber,
                    selectText: t('strategy.raspyufj'), //'RASP触发自动熔断机制阈值',
                    options: [],
                    name: 'cpu-usage', //待调试
                    ctype: Ctype.Float,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.selpro'), //'自保护能力'
            nodes: [
              {
                key: 'agent-self-protection',
                switch: {
                  title: t('strategy.agtsbh'), //Agent自保护
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOf') +
                    '</span><br>' +
                    t('strategy.agtsbhmsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
              },
            ],
          },
        ],
      },
      {
        title: t('strategy.webghsk'), //'Web攻击防护策略',
        icon: '#ax-Protection',
        subtitle: t('strategy.fjsnsg'), //'请先开启“基础安全策略”中的“RASP模块（Java）”和“RASP模块（PHP）”开关',
        types: [
          {
            title: t('strategy.zjgj'), //'注入攻击',
            nodes: [
              {
                key: 'sql-injection',
                switch: {
                  title: t('strategy.sqlzr'), //'SQL注入',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'dnslog-injection',
                switch: {
                  title: t('strategy.dnslij'), //'DNSLog注入',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'xxe-injection',
                switch: {
                  title: t('strategy.xee'), // 'XXE攻击',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.kzjb'), //'跨站脚本',
            nodes: [
              {
                key: 'xss-attack',
                switch: {
                  title: t('strategy.xss'), //'XSS攻击',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.qqwz'), //'请求伪造',
            nodes: [
              {
                key: 'ssrf-attack', //待确认后修改！！！ssrf-attack
                switch: {
                  title: t('strategy.ssrf'), //'SSRF攻击',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.sjqq'), //'数据窃取',
            nodes: [
              {
                key: 'drag-database',
                switch: {
                  title: t('strategy.tkxw'), //'拖库行为',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    // {
                    //   label: t('strategy.ljms'), //'拦截模式',
                    //   value: Modes.Inject,
                    // },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'access-sensitive-file',
                switch: {
                  title: t('strategy.mgwjfw'), //'敏感文件访问',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'file-dir-list', //file-dir-list
                switch: {
                  title: t('strategy.wjmllc'), //文件目录列出,
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.hmzr'), //'后门植入',
            nodes: [
              {
                key: 'upload-suspicious-file',
                switch: {
                  title: t('strategy.sckywj'), //'上传可疑文件',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'undead-trojan',
                switch: {
                  title: t('strategy.PHPbsm'), //'PHP不死马',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    // {
                    //   label: t('strategy.ljms'), //'拦截模式',
                    //   value: Modes.Inject,
                    // },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.rcegj'), //'RCE攻击',
            nodes: [
              {
                key: 'command-execution',
                switch: {
                  title: t('strategy.xtmlzx'), //'系统命令执行',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'load-so-file',
                switch: {
                  title: t('strategy.sojz'), //'SO加载',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'intranet-port-scan',
                switch: {
                  title: t('strategy.nwdksm'), //'内网端口扫描',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'connect-virtual-terminals',
                switch: {
                  title: t('strategy.ljxnzd'), //'连接虚拟终端',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'Java',
                        value: 1,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'php-code-exec',
                switch: {
                  title: t('strategy.phpdmzx'), //'PHP代码执行',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'callback-func-exploit',
                switch: {
                  title: t('strategy.hdhsly'), //'回调函数利用',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
              {
                key: 'exec-suspicious-file',
                switch: {
                  title: t('strategy.zxkywj'), //'执行可疑文件',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.laty'), //'支持语言类型',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: 'PHP',
                        value: 2,
                      },
                    ],
                    name: 'lang-types',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: t('strategy.xtgjfhc'), //'系统攻击防护策略',
        icon: '#ax-Protection',
        types: [
          // {
          //   title: t('strategy.wgl'), //'异常连接',
          //   nodes: [
          //     {
          //       key: 'illegal-outreach',
          //       switch: {
          //         title: t('strategy.ffwl'), //'非法外联',
          //         tips: '',
          //         name: 'switch',
          //         ctype: Ctype.Switch,
          //       },
          //       modes: {
          //         options: [
          //           {
          //             label: t('strategy.osb'), //'仅上报模式',
          //             value: Modes.OnlyReport,
          //           },
          //         ],
          //         name: 'mode',
          //         ctype: Ctype.Radio,
          //       },
          //     },
          //   ],
          // },
          {
            title: t('strategy.zctc'), //'侦查探测',
            nodes: [
              {
                key: 'brute-force',
                switch: {
                  title: t('strategy.xtbp'), //'系统爆破',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
            ],
          },
          {
            title: t('strategy.cgjc'), //'篡改劫持',
            nodes: [
              {
                key: 'bootkit',
                switch: {
                  title: t('strategy.ydsqcg'), // '引导扇区篡改',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'kernel-tamper',
                switch: {
                  title: t('strategy.nhcg'), //'内核篡改',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'dll-hijack',
                switch: {
                  title: t('strategy.dtkjc'), //'动态库劫持',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'env-hijack',
                switch: {
                  title: t('strategy.hjbljc'), //'环境变量劫持',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
            ],
          },
          {
            title: t('strategy.ycwz'), //'隐藏伪装',
            nodes: [
              {
                key: 'app-hidden-port',
                switch: {
                  title: t('strategy.yokgprs'), //'隐藏端口',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'app-hidden-process',
                switch: {
                  title: t('strategy.yyjcksl'), //'应用级隐藏进程',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'kernel-hidden-process',
                switch: {
                  title: t('strategy.nkgosld'), //'内核级隐藏进程',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },

              {
                key: 'kernel-hidden-module',
                switch: {
                  title: t('strategy.nklgety'), //'内核级隐藏模块',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
            ],
          },
          {
            title: t('strategy.qxts'), //'权限提升',
            nodes: [
              {
                key: 'cmd-empowerment',
                switch: {
                  title: t('strategy.mlts'), //'命令提升',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'cron-empowerment',
                switch: {
                  title: t('strategy.kgjhros'), //'计划任务提权',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
            ],
          },
          {
            title: t('strategy.yckz'), //'远程控制',
            nodes: [
              {
                key: 'proc-back-shell',
                switch: {
                  title: t('strategy.ftshell'), //'反弹shell',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'reuse-port',
                switch: {
                  title: t('strategy.dkfy'), //'端口复用',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'unexpected-login',
                switch: {
                  title: t('strategy.ycdl'), //'异常登录',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.jcms'), //'检测模式',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Radio,
                    options: [
                      {
                        label: t('strategy.zdxx'), //'自动学习',
                        value: 1,
                      },
                      {
                        label: t('strategy.zdygz'), //'自定义规则',
                        value: 2,
                        configValues: {
                          component: h(abnorlLogin),
                          byValue: 2,
                          data: [
                            {
                              name: 'ip-pattern',
                              ctype: Ctype.StringArr,
                            },
                            {
                              name: 'time-cycle',
                              ctype: Ctype.Radio,
                            },
                            {
                              name: 'time-dow',
                              ctype: Ctype.IntArr,
                            },
                            {
                              name: 'time-dom',
                              ctype: Ctype.IntArr,
                            },
                            {
                              name: 'time-range',
                              ctype: Ctype.StringArr,
                            },
                            {
                              name: 'account-pattern',
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'study-type',
                    ctype: Ctype.Radio,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.eywj'), //'恶意文件',
            nodes: [
              {
                key: 'webshell-scan',
                switch: {
                  title: 'webshell',
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOn') +
                    '</span><br>' +
                    t('strategy.webshellmsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.smlhpe'), //'扫描路径配置',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: t('strategy.mrweb'), //'默认web目录',
                        value: 1,
                      },
                      {
                        label: t('strategy.zdjyl'), //'自定义路径',
                        value: 2,
                        configValues: {
                          component: h(webshellPath),
                          byValue: 2,
                          data: [
                            {
                              name: 'path-custom',
                              ctype: Ctype.StringArr,
                            },
                            {
                              name: 'path-ignore',
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'path-mode',
                    ctype: Ctype.Checkbox,
                  },
                  {
                    label: {
                      title: t('strategy.smzhklg'), //'扫描周期配置',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Radio,
                    options: [
                      {
                        label: t('strategy.sssm'), //'实时扫描',
                        value: 1,
                      },
                      {
                        label: t('strategy.klgsg'), //'自定义周期',
                        value: 2,
                        configValues: {
                          component: h(webshellRound),
                          byValue: 2,
                          data: [
                            {
                              name: 'time-cycle', //改动需要同步下面的两个
                              ctype: Ctype.Radio,
                            },
                            {
                              name: 'time-dom',
                              ctype: Ctype.IntArr,
                            },
                            {
                              name: 'time-dow',
                              ctype: Ctype.IntArr,
                            },
                            {
                              name: 'time-range',
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'scan-circle',
                    ctype: Ctype.Radio,
                  },
                ],
              },
              {
                key: 'virus-hash',
                switch: {
                  title: t('strategy.jtbdkhd'), //'静态病毒（客户端）',
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOn') +
                    '</span><br>' +
                    t('strategy.jtbdkhdmsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'virus-scan',
                switch: {
                  title: t('strategy.jmgnslg'), //'静态病毒（服务端）',
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOn') +
                    '</span><br>' +
                    t('strategy.jmgnslgmsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.smlhpe'), //'扫描路径配置',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: t('strategy.qpsm'), //'全盘扫描',
                        value: 1,
                      },
                      {
                        label: t('strategy.zdjyl'), //'自定义路径',
                        value: 2,
                        configValues: {
                          component: h(virusPath),
                          byValue: 2,
                          data: [
                            {
                              name: 'path-custom',
                              ctype: Ctype.StringArr,
                            },
                            {
                              name: 'path-ignore',
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'path-mode',
                    ctype: Ctype.Checkbox,
                  },
                  {
                    label: {
                      title: t('strategy.smzhklg'), //'扫描周期配置',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Radio,
                    options: [
                      {
                        label: t('strategy.sssm'), //'实时扫描',
                        value: 1,
                      },
                      {
                        label: t('strategy.klgsg'), //'自定义周期',
                        value: 2,
                        configValues: {
                          component: h(virusRound),
                          byValue: 2,
                          data: [
                            {
                              name: 'time-cycle', //改动需要同步下面的两个
                              ctype: Ctype.Radio,
                            },
                            {
                              name: 'time-dom',
                              ctype: Ctype.IntArr,
                            },
                            {
                              name: 'time-dow',
                              ctype: Ctype.IntArr,
                            },
                            {
                              name: 'time-range',
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'scan-circle',
                    ctype: Ctype.Radio,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: t('strategy.ngklrhs'), //'内存攻击防护策略',
        icon: '#ax-Protection',
        types: [
          {
            title: t('strategy.fkges'), //'无文件攻击',
            nodes: [
              {
                key: 'code-snippet-execution',
                switch: {
                  title: t('strategy.dmpsdg'), //'代码片段执行',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'remote-thread-injection',
                switch: {
                  title: t('strategy.yxczr'), //'远线程注入',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
            ],
          },
          {
            title: t('strategy.ncldly'), //'内存漏洞利用',
            nodes: [
              {
                key: 'stack-attribute-attack',
                switch: {
                  title: t('strategy.zshxj'), //'栈属性攻击',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'stack-code-execution-attack',
                switch: {
                  title: t('strategy.zdmzxgj'), //'栈代码执行攻击',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'rop-attack',
                switch: {
                  title: t('strategy.ropgj'), //'ROP攻击',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'layout-shellcode',
                switch: {
                  title: t('strategy.bjscd'), //'布局shellcode',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },

              // {
              //   key: 'nulladdress',
              //   switch: {
              //     title: t('strategy.ldzly'), //'0地址利用',
              //     tips: '',
              //     name: 'switch',
              //     ctype: Ctype.Switch,
              //   },
              //   modes: {
              //     options: [
              //       {
              //         label: t('strategy.ljms'), //'拦截模式',
              //         value: Modes.Inject,
              //       },
              //       {
              //         label: t('strategy.osb'), //'仅上报模式',
              //         value: Modes.OnlyReport,
              //       },
              //     ],
              //     name: 'mode',
              //     ctype: Ctype.Radio,
              //   },
              // },
              // {
              //   key: 'heapspray',
              //   switch: {
              //     title: t('strategy.dpsjc'), //'堆喷射检测',
              //     tips: '',
              //     name: 'switch',
              //     ctype: Ctype.Switch,
              //   },
              //   modes: {
              //     options: [
              //       {
              //         label: t('strategy.ljms'), //'拦截模式',
              //         value: Modes.Inject,
              //       },
              //       {
              //         label: t('strategy.osb'), //'仅上报模式',
              //         value: Modes.OnlyReport,
              //       },
              //     ],
              //     name: 'mode',
              //     ctype: Ctype.Radio,
              //   },
              // },
              // {
              //   key: 'stkpivot',
              //   switch: {
              //     title: t('strategy.zfz'), //'栈反转',
              //     tips: '',
              //     name: 'switch',
              //     ctype: Ctype.Switch,
              //   },
              //   modes: {
              //     options: [
              //       {
              //         label: t('strategy.ljms'), //'拦截模式',
              //         value: Modes.Inject,
              //       },
              //       {
              //         label: t('strategy.osb'), //'仅上报模式',
              //         value: Modes.OnlyReport,
              //       },
              //     ],
              //     name: 'mode',
              //     ctype: Ctype.Radio,
              //   },
              // },
            ],
          },
          {
            title: t('strategy.ncmgj'), //'内存马攻击',
            subtitle: t('strategy.jkgsnng'), //'请先开启“基础安全策略”中的“RASP模块（Java）”开关',
            nodes: [
              {
                key: 'register-memory-component',
                switch: {
                  title: t('strategy.zcnczj'), //'注册内存组件',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'suspicious-memory-component',
                switch: {
                  title: t('strategy.kxynbm'), //'可疑内存组件',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
              {
                key: 'suspicious-class-file',
                switch: {
                  title: t('strategy.kylzj'), //'可疑类文件',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
              },
            ],
          },
        ],
      },
      {
        title: t('strategy.engskg'), //'事件安全策略',
        icon: '#ax-Protection',
        types: [
          {
            title: t('strategy.sjfh'), //'事件防护',
            nodes: [
              {
                key: 'ngav-engine-event-analysis',
                switch: {
                  title: t('strategy.ngavfx'), //'NGAV引擎事件分析',
                  tips:
                    "<span style='color:#18BA79'>" +
                    t('strategy.recOn') +
                    '</span><br>' +
                    t('strategy.ngavfxmsg'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.ljms'), //'拦截模式',
                      value: Modes.Inject,
                    },
                    {
                      label: t('strategy.osb'), //'仅上报模式',
                      value: Modes.OnlyReport,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  // {
                  //   label: {
                  //     title: t('strategy.wxcjd'), //'行为采集点',
                  //     icon: '#ax-extend',
                  //   },
                  //   optionType: OptionType.Checkbox,
                  //   options: [
                  //     {
                  //       label: t('strategy.wjcjd'), //'文件采集点',
                  //       value: 1,
                  //     },
                  //     {
                  //       label: t('strategy.wlcjd'), //'网络采集点',
                  //       value: 2,
                  //     },
                  //     {
                  //       label: t('strategy.jccjd'), //'进程采集点',
                  //       value: 3,
                  //     },
                  //     {
                  //       label: t('strategy.nccjd'), //'内存采集点',
                  //       value: 4,
                  //     },
                  //     {
                  //       label: t('strategy.qtcjd'), //'其他采集点',
                  //       value: 5,
                  //     },
                  //   ],
                  //   name: 'behavior-collector',
                  //   ctype: Ctype.Checkbox,
                  // },
                  {
                    label: {
                      title: t('strategy.sjkdep'), //'事件拦截深度',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Radio,
                    options: [
                      {
                        label: t('strategy.jgw'), //'仅高危',
                        value: 3,
                      },
                      {
                        label: t('strategy.zwgw'), //'中危及高危',
                        value: 2,
                      },
                      {
                        label: t('strategy.all'), //'全部',
                        value: 1,
                      },
                    ],
                    name: 'interception-depth',
                    ctype: Ctype.Radio,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  } else {
    return [
      {
        title: t('strategy.zcfxcl'), //'风险资产检测策略',
        icon: '#ax-Protection',
        types: [
          {
            title: t('strategy.fxzc'), //'风险资产',
            nodes: [
              {
                key: 'app-risk', //app-risk
                switch: {
                  title: t('asset.accountRiskapprisk'), //'应用风险',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
              },
              {
                key: 'sys-risk', //sys-risk
                switch: {
                  title: t('asset.accountRisksysrisk'), //'系统风险',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
              },
              {
                key: 'acc-risk', //acc-risk
                switch: {
                  title: t('asset.accountRiskaccrisk'), //'账户风险',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
              },
            ],
          },
          {
            title: t('strategy.zhfx'), //'弱口令风险',
            nodes: [
              {
                key: 'weak-pwd',
                switch: {
                  title: t('strategy.rklfx'), //'弱口令风险',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.rklgz'), //'弱口令规则',
                      icon: '#ax-extend',
                      tips: t('strategy.jcgztips'),
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: t('strategy.jcgz'), //'基础规则',
                        value: 1,
                        configValues: {
                          component: h(weakpwdBaseRule),
                          byValue: 1,
                          data: [
                            {
                              name: 'basic',
                              ctype: Ctype.Checkbox,
                            },
                            {
                              name: 'basic-pwdlen',
                              ctype: Ctype.Int,
                            },
                          ],
                        },
                      },
                      {
                        label: t('strategy.zdygz'), //'自定义规则',
                        value: 2,
                        configValues: {
                          component: h(weakpwdRegRule),
                          byValue: 2,
                          data: [
                            {
                              name: 'regex',
                              ctype: Ctype.StringArr,
                            },
                            {
                              name: 'set',
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'regex-modes',
                    ctype: Ctype.Checkbox,
                  },
                  // {
                  //   label: {
                  //     title: '弱密码字典',
                  //     icon: '#ax-extend',
                  //   },
                  //   optionType: OptionType.Checkbox,
                  //   options: [
                  //     {
                  //       label: '默认规则',
                  //       value: 1,
                  //     },
                  //     {
                  //       label: '自定义规则',
                  //       value: 2,
                  //     },
                  //   ],
                  //   name: 'set-modes',
                  //   ctype: Ctype.Checkbox,
                  //   configValues: {
                  //     component: h(weakpwdDic),
                  //     byValue: 2,
                  //     data: [
                  //       {
                  //         name: 'set',
                  //         ctype: Ctype.StringArr,
                  //       },
                  //     ],
                  //   },
                  // },
                ],
              },
              {
                key: 'app-weak-pwd', //app-
                switch: {
                  title: t('strategy.yyrklfx'), //'应用弱口令风险',
                  tips: t('strategy.weaktips'),
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.yyrklgz'), //'弱口令规则',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Checkbox,
                    options: [
                      {
                        label: t('strategy.jcgz'), //'基础规则',
                        value: 1,
                        configValues: {
                          component: h(weakpwdBaseRule),
                          byValue: 1,
                          data: [
                            {
                              name: 'basic',
                              ctype: Ctype.Checkbox,
                            },
                            {
                              name: 'basic-pwdlen',
                              ctype: Ctype.Int,
                            },
                          ],
                        },
                      },
                      {
                        label: t('strategy.zdygz'), //'自定义规则',
                        value: 2,
                        configValues: {
                          component: h(weakpwdRegRule),
                          byValue: 2,
                          data: [
                            {
                              name: 'regex',
                              ctype: Ctype.StringArr,
                            },
                            {
                              name: 'set',
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'regex-modes',
                    ctype: Ctype.Checkbox,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: t('strategy.zcqdcl'), //'基础资产清点策略',
        icon: '#ax-Protection',
        types: [
          {
            title: t('strategy.zjfx'), //'硬件性能使用率检测',
            nodes: [
              {
                key: 'cpu-usage',
                switch: {
                  title: t('strategy.cpugg'), //'CPU使用率过高风险',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.zdysz'), //'自定义设置',
                      value: AssetModes.Custom,
                    },
                    {
                      label: t('strategy.tjsz'), //'推荐设置',
                      value: AssetModes.Recommend,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.cpusyl'), //'CPU使用率',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.InputNumber,
                    selectText: t('strategy.cpusylfz'), //'CPU使用率告警阈值',
                    options: [],
                    name: 'threshold',
                    ctype: Ctype.Float,
                  },
                ],
              },
              {
                key: 'disk-usage',
                switch: {
                  title: t('strategy.diskgg'), //'硬盘使用率过高风险',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.zdysz'), //'自定义设置',
                      value: AssetModes.Custom,
                    },
                    {
                      label: t('strategy.tjsz'), //'推荐设置',
                      value: AssetModes.Recommend,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.disksyl'), //'硬盘使用率',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.InputNumber,
                    selectText: t('strategy.disksylfz'), //'硬盘使用率告警阈值',
                    options: [],
                    name: 'threshold',
                    ctype: Ctype.Float,
                  },
                ],
              },
              {
                key: 'memory-usage',
                switch: {
                  title: t('strategy.memgg'), //'内存使用率过高风险',
                  tips: '',
                  name: 'switch',
                  ctype: Ctype.Switch,
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.zdysz'), //'自定义设置',
                      value: AssetModes.Custom,
                    },
                    {
                      label: t('strategy.tjsz'), //'推荐设置',
                      value: AssetModes.Recommend,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.memsyl'), //'内存使用率',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.InputNumber,
                    selectText: t('strategy.memsylfz'), //'内存使用率告警阈值',
                    options: [],
                    name: 'threshold',
                    ctype: Ctype.Float,
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.zjcc'), //'主机资产',
            nodes: [
              {
                key: 'asset-entity',
                switchText: {
                  title: t('strategy.zjcjsb'), //'主机资产上报',
                  tips: '',
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.zdysz'), //'自定义设置',
                      value: AssetModes.Custom,
                    },
                    {
                      label: t('strategy.tjsz'), //'推荐设置',
                      value: AssetModes.Recommend,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.zjjcxx'), //'主机基础信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'baseinfo',
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.xtzc'), //'系统资产',
            nodes: [
              {
                key: 'asset-system',
                switchText: {
                  title: t('strategy.xjtbks'), //'系统资产上报',
                  tips: '',
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.zdysz'), //'自定义设置',
                      value: AssetModes.Custom,
                    },
                    {
                      label: t('strategy.tjsz'), //'推荐设置',
                      value: AssetModes.Recommend,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.jcxx'), // '进程/端口信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'process',
                  },
                  {
                    label: {
                      title: t('strategy.ahxx'), //'账户/系统若口令信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'account',
                  },
                  {
                    label: {
                      title: t('strategy.xjhhg'), //'账户/系统若口令信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'appweak',
                  },
                  {
                    label: {
                      title: t('strategy.kfngje'), //'启动服务信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'service',
                  },
                  {
                    label: {
                      title: t('strategy.nfkgewk'), //'内核模块信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'kernel',
                  },
                  {
                    label: {
                      title: t('strategy.evnifo'), //'环境变量信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'environment',
                  },
                  {
                    label: {
                      title: t('strategy.pkgm'), //'系统安装包信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'package',
                  },
                  {
                    label: {
                      title: t('strategy.pton'), //'python包信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'python',
                  },
                  {
                    label: {
                      title: t('strategy.npmfms'), //'npm包信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'npm',
                  },
                  {
                    label: {
                      title: t('strategy.taskif'), //'计划任务信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'task',
                  },
                  {
                    label: {
                      title: t('strategy.fzczss'), //'风险资产信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'risk', //risk
                  },
                  {
                    label: {
                      title: t('strategy.xinetd'), //'xinetd网络托管信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'xinetd', //xinetd
                  },
                  {
                    label: {
                      title: t('strategy.webapi'), //'api接口',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'webapi', //webapi
                  },
                ],
              },
            ],
          },
          {
            title: t('strategy.webass'), //'Web资产',
            nodes: [
              {
                key: 'asset-web',
                switchText: {
                  title: t('strategy.webzjsb'), //'Web资产上报',
                  tips: '',
                },
                modes: {
                  options: [
                    {
                      label: t('strategy.zdysz'), //'自定义设置',
                      value: AssetModes.Custom,
                    },
                    {
                      label: t('strategy.tjsz'), //'推荐设置',
                      value: AssetModes.Recommend,
                    },
                  ],
                  name: 'mode',
                  ctype: Ctype.Radio,
                },
                checks: [
                  {
                    label: {
                      title: t('strategy.webfwxx'), //'Web服务信息',
                      icon: '#ax-extend',
                    },
                    optionType: OptionType.Asset,
                    name: 'webasset',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: t('strategy.zjckgsg'), //'资产显示策略',
        icon: '#ax-extend',
        types: [
          {
            title: t('strategy.ipshw'), //'IP显示',
            nodes: [
              {
                key: 'ip-display',
                checks: [
                  {
                    label: {
                      title: t('strategy.zippz'), //'主IP配置',
                      icon: '#ax-extend',
                      tips: createVNode(ipShow),
                    },
                    optionType: OptionType.Radio,
                    options: [
                      {
                        label: t('strategy.ljipyx'), //'默认IP',
                        value: 1,
                      },
                      {
                        label: t('strategy.zdiipyx'), //'自定义IP优先',
                        value: 2,
                        configValues: {
                          component: h(customIp),
                          byValue: 2,
                          data: [
                            {
                              name: 'ip', //ip
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                      {
                        label: t('strategy.zdineyx'), //'自定义网卡优先',
                        value: 3,
                        configValues: {
                          component: h(customNet),
                          byValue: 3,
                          data: [
                            {
                              name: 'net', //net
                              ctype: Ctype.StringArr,
                            },
                          ],
                        },
                      },
                    ],
                    name: 'master-ip',
                    ctype: Ctype.Radio,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
  }
};

export default strategyDetail;
