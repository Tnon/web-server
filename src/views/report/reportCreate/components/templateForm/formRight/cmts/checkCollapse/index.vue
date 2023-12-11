<!--
 * @Author: Delevin.TnT
 * @LastEditors: Delevin.TnT
 * @Date: 2022-11-08 17:17:44
 * @LastEditTime: 2023-08-24 10:39:59
-->
<template>
  <div class="allMoudle">
    <a-collapse :bordered="false" expandIconPosition="end" v-model:activeKey="activeKey">
      <template v-for="(item, key) in checkConfigs" :key="key">
        <template v-if="acdr_enabled || key !== 'acdrAll'">
          <!-- 查看模式 start -->
          <template v-if="isViewMode">
            <a-collapse-panel :key="key" v-if="checkedAllCmp[key].length">
              <template #header>
                <span class="colTitle">{{ item.title }}</span>
              </template>
              <a-checkbox-group class="groups">
                <div class="checkgroup">
                  <template v-for="box in item.children" :key="box.value">
                    <template v-if="checkedAllCmp[key].includes(box.value)">
                      <div class="moduleItem">
                        <img
                          class="itemImg"
                          :src="checkedAllCmp[key].includes(box.value) ? box.imgSelected : box.img"
                          :alt="box.label"
                        />

                        <div class="itemLabel itemLabelView">
                          {{ box.label }}
                        </div>
                      </div>
                    </template>
                  </template>
                </div>
              </a-checkbox-group>
            </a-collapse-panel>
          </template>
          <!-- 查看模式 end -->

          <!-- 编辑模式 start -->
          <template v-else>
            <a-collapse-panel :key="key">
              <!-- 头部 start -->
              <template #header>
                <div @click.stop>
                  <!-- 全选 start -->
                  <a-checkbox
                    :indeterminate="
                      !!(
                        checkedAllCmp[key].length &&
                        checkedAllCmp[key].length !== item.children.length
                      )
                    "
                    :checked="checkedAllCmp[key].length === item.children.length"
                    @change="onCheckAllChange($event, key, item.children)"
                  >
                    {{ item.title }}
                  </a-checkbox>

                  <!-- 全选 end -->
                </div>
              </template>
              <!-- 头部 end -->
              <!-- 多选 start -->
              <a-checkbox-group
                :value="checkedAllCmp[key]"
                @change="changeCheck($event, key)"
                class="groups"
              >
                <div class="checkgroup">
                  <template v-for="box in item.children" :key="box.value">
                    <div class="moduleItem">
                      <img
                        class="itemImg"
                        :src="checkedAllCmp[key].includes(box.value) ? box.imgSelected : box.img"
                        :alt="box.label"
                        @click="imgSelectedMe(key, box.value)"
                      />
                      <a-checkbox class="itemLabel" :value="box.value">
                        {{ box.label }}
                      </a-checkbox>
                    </div>
                  </template>
                </div>
              </a-checkbox-group>
              <!-- 多选 end -->
            </a-collapse-panel>
          </template>
          <!-- 编辑模式 end -->
        </template>
      </template>
    </a-collapse>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, unref, watchEffect } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getTemplateConfig } from '.';
  // 自定义组件
  import { Form } from 'ant-design-vue';
  import { useProductLogo } from '@/store/modules/product-logo';
  const props = defineProps({
    checkList: {
      type: Array,
      required: true,
    },
    formRef: Object,
    isViewMode: {
      type: Boolean,
      required: true,
    },
  });
  const activeKey = ref(['agentAll', 'assetAll', 'vultyAll', 'alertAll', 'acdrAll']);
  const productLogoStore = useProductLogo();
  const acdr_enabled = computed(() => productLogoStore.acdr_enabled);
  const { t } = useI18n();
  const emit = defineEmits(['update:checkList']);
  //防止多个校验
  const formItemContext = Form.useInjectFormItemContext();
  //check配置
  const checkConfigs = getTemplateConfig(t);
  //根据外部传值，初始化
  const checkedAllCmp = ref({});
  //手动更新外部
  const updateCheckList = () => {
    const extra: any = [];
    for (let k in unref(checkedAllCmp)) {
      checkedAllCmp.value[k].forEach((ele) => {
        extra.push(ele);
      });
    }
    emit('update:checkList', extra);
    unref(props.formRef!).validate('checkList');
  };
  watchEffect(() => {
    const extraObj = {};
    for (let k in checkConfigs) {
      extraObj[k] = [];
      checkConfigs[k].children.forEach((ele) => {
        if (props.checkList.includes(ele.value)) {
          extraObj[k].push(ele.value);
        }
      });
    }
    checkedAllCmp.value = extraObj;
  });
  //多选框选择的事件
  const changeCheck = (value, k) => {
    checkedAllCmp.value[k] = value;
    updateCheckList();
  };
  //全选
  const onCheckAllChange = (e, k, children) => {
    const checked = e.target.checked;
    if (checked) {
      const extra: any = [];
      children.forEach((ele) => {
        extra.push(ele.value);
      });
      checkedAllCmp.value[k] = extra;
    } else {
      checkedAllCmp.value[k] = [];
    }
    updateCheckList();
  };
  //点击图片选择
  const imgSelectedMe = (key, value) => {
    checkedAllCmp.value[key].includes(value)
      ? checkedAllCmp.value[key].splice(checkedAllCmp.value[key].indexOf(value), 1)
      : checkedAllCmp.value[key].push(value);
    updateCheckList();
  };
  defineExpose({ formItemContext });
</script>

<style scoped lang="less">
  .allMoudle {
    max-height: 570px;
    overflow: auto;
    :deep(.ant-collapse-borderless) {
      background-color: #fff;
    }
    :deep(.ant-collapse-content-box) {
      padding: 0;
    }
    :deep(.ant-collapse-header) {
      padding: 16px 0;
    }
  }
  .groups {
    width: 100%;
  }
  .checkgroup {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .moduleItem {
      flex-direction: column;
      justify-content: center;
      margin-right: 16px;
      margin-bottom: 16px;
      flex: calc(25% - 16px) 0 0;
      display: flex;
      .itemImg {
        width: 100%;
        cursor: pointer;
      }
      .itemLabel {
        margin-top: 8px;
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
      }
    }
  }
  .colTitle {
    font-size: @fz12;
    color: rgba(0, 0, 0, 0.5);
  }
  .itemLabelView {
    font-weight: 600;
  }
</style>
