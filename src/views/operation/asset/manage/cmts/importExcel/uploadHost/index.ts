/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-10-28 09:57:18
 * @LastEditTime: 2021-11-02 15:42:41
 */
import uploadHost from './index.vue';
import { FunctionalComponent } from 'vue';
import { CheckCircleOutlined, CloseCircleOutlined, LoadingOutlined } from '@ant-design/icons-vue';
enum ResultStatus {
  INIT,
  SUCCESS,
  SOME,
  FAIL,
  UPLOADING,
}
//iconMap
const iconMap = new Map<ResultStatus, FunctionalComponent>();
iconMap.set(ResultStatus.SUCCESS, CheckCircleOutlined);
iconMap.set(ResultStatus.SOME, CheckCircleOutlined);
iconMap.set(ResultStatus.FAIL, CloseCircleOutlined);
iconMap.set(ResultStatus.UPLOADING, LoadingOutlined);
export { uploadHost, ResultStatus, iconMap };
