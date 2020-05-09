import { mapState } from 'vuex';
import Editor from './js/index.js';
import { zoomcheck, zoomin, zoomout } from "./js/zoom.js"

import editorModalAdd from './modals/add/index.vue'
import colorModal from './modals/color/index.vue'
import modalContinueOld from './modals/continueold/index.vue'


var editor = null;

export default {
    name: 'editor',
    props: {
    },

    components: {
        editorModalAdd,
        colorModal,
        modalContinueOld
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

                /*{
                    id : 'background',
                    icon : 'fas fa-sliders-h',
                    text : 'SETTINGS',
                    active : true
                },*/

                {
                    id : 'done',
                    icon : 'fas fa-check',
                    text : 'SAVE',
                    active : true,
                    right : true
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
                    id : 'textcolor',
                    icon : 'fas fa-font',
                    text : 'Color',
                    active : true,
                    color : null
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
                },

                
            ]
        }

        return {
            loading : false,
            dragmode : false,
            zoom : 100,

            modals : {
                add : false,
                background : false,
                continueold : false
            },

            backgroundValue : '',

            menu : menu,

            pane : null,
            layer : null,

            task : {
                color : "#FFAA00"
            }
        }

    },

    mounted : function(a) {

        editor = new Editor(this.$el, this)

        editor.init()

        this.backgroundValue = editor.background

        if(editor.history.load().length > 1){
            this.modals.continueold = true
        }

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

        background : function(){
            this.modals.background = true  
        },

        menuclick : function(e, index, id){
            if(index == 'pane'){

                if(id == 'add'){
                    this.modals.add = true  
                }

                if(id == 'done'){

                    editor.actions.export.saveImage()

                    //this.modals.add = true  
                }

            }

            if(index == 'layerimage' || index == 'layertext'){

                if(id == 'back'){
                    editor.actions.activepane.back()
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

                if(id == 'textcolor'){

                    var l = editor.actions.currentlayer.get()

                    var task = {
                        color : l.actions.style().color,
                        set : function(color){
                            l.actions.set.color(color)
                        }
                    }

                    this.task = task

                    this.modals.background = true

                   // editor.actions.edit.activeLayer()
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

            console.log(files)

            editor.actions.add.image(files[0].base64).then(layer => {

            })

        },

        addtext : function(){

            editor.actions.add.text().then(layer => {

            })

        },

        zoomin : function(){

            editor.env.zoom.set(zoomin(editor.env.zoom.get()))
        },

        zoomout : function(){

            editor.env.zoom.set(zoomout(editor.env.zoom.get()))
        },

        zoom100 : function(){

            if (editor.env.zoom.get() != 1){
                editor.env.zoom.fit100()
            }
            else{
                editor.env.zoom.fit()
            }

            
        },

        dragmodeon : function(e){

            e.preventDefault()

            this.dragmode = true

            editor.env.set.dragmode(this.dragmode)
        },

        dragmodeoff : function(e){
            e.preventDefault()

            this.dragmode = false

            editor.env.set.dragmode(this.dragmode)

        },
        

        backgroundPreview : function(color){

            if (this.task) this.task.set(color)

            else{
                editor.set.background(color)
            }

            
        },

        backgroundChange : function(color){
            if (this.task) {
                this.task.set(color)
                this.task = null
            }

            else{
                editor.set.background(color, true)
            }

            
        },


        continueold : function(){

            var pool = editor.history.load()

            editor.actions.import.history(pool)

        },

        createnew : function(){
            this.modals.add = true  
            this.modals.continueold = false
        }
    

    },
}