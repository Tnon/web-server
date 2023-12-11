<!--
 * @Author: Delavin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2021-07-05 15:21:08
 * @LastEditTime: 2023-04-28 11:00:16
-->
<template>
  <div v-if="reState.tags.length">
    <!-- header content start -->
    <draw-header
      :tags="reState.tags"
      :level="reState.dataSource.vul_level"
      :description="reState.dataSource.description"
      :title="reState.dataSource.title"
    />
    <!-- header content end -->
    <!-- footer start -->
    <draw-footer :dataSource="reState.dataSource" />
    <!-- footer end -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import drawHeader from './header';
  import drawFooter from './footer';
  import { getSecDrawDetail } from '@/api/reinforce';
  const props = defineProps({
    patch_id: {
      type: Number,
      required: true,
    },
    host_id: {
      type: String,
      required: true,
    },
  });

  //返回值结构体
  const reState = reactive<any>({
    //风险/攻击 全路径
    tags: [],
    //其他
    dataSource: {},
  });
  // 获取详情信息
  const getDetaiMsg = async () => {
    const { code, ...res } = await getSecDrawDetail({
      patch_id: props.patch_id,
      host_id: props.host_id,
    });
    if (!code) {
      reState.tags = [res.vul_type];
      //tabs信息
      reState.dataSource = {
        //危险等级
        vul_level: res.vul_level ?? 0,
        //风险描述
        description: res.description ?? '',
        //补丁名称
        title: res.title ?? '',
        //基本信息
        base_info: {
          //补丁编号
          patch_code: res.patch_code,
          //补丁发布时间
          public_date: res.public_date,
          //检测方式
          verify_type: res.verify_type,
          //参考信息
          ref_links: res.ref_links,
          //补丁获取链接
          acquire_links: res.acquire_links,
          //雷达
          cvss: res.cvss,
          //危险等级
          vul_level: res.vul_level ?? 0,
        },
        //影响应用
        effect_app: {
          //ip
          host_ip: res.host_ip,
          //apps
          apps: res.apps,
        },
        //修复建议
        suggestions: {
          //建议
          proposal: res.proposal,
          //修复命令
          repair_cmd: res.repair_cmd ?? '',
        },
      };
    }
  };
  getDetaiMsg();
</script>
