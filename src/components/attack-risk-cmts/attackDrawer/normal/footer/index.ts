/*
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:13
 * @LastEditTime: 2023-07-26 14:58:11
 */
import drawFooter from './index.vue';
const getTabs = () => {
  const AllTypes = {
    //攻击源信息,风险信息（通用）
    srcinfo: {
      titleAttack: 'arcomn.attackSrcMsg',
      component: 'labelinfo',
    },
    //被攻击信息（攻击）
    dstinfo: {
      title: 'arcomn.attackedInfo',
      component: 'labelinfo',
    },
    //攻击记录,风险记录（通用）
    timeline: {
      titleAttack: 'arcomn.attackRecord',
      titleRisk: 'arcomn.riskRecord',
    },
    //XML记录(域控)
    extraxml: {
      title: 'arcomn.xmlMsg',
    },
    //常规信息(域控)
    extramsg: {
      title: 'arcomn.extraMsg',
    },
    //webshell检测
    webshell_attack_info: {
      title: 'arcomn.webshellatkinfo',
    },
    //rasp检测，文件信息
    webshell_attack_map: {
      title: 'arcomn.webshell_attack_map',
    },
    //病毒引擎检测 和webshell共用一个中文名
    virus_attack_info: {
      title: 'arcomn.webshellatkinfo',
    },
    //攻击信息（内存马）
    attack_info: {
      title: 'arcomn.attack_info',
      component: 'labelinfo',
    },
    //进程树
    process_info_list: {
      title: 'arcomn.process_tree',
      // component: 'labelinfo',
    },
    //进程信息（内存马）
    process_info: {
      title: 'arcomn.process_info',
      component: 'labelinfo',
    },
    //类文件信息（内存马）
    class_file_info: {
      title: 'arcomn.class_file_info',
      // component: 'labelinfo',
    },
    //文件信息（内存马）
    file_info: {
      title: 'arcomn.file_info',
      // component: 'labelinfo',
    },
    //webshell文件信息（webshell）
    webshell_file_info: {
      title: 'arcomn.file_info',
      // component: 'labelinfo',
    },
    //http信息（内存马）
    http_info: {
      title: 'arcomn.http_info',
    },
    //辅助分析
    auxiliary: {
      title: 'arcomn.auxAnaly',
      component: 'labelinfo',
    },

    //处置记录
    handlerecord: {
      title: 'arcomn.handreoc',
    },
    //归档信息
    arch_info: {
      title: 'arcomn.gdxinxi',
      component: 'labelinfo',
    },
  };
  return AllTypes;
};

export { getTabs };
export default drawFooter;
