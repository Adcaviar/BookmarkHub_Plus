<template>
  <div class="popup">
    <!-- 上传书签 -->
    <a-button type="text" :block="true" class="button">
      <CloudUploadOutlined />{{ browser.i18n.getMessage('update') }}
    </a-button>

    <!-- 下载书签 -->
    <a-button type="text" :block="true" class="button">
      <CloudDownloadOutlined />{{ browser.i18n.getMessage('download') }}
    </a-button>

    <!-- 清空本地书签 -->
    <a-button type="text" :block="true" class="button">
      <ClearOutlined />{{ browser.i18n.getMessage('clear') }}
    </a-button>

    <a-divider class="line" />

    <!-- 设置 -->
    <a-button type="text" :block="true" class="button">
      <SettingOutlined />{{ browser.i18n.getMessage('setting') }}
    </a-button>

    <!-- 帮助 -->
    <a-button type="text" :block="true" class="button">
      <QuestionCircleOutlined />{{ browser.i18n.getMessage('help') }}
    </a-button>

    <!-- github -->
    <a-button type="text" :block="true" class="button">
      <GithubOutlined />{{ browser.i18n.getMessage('github') }}
    </a-button>

    <a-button disabled  type="text" :block="true" class="button">
      <BookOutlined />
      {{ `${browser.i18n.getMessage('amount')} ${localBookNum}/${CloundBookNum} (本地/云端)` }} 
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { CloudUploadOutlined,CloudDownloadOutlined,ClearOutlined,SettingOutlined,QuestionCircleOutlined,GithubOutlined,BookOutlined } from '@ant-design/icons-vue';

const localBookNum = ref(0)
const CloundBookNum = ref(0)
</script>

<style scoped>
.popup {
  width: 15rem;
  padding: 0.5rem 0;
}

.line {
  height: 1px;
  margin: 0.5rem 0;
  font-size: 1rem;
}

.button {
  text-align: left;
  /* width: 200px !important; */
  border-radius: 0px !important;
}
</style>