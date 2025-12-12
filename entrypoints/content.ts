import { createApp } from 'vue';
import App from './popup/App.vue';
import './style.css'


export default defineContentScript({
  matches: ['<all_urls>'],

  cssInjectionMode: 'ui',

  async main(ctx) {
    browser.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      console.log(message, 'content')
      const ui = await createShadowRootUi(ctx, {
        name: 'example-ui',
        position: 'inline',
        anchor: 'body',
        onMount: (container) => {
          const app = createApp(App);
          app.mount(container);
          return app;
        },
        onRemove: (app) => {
          app?.unmount();
        },
      });
      ui.mount();

      // sendResponse({ status: 'ok' })
    })
  },
});
