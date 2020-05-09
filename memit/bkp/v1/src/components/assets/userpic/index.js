import { mapState } from 'vuex';

export default {
    name: 'userpic',
    props: {
        userid : String
    },

    data : function(){
        return {
        }
    },

    created : () => {

    },

 

    computed: mapState({
        auth : state => state.auth,

        fl : state => {

            if(state.account.info){
                return state.account.info.user_name.split(" ").map(w => w.substr(0, 1)).join('').toUpperCase()
            }

            return ""
        }

        /*info : function(state){

            var userid = this.userid

            console.log('userid, userid', userid, state)

            return ''

        },*/


    }),

    methods : {
       
    },
}
