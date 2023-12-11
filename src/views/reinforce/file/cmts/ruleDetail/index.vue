<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2023-02-21 21:26:50
 * @LastEditTime: 2023-03-14 11:58:28
-->
<template>
  <div class="container">
    <!-- 弹窗头部 start -->
    <div class="head">
      <span class="title">{{ t('reinforce.rulede') }}</span>
      <a-button
        type="text"
        @click="editRule"
        v-permission="{
          name: 'editRule',
          showUsers: [USERTOKEN.admin, USERTOKEN.super],
        }"
      >
        <template #icon>
          <edit-outlined />
        </template>
        {{ t('common.edit') }}
      </a-button>
    </div>
    <!-- 弹窗头部 end -->

    <!-- 基本信息 start -->
    <div class="baseinfo">
      <danger-level :level="formData.alarm_level" />
      <div class="nameMark">
        <div class="name">{{ formData.rule_name }}</div>
        <div class="desc">{{ formData.desc }}</div>
      </div>
    </div>
    <!-- 基本信息 end -->

    <!-- 上报和拦截 start -->
    <div class="fileOp">
      <template v-for="item in fileOperation" :key="item.title">
        <div class="node">
          <div class="title">{{ item.title }}</div>
          <div class="tags">
            <span class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</span>
          </div>
        </div>
      </template>
    </div>
    <!-- 上报和拦截 end -->
    <div class="line"></div>

    <!-- 切换 start -->
    <switch-nodes v-model:actived="fType" class="swtnode" :types="dymicTab" />
    <!-- 切换 end -->
    <component
      :source="
        fType === 'file_url' ? formData.file_path.concat(formData.dir_path) : formData.proc_exclude
      "
      :is="fType === 'host' ? hostView : labelRow"
      :formData="formData"
      class="content"
    />
  </div>
</template>

<script setup lang="ts">
  import { useI18n } from 'vue-i18n';
  import { EditOutlined } from '@ant-design/icons-vue';
  import { dangerLevel } from '@/components/dangerLevel';
  import switchNodes from '@/components/switchNodes';
  import labelRow from './cmts/labelRow';
  import hostView from './cmts/hostView';
  import { PropType, reactive, ref, unref, watchEffect } from 'vue';
  import { E_File_Protect, I_Form_Data } from '../../views/ruleForm/cmts/form/type';
  import { getBlRuleDetail, getTableList } from '@/api/reinforce';
  import { getFileActionName } from '../../views/ruleForm/cmts/fileActions';
  import { USERTOKEN } from '@/store/modules/user/type';
  import { useRouter } from 'vue-router';
  import { E_Rule_Type } from '../../views/rule/type';
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    rule_type: {
      type: Number as PropType<E_Rule_Type>,
      required: true,
    },
  });
  const { t } = useI18n();
  const router = useRouter();
  //获取数据
  const formData = reactive<I_Form_Data>({
    rule_name: '', // 规则名称
    desc: '', // 规则备注
    file_path: [], // 文件路径
    dir_path: [], // 目录路径
    proc_exclude: [], // 忽略进程列表
    probes: [],
    alarm_level: undefined, // 告警等级: 1: 低; 2: 中; 3: 高
    apply_type: undefined, // 应用维度: 1: 全部主机; 2: 分组; 3: 主机
    host_group: '', // 分组ID列表
    host_list: [], // 主机mac列表
  });

  const getRuleDetail = async (id) => {
    const { code, ...res } = await getBlRuleDetail<{ id: number }>({ id });
    if (!code) {
      Object.assign(formData, res, {
        file_path: res.file_path ?? [],
        dir_path: res.dir_path ?? [],
        proc_exclude: res.proc_exclude ?? [],
        host_list: res.host_list ?? [],
      });
      getHostTotal(formData.apply_type, formData.host_group, formData.host_list);
    }
  };
  getRuleDetail(~~props.id);

  //获取主机数量
  const hostTotal = ref(0);
  const getHostTotal = async (apply_type, host_group, host_list) => {
    const { total } = await getTableList({
      filter: {
        apply_type,
        host_group,
        host_list,
      },
      page: {
        page_index: 1,
        page_size: 1,
      },
    });
    hostTotal.value = total;
  };

  const fileOperation = ref<any>([
    {
      title: t('reinforce.jsgjks'),
      tags: [],
    },
    {
      title: t('reinforce.ljsjg'),
      tags: [],
    },
  ]);
  watchEffect(() => {
    formData.probes.forEach(({ type, value }) => {
      if (value === E_File_Protect.Inject) {
        fileOperation.value[1].tags.push(getFileActionName(type, t));
      } else if (value === E_File_Protect.Report) {
        fileOperation.value[0].tags.push(getFileActionName(type, t));
      }
    });
  });
  const fType = ref<string>('file_url');
  const dymicTab = ref<any>([]);
  watchEffect(() => {
    dymicTab.value = [
      {
        title:
          t('arcomn.file_pathDraw') +
          ' ' +
          ((formData.file_path ? formData.file_path.length : 0) +
            (formData.dir_path ? formData.dir_path.length : 0)),
        type: 'file_url',
      },
      {
        title:
          t('reinforce.hljc') + ' ' + (formData.proc_exclude ? formData.proc_exclude?.length : 0),
        type: 'ignore_process',
      },
      {
        title: t('reinforce.zjfw') + ' ' + unref(hostTotal),
        type: 'host',
      },
    ];
  });

  //编辑
  const editRule = () => {
    router.push({
      name: 'reinforce-layout-file-form',
      query: { id: props.id, rule_type: props.rule_type },
    });
  };
</script>

<style scoped lang="less">
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .head {
      flex: 0 0 48px;
      padding-right: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: @fz16;
      font-weight: 600;
      color: #000000;
      padding: 0 40px 0 24px;
    }
    .baseinfo {
      padding: 16px 24px 24px;
      display: flex;
      .nameMark {
        .name {
          font-size: @fz14;
          font-weight: 600;
          /* 文字/黑0.85 */
          color: rgba(0, 0, 0, 0.8);
          margin-bottom: 12px;
        }
        .desc {
          font-size: @fz12;

          /* 文字/黑0.55 */
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .fileOp {
      display: flex;
      padding: 0 16px;

      .node {
        margin: 0 8px;
        flex: 1;
        border-radius: 12px;
        padding: 16px 24px;
        /* 系统层/白 #FA - BG */
        background: #fafafa;
        .title {
          font-size: @fz14;
          font-weight: 600;

          color: #000000;
        }
        .tags {
          .tag {
            padding: 4px 8px;
            /* 标准色/红/0.1 */
            background: rgba(247, 85, 85, 0.1);
            color: @danger-color;
            margin: 8px 4px 0 0;
            display: inline-block;
          }
        }
      }
    }
    .line {
      width: 100%;
      height: 1px;
      margin: 24px 0;
      background-color: #eee;
    }
    .swtnode {
      align-self: flex-start;
      border: none;
      padding: 0 24px;
      margin-bottom: 8px;
      :deep(.defaultS) {
        padding: 5px 16px;
      }
    }
  }
  .content {
    padding: 0 24px 24px 24px;
    max-height: 444px;
    overflow: auto;
  }
</style>
