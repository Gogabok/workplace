import { mapState } from 'vuex';


export default {
    name: 'editorModalAdd',
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

        addimage : function(files){

            this.$emit('close')
            this.$emit('addimage', files)

        },

        addtext : function(files){

            this.$emit('close')
            this.$emit('addtext')

        }
    },
}