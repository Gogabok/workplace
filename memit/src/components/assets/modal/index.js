import { mapState } from 'vuex';

export default {
    name: 'modal',
    props: {
        removeclose : Boolean
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
        }
    },
}