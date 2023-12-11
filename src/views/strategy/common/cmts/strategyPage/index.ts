/*
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-06 14:25:59
 * @LastEditTime: 2022-09-06 17:57:22
 */
import { debounce } from 'lodash';
import { onMounted, reactive, toRefs } from 'vue';
import strategyPage from './index.vue';
export const useScrollLeftRight = (scrollRef) => {
  const state = reactive({
    isLeft: true,
    isRight: true,
  });
  //滚动事件
  const scrollDebounce = () => {
    state.isLeft = scrollRef.value.scrollLeft === 0;
    state.isRight =
      Math.abs(
        scrollRef.value.scrollLeft + scrollRef.value.clientWidth - scrollRef.value.scrollWidth,
      ) < 10;
  };

  onMounted(() => {
    scrollRef.value.addEventListener('scroll', debounce(scrollDebounce, 200));
  });
  return {
    ...toRefs(state),
  };
};
export default strategyPage;
