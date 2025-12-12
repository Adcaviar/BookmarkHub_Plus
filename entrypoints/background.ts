export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id });

  browser.runtime.onMessage.addListener(async (message) => {
    console.log(message, 'background')
    // 获取当前活动的页面
    const [tab] = await browser.tabs.query({ active: true, currentWindow: true });

    // 转发消息给当前活动的页面,通过 content 进行监听
    browser.tabs.sendMessage(tab.id,message).then(response =>{
      console.log(response,'response')
    })
  })
});
