import { defineComponent, computed, h, unref } from 'vue';
import colorIcon from './src/colorIcon.vue';
import Icon from './src/icon.vue';
const customIcon = defineComponent({
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const iconType = computed(() => (props.type.indexOf('#') === 0 ? colorIcon : Icon));
    return () => h(unref(iconType), { type: props.type });
  },
});
export default customIcon;
