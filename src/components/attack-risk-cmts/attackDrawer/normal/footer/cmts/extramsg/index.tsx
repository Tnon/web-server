import { defineComponent } from 'vue';
import styles from './index.module.less';

export default defineComponent({
  props: {
    dataSource: String,
  },
  setup(props) {
    return () => (
      <div class={styles.content}>
        <div class={styles.codeContent}>{props.dataSource}</div>
      </div>
    );
  },
});
