import Echo from 'laravel-echo'
import { boot } from 'quasar/wrappers'
import Pusher from 'pusher-js'

window.Pusher = Pusher

import { api } from "boot/axios";

let apiUrl = ''
if (process.env.DEV) {
  apiUrl = `http://${process.env.VUE_APP_SERVER_IP}:8000/broadcasting/auth`
}else{
  apiUrl = `https://${process.env.VUE_APP_SERVER_IP}/broadcasting/auth`
}
const echo = window.Echo = new Echo({
  broadcaster: 'reverb',
  wsHost: process.env.VUE_APP_SERVER_IP,
  key: 'u6p27w8ubnbh665nfl09',
  wsPort: 8080,
  wssPort: 8081,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  authorizer: (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        api.post(apiUrl, {
            socket_id: socketId,
            channel_name: channel.name
        })
        .then(response => {
            callback(false, response.data);
        })
        .catch(error => {
            callback(true, error);
        });
      }
    };
  },
  // withCredentials: true // stellt sicher, dass Cookies gesendet werden
});

export default boot(({ app }) => {
  app.config.globalProperties.$echo = echo;
})

export { echo };