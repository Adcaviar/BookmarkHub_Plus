<template>
  <div class="popup">
    <a-divider style="margin: 1rem 0 1.5rem 0;height: 1px;">{{ browser.i18n.getMessage("extensionName") }}</a-divider>

    <!-- 上传书签 -->
    <a-popconfirm :title="browser.i18n.getMessage('confirm_update')" :ok-text="browser.i18n.getMessage('confirm')"
      :cancel-text="browser.i18n.getMessage('cancel')" @confirm="confirm('upload')" @cancel="cancel">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a-button type="text" :block="true" class="button">
        <CloudUploadOutlined />{{ browser.i18n.getMessage('uploadBookmarks') }}
      </a-button>
    </a-popconfirm>

    <!-- 下载书签 -->
    <a-popconfirm :title="browser.i18n.getMessage('confirm_download')" :ok-text="browser.i18n.getMessage('confirm')"
      :cancel-text="browser.i18n.getMessage('cancel')" @confirm="confirm('download')" @cancel="cancel">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a-button type="text" :block="true" class="button">
        <CloudDownloadOutlined />{{ browser.i18n.getMessage('downloadBookmarks') }}
      </a-button>
    </a-popconfirm>

    <!-- 清空本地书签 -->
    <a-popconfirm :title="browser.i18n.getMessage('confirm_clear')" :ok-text="browser.i18n.getMessage('confirm')"
      :cancel-text="browser.i18n.getMessage('cancel')" @confirm="confirm('removeAll')" @cancel="cancel">
      <template #icon><question-circle-outlined style="color: red" /></template>
      <a-button type="text" :block="true" class="button">
        <ClearOutlined />{{ browser.i18n.getMessage('removeAllBookmarks') }}
      </a-button>
    </a-popconfirm>

    <a-divider class="line" />

    <!-- 设置 -->
    <a-button type="text" :block="true" class="button" @click="sendMessage('setting')">
      <SettingOutlined />{{ browser.i18n.getMessage('settings') }}
    </a-button>

    <!-- 帮助 -->
    <a-button type="text" :block="true" class="button" @click="()=>{browser.tabs.create({url: 'https://github.com/Adcaviar/Bookmark_PLUS'})}">
      <QuestionCircleOutlined />{{ browser.i18n.getMessage('help') }}
    </a-button>

    <!-- github -->
    <a-button type="text" :block="true" class="button" @click="()=>{browser.tabs.create({url: 'https://github.com/Adcaviar/Bookmark_PLUS'})}">
      <GithubOutlined />{{ browser.i18n.getMessage('github') }}
    </a-button>

    <a-button disabled type="text" :block="true" class="button">
      <BookOutlined />
      {{ `${browser.i18n.getMessage('amount')} ${localBookCount}/${CloundBookCount} (${browser.i18n.getMessage('local')}/${browser.i18n.getMessage('online')})` }}
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { CloudUploadOutlined, CloudDownloadOutlined, ClearOutlined, SettingOutlined, QuestionCircleOutlined, GithubOutlined, BookOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';

const localBookCount = ref(0)   // 本地书签数量
const CloundBookCount = ref(0)  // 云端书签数量

const confirm = (type: string) => {
  sendMessage(type)
  // message.success('Click on Yes');
};

const cancel = () => {
  // message.error('Click on No');
};

onMounted(async () => {
  let data = await browser.storage.local.get(["localCount", "remoteCount"]);
  localBookCount.value = data.localCount
  CloundBookCount.value = data.remoteCount ? data.remoteCount : 0
})

const sendMessage = (type: string) => {
  browser.runtime.sendMessage({ type })
}

browser.runtime.onMessage.addListener((message) => {
  if (message.type === 'COUNT_UPDATED') {
    if (message.localCount !== undefined) {
      localBookCount.value = message.localCount;
    }
    if (message.remoteCount !== undefined) {
      CloundBookCount.value = message.remoteCount;
    }
  }
});
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
  border-radius: 0px !important;
}
</style>