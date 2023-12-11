/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-12-15 16:57:39
 * @LastEditTime: 2023-02-15 20:03:38
 */
import { addBPolicy, addWPolicy } from '@/api/strategy/white';
import { handleThreatApi } from '@/api/attack_risk';
import handleBlack from '@/components/handle-dymic-form/handleBlack';
import handleThreat from '@/components/handle-dymic-form/handleThreat';
import handleWhite from '@/components/handle-dymic-form/handleWhite';
import { pwdConfirm } from '@/components/pwdConfirm';
import { MODELTYPE } from '@/enums/attack_risk';
import { useModal, useValidatePwd } from '@/hooks';
import { useUserToken } from '@/store/modules/user';
import { iconList } from '@/types/tableColumn';
import { computed, createVNode } from 'vue';
import handleTbw from './index.vue';
import { message } from 'ant-design-vue';
import strategtMessage from './cmts/message';
const userTokenStore = useUserToken();
const userType = computed(() => userTokenStore.userInfo.id);
export const getEventList = (t, modelType: MODELTYPE): iconList[] => [
  {
    text: t('arcomn.handper'),
    disabled: (record) => !(record.dispose_kind_list && record.dispose_kind_list.length),
    func: ({ record }, callback) => {
      //打开主机处置弹窗
      useModal(
        {
          title: t('arcomn.zhwxcz'),
          width: 800,
          contentProps: {
            record,
          },
          wrapClassName: 'noheadModal',
          handleOk: async (contRef) => {
            const addBlackPolicy = async () => {
              // 策略
              const { code } = await addBPolicy(
                Object.assign({}, contRef.formState, { rule_source: modelType }),
              );
              if (!code) {
                message.success({
                  content: createVNode(strategtMessage, {
                    message: t('message.appaddSuc'),
                    tips: t('arcomn.strmsgsE'),
                  }),
                  icon: createVNode('span'),
                });
              }
              callback();
            };
            await contRef.validate();
            //密码校验
            useModal(
              {
                title: t('arcomn.surDelHs'),
                contentProps: {
                  labelText: t('arcomn.pwdDelVali'),
                },
                handleOk: async (conRefPwd) => {
                  await conRefPwd.validate();
                  return useValidatePwd(
                    handleThreatApi,
                    {
                      id: record.id,
                      process_list: contRef.formState.pid,
                      dispose_user: userType.value,
                      remark: contRef.formState.remarks,
                      is_auto_intercept: contRef.formState.autoHandle ? 2 : 1,
                      rules_detail: contRef.formState.autoHandle
                        ? contRef.formState.rules_detail
                        : [],
                    },
                    conRefPwd,
                    contRef.formState.autoHandle ? addBlackPolicy : () => {},
                  );
                },
              },
              pwdConfirm,
            );
          },
        },
        handleThreat,
      );
    },
  },
  {
    text: t('arcomn.qjljmd'),
    disabled: (record) => !record.can_black,
    func: ({ record }, callback) => {
      //加入黑名单
      useModal(
        {
          title: t('arcomn.joinhei'),
          width: 800,
          contentProps: {
            record,
            title: t('arcomn.joinhei'),
          },
          wrapClassName: 'noheadModal',
          handleOk: async (contRef) => {
            await contRef.validate();
            const { code } = await addBPolicy(
              Object.assign({}, contRef.formState, { rule_source: modelType }),
            );
            if (!code) {
              message.success({
                content: createVNode(strategtMessage, {
                  message: t('message.appaddSuc'),
                  tips: t('arcomn.strmsgsE'),
                }),
                icon: createVNode('span'),
              });
            }
            callback();
          },
        },
        handleBlack,
      );
    },
  },
  {
    text: t('arcomn.qjljbmd'),
    disabled: (record) => !record.can_white,
    func: ({ record }, callback) => {
      //加入白名单
      useModal(
        {
          title: t('arcomn.joinbai'),
          width: 800,
          contentProps: {
            record,
            title: t('arcomn.joinbai'),
            modelType,
          },
          handleOk: async (contRef) => {
            await contRef.validate();
            const { code } = await addWPolicy(
              Object.assign({}, contRef.formState, { rule_source: modelType }),
            );
            if (!code) {
              message.success({
                content: createVNode(strategtMessage, {
                  message: t('message.appaddSuc'),
                  tips: t('arcomn.strmsgsE'),
                }),
                icon: createVNode('span'),
              });
            }
            callback();
          },
          wrapClassName: 'noheadModal',
        },
        handleWhite,
      );
    },
  },
];
export default handleTbw;
