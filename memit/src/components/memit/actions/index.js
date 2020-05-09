import { mapState } from 'vuex';

export default {
    name: 'actions',
    props: {
    },

    data : function(){

        return {
            loading : false,

            actions : [

                {
                    id : 'blank',
                    name : 'actions.blank',
                    icon : '<i class="fas fa-chalkboard"></i>'
                },

                {
                    id : 'union',
                    name : 'actions.union',
                    icon : '<i class="fas fa-blender"></i>'
                },

                {
                    id : 'faceswap',
                    name : 'actions.faceswap',
                    icon : '<i class="far fa-grin-wink"></i>'
                },

                {
                    id : 'camera',
                    name : 'actions.camera',
                    icon : '<i class="fas fa-camera-retro"></i>'
                },

                

            ]
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