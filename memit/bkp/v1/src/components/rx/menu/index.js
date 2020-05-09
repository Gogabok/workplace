import { mapState } from 'vuex';

export default {
    name: 'rx-menu',
    props: {
    },

    data : function(){

        return {
            
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
        
    },
}