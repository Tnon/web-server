/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-08-30 10:43:39
 * @LastEditTime: 2023-08-25 15:18:43
 */
import { createVNode, defineComponent, reactive, watchEffect, PropType } from 'vue';
import { CheckCircleFilled, InfoCircleFilled, PlayCircleFilled } from '@ant-design/icons-vue';
import { useI18n } from 'vue-i18n';
import { useModal } from '@/hooks';
import agentRunStatus from '../agentRunStatus';
import { T_Self_Status, E_Run_Status } from './type';
export const selfDete = defineComponent({
  props: {
    self_verify: {
      type: Object as PropType<T_Self_Status>,
      required: true,
    },
    run_status: {
      type: Number as PropType<E_Run_Status>,
      required: true,
    },
    host_id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n();

    const state = reactive({
      title: '',
      color: '',
      component: undefined,
    });
    watchEffect(async () => {
      let total: number = 0;
      // let partPause: boolean = false;
      // let allPause: boolean = true;
      for (const k in props.self_verify) {
        total += props.self_verify[k].count ?? 0;
        // if (k !== 'plugin') {
        //   props.self_verify[k].detail.forEach((ele) => {
        //     if (ele.status === DRIVERSTATUS.STOP) {
        //       partPause = true;
        //     }
        //     if (ele.status === DRIVERSTATUS.RUNING || ele.status === DRIVERSTATUS.ERROR) {
        //       allPause = false;
        //     }
        //   });
        // }
      }
      // if (props.self_verify && Object.keys(props.self_verify).length) {
      //   if (!total) {
      //     if (allPause) {
      //       Object.assign(state, {
      //         title: t('operation.suspend'),
      //         color: '#0000004d',
      //         component: PlayCircleFilled,
      //       });
      //     } else {
      //       if (partPause) {
      //         Object.assign(state, {
      //           title: t('operation.bfzt'),
      //           color: '#18BA79',
      //           component: CheckCircleFilled,
      //         });
      //       } else {
      //         Object.assign(state, {
      //           title: t('operation.deteNor'),
      //           color: '#18BA79',
      //           component: CheckCircleFilled,
      //         });
      //       }
      //     }
      //   } else {
      //     Object.assign(state, {
      //       title: t('operation.deteErr') + '(' + total + ')',
      //       color: '#F8A556',
      //       component: InfoCircleFilled,
      //     });
      //   }
      // } else {
      //   Object.assign(state, {
      //     title: '-',
      //     color: '#000',
      //     component: 'span',
      //   });
      // }
      if (props.run_status === E_Run_Status.Error) {
        Object.assign(state, {
          title: t('operation.deteErr') + '(' + total + ')',
          color: '#F8A556',
          component: InfoCircleFilled,
        });
      } else if (props.run_status === E_Run_Status.Ok) {
        Object.assign(state, {
          title: t('operation.deteNor'),
          color: '#18BA79',
          component: CheckCircleFilled,
        });
      } else if (props.run_status === E_Run_Status.Parse) {
        Object.assign(state, {
          title: t('operation.suspend'),
          color: '#0000004d',
          component: PlayCircleFilled,
        });
      } else if (props.run_status === E_Run_Status.PartParse) {
        Object.assign(state, {
          title: t('operation.bfzt'),
          color: '#18BA79',
          component: CheckCircleFilled,
        });
      } else {
        Object.assign(state, {
          title: '-',
          color: '#000',
          component: createVNode('span'),
        });
      }
    });

    //打开详情弹窗
    const openDetaiModal = () => {
      props.self_verify &&
        Object.keys(props.self_verify).length &&
        useModal(
          {
            title: t('operation.dstns'),
            width: 800,
            footer: false,
            contentProps: {
              host_id: props.host_id,
            },
          },
          agentRunStatus,
        );
    };

    return () => (
      <span style={{ color: state.color, cursor: 'pointer' }} onClick={() => openDetaiModal()}>
        {createVNode(state.component!, { style: { marginRight: '4px' } })}
        {state.title}
      </span>
    );
  },
});
