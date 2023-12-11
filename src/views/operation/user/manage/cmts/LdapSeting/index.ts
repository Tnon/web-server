/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-11-01 11:07:02
 * @LastEditTime: 2022-11-25 16:55:39
 */
import { LDAPROLE } from '@/enums/roleEnum';
import { ref, Ref } from 'vue';
import LdapSeting from './index.vue';
interface FormProps {
  ldap_enable: boolean;
  ldap_server: string;
  ldap_port: string;
  u_type: LDAPROLE | undefined;
  entry_dn: string;
  entry_pwd: string;
}
const useSwitch = (resetFields, bool: Boolean): [Ref<boolean>, (v: boolean) => void] => {
  const isDisabled = ref<boolean>(!!bool);
  const setDisabled = (v: boolean): void => {
    isDisabled.value = v;
    !v && resetFields();
  };
  return [isDisabled, setDisabled];
};
export { LdapSeting, FormProps, useSwitch };
