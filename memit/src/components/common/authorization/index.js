import { mapState } from 'vuex';

export default {
    name: 'Authorization',


    data : function(){

        console.log(this)

        //this.$store.dispath('account/init')

        return {
            login : this.$store.state.account.lastlogin || '',
            password : '',

            
        }

    },

    created : () => {

    },

    watch: {
        //$route: 'getdata'
    },

    computed: mapState({
        auth : state => state.auth,
    }),

    methods : {
        signin : function(){

            this.$root.user.signin({

                password : this.password,
                login :  this.login

            }).then(state => {

                this.$store.commit.account('lastlogin', this.login)

            }).catch(e => {

            })


        }
    },

    props: {
        caption : String
    },

}