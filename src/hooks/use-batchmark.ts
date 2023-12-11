/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-07-19 21:31:10
 * @LastEditTime: 2022-12-23 18:33:31
 */

export const useBatchMark = async (api, state, conRef, callback, keepPage?) => {
  const { code } = await api(
    Object.assign({}, state, {
      set_note: conRef.mark,
    }),
  );
  if (code) {
    return Promise.reject({ code });
  }
  //刷新下
  !code && callback(keepPage);
  return Promise.resolve();
};
