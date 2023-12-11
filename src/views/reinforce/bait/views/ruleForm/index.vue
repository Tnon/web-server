<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-22 13:50:04
 * @LastEditTime: 2023-07-24 14:42:20
-->
<template>
  <div class="container">
    <!-- 头部 start -->
    <rule-head :id="id" :saveData="ok" />
    <!-- 头部 end -->

    <!-- 表单内容 start -->
    <form-detail :formData="formData" :rule_type="~~rule_type" ref="formDetailRef" />
    <!-- 表单内容 end -->
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, unref, onUnmounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import formDetail from './cmts/form';
  import { I_Form_Data } from './cmts/form/type';
  import ruleHead from './cmts/head';
  import { editBlRuleDf, getBlRuleDetailDf, addBlRuleDf } from '@/api/reinforce';
  import { preendTrim } from '@/utils/tools';
  // 跳转携带参数
  const {
    query: { id, rule_type },
  } = useRoute() as any;
  const router = useRouter();
  //获取数据
  const formData = reactive<I_Form_Data>({
    rule_name: '', // 规则名称
    alarm_level: undefined, // 告警等级: 1: 低; 2: 中; 3: 高
    desc: '', // 规则备注
    dir_path: [], // 目录创建
    file_format: [], // 文件格式
    monitor_mod: undefined, //监控模式
    probes: [],
    apply_type: undefined, // 应用维度: 1: 全部主机; 2: 分组; 3: 主机
    host_group: '', // 分组ID列表
    host_list: [], // 主机mac列表
  });

  const getRuleDetail = async (id) => {
    const { code, ...res } = await getBlRuleDetailDf<{ id: number }>({ id });
    if (!code) {
      Object.assign(formData, res, {
        dir_path: res.dir_path ?? [],
        proc_exclude: res.file_format ?? [],
        host_list: res.host_list ?? [],
      });
    }
  };
  //编辑
  if (id !== undefined) {
    getRuleDetail(~~id);
  }
  //表单
  const formDetailRef = ref();
  //保存
  const saveData = async () => {
    try {
      await unref(formDetailRef).validate();
      formData.dir_path = preendTrim(formData.dir_path);
      formData.file_format = preendTrim(formData.file_format);
      if (id !== undefined) {
        await editBlRuleDf<I_Form_Data & { id: number }>(Object.assign({}, formData, { id: ~~id }));
      } else {
        await addBlRuleDf<I_Form_Data>(formData);
      }
      router.go(-1);
    } catch (error) {}
  };
  let timer: any = null;
  const ok = async () => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      saveData();
    }, 200);
  };
  onUnmounted(() => {
    clearTimeout(timer);
  });
</script>

<style scoped lang="less">
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fafafa;
  }
</style>
