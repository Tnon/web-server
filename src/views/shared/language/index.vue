<template>
  <div class="containerl">
    <div class="header">
      <switchNodes v-model:actived="currentPage" :types="currentPageItems" />
    </div>
    <div class="content">
      <div>
        <template v-for="(item, key) in languagePkg[zh][currentPage]" :key="key">
          <div class="node">
            <span class="label">{{ key }}</span>
            <span class="value" @click="changeValue(key, item, zh)">{{ item }}</span>
            <span
              class="value"
              :class="{ novalue: !languagePkg[en][currentPage][key] }"
              @click="changeValue(key, languagePkg[en][currentPage][key], en)"
            >
              {{ languagePkg[en][currentPage][key] }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { languagePkg } from '@/i18n';
  import switchNodes from '@/components/switchNodes';
  import { reactive, ref, unref } from 'vue';
  import { useModal } from '@/hooks';
  import slotsForm from '@/components/slots-form';
  import { changeFile } from '@/api/user';
  //语言包类型
  const [zh, en] = Object.keys(languagePkg);
  //二级
  const pagesTypes = languagePkg[zh];
  //当前选择的页面
  const currentPage = ref(Object.keys(pagesTypes)[0]);
  //所有的
  const currentPageItems = Object.keys(pagesTypes).map((type) => ({
    title: type,
    type,
  }));

  //改变
  const changeValue = (title, value, lang) => {
    useModal(
      {
        title: lang === 'zh-CN' ? '修改中文信息' : '修改英文信息',
        contentProps: {
          fields: reactive({ value }),
          colsMap: [
            {
              title,
              width: 150,
              dataIndex: 'value',
              formProps: {
                type: 'input',
                placeholder: '请输入新的文案',
                rules: [
                  {
                    message: '新的文案不能为空',
                    required: true,
                  },
                ],
              },
            },
          ],
        },
        handleOk: async (conRef) => {
          try {
            await unref(conRef).validate();
            // languagePkg[lang][currentPage.value][title] = conRef.fields.value;
            const sendObj = languagePkg[lang][currentPage.value];
            sendObj[title] = conRef.fields.value;
            await changeFile({
              content: sendObj,
              currentLan: lang,
              currentPage: currentPage.value,
            });
          } catch {
            return Promise.reject('');
          }
        },
      },
      slotsForm,
    );
  };
</script>

<style lang="less" scoped>
  .containerl {
    height: calc(100vh - 40px);
    overflow: auto;
    padding: 20px;
    .header {
      display: flex;
      padding: 20px 0;
      justify-content: center;
      align-items: center;
    }
    .content {
      .node {
        display: flex;
        padding: 10px 0;
        align-items: center;
        cursor: pointer;
        &:hover {
          .clickIcon {
            display: block;
          }
        }
        .label {
          width: 200px;
        }
        .value {
          min-width: 300px;
          flex: 1;
          border: 1px solid #eee;
          padding: 0px 10px;
          margin-right: 20px;
          min-height: 35px;
          display: flex;
          align-items: center;
        }
        .novalue {
          border-color: red;
        }
      }
    }
  }
</style>
