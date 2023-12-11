<template>
  <div class="box">
    <!-- 头像 start -->
    <div class="avatar">
      <a-avatar class="avatarCOn" :src="userInfo.head_image">
        <template #icon>
          <showAvatar :name="userInfo.name!" />
        </template>
      </a-avatar>
      <div>
        <div class="name">{{ userInfo.name }}</div>
        <div class="email">{{ userInfo.email }}</div>
        <div class="role">
          {{ getRoleName(userInfo.u_type!, t) }}
        </div>
      </div>
    </div>
    <!-- 头像 end -->

    <!-- licenst start -->
    <licenseFile @closePop="closePop" />
    <!-- licenst end -->

    <!-- bar start -->
    <a-menu v-model:selectedKeys="state.selectedKeys" mode="vertical" class="avaMenus">
      <div class="ant-menu-item" v-if="hasPerimission('avatar')">
        <slot></slot>
      </div>
      <a-sub-menu key="sub2" class="test">
        <template #title>{{ t('avatar.swtMode') }}</template>
        <div
          class="ant-menu-item"
          :class="{ actived: THEME === CustomTheme.LIGHT }"
          @click="themeChange(CustomTheme.LIGHT)"
        >
          {{ t('avatar.whiTheme') }}
        </div>
        <div
          class="ant-menu-item"
          :class="{ actived: THEME === CustomTheme.DARK }"
          @click="themeChange(CustomTheme.DARK)"
        >
          {{ t('avatar.blaTheme') }}
        </div>
      </a-sub-menu>
    </a-menu>
    <!-- bar end -->

    <!-- 离线时间 start -->
    <div class="offTime"> {{ t('avatar.lastLogo') }}{{ userInfo.last_logout_at }} </div>
    <!-- 离线时间 end -->
    <!-- 退出登录 start -->
    <div class="logout" @click="logout">{{ t('avatar.logOut') }}</div>
    <!-- 退出登录 end -->
  </div>
</template>
<script lang="ts" setup>
  import { computed, reactive, ComputedRef } from 'vue';
  import licenseFile from '../licenseFile';
  import showAvatar from '@/components/showAvatar';
  import { CustomTheme } from '@/enums/language';
  import { useUserToken } from '@/store/modules/user';
  import { useLangTheme } from '@/store/modules/lang-theme';
  import { useI18n } from 'vue-i18n';
  import { Router, useRouter } from 'vue-router';
  import { hasPerimission } from '@/utils/permission';
  import { getRoleName } from '.';
  defineProps({
    avatarUrl: String,
  });
  const emit = defineEmits(['closePop']);
  const { t } = useI18n();
  const route: Router = useRouter();
  //关闭弹框
  const closePop = () => {
    emit('closePop');
  };
  const userTokenStore = useUserToken(),
    langThemeStore = useLangTheme();
  const userInfo = computed(() => userTokenStore.user_info);
  const state = reactive({
    selectedKeys: [],
  });
  const logout = async () => {
    userTokenStore.logout(route);
  };
  //主题色
  const themeChange = (THEME: CustomTheme) => {
    langThemeStore.SetTheme(THEME);
  };
  const THEME: ComputedRef<CustomTheme> = computed(() => langThemeStore.theme);
</script>
<style lang="less" scoped>
  .box {
    // width: 280px;
    background: #fff;
    ::v-deep(.avaMenus) {
      padding: 8px 0;
      border-bottom: 1px solid #eee !important;
      .ant-menu-item {
        height: 40px;
        line-height: 40px;
        padding: 0 16px;
        margin: 0 !important;
      }

      .test {
        display: none !important;
      }
    }
    .avatar {
      padding: 24px;
      display: flex;
      align-self: start;
      border-bottom: 1px solid #eee;
      .avatarCOn {
        width: 32px;
        height: 32px;
        margin-right: 8px;
      }
      .name {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.8);
        line-height: 20px;
        margin-bottom: 4px;
      }
      .email {
        font-size: @fz12;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.6);
        line-height: 18px;
        margin-bottom: 8px;
      }
      .role {
        display: inline-block;
        padding: 2px 8px;
        background: rgba(24, 186, 121, 0.15);
        font-size: @fz12;
        font-weight: 600;
        color: #18ba79;
        line-height: 20px;
      }
    }
    .accSet {
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      margin-top: 8px;
      cursor: pointer;
    }
    .offTime {
      margin-top: 8px;
      height: 34px;
      line-height: 34px;
      padding: 0 16px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .logout {
      height: 40px;
      line-height: 40px;
      padding: 0 16px;
      font-size: @fz12;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        color: #18ba79;
      }
    }
  }
  .actived {
    background: #eee;
  }
</style>
