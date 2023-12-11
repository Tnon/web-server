<!--
 * @Author: dailuxin
 * @LastEditors: Delevin.TnT
 * @Date: 2022-10-20 11:40:31
 * @LastEditTime: 2023-08-24 11:18:43
-->
<template>
  <div class="right">
    <a-spin :spinning="loading">
      <!-- 邮件格式 start -->
      <template v-if="selectedCardCategory === ReportType.Email">
        <div class="imgCon">
          <div class="header">
            <LeftOutlined class="backIcon" @click="initIndex()" />
            <div class="text">
              <CheckCircleFilled class="checkIcon" />
              <span>{{ t('report.mfjgs') }}</span>
            </div>
          </div>
          <img class="emailreport" :src="emailReport" alt="" />
        </div>
      </template>
      <!-- 邮件格式 end -->
      <!-- word格式 start -->
      <template v-else>
        <!-- 模板被使用的提示 start -->
        <div class="warning" v-if="ableOperate">
          <div>{{ t('report.templateWarning') }}</div>
          <div class="viewButton" @click="comeViewTask(selectedCardId)">
            {{ t('report.comeView') }}<RightOutlined class="comeIcon" />
          </div>
        </div>
        <!-- 模板被使用的提示 end -->

        <div class="main">
          <div class="viewMod" v-if="isViewMode">
            <template v-if="selectedCardId !== undefined">
              <div class="viewHead">
                <!-- 模版名称 start -->
                <div class="title">{{ formState.title }}</div>
                <!-- 模版名称 end -->

                <div class="tool">
                  <!-- 删除 start -->
                  <a-button class="delIcon" type="text" @click="delTemplate">
                    <template #icon>
                      <delete-outlined />
                    </template>
                  </a-button>
                  <!-- 删除 end -->

                  <!-- 编辑 start -->
                  <a-button class="smallbtn" :disabled="ableOperate" @click="edit">
                    {{ t('common.edit') }}
                  </a-button>
                  <!-- 编辑 end -->
                </div>
              </div>
              <!-- 描述 start -->
              <div class="viewDesc">{{ formState.desc_info }}</div>
              <!-- 描述 end -->

              <!-- 更新时间 start -->
              <div class="viewUpdate">{{ t('report.zx') }}{{ formState.update_at }}</div>
              <!-- 更新时间 end -->
            </template>
            <template v-else>
              <addTemplate :initData="initData" :isHasXunjian="isHasXunjian" />
            </template>
          </div>
          <div class="header" v-else>
            <!-- 标题 start -->
            <span class="title" @click="cancle">
              <left-outlined class="icoc" />
              {{ selectedCardId ? t('report.reportTemplateEdit') : t('report.reportTemplateAdd') }}
            </span>
            <!-- 标题 end -->
            <div class="tools">
              <!-- 取消按钮 start -->
              <a-button class="cancleButton smallbtn" @click="cancle">
                {{ t('common.cancle') }}
              </a-button>
              <!-- 取消按钮 end -->
              <!-- 保存按钮 start -->
              <a-button
                type="primary"
                class="saveButton smallbtn"
                :disabled="ableOperate"
                :loading="savaLoading"
                @click="createAndUpdate"
              >
                {{ t('common.save') }}
              </a-button>
              <!-- 保存按钮 end -->
            </div>
          </div>

          <a-form
            class="templateForm"
            ref="formRef"
            layout="vertical"
            autocomplete="off"
            :model="formState"
          >
            <div class="itemRow" v-if="!isViewMode">
              <a-form-item
                name="title"
                :rules="[
                  {
                    required: true,
                    message: t('report.templateNamePlhder'),
                  },
                  {
                    validator: ValidateModuleName,
                    message: t('report.templateValida'),
                  },
                ]"
              >
                <template #label>
                  <div class="label">{{ t('report.templateName') }}</div>
                </template>
                <a-input
                  v-model:value="formState.title"
                  :placeholder="t('report.templateNamePlhder')"
                  :disabled="ableOperate"
                  class="mbName"
                />
              </a-form-item>
              <a-form-item
                name="desc_info"
                class="descItem"
                :rules="[
                  {
                    validator: ValidateModuleName,
                    message: t('report.templateValida'),
                  },
                ]"
              >
                <template #label>
                  <div class="label">{{ t('report.description') }}</div>
                </template>
                <a-input
                  v-model:value="formState.desc_info"
                  :placeholder="t('report.templateDescPlhder')"
                  :disabled="ableOperate"
                  class="mbDesc"
                />
              </a-form-item>
            </div>

            <!-- 模板配置折叠面板 start -->
            <a-form-item
              name="checkList"
              :rules="[{ required: true, message: t('report.limitone') }]"
              class="checkCollapse"
            >
              <check-collapse
                :isViewMode="isViewMode"
                :formRef="formRef"
                v-model:checkList="formState.checkList"
              />
            </a-form-item>

            <!-- 模板配置折叠面板 end -->
          </a-form>
        </div>
      </template>
      <!-- word格式 end -->
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
  import { computed, createVNode, PropType, reactive, ref, watch } from 'vue';
  import { useI18n } from 'vue-i18n';
  import {
    RightOutlined,
    LeftOutlined,
    DeleteOutlined,
    CheckCircleFilled,
  } from '@ant-design/icons-vue';
  import {
    createTemplateRequest,
    deleteTemplateApi,
    updateTemplateRequest,
  } from '@/api/report/index';
  import { TaskFilter } from '@/api/report/model';
  import { TemplateStatus, TaskStatus, ReportType } from '@/enums/reportType';
  import { message, type FormInstance } from 'ant-design-vue';
  import checkCollapse from './cmts/checkCollapse';
  import { ValidateModuleName } from '@/utils/reg';
  import emailReport from '@/assets/images/email_report.png';
  import addTemplate from './cmts/addTemplate';
  import { useModal } from '@/hooks';
  const props = defineProps({
    selectedCardId: {
      type: Number,
    },
    selectedCardCategory: {
      type: Number as PropType<ReportType>,
    },
    refeshFunc: {
      type: Function as PropType<(loading?: boolean) => any>,
      required: true,
    },
    closeModal: {
      type: Function,
      required: true,
    },
    filter: {
      type: Object as PropType<TaskFilter>,
      required: true,
    },
    isViewMode: {
      type: Boolean,
      required: true,
    },
    initData: {
      type: Function,
      required: true,
    },
    isHasXunjian: {
      type: Boolean,
      required: true,
    },
    initIndex: {
      type: Function,
      required: true,
    },
  });
  //派发
  const emit = defineEmits(['update:selectedCardId', 'update:isViewMode']);
  const { t } = useI18n();
  const savaLoading = ref(false);
  const formRef = ref<FormInstance>();
  const loading = ref(false);
  //表单数据结构体
  const formState = reactive({
    id: undefined, // 选择的模板的id
    title: '',
    desc_info: '',
    status: TemplateStatus.DeleteUpdate,
    checkList: [],
    update_at: '',
  });
  //编辑取消时候，恢复缓存
  const formStateCache = reactive({
    id: undefined, // 选择的模板的id
    title: '',
    desc_info: '',
    status: TemplateStatus.DeleteUpdate,
    checkList: [],
    update_at: '',
  });
  //是否执行中
  const ableOperate = computed(() => formState.status === TemplateStatus.AllLimit);
  //监听选择的卡片id
  watch(
    () => props.selectedCardId,
    async (n) => {
      if (props.selectedCardCategory === ReportType.Email) {
      } else {
        loading.value = true;
        formRef.value?.resetFields();
        //未选择
        if (n === undefined) {
          initFormData();
          loading.value = false;
        } else {
          //选择了
          const { items } = await props.refeshFunc(false);
          const selectedCard = items.find((ele) => ele.id === props.selectedCardId);
          loading.value = false;
          Object.assign(formState, {
            title: selectedCard.title,
            desc_info: selectedCard.desc_info,
            id: selectedCard.id,
            status: selectedCard.status,
            checkList: selectedCard.checkList ? selectedCard.checkList.split(',') : [],
            update_at: selectedCard.update_at,
          });
          Object.assign(formStateCache, formState);
        }
      }
    },
  );
  const initFormData = () => {
    Object.assign(formState, {
      id: undefined,
      title: '',
      desc_info: '',
      status: TemplateStatus.DeleteUpdate,
      checkList: [],
      update_at: '',
    });
  };
  // 保存或修改接口
  const createAndUpdate = () => {
    savaLoading.value = true;
    // 有id,说明是修改；没id，说明是新建
    formRef
      .value!.validateFields()
      .then(async () => {
        savaLoading.value = false;
        //修改
        if (formState.id !== undefined) {
          const { code } = await updateTemplateRequest(
            Object.assign({}, formState, { checkList: formState.checkList.join(',') }),
          );
          if (!code) {
            props.refeshFunc(true);
            emit('update:selectedCardId', formState.id);
            emit('update:isViewMode', true);
            Object.assign(formStateCache, formState);
          }
        } else {
          //新增
          const { code, id } = await createTemplateRequest(
            Object.assign({}, formState, { checkList: formState.checkList.join(',') }),
          );
          if (!code) {
            formState.id = id;
            props.refeshFunc(true);
            emit('update:selectedCardId', formState.id);
            emit('update:isViewMode', true);
          }
        }
      })
      .catch(() => {
        savaLoading.value = false;
        return;
      });
  };
  const cancle = () => {
    emit('update:isViewMode', true);
    formRef.value?.resetFields();
    // emit('update:selectedCardId', undefined);
    if (props.selectedCardId !== undefined) {
      Object.assign(formState, formStateCache);
    } else {
      initFormData();
    }
  };
  const edit = () => {
    emit('update:isViewMode', false);
  };
  //删除
  const delTemplate = async () => {
    if (formState.status === TemplateStatus.DeleteUpdate) {
      useModal(
        {
          title: t('report.templateDeleteTip', [formState.title]),
          handleOk: async () => {
            // 删除模板
            await deleteTemplateApi(props.selectedCardId + '');
            props.refeshFunc(true);
            props.initData();
            emit('update:isViewMode', true);
          },
        },
        createVNode('span'),
      );
    } else {
      message.error(t('report.templateUnableDeleteTip'));
    }
  };
  // 查看任务
  const comeViewTask = (id) => {
    props.closeModal();
    props.filter.status = TaskStatus.executing;
    props.filter.report_template_id = id;
    // 其他搜索条件置空
    props.filter.title = '';
    props.filter.type = undefined;
    props.filter.start_time = undefined;
    props.filter.end_time = undefined;
  };
</script>
<style lang="less" scoped>
  .imgCon {
    text-align: center;
    padding: 16px;
    .header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      .backIcon {
        font-size: 20px;
        cursor: pointer;
        margin-right: 100px;
      }
      .text {
        display: flex;
        align-items: center;
        .checkIcon {
          color: @primary-color;
          margin-right: 8px;
        }
      }
    }
    .emailreport {
      width: 600px;
    }
  }

  .right {
    width: 65%;
  }
  .warning {
    height: 32px;
    font-size: @fz12;
    font-weight: 400;
    color: #18ba79;
    background: rgba(24, 186, 121, 0.1);
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .viewButton {
      cursor: pointer;
    }
  }

  .main {
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      margin-bottom: 12px;
      .title {
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        cursor: pointer;
        .icoc {
          margin-right: 8px;
        }
      }
    }
    .templateForm {
      padding: 0 16px;
      .itemRow {
        display: flex;
        align-items: center;
        .label {
          font-size: @fz13;
          font-weight: 600;
          color: rgba(0, 0, 0, 0.8);
        }
        .mbName {
          width: 250px;
        }
        .descItem {
          flex: 1;
          margin-left: 16px;
        }
      }
      :deep(.ant-input) {
        border-radius: 8px;
      }
      .checkCollapse {
        border-top: 1px solid rgba(0, 0, 0, 0.04);
        :deep(.ant-form-item-control) {
          max-width: 100%;
        }
        :deep(.ant-collapse-item) {
          border-bottom: 1px solid rgba(0, 0, 0, 0.04);
        }
      }
    }
  }
  .cancleButton {
    margin-right: 8px;
  }
  .smallbtn {
    padding: 4px 10px;
    border-radius: 4px;
  }
  .viewMod {
    padding: 16px;
    .viewHead {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: @fz16;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 8px;
      }
      .tool {
        display: flex;
        align-items: center;
        .delIcon {
          margin-right: 12px;
        }
      }
    }
    .viewDesc {
      font-size: @fz13;
      color: rgba(0, 0, 0, 0.6);
      margin-bottom: 16px;
    }
    .viewUpdate {
      font-size: @fz12;
      color: rgba(0, 0, 0, 0.4);
    }
  }
</style>
