/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-05-26 11:47:00
 * @LastEditTime: 2023-02-27 15:38:08
 */
import { defineComponent, watchEffect, ref } from 'vue';
import { Alevel } from '@/enums/pstatus';
import { useI18n } from 'vue-i18n';
export const comLevel = defineComponent({
  props: {
    level: [String, Number],
  },
  setup(props) {
    const { t } = useI18n();
    const text = ref<string>(''),
      color = ref<string>('');
    watchEffect(() => {
      [text.value, color.value] = Alevel[~~props.level!]
        ? Alevel[~~props.level!].split(',')
        : ['highAttack', '#F05064'];
    });
    const style = { display: 'inline-block' };
    return () => (
      <div style={style}>
        <a-badge color={color.value} />
        <span style={{ color: color.value }}>{t(`arcomn.${text.value}`)}</span>
      </div>
    );
  },
});
