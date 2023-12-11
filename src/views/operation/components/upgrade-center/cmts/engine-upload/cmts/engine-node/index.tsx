/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-04-28 14:48:04
 * @LastEditTime: 2023-03-09 14:43:21
 */
import { defineComponent, PropType, reactive, ref, watchEffect } from 'vue';
import styles from './index.module.less';
import uploadFile from '@/components/upload-file';
import { useI18n } from 'vue-i18n';
import { MedicineBoxFilled, RollbackOutlined } from '@ant-design/icons-vue';
import { useModal, useValidatePwd } from '@/hooks';
import { pwdConfirm } from '@/components/pwdConfirm';
import { UPCLIPKGTYPE, UPSERPKGTYPE } from '@/enums/assetsType';
import { updateEngine } from '@/api/operation/upgrade';
import { EngineNodeState } from '../../type';
import { USERTOKEN } from '@/store/modules/user/type';
export const engineNode = defineComponent({
  components: {
    uploadFile,
    MedicineBoxFilled,
  },
  props: {
    refreshMethods: Function,
    icon: String,
    flag: Array as PropType<Array<string>>,
    title: String,
    recallVerApi: Function,
    pkgType: Number as PropType<UPCLIPKGTYPE | UPSERPKGTYPE>,
    packageInfo: Object as PropType<Partial<EngineNodeState>>,
    keyName: String,
  },
  setup(props) {
    const { t } = useI18n();
    //spining
    const spinning = ref<boolean>(false);
    //更新loading
    const updateLoading = ref<boolean>(false);
    const state = reactive<Partial<EngineNodeState>>({
      //自研ha sh版本
      version: '-',
      //  更新时间
      created_at: '-',
      //是否可撤回
      enable_recall: false,
      //包的id
      package_id: undefined,
      //是否可更新
      enable_upgrade: false,
      //额外id（基线有用）
      extra_package_id: undefined,
    });
    //获取引擎包信息
    watchEffect(() => {
      Object.assign(state, props.packageInfo);
    });
    //刷新包和表格
    const refreshSelfAndTable = async (boolean?) => {
      props.refreshMethods!(boolean);
    };
    //更新引擎
    const updatePackage = async (boolean) => {
      if (!boolean) {
        return;
      }
      updateLoading.value = true;
      const { code: errorcode } = await updateEngine({ code: props.keyName! });
      if (!errorcode) {
        //刷新自研hash引擎信息
        refreshSelfAndTable();
      }
      updateLoading.value = false;
    };
    //版本撤回
    const rebackVersion = async (boolean) => {
      if (!boolean) {
        return;
      }
      useModal(
        {
          title: t('operation.cfmpwdtitle'),
          handleOk: async (conRef) => {
            await conRef.validate();
            return useValidatePwd(
              props.recallVerApi,
              {
                package_id: state.package_id as any,
                type: props.pkgType!,
                extra_package_id: state.extra_package_id,
              },
              conRef,
              refreshSelfAndTable,
              true,
            );
          },
        },
        pwdConfirm,
      );
    };
    return () => (
      <div class={styles.container}>
        <a-spin tip={t('setting.pasing') + '...'} spinning={spinning.value}>
          <div class={styles.main}>
            <div class={styles.header}>
              <custom-icon type={props.icon} class={styles.customIcon} />
              <div class={styles.operation}>
                <a-button
                  v-permission={{
                    name: 'engineUpload',
                    showUsers: [USERTOKEN.admin, USERTOKEN.super],
                  }}
                  type="text"
                  class={styles.btn}
                  onClick={() => rebackVersion(state.enable_recall)}
                  disabled={!state.enable_recall}
                >
                  {{
                    icon: () => <RollbackOutlined />,
                    default: () => t('operation.back'),
                  }}
                </a-button>
                <a-button
                  type="primary"
                  v-permission={{
                    name: 'engineUpload',
                    showUsers: [USERTOKEN.admin, USERTOKEN.super],
                  }}
                  class={styles.btns}
                  onClick={() => updatePackage(state.enable_upgrade)}
                  disabled={!state.enable_upgrade}
                  loading={updateLoading.value}
                >
                  {t('operation.update')}
                </a-button>
              </div>
            </div>
            <div class={styles.title}>{props.title}</div>
            <div class={styles.ftVersion}>
              {/* 自研hash引擎版本 */}
              {t('operation.agtvs')}&nbsp;
              {state.version}
            </div>
            <span class={styles.flag}>
              {props.flag!.map((item) => (
                <span class={[styles.node, { [styles.vrius]: item === t('operation.virusmm') }]}>
                  {item}
                </span>
              ))}
            </span>
            <div class={styles.updTime}>
              {/* 更新时间 */}
              {t('operation.pubtime')}&nbsp;
              {state.created_at}
            </div>
          </div>
        </a-spin>
      </div>
    );
  },
});
