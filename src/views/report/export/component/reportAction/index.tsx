/*
 * @Author: Caocong.dw
 * @LastEditors: Caocong.dw
 * @Date: 2022-01-26 17:54:42
 * @LastEditTime: 2022-01-28 17:55:25
 */
import { defineComponent } from 'vue';
import { DownloadOutlined } from '@ant-design/icons-vue';
import styles from './index.module.less';
import { REPORTTYPE } from '@/enums/reportType';
import { exportReportExcel } from '@/utils/tools';
export const reportAction = defineComponent({
  components: {
    DownloadOutlined,
  },
  props: {
    status: Number,
    url: String,
    filename: String,
  },
  setup(props) {
    const downloadReport = (url: string, filename: string) => {
      exportReportExcel(url, filename);
    };
    return () => (
      <div>
        {props.status === REPORTTYPE.REPORTCREATED ? (
          <div class={styles.download} onClick={() => downloadReport(props.url!, props.filename!)}>
            <DownloadOutlined />
          </div>
        ) : (
          <div class={styles.downloadDisable}>
            <DownloadOutlined />
          </div>
        )}
      </div>
    );
  },
});
