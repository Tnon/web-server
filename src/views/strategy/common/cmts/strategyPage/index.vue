<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-09-06 14:26:05
 * @LastEditTime: 2023-01-12 11:40:35
-->
<template>
  <div class="pageTool">
    <!-- 新增策略 start -->
    <add-strategy
      v-model:selectedId="selectedIdCmp"
      v-model:isEditing="isEditingCmp"
      :strategyType="strategyType"
      :editOrSave="editOrSave"
      :getStrategyList="getStrategyList"
    />
    <!-- 新增策略 end -->
    <!-- 分割线 start -->
    <div class="line"></div>
    <!-- 分割线 end -->
    <!-- 分页数据 start -->
    <div
      class="dataContainer"
      ref="scrollRef"
      :class="{ isLeft, isRight, noSh: isLeft && isRight }"
    >
      <template
        v-for="{
          applied_group_count,
          id,
          name,
          create_user_name,
          create_user_id,
          create_at,
        } in dataSource"
        :key="id"
      >
        <a-popover overlayClassName="globalPopClass">
          <template #content>
            <!-- 创建人 start -->
            <div class="item">
              <span>{{ t('strategy.cjr') }}</span>
              <span>{{ create_user_name ?? '-' }}</span>
            </div>
            <!-- 创建人 end -->
            <!-- 创建时间 start -->
            <div class="item">
              <span>{{ t('strategy.cjsh') }}</span>
              <span>{{ create_at ?? '-' }}</span>
            </div>
            <!-- 创建时间 end -->
            <!-- 创建时间 start -->
            <div class="item">
              <span>{{ t('strategy.yyfzs') }}</span>
              <span>{{ applied_group_count ?? '-' }}</span>
            </div>
            <!-- 创建时间 end -->
          </template>
          <div
            class="node"
            :class="{
              actived: selectedId === id,
              normal: id !== globalID,
            }"
          >
            <div class="namenumber" @click="selectStrategy(id)">
              <div class="selfFlag" v-if="create_user_id === userId">{{ t('strategy.me') }}</div>
              <div class="name" :title="name">{{ name }}</div>
              <div class="number" v-if="applied_group_count">{{ applied_group_count }}</div>
            </div>
            <renameDelPop
              v-if="id !== globalID"
              class="reDelMore"
              v-model:selectedId="selectedIdCmp"
              v-model:isEditing="isEditingCmp"
              :globalID="globalID"
              :activedId="id"
              :activedName="name"
              :strategyType="strategyType"
              :refreshStrategyList="getStrategyList"
            />
          </div>
        </a-popover>
        <!-- 分割线 start -->
        <div class="line"></div>
        <!-- 分割线 end -->
      </template>
    </div>
    <!-- 分页数据 end -->
    <!-- 分割线 start -->
    <div class="line"></div>
    <!-- 分割线 end -->
    <!-- 分页 start -->
    <a-pagination
      v-model:current="pageOption.page_index"
      :defaultPageSize="pageOption.page_size"
      simple
      @change="getStrategyList"
      :total="totalNumber"
    />
    <!-- 分页 end -->
    <!-- 视图切换 start -->
    <switchView
      :strategyType="strategyType"
      :selectStrategy="selectStrategy"
      :getStrategyList="getStrategyList"
      :globalID="globalID"
      :pageOption="pageOption"
    />
    <!-- 视图切换 end -->
  </div>
</template>

<script setup lang="ts">
  import { PropType, ref, reactive, unref, watchEffect, computed, onMounted } from 'vue';
  import { StrategyType } from '@/views/strategy/common/types';
  import { getEditPageIndex, getSercuityList } from '@/api/strategy/safe';
  import addStrategy from './cmts/addStrategy';
  import switchView from './cmts/switchView';
  import renameDelPop from '@/views/strategy/common/cmts/renameDelPop';
  import { useScrollLeftRight } from '.';
  import { useI18n } from 'vue-i18n';
  import { useEditing } from '@/views/strategy/common/hooks/useEditing';
  import { onBeforeRouteLeave } from 'vue-router';
  import { useRoute } from 'vue-router';
  import { useUserToken } from '@/store/modules/user';
  const props = defineProps({
    globalID: {
      type: Number,
      required: true,
    },
    selectedId: {
      type: Number,
      required: true,
    },
    selectedName: {
      type: String,
      required: true,
    },
    strategyType: {
      type: Number as PropType<StrategyType>,
      required: true,
    },
    isEditing: {
      type: Boolean,
      required: true,
    },
    editOrSave: {
      type: Function,
      required: true,
    },
  });
  const { t } = useI18n();
  // 当前用户登录的id
  const userTokenStore = useUserToken();
  const userId = computed(() => userTokenStore.user_info.id);
  const emit = defineEmits(['update:selectedId', 'update:selectedName', 'update:isEditing']);
  //选择策略id中介
  const selectedIdCmp = computed({
    get: () => props.selectedId,
    set: (v) => emit('update:selectedId', v),
  });
  //编辑状态中介
  const isEditingCmp = computed({
    get: () => props.isEditing,
    set: (v) => emit('update:isEditing', v),
  });
  //滚动的区域
  const scrollRef = ref<any>('');
  //hooks获取位置
  const { isLeft, isRight } = useScrollLeftRight(scrollRef);
  //策略列表
  const dataSource = ref<any>([]);
  //策略总数
  const totalNumber = ref<number>(0);
  //当前页
  const pageOption = reactive({
    page_index: 1,
    page_size: 20,
  });
  // 根据策略id找出策略名
  watchEffect(() => {
    const selectedStrategy = unref(dataSource).find((ele) => ele.id === props.selectedId);
    selectedStrategy && emit('update:selectedName', selectedStrategy.name);
  });
  //获取策略列表
  const getStrategyList = async (keepPage: boolean = false) => {
    const { items, total } = await getSercuityList({
      filter: { policy_type: props.strategyType },
      page: keepPage ? pageOption : Object.assign(pageOption, { page_index: 1 }),
    } as any);
    dataSource.value = items;
    totalNumber.value = total;
  };

  //选择策略
  const selectStrategy = (id, keepEditing = false) => {
    //策略切换，提示
    if (props.isEditing) {
      useEditing(
        () => {
          //不保存，直接更改
          emit('update:selectedId', id);
          //恢复不可编辑状态
          emit('update:isEditing', false);
        },
        async () => {
          //先保存
          await props.editOrSave();
          //后更改
          emit('update:selectedId', id);
          //是否可编辑状态
          emit('update:isEditing', keepEditing);
        },
        t,
      );
    } else {
      //选择调整的策略
      emit('update:selectedId', id);
      //是否可编辑状态
      emit('update:isEditing', keepEditing);
    }
  };
  // 页面离开 未保存 判断
  onBeforeRouteLeave((to, from, next) => {
    if (props.isEditing) {
      useEditing(
        () => {
          next();
        },
        async () => {
          //先保存
          await props.editOrSave();
          next();
        },
        t,
      );
    } else {
      next();
    }
  });
  getStrategyList();

  //从维护模块-分组主机-策略查看跳转
  const {
    query: { selectedId: outerSelectedId },
  } = useRoute() as any;
  onMounted(async () => {
    //外部传了策略id，请求当前策略在第几页，并选中该策略
    if (outerSelectedId) {
      //查询策略详情
      selectStrategy(~~outerSelectedId);
      const { page_index } = await getEditPageIndex({
        id: ~~outerSelectedId,
        page_size: pageOption.page_size,
        policy_type: props.strategyType,
      });
      pageOption.page_index = page_index;
      //跳转到当前页码
      getStrategyList(true);
    } else {
      //如果外部没有策略，直接普通请求
      getStrategyList();
    }
  });
  defineExpose({ refreshStrategyList: getStrategyList });
</script>

<style scoped lang="less">
  .pageTool {
    height: 48px;
    display: flex;
    background: #fff;
    padding: 8px 16px;
    align-items: center;

    .line {
      flex: 1px 0 0;
      height: 16px;
      background: #eeeeee;
      margin: 0 4px;
      &:last-child {
        display: none;
      }
    }
    .dataContainer {
      display: flex;
      align-items: center;
      flex: 1;
      overflow: auto;
      box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 10%), inset -10px 0 8px -8px rgb(0 0 0 / 10%);
      transition: all 0.3s;
      &::-webkit-scrollbar {
        display: none;
      }
      -ms-overflow-style: none; /* IE 11 */
      scrollbar-width: none; /* Firefox 64 */
      .formitem {
        display: flex;
        align-items: center;
        margin: 8px 0;
      }
      .node {
        display: inline-flex;
        cursor: pointer;
        // padding: 6px 16px;
        // padding-right: 16px;
        border-radius: 6px;
        align-items: center;
        transition: all 0.5s;
        position: relative;
        &:hover {
          .name,
          .number {
            color: #000;
          }
          :deep(.reDelMore) {
            transform: scale(1);
          }
        }

        :deep(.reDelMore) {
          transition: all 0.3s;
          transform: scale(0);
          position: absolute;
          right: 5px;
        }
        .namenumber {
          display: flex;
          align-items: center;
          padding: 6px 16px;
          .name {
            font-size: @fz12;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.7);
            line-height: 20px;
            // margin-right: 8px;
            white-space: nowrap;
            transition: all 0.3s;
            max-width: 200px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .number {
            font-size: @fz12;
            font-weight: 400;
            color: rgba(0, 0, 0, 0.4);
            line-height: 20px;
            transition: all 0.3s;
            margin-left: 8px;
          }
          .selfFlag {
            padding: 0 2px;
            color: #fff;
            background-color: @primary-color;
            border-radius: 4px;
            margin-right: 2px;
          }
        }
      }
      .normal {
        &:hover {
          padding-right: 16px;
        }
      }
      .actived {
        background: rgba(0, 0, 0, 0.08);
      }
    }
    .isLeft {
      box-shadow: inset -10px 0 8px -8px rgb(0 0 0 / 10%);
    }
    .isRight {
      box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 10%);
    }
    .noSh {
      box-shadow: none;
    }
  }
</style>
