<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-09-26 12:59:32
 * @LastEditTime: 2022-04-28 20:42:47
-->
<template>
  <a-upload :beforeUpload="beforeUpload" :showUploadList="false" action="/" accept=".txt">
    <slot></slot>
  </a-upload>
</template>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { useI18n } from 'vue-i18n';

  const emit = defineEmits(['readTxt']);
  const { t } = useI18n();
  // 读取文件
  (FileReader.prototype as any).reading = function ({ encode }) {
    let bytes = new Uint8Array(this.result); //无符号整型数组
    let text = new TextDecoder(encode || 'UTF-8').decode(bytes);
    return text;
  };
  /* 重写readAsBinaryString函数 */
  FileReader.prototype.readAsBinaryString = function (f) {
    if (!this.onload)
      //如果this未重写onload函数，则创建一个公共处理方式
      this.onload = () => {
        //在this.onload函数中，完成公共处理
        (this as any).reading();
      };
    this.readAsArrayBuffer(f); //内部会回调this.onload方法
  };
  const readFile = (f) => {
    let rd: any = new FileReader();
    rd.onload = () => {
      //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
      let cont = rd.reading({ encode: 'GBK' });
      // this.formCustom.zdata = cont;
      emit('readTxt', cont);
    };
    rd.readAsBinaryString(f);
  };
  const beforeUpload = (file) => {
    if (file.name.endsWith('.txt')) {
      readFile(file);
    } else {
      message.error(t('strategy.texfileFmt'));
    }
    // 读取数据
    return Promise.reject('');
  };
</script>
<style lang="less" scoped></style>
