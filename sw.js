self.addEventListener('install',e=>{self.skipWaiting()})
self.addEventListener('activate',e=>{e.waitUntil(clients.claim())})
self.addEventListener('push',e=>{
  let data={}
  if(e.data){try{data=e.data.json()}catch(_){data={title:'新消息',body:e.data.text()}}}
  const title=data.title||'朋友圈'
  const options={body:data.body||'你有新消息',icon:'',badge:'',vibrate:[200,100,200],tag:data.tag||'ds-push',data:{url:data.url||'/'}}
  e.waitUntil(self.registration.showNotification(title,options))
})
self.addEventListener('notificationclick',e=>{
  e.notification.close()
  const url=e.notification.data?.url||'/'
  e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{
    for(let c of clients){if(c.url===url&&'focus'in c)return c.focus()}
    if(clients.openWindow)return clients.openWindow(url)
  }))
})
self.addEventListener('message',e=>{
  if(e.data&&e.data.type==='show-notification'){
    self.registration.showNotification(e.data.title||'朋友圈',{body:e.data.body||'',tag:e.data.tag||'ds-push',vibrate:[200,100,200],data:{url:'/'}})
  }
})