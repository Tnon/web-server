import { defineComponent, watchEffect, ref } from 'vue';
import { Slevel } from '@/enums/pstatus';
import { useI18n } from 'vue-i18n';
export const statusType = defineComponent({
  props: {
    text: String,

    status: Number,
  },
  setup(props) {
    const { t } = useI18n();
    // 初始化生成状态的文本和颜色
    const text = ref<string>('');
    const color = ref<string>('');
    const style = { display: 'inline-block' };

    // 监听生成状态获取对应的文本和颜色
    watchEffect(() => {
      [text.value, color.value] = Slevel[~~props.status! - 1].split(',');
    });
    return () => (
      <div style={style}>
        <a-badge color={color.value} status={'processing'} />
        <span style={{ color: color.value }}>{t(`report.${text.value}`)}</span>
      </div>
    );
  },
});
