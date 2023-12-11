<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-06 10:48:41
 * @LastEditTime: 2023-02-23 20:42:22
-->
<template>
  <div class="container">
    <!-- 策略分页器 start -->
    <strategy-page
      ref="strategyPageRef"
      v-model:selectedId="selectedId"
      v-model:selectedName="selectedName"
      v-model:isEditing="isEditing"
      :globalID="globalID"
      :strategyType="strategyType"
      :editOrSave="editOrSave"
    />
    <!-- 策略分页器 end -->
    <div class="strategyContainer">
      <!-- 策略头部 start -->
      <strategy-head
        v-model:selectedId="selectedId"
        v-model:isEditing="isEditing"
        :globalID="globalID"
        :selectedName="selectedName"
        :strategyType="strategyType"
        :refreshStrategyList="refreshStrategyList"
      >
        <template #default>
          <!-- 策略保存 start -->
          <a-button type="primary" class="editBtn" :loading="saveLoading" @click="editOrSave">
            {{ isEditing ? t('strategy.saveapp') : t('strategy.editStra') }}
          </a-button>
          <!-- 策略保存 end -->
          <!-- 策略取消保存 start -->
          <a-button v-if="isEditing" class="editBtn" @click="cancleSaveData">
            {{ t('common.cancle') }}
          </a-button>
          <!-- 策略取消保存 end -->
        </template>
      </strategy-head>
      <!-- 策略头部 end -->

      <!-- 策略详情 start -->
      <strategy-detail
        v-if="selectedId"
        v-model:isViewSelfPolicy="isViewSelfPolicy"
        :isEditing="isEditing"
        :selectedId="selectedId"
        :strategyType="strategyType"
        ref="strategyFormDetails"
      />

      <!-- 策略详情 end -->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { StrategyType } from '@/views/strategy/common/types';
  import strategyPage from '@/views/strategy/common/cmts/strategyPage';
  import strategyHead from '@/views/strategy/common/cmts/strategyHead';
  import strategyDetail from '@/views/strategy/common/cmts/strategyDetail';
  import { getSercuityList, saveSafeStrategy } from '@/api/strategy/safe';
  import { message } from 'ant-design-vue';
  import { useRoute } from 'vue-router';
  import { useModal } from '@/hooks';
  import addModal from '../common/cmts/addModal';
  const { t } = useI18n();
  // 是否正在浏览自己的策略
  const isViewSelfPolicy = ref<boolean>(false);
  //全局默认策略的id
  const globalID = ref<number>(0);
  //选中的策略id
  const selectedId = ref<number>(0);
  //选中的策略的名字(根据id自动找)
  const selectedName = ref<string>('');
  //策略类型
  const strategyType = ref<StrategyType>(StrategyType.Safe);
  //分页组件
  const strategyPageRef = ref<any>();
  //刷新策略列表的方法
  const refreshStrategyList = () => {
    unref(strategyPageRef).refreshStrategyList();
  };
  //策略详情
  const strategyFormDetails = ref<any>();
  //是否是编辑状态
  const isEditing = ref<boolean>(false);
  //保存策略或者编辑策略
  const saveLoading = ref<boolean>(false);
  //保存策略或者编辑策略
  const editOrSave = async () => {
    if (unref(isEditing)) {
      //有点虎逼，先用
      if (document.getElementsByClassName('errortips').length) {
        //多选未选
        message.error(
          t('strategy.zsyx', [
            document.getElementsByClassName('errortips')[0].getAttribute('label'),
          ]),
        );
      } else if (document.getElementsByClassName('errortipsBtn').length) {
        //未自定义配置
        message.error(
          t('strategy.wzdypz', [
            document.getElementsByClassName('errortipsBtn')[0].getAttribute('label'),
          ]),
        );
      } else {
        //如果修改非自己的策略
        if (!isViewSelfPolicy.value) {
          useModal(
            {
              title: t('strategy.piptnna'),
              contentProps: {
                fields: reactive({}),
              },
              handleOk: async (conRef) => {
                await unref(conRef.formRef).validate();
                const name = unref(conRef).fields.name;
                saveLoading.value = true;
                const pkg = {
                  policy_type: unref(strategyType),
                  id: unref(selectedId),
                  nodes: unref(strategyFormDetails).strategyData,
                  name,
                };
                const { code } = await saveSafeStrategy({
                  pkg,
                  groups: unref(strategyFormDetails).applyedGroups.length
                    ? unref(strategyFormDetails).applyedGroups.join(',')
                    : '',
                });
                if (!code) {
                  unref(strategyFormDetails).backUpLastedData(pkg);
                }
                // const switchs: any = [];
                // unref(strategyFormDetails).applyedGroups.forEach((group_id) => {
                //   switchs.push({ group_id, policy_id: id });
                // });
                // await saveSafeStrategyGroups({
                //   policy_type: unref(strategyType),
                //   switch: switchs,
                // });
                refreshStrategyAndTree();
              },
            },
            addModal,
          );
        } else {
          saveLoading.value = true;
          const pkg = {
            policy_type: unref(strategyType),
            id: unref(selectedId),
            nodes: unref(strategyFormDetails).strategyData,
            name: unref(selectedName),
          };
          const { code } = await saveSafeStrategy({
            pkg,
            groups: unref(strategyFormDetails).applyedGroups.length
              ? unref(strategyFormDetails).applyedGroups.join(',')
              : '',
          });
          if (!code) {
            unref(strategyFormDetails).backUpLastedData(pkg);
          }

          refreshStrategyAndTree();
        }
      }
    } else {
      isEditing.value = !isEditing.value;
    }
  };
  //保存修改策略 刷新策略列表，分组树
  const refreshStrategyAndTree = () => {
    //刷新策略列表
    refreshStrategyList();
    //刷新树主机组树
    unref(unref(strategyFormDetails).applyHostGroupRef).refreshTreeData();
    //刷新树业务组树
    unref(unref(strategyFormDetails).applyBusinessGroupRef).refreshTreeData();
    saveLoading.value = false;
    isEditing.value = !isEditing.value;
  };
  //取消编辑
  const cancleSaveData = () => {
    isEditing.value = false;
    unref(strategyFormDetails).BackStrategyData();
    unref(unref(strategyFormDetails).applyHostGroupRef).backTreeData();
    unref(unref(strategyFormDetails).applyBusinessGroupRef).backTreeData();
  };
  //从维护模块-分组主机-策略查看跳转
  const {
    query: { selectedId: outerSelectedId },
  } = useRoute() as any;
  //获取策略列表
  const getStrategyList = async () => {
    const { items } = await getSercuityList({
      filter: { policy_type: unref(strategyType) },
      page: { page_size: 1, page_index: 1 },
    } as any);
    selectedId.value = items[0]?.id;
    globalID.value = items[0]?.id;
  };
  //如果外部传了策略id，这里不需要请求全局策略id
  !outerSelectedId && getStrategyList();
</script>

<style scoped lang="less">
  .container {
    .strategyContainer {
      margin: 8px;
      background: #ffffff;
      border-radius: 8px;
    }
    .editBtn {
      margin-left: 12px;
    }
  }
</style>
