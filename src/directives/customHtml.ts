/*
 * @Author: Delavin.TnT
 * @LastEditors: Delavin.TnT
 * @Date: 2021-06-10 16:33:33
 * @LastEditTime: 2021-07-23 10:47:49
 */
import { ObjectDirective } from 'vue';
export const customHtml: ObjectDirective = {
  mounted(el: HTMLButtonElement, binding) {
    let content = binding.value.content;
    const keywords = binding.value.keywords;
    content = content.replace(/\</g, '&lt;');
    content = content.replace(/\>/g, '&gt;');
    keywords.forEach((keyword) => {
      const reg = new RegExp(keyword, 'g');
      content = content.replace(reg, '<span style="color:red">' + keyword + '</span>');
    });
    el.innerHTML = content;
  },
};
