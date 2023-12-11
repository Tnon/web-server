import { defineComponent } from 'vue';
import vkbeautify from 'vkbeautify';
import styles from './index.module.less';
export default defineComponent({
  props: {
    dataSource: String,
  },
  setup(props) {
    return () => (
      <>
        <pre class={styles.xmlContent}>{vkbeautify.xml(props.dataSource!)}</pre>
      </>
    );
  },
});
