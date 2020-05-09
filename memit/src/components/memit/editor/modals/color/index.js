import { mapState } from 'vuex';
import { Chrome } from 'vue-color'

export default {
    name: 'colorModal',
    props: {
        color : String,
        caption : String
    },
    model: {
        prop: 'color',
        event: 'change'
    },

    components : {
        vuecolor : Chrome,
    },

    data : function(){

        return {
            loading : false,
            colorpreview : null
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
            this.$emit('change', this.color)
            this.$emit('close')
        },

        select : function(){

            //this.color = this.colorpreview

            this.$emit('change', this.colorpreview || this.color)
            this.$emit('close')
        },

        update : function(color){

            this.colorpreview = color.hex8
            this.$emit('preview', this.colorpreview)
            
        }
    },
}