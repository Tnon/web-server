import {
  defineComponent,
  ref,
  unref,
  createVNode,
  onUnmounted,
  PropType,
  VNode,
  watchEffect,
  nextTick,
} from 'vue';
import { ModalProps } from './type';
import { useI18n } from 'vue-i18n';
import { isString } from 'lodash';
import styles from './index.module.less';
export const globalModal = defineComponent({
  props: {
    container: {
      type: Function,
      default: () => document.body,
    },
    title: {
      type: [String, Object] as PropType<string | VNode>,
      required: true,
    },
    remove: {
      type: Function,
      required: true,
    },
    handleOk: {
      type: Function,
    },
    handleCancle: {
      type: Function,
    },
    //内容专属 属性
    contentProps: {
      type: Object,
      default: () => ({}),
    },
    content: {
      type: Object,
      required: true,
    },
    footer: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    subtitle: {
      type: [String, Object],
      default: '',
    },
    width: {
      type: Number,
      default: 520,
    },
    wrapClassName: {
      type: String,
      default: '',
    },
    okText: {
      type: String,
    },
    cancleText: {
      type: String,
    },
    autoOpen: {
      type: Boolean,
      default: false,
    },
    dangerButton: {
      type: Boolean,
      default: false,
    },
  },
  setup(props: ModalProps) {
    const { t } = useI18n();
    const open = ref<boolean>(true);
    const loading = ref<boolean>(false);
    const contentRef = ref();
    const handle = async () => {
      loading.value = true;
      try {
        await props.handleOk!(unref(contentRef));
        loading.value = false;
        open.value = false;
      } catch {
        loading.value = false;
      }
    };
    let timer: any = null;
    const ok = async () => {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        handle();
      }, 200);
    };
    const cancle = () => {
      props.handleCancle && props.handleCancle();
      open.value = false;
    };
    const closeModal = () => (open.value = false);
    watchEffect(() => {
      if (props.autoOpen) {
        open.value = true;
        nextTick(() => {
          unref(contentRef).refreshPackgeMsg && unref(contentRef).refreshPackgeMsg();
        });
      }
    });
    onUnmounted(() => {
      clearTimeout(timer);
    });
    return () => (
      <a-modal
        v-model={[open.value, 'open']}
        afterClose={props.remove}
        getContainer={props.container as any}
        class={{ nofooter: !props.footer }}
        width={props.width}
        wrapClassName={props.wrapClassName}
        maskClosable={props.maskClosable}
      >
        {{
          default: () =>
            createVNode(
              props.content,
              Object.assign({}, props.contentProps, {
                ref: contentRef,
                closeModal,
                open: open.value,
              }),
              null,
            ),
          title: () => (
            <div>
              {isString(props.title) ? (
                <span>{props.title}</span>
              ) : props.title ? (
                createVNode(props.title)
              ) : null}
              {isString(props.subtitle) ? (
                <span class={styles.subtitle}>{props.subtitle}</span>
              ) : props.subtitle ? (
                createVNode(props.subtitle)
              ) : null}
            </div>
          ),
          footer: () =>
            props.footer ? (
              <div>
                <a-button key="back" onClick={cancle}>
                  {props.cancleText ? props.cancleText : t('common.cancle')}
                </a-button>
                <a-button
                  key="submit"
                  danger={props.dangerButton}
                  type="primary"
                  onClick={ok}
                  loading={loading.value}
                >
                  {props.okText ? props.okText : t('common.confirm')}
                </a-button>
              </div>
            ) : null,
        }}
      </a-modal>
    );
  },
});
