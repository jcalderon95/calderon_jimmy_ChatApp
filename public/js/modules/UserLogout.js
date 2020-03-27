export default {
    props: ['user'],

    template: `
        
        <div>
            <h3 v-if="showUser" class="leave">{{ user.name }} Has left the chat</h3>
        </div>
    `,
    data() { 
        return{
            showUser: true
        }
        
    },

    created: function(){
        setTimeout(() => this.show(), 8000);
    },

    methods:{
        show(){
            this.showUser = false;
        }
    }
}