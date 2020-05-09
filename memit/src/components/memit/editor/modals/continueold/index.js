import { mapState } from 'vuex';


export default {
    name: 'modalContinueOld',
    props: {
    },

    data : function(){

        return {
            loading : false
        }

    },

    created : () => {

    },

    watch: {
        //$route: 'getdata'
    },

    beforeRouteEnter (to, from, next) {
        next()
    },

    beforeRouteUpdate (to, from, next) {
        next()
    },

    computed: mapState({
        auth : state => state.auth,
    }),

    methods : {
        close : function(){
            this.$emit('close')
        },

        createnew : function(){
            this.$emit('createnew')
        }, 

        continueold : function(){
            this.$emit('continue')
            this.$emit('close')
        }
    },
}