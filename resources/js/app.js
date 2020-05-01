
require('./bootstrap');

window.Vue = require('vue');

import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)

import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css'
Vue.use(Toaster, {timeout: 5000})

Vue.component('message', require('./components/MessageComponent.vue').default);


const app = new Vue({
    el: '#app',
    data: {
        chat: {
            messages: [],
            user: [],
            color: [],
            float: [],
            time: [],
        },
        message: '',
        typing: '',
        countOfUsers: 0,
    },
    watch: {
        message()
        {
            Echo.private('chat')
                .whisper('typing', {
                    name: this.message
                });
        }
    },
    methods:{
        send()
        {
            if (this.message.length !== 0)
            {
                this.chat.messages.push(this.message)
                this.chat.user.push('You');
                this.chat.color.push('success');
                this.chat.float.push('float-right');
                this.chat.time.push(this.getTime());
                axios.post('/send', {
                    message: this.message,
                    chat: this.chat // send tat will put into session
                })
                .then(res => {
                    this.message = '';
                })
                .catch(error => {
                    console.log(error.response)
                })
            }
        },
        getTime()
        {
            let time = new Date();
            return time.getHours() + ':' +time.getMinutes()
        },

        getOldMessage()
        {
            axios.post('/getOldMessage') // get every old session data
                .then(res => {
                    console.log(res)
                    if (res.data !== '')
                    {
                        this.chat = res.data;
                    }
                })
                .catch(e => {
                    console.log(e.response)
                })
        },
        DeleteSessionMessage()
        {
            axios.post('/deleteSession') // get every old session data
                .then(res => {
                    this.$toaster.success('All Messages deleted success')
                })
                .catch(e => {
                    console.log(e.response)
                })
        }

    },
    mounted()
    {
        this.getOldMessage();
        Echo.private('chat')
            .listen('ChatEvent', (e) => {
                this.chat.messages.push(e.message)
                this.chat.user.push(e.user);
                this.chat.color.push('primary');
                this.chat.float.push('float-left');
                this.chat.time.push(this.getTime());

                axios.post('/saveToSession', { // again receive data put session
                    chat: this.chat,
                })
                .then(res => {
                    console.log(res)
                })
                .catch(e => {
                    console.log(e.response)
                })

        })
        .listenForWhisper('typing', (e) => {
            if (e.name !== '')
            {
                this.typing = 'typing...'
            }else{
                this.typing = ''
            }
        })
        Echo.join('chat')
            .here(users => {
                this.countOfUsers = users.length
            })
            .joining(user => {
                this.countOfUsers += 1;
                this.$toaster.success(user.name + ' is join to the chat room')
                // console.log(user.name);
            })
            .leaving(user => {
                this.countOfUsers -= 1;
                this.$toaster.warning(user.name + ' is leave to the chat room')
                // console.log(user.name);
            });
    }
});
