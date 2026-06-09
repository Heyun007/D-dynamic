self.addEventListener('install',e=>{self.skipWaiting()})
self.addEventListener('activate',e=>{e.waitUntil(clients.claim())})
self.addEventListener('push',e=>{
  let data={}
  if(e.data){try{data=e.data.json()}catch(_){data={title:'新消息',body:e.data.text()}}}
  const title=data.title||'朋友圈'
  const options={body:data.body||'',vibrate:[200,100,200],tag:'ds-push',data:{url:'/'}}
  e.waitUntil(self.registration.showNotification(title,options))
})
self.addEventListener('notificationclick',e=>{
  e.notification.close()
  e.waitUntil(clients.openWindow('/D-dynamic/'))
})
self.addEventListener('message',e=>{
  if(e.data&&e.data.type==='show-notification'){
    self.registration.showNotification(e.data.title||'朋友圈',{body:e.data.body||'',tag:'ds-push',vibrate:[200,100,200]})
  }
})