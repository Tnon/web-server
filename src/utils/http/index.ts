import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message as $message } from 'ant-design-vue';
import { isString } from 'lodash';
import { useUserToken } from '@/store/modules/user';
import { HttpLanguage, Language } from '@/enums/language';
import { ACCESS_TOKEN } from '@/store/modules/lang-theme/type';
import { useI18n } from '@/plugins/setupGlobalLocalLang';
import { storage } from '@/utils/Storage';
import { getNavigatorLang, Logout } from '@/utils/tools';
import { AxiosCanceler } from './axiosCancel';
const T = useI18n();
interface RequestOptions {
  // 成功的文本信息
  successMessageText?: string;
  errorMessageText?: string;
}
//退出防抖
let timer: any = null;
//创建实例
const service = axios.create();
//取消请求Map
const axiosCanceler = new AxiosCanceler();
//请求之前正确 和 错误 拦截器
service.interceptors.request.use((config) => {
  //请求队列
  axiosCanceler.addPending(config);
  const userTokenStore = useUserToken();
  // const token = storage.get(ACCESS_TOKEN);
  // //两个token不一致 退出
  // if (token !== userTokenStore.token) {
  //   Logout();
  // }
  // 请求之前处理config
  if (userTokenStore.token) {
    config.headers![HttpLanguage.TOKENKEY] = `${userTokenStore.tokenType} ${userTokenStore.token}`;
  }
  if (userTokenStore.userLanguage) {
    config.headers![HttpLanguage.LANG] =
      userTokenStore.userLanguage === Language.DEFAULT
        ? getNavigatorLang()
        : userTokenStore.userLanguage;
  }
  return config;
}, undefined);
//响应之后 正确 和 错误 拦截器
service.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    //队列一一清空
    response && axiosCanceler.removePending(response.config);
    const userTokenStore = useUserToken();
    //token将过期时候，分配新的token并替换
    const token: string = response.headers[HttpLanguage.TOKEN];
    if (token) {
      storage.set(ACCESS_TOKEN, token);
      userTokenStore.SetToken(token);
    }
    return response;
  },
  (error) => {
    const isCancel = axios.isCancel(error);

    //状态为非200处理
    const { response } = error;
    const message = response.data?.msg;
    //移除队列
    response && axiosCanceler.removePending(response.config);
    //授权过期 or token失效
    if (response && response.status == 401) {
      // $message.destroy();
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        //登录失效
        $message.error(message || T('login.loginInva'));
        Logout();
      }, 1000);
    } else {
      !isCancel && $message.error(message);
    }
    return Promise.reject(error);
  },
);
const request = async <T = any>(
  config: AxiosRequestConfig,
  options: RequestOptions = {},
): Promise<T> => {
  try {
    const { successMessageText } = options;
    const res = await service.request(beforeRequestHook(config));
    //状态为200的处理
    if (res.data && res.data.code) {
      $message.error(res.data.msg || T('common.serverError'));
    } else {
      successMessageText && $message.success(T('message.' + successMessageText));
    }
    return Promise.resolve(res.data);
  } catch {
    //捕捉error,防止页面未进行catch捕捉，手动resolve
    return Promise.resolve({ code: 'error', msg: T('common.serverError') } as any);
  }
};
//请求之前处理url，header
const beforeRequestHook = (config: AxiosRequestConfig): AxiosRequestConfig => {
  //请求头处理
  config.headers = { [ContentTypeEnum.CONTENT_TYPE]: ContentTypeEnum.JSON };
  // 请求地址和请求参数处理
  if (config.method === RequestEnum.GET) {
    if (!isString(config.params)) {
      if (!config.params) return config;
    } else {
      config.url = config.url + '/' + config.params;
      config.params = {};
    }
  } else {
    if (!isString(config.params)) {
      if (!config.params) return config;
      config.data = config.params;
    } else {
      config.url = config.url + config.params;
    }
    config.params = {};
  }
  return config;
};
export default request;
