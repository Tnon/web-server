import { AUTHDAYSSTATUS, AUTHSTATUS } from '@/enums/authStatus';
import { defineStore } from 'pinia';
import { ILicense } from './type';
import { datedifference } from '@/utils/tools';
import { getLicense } from '@/api/system';
const dateFormat = (value) => value.slice(0, 4) + '.' + value.slice(4, 6) + '.' + value.slice(6);
export const useLicense = defineStore({
  id: 'license-auth',
  state: (): ILicense => ({
    aCount: 0,
    lic_expired: false,
    lic_rmday: 0,
    lic_status: '',
    nbegintime: '',
    nendtime: '',
    pcCount: 0,
    predate: false,
    servid: '',
  }),
  getters: {
    //授权状态
    authStatus(): { status: string; flag: string } {
      let status = '',
        flag = '';
      if (this.lic_status === 'valid') {
        //未生效
        if (this.predate) {
          status = AUTHSTATUS.Notinforce;
          flag = 'Notinforce';
        }
        //已过期
        else if (this.lic_expired) {
          status = AUTHSTATUS.Expired;
          flag = 'Expired';
        }
        //已授权
        else {
          status = AUTHSTATUS.Authorized;
          flag = 'Authorized';
        }
      } else {
        //未授权
        status = AUTHSTATUS.Unauthorized;
        flag = 'Unauthorized';
      }
      return { status, flag };
    },
    //授权终端数量
    authNum(): number {
      return this.pcCount ?? 0;
    },
    //使用终端数量
    usedNum(): number {
      return this.aCount ?? 0;
    },
    //授权终端剩余数量
    numbSurplus(): number {
      return this.pcCount - this.aCount || 0;
    },
    //授权期限
    authDays(): number | string {
      const numberdays: number = datedifference(this.nbegintime, this.nendtime);
      if (numberdays > 36000) {
        return AUTHDAYSSTATUS.Forever;
      }
      return numberdays;
    },
    //授权剩余期限/授权时间段
    daysSurplus(): string {
      if (this.lic_expired) {
        return AUTHSTATUS.Expired;
      }
      if (this.lic_status === 'invalid') {
        return AUTHSTATUS.Unauthorized;
      }
      // return (this.lic_rmday ?? 0) + '天';
      return '(' + dateFormat(this.nbegintime) + '-' + dateFormat(this.nendtime) + ')';
    },
  },
  actions: {
    SetLicense(res: ILicense) {
      for (const k in res) {
        this[k] = res[k];
      }
    },
    async getLicense() {
      try {
        const response: ILicense & { code: String | Number } = await getLicense();

        // let response = {
        //   aCount: 1901,
        //   lic_expired: false,
        //   lic_rmday: 72467,
        //   lic_status: 'valid',
        //   nbegintime: '20240805',
        //   nendtime: '2230101',
        //   pcCount: '100000',
        //   predate: true,
        //   servid: '8a48114fd171cbfc323bf19bfe633b75',
        // };
        // let response = {
        //   lic_status: 'invalid',
        //   servid: '8a48114fd171cbfc323bf19bfe633b75',
        // };
        if (response && !response.code) {
          this.SetLicense(response);
        }
        return Promise.resolve(response);
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
});
