import { defineAsyncComponent } from 'vue';
export const staticDetail = defineAsyncComponent(() => import('./details.vue'));
