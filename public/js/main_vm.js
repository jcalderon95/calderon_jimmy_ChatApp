// imports always go first - if we're importing anything
import ChatMessage from "./modules/ChatMessage.js";

const socket = io();

// the packet is whaetver data we send through with the connect event
// from the server

// this is data destructuring. Go look it up in MDN
function setUserId({sID}){
    //debugger;
    console.log(sID);
    vm.socketID = sID;
}

function showDisconnectMessage(){
    console.log('a user has disconnected');
}

function appendMessage(message){
    vm.messages.push(message);
}

const vm = new Vue({
    data: {
        socketID: "",
        message: "",
        nickname: "",
        messages: [],
        notLoggedIn: true
    },

    mounted: function(){
        console.log('vue is done mounting');
    },

    methods: {
        // emit message event to the server so that it
        // can in turn send this anyone who's connected
        dispatchMessage() {
            console.log('handle emit message');

            // the double pipe || is an "or operator"
            // if first value is set, use it. else use
            // whatever comes after the "or" operator
            socket.emit('chat_message', {
                content: this.message,
                name: this.nickname || "anonymous"
            })

            this.message = "";
        },

        logIn(){
            console.log(this.nickname);

            if(this.nickname != ""){
                console.log("logged");
                this.notLoggedIn = false;
                
            }else{
                console.log("add username"); 
                this.errorLogin = true;
            }
        }
    },

    components: {
        newmessage: ChatMessage
    }
}).$mount('#app');


socket.addEventListener('connected', setUserId);
socket.addEventListener('disconnect', showDisconnectMessage);
socket.addEventListener('new_message', appendMessage);