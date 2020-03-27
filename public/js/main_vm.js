// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";
import NewUser from "./modules/NewUser.js";
import UserLogout from "./modules/UserLogout.js";



const socket = io();

// the packet is whaetver data we send through with the connect event
// from the server

// this is data destructuring. Go look it up in MDN
function setUserId({sID}){
    //debugger;
    // console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage(){
    console.log('a user has disconnected');
}

function appendMessage(message){
    // console.log(message);
    vm.messages.push(message);
    vm.userTyping = message.userTyping;
}

function newUser(user){
    // console.log(user.name);
    vm.users.push(user);
}

function leftChat(user){
    // console.log(user.name, 'left the chat');
    vm.usersLeft.push(user);
}

function userTyping(user){
    console.log(user.name, 'is typing');
    vm.userTyping = user.name;
}

const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        nickname: "",
        messages: [],
        notLoggedIn: true,
        users: [],
        usersLeft: [],
        userTyping: "",
        errorLogin: false
    },

    updated () {

        this.scrollToEnd();

    },

    mounted: function(){

        this.scrollToEnd();	

    },

    methods: {
        // emit message event to the server so that it
        // can in turn send this anyone who's connected
        dispatchMessage() {

            if(this.message != "" ){
                // console.log('handle emit message');

                // the double pipe || is an "or operator"
                // if first value is set, use it. else use
                // whatever comes after the "or" operator
                socket.emit('chat_message', {
                    content: this.message,
                    name: this.nickname || "anonymous",
                    userTyping: ""
                })
    
                
                this.message = "";
            } else{
                return;
            }


        },

        logIn(){

            if(this.nickname != ""){
                this.notLoggedIn = false;
                
                socket.emit('joined_chat', {
                    name: this.nickname
                })
                this.errorLogin = false;
                
            }else{
                this.errorLogin = true;
            }
        },

        scrollToEnd () {
            let content = this.$refs.container;
            content.scrollTop = content.scrollHeight;
        },

        logOut(){
            // console.log('login out');
            // this.islogOut = true;
            this.notLoggedIn = true;

            socket.emit('left_chat', {
                name: this.nickname
            })
            
        },

        typing(){
            // console.log('fired typing');

            socket.emit('typing', {
                name: this.nickname
            })
        }
    },

    components: {
        newmessage: ChatMessage,
        newuser: NewUser,
        userlogout: UserLogout
    }
}).$mount('#app');


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);
socket.addEventListener('joined_chat', newUser);
socket.addEventListener('left_chat', leftChat);
socket.addEventListener('typing', userTyping);

