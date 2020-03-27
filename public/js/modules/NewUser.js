export default {
    props: ['user'],

    template: `
        
        <div v-if="showUser" class="newUser">
            <h3>{{ user.name }} Has Joined the Chat</h3>
        </div>
    `,
    data() { 
        return{
            showUser: true
        }
        
    },

    created: function(){
        setTimeout(() => this.show(), 7000);
    },

    methods:{
        show(){
            this.showUser = false;
        }
    }
}