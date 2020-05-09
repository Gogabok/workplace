//import image from "@/assets/logo28.png"
import Env from "./env.js"
import Pane from "./pane.js"
import Ticker from "./ticker.js"


//import Layer from "./layers/layer.js"
//import cat from "@/assets/testimages/cat2.jpg"

var Editor = function(el, vuem){

    var self = this;
    var app = null;

    var $workspace = el.querySelector('.workspace') 
    //var $menu =  el.querySelector('.menu') 

    self.env = new Env(self);

    self.pane = null;
    self.ticker = null;
    self.vuem = vuem;

    var active = null;
    var current = null;

    var setActive = function(a, obj){
        active = a

        current = obj || self.pane

        el.setAttribute('active', a)
    }

    self.setActive = function(layer){
        if (layer){
            setActive('layer' + layer.type, layer)
        }
        else{
            setActive('pane')
        }
    }

    self.init = function(){

        app = new PIXI.Application({
            transparent: true, resolution: window.devicePixelRatio || 1,
        });

        app.editor = self;

        $workspace.appendChild(app.view);

        self.pane = new Pane({

            ratio : 1,
            direction : 'center'

        }, app, self.env)

        self.ticker = new Ticker(app, self)

        self.env.init($workspace, app)        

        self.pane.init(self.env.get.pane().scnt)

        self.env.on.resize.pane = function(){
            self.pane.apply()
        }

        setActive('pane')
    }

    self.actions = {
        
        add : {
            image : function(base64, pane){

                return (pane || self.pane).add.layer({
                    type : "Sprite"
                },{
        
                    image : base64,
        
                }).then(function(layer){
        
                    layer.actions.align()

                    layer.actions.faceRecognition()

                    return layer
                })

            },

            text : function(pane){
                return (pane || self.pane).add.layer({

                    type : "Text"

                }).then(function(layer){

                    self.actions.edit.textLayer(layer)

                    return layer
                })
            },

        },
        edit : {

            activeLayer : function(){

                if(current){
                    if(current.type == 'text'){
                        return this.textLayer(current)
                    }
                }

               
            },

            saveActiveLayer : function(){

                if(current){
                    if(current.type == 'text'){
                        return this.saveTextLayer(current)
                    }
                }

               
            },

            cancelActiveLayer : function(){

                if(current){
                    if(current.type == 'text'){
                        return this.cancelTextLayer(current)
                    }
                }

               
            },

            cancelTextLayer : function(layer){
                
                layer.actions.cancel()
        
            },

            saveTextLayer : function(layer){

                layer.actions.save()
        
            },

            textLayer : function(layer){

                vuem.getmenu('layertext', 'back').active = false;
                vuem.getmenu('layertext', 'delete').active = false;
                vuem.getmenu('layertext', 'edit').active = false; 
                
                vuem.getmenu('layertext', 'save').active = true;
                vuem.getmenu('layertext', 'cancel').active = true; 
      
                layer.actions.edit()
        
            },

            release : function(){

                vuem.getmenu('layertext', 'back').active = true;
                vuem.getmenu('layertext', 'delete').active = true;
                vuem.getmenu('layertext', 'edit').active = true;  

                vuem.getmenu('layertext', 'save').active = false;
                vuem.getmenu('layertext', 'cancel').active = false; 

            }
        },
        delete : {
            activeLayer : function(){
                this.layer(current)
            },
            layer : function(layer){
                if (layer){
                    layer.actions.delete()

                   // setActive('pane')
                }
            }
        }
    }

    return self;
}


export default Editor