/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-03-31 15:24:57
 * @LastEditTime: 2023-01-12 11:36:27
 */
import { defineComponent } from 'vue';
import styles from './index.module.less';

export default defineComponent({
  props: {
    dataSource: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => (
      <div class={styles.content}>
        {Object.keys(props.dataSource).map((key) => (
          <div class={styles.item}>
            <div class={styles.label}>{key}</div>
            <span class={styles.values}>{props.dataSource[key]}</span>
          </div>
        ))}
      </div>
    );
  },
});
