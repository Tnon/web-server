/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-08 17:17:49
 * @LastEditTime: 2022-11-17 16:22:16
 */
import checkCollapse from './index.vue';
import tableUnselect from '@/assets/images/report/table-unselect.png';
import tableSelected from '@/assets/images/report/table-selected.png';
import pieUnselect from '@/assets/images/report/pie-unselect.png';
import pieSelected from '@/assets/images/report/pie-selected.png';
import barUnselect from '@/assets/images/report/bar-unselect.png';
import barSelected from '@/assets/images/report/bar-selected.png';
import barSelectedC from '@/assets/images/report/bar-selected-c.png';
import barUnSelectedC from '@/assets/images/report/bar-unselected-c.png';
import lineSelected from '@/assets/images/report/line-selected.png';
import lineunSelected from '@/assets/images/report/line-unselected.png';
// import stackUnselect from '@/assets/images/report/stack-unselect.png';
// import stackSelected from '@/assets/images/report/stack-selected.png';

export const getTemplateConfig = (t: any) => ({
  agentAll: {
    title: t('report.agentManage'),
    children: [
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.mainStatus'),
        value: 'main_program_status',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.driverStatus'),
        value: 'driver_status',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.raspStatus'),
        value: 'rasp_injection_status',
      },
      {
        img: barUnselect,
        imgSelected: barSelected,
        label: t('report.addAbility'),
        value: 'new_engine_info',
      },
    ],
  },
  assetAll: {
    title: t('report.assetDistribution'),
    children: [
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.hostOnlineDstrbu'),
        value: 'host_online_status',
      },
      {
        img: barUnselect,
        imgSelected: barSelected,
        label: t('report.groupOnlineDstrbu'),
        value: 'host_online_status_group',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.hostRiskDstrbu'),
        value: 'host_health_distribution',
      },
      {
        img: barUnselect,
        imgSelected: barSelected,
        label: t('report.groupRiskDstrbu'),
        value: 'host_health_distribution_group',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.osDstrbu'),
        value: 'os_distribution',
      },
      // {
      //   img: stackUnselect,
      //   imgSelected: stackSelected,
      //   label: t('report.accountAssetChange'),
      //   value: 10,
      // },
      // {
      //   img: stackUnselect,
      //   imgSelected: stackSelected,
      //   label: t('report.portAssetChange'),
      //   value: 11,
      // },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.cpuUsage'),
        value: 'cpu_usage',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.memoryUsage'),
        value: 'memory_usage',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.diskUsage'),
        value: 'disk_usage',
      },
    ],
  },
  vultyAll: {
    title: t('report.vultyDistribution'),
    children: [
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.vultyType'),
        value: 'vul_type_distribution',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.vultyLevel'),
        value: 'vul_level_distribution',
      },
      {
        img: barUnselect,
        imgSelected: barSelected,
        label: t('report.vultyGroupDstrbu'),
        value: 'vul_level_distribution_group',
      },
      {
        img: tableUnselect,
        imgSelected: tableSelected,
        label: t('report.vultyTOP5'),
        value: 'vul_top5',
      },
    ],
  },
  alertAll: {
    title: t('report.alertAllName'),
    children: [
      {
        img: tableUnselect,
        imgSelected: tableSelected,
        label: t('report.wxgjTOP5'),
        value: 'alarm_top5',
      },
      {
        img: barUnSelectedC,
        imgSelected: barSelectedC,
        label: t('report.webatt'),
        value: 'web_attack',
      },
      {
        img: barUnSelectedC,
        imgSelected: barSelectedC,
        label: t('report.mematt'),
        value: 'memory_attack',
      },
      {
        img: barUnSelectedC,
        imgSelected: barSelectedC,
        label: t('report.sysatt'),
        value: 'system_attack',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.wxcdfx'),
        value: 'alarm_level_distribution',
      },
      {
        img: barUnselect,
        imgSelected: barSelected,
        label: t('report.ywyjghnsd'),
        value: 'alarm_level_distribution_group',
      },
      {
        img: lineunSelected,
        imgSelected: lineSelected,
        label: t('report.gjshqdb'),
        value: 'alarm_trend',
      },
      // {
      //   img: tableUnselect,
      //   imgSelected: tableSelected,
      //   label: t('report.gjipTOP5'),
      //   value: 26,
      // },
      {
        img: tableUnselect,
        imgSelected: tableSelected,
        label: t('report.bgjipTOP5'),
        value: 'alarm_ip_top5',
      },
    ],
  },
  acdrAll: {
    title: t('report.acdrfxName'),
    children: [
      {
        img: tableUnselect,
        imgSelected: tableSelected,
        label: t('report.wxshTp5'),
        value: 'event_top5',
      },
      {
        img: pieUnselect,
        imgSelected: pieSelected,
        label: t('report.wxcxfx'),
        value: 'event_level_distribution',
      },
      {
        img: barUnselect,
        imgSelected: barSelected,
        label: t('report.ywhzgjts'),
        value: 'event_level_distribution_group',
      },
      {
        img: lineunSelected,
        imgSelected: lineSelected,
        label: t('report.gjshqdb'),
        value: 'event_trend',
      },
      // {
      //   img: tableUnselect,
      //   imgSelected: tableSelected,
      //   label: t('report.gjipTOP5'),
      //   value: 32,
      // },
      {
        img: tableUnselect,
        imgSelected: tableSelected,
        label: t('report.bgjipTOP5'),
        value: 'event_ip_top5',
      },
    ],
  },
});
export default checkCollapse;
