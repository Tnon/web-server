import { ONLINESTATUS } from '@/enums/assetsType';
import detailHeader from './index.vue';
export interface hostDetai {
  ip: string;
  hostname: string;
  os: string;
  online: ONLINESTATUS;
  last_offline_at: string;
}

export default detailHeader;
