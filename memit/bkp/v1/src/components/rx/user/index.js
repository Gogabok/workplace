import { mapState } from 'vuex';

var contents = {
    settings : {
        name : "Settings"
    }
}

export default {
    name: 'user',
    props: {
    },

    data : function(){

        return {
            contents : contents,
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
        
    },
}