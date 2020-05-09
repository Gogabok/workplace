import { mapState } from 'vuex';
import Editor from './js/index.js';
import { zoomcheck, zoomin, zoomout } from "./js/zoom.js"

import editorModalAdd from './modals/add/index.vue'

var editor = null;

export default {
    name: 'editor',
    props: {
    },

    components: {
        editorModalAdd
    },

    data : function(){

        var menu = {
            pane : [
                {
                    id : 'add',
                    icon : 'fas fa-plus',
                    text : 'ADD MEDIA',
                    active : true
                },

            ],

            layerimage : [
                {
                    id : 'back',
                    icon : 'fas fa-arrow-left',
                    text : 'BACK',
                    active : true
                },

                {
                    id : 'delete',
                    icon : 'fas fa-times',
                    text : 'Delete Layer',
                    right : true,
                    active : true
                }
            ],

            layertext : [
                {
                    id : 'back',
                    icon : 'fas fa-arrow-left',
                    text : 'BACK',
                    active : true
                },

                {
                    id : 'edit',
                    icon : 'fas fa-pencil-alt',
                    text : 'Edit Text',
                    active : true
                },

                {
                    id : 'cancel',
                    icon : 'fas fa-times',
                    text : 'Cancel',
                    active : false
                },

                {
                    id : 'save',
                    icon : 'fas fa-check',
                    text : 'Save',
                    active : false
                },

                {
                    id : 'delete',
                    icon : 'fas fa-times',
                    text : 'Delete Layer',
                    right : true,
                    active : true
                }
            ]
        }

        return {
            loading : false,
            dragmode : false,
            zoom : 100,

            modals : {
                add : false
            },

            menu : menu
        }

    },

    mounted : function(a) {

        editor = new Editor(this.$el, this)

        editor.init()

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

        getmenu : function(key, id){
            return _.find(this.menu[key], m => { return id == m.id })
        },

        closeModal : function(key){

            var t = this

            if(!key){
                _.each(this.modals, function(m, k){
                    t.closeModal(k)
                })
            }
            else{
                this.modals[key] = false
            }
        },

        menuclick : function(e, index, id){
            if(index == 'pane'){

                if(id == 'add'){
                    this.modals.add = true  
                }

            }

            if(index == 'layerimage' || index == 'layertext'){

                if(id == 'back'){
                    editor.setActive()
                }

                if(id == 'delete'){
                    editor.actions.delete.activeLayer()
                }

            }

            if(index == 'layerimage'){

            }

            if(index == 'layertext'){

                if(id == 'edit'){
                    editor.actions.edit.activeLayer()
                }

                if(id == 'save'){
                    editor.actions.edit.saveActiveLayer()
                }

                if(id == 'cancel'){
                    editor.actions.edit.cancelActiveLayer()
                }

            }
        },
        
        addimage : function(files){

            editor.actions.add.image(files[0].base64).then(layer => {

                editor.setActive(layer)

            })

        },

        addtext : function(){

            editor.actions.add.text().then(layer => {

                editor.setActive(layer)

            })

        },

        /////////

        zoomin : function(){

            console.log('zoomin')

            this.zoom = 100 * editor.env.zoom.set(zoomin(editor.env.zoom.get()))
        },

        zoomout : function(){

            console.log('zoomout')

            this.zoom = 100 * editor.env.zoom.set(zoomout(editor.env.zoom.get()))
        },

        zoom100 : function(){
            this.zoom = 100 * editor.env.zoom.set(1, true)
        },

        wheel : function(e){

            return

            console.log(e)

            var f = zoomin 

            if(e.deltaY > 0){
                f = zoomout
            }

            var x = e.layerX
            var y = e.layerY

            this.zoom = 100 * editor.env.zoom.set(f(editor.env.zoom.get()), {
                x : x,
                y : y
            })
        },

        ///////////

        dragmodeon : function(e){

            e.preventDefault()

            this.dragmode = true

            editor.env.set.dragmode(this.dragmode)
        },

        dragmodeoff : function(e){
            e.preventDefault()

            this.dragmode = false

            editor.env.set.dragmode(this.dragmode)

        }
        

    },
}