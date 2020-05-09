import Layer from "./layers/layer.js"
import ResizeControls from "./helpers/resizeControls.js"
import Light from "./helpers/light.js"
import f from '@/application/functions'
import { max } from "moment";
var Color = require('color');

var Pane = function({

    width = 1024,
    height = 1024,

    x = 0,
    y = 0,

    id = f.makeid()

} = {}, pixi, parent){

    var self = this;

    var layers = [];

    var cnt = null;
    var light = null;
    var mask = null;
    var layerscnt = null;
    var content = null;

    var controls = {
        resize : {
            top : null,
            bottom : null,
            left : null,
            right : null
        }
    }


    var settings = {
        resizeControls : {
            size : 20,
            width : 1,
            color : '#2020CC',
            colorActive : '#4020FF',
            bg : '#001010'
        }
    }

    var ini = {
        x : x,
        y : y
    }

    self.manuallyResized = {}

    self.id = id
    self.editor = pixi.editor
    self.pixi = pixi
    self.active = false
    self.currentlayer = null

    self.background = '#FFFFFF'


    var background = null

    self.renders = {
        background : function(){
            var bgcolor = Color(self.background)

            background.clear()


            background.beginFill(bgcolor.rgbNumber(), bgcolor.alpha());
            background.drawRect(
                0, 
                0, 
                self.get.width(), 
                self.get.height()
            );

            background.closePath();
            background.endFill();    
                
        }
    }

    self.add = {  
        
        background : function(){

            background = new PIXI.Graphics()
            background.interactive = true
            cnt.addChild(background);

            background.on('pointerdown', events.releaseLayer)
            
        },
      
        layer : function(p, source){
            var layer = new Layer(p, source, pixi, self);

                layers.push(layer);

                self.set.currentlayer(layer)

            return layer.init(layerscnt)

        },
        resizeControls : function(direction){

            return new ResizeControls({
                pane : self,
                settings : settings.resizeControls,
                direction : direction
            }).init()

        },        
        light : function(){
            
            light = new Light({

                parent : layerscnt,
               
                width : function(){
                    return self.get.width()
                },
                height : function(){
                    return self.get.height()
                }

            }).init();

        },
        controls : function(add){

            _.each(controls.resize, function(c, i){
                if (controls.resize[i]){
                    controls.resize[i].position()
                    controls.resize[i].render()

                }
                else{

                    controls.resize[i] = self.add.resizeControls(i, settings.resizeControls)

                }
               
            })

            
        }

    }

    self.remove = {
        layer : function(id){
            layers = _.filter(l => {
                return l.id != id
            })
        },

        light : function(){
            if (light) {
                light.destroy()
                light = null
            }
        }
    }

    self.hidehelpers = function(){
        self.remove.light()
    }

    self.showhelpers = function(){
        self.add.light()
        //self.get.light().enable()
    }

    /*self.ratio = function(){
       return ratio
    }*/

    self.mask = {
        add : function(){
            mask = new PIXI.Graphics();

            layerscnt.addChild(mask);
            layerscnt.mask = mask;
        },

        apply : function(){

            var width = self.get.width()
            var height = self.get.height()

            mask.clear();

            mask.lineStyle(0);
           
            mask.beginFill(0xFFFFFF);
            
            mask.moveTo(0, 0);
            mask.lineTo(width, 0);
            mask.lineTo(width,  height);
            mask.lineTo(0,  height);

            mask.closePath();
            mask.endFill();

        }
    }

    self.get = {
        light : function(){
            return light
        },

        ratio : function(){
            return self.get.width() / self.get.height()
        },
      
        cnt : function(){
            return cnt
        },

        content: function(){
            return content
        },

        layerscnt : function(){
            return layerscnt
        },

        width : function(){ 
            
            return typeof width == 'function' ? width() : width;
        },

        height : function(){      

            return typeof height == 'function' ? height() : height;
        },

        x : function(){
            return typeof x == 'function' ? x() : x;
        },

        y : function(){
            return typeof y == 'function' ? y() : y;
        },

        x1 : function(){
            return self.get.right()
        },

        y1 : function(){
            return self.get.bottom()
        },

        right : function(){
            return self.get.x() + self.get.width()
        },

        bottom : function(){
            return self.get.y() + self.get.height()
        },

        xyxy : function(){
            return {
                x : self.get.x(),
                y : self.get.y(),
                x1 : self.get.right(),
                y1 : self.get.bottom()
            }
        }
    }

    self.apply = function(){

        if (light)
            light.apply()

        if (mask)
            self.mask.apply()

        self.globalposition()

        self.renders.background()
    }

    self.set = {

        currentlayer : function(l){
            self.currentlayer = l

            self.editor.actions.currentlayer.set(l)
        },

        background : function(color){

            self.background = color
            self.renders.background()

        },

        active : function(active){

            if(active == self.active) return

            self.active = active;

            self.add.controls()

            if (self.active){
                self.editor.actions.activepane.set(self)
            }

        },  

        width : function(_width){

            //if(typeof width == 'function' && typeof _width != 'function') return

            width = _width

            self.apply()
        },

        height : function(_height){
            height = _height

            self.apply()

        },

        x : function(_x){
            x = _x

            self.apply()
        },

        y : function(_y){
            y = _y

            self.apply()
        },

        x1 : function(_x1){
            return self.set.width(_x1 - self.get.x())
        },

        y1 : function(_y1){
            return self.set.height(_y1 - self.get.y())
        },
        xyxy : function(xyxy){
            self.set.x(xyxy.x)
            self.set.x1(xyxy.x1)
            self.set.y(xyxy.y)
            self.set.y1(xyxy.y1)
        }

    }

    self.globalposition = function(){

        cnt.x = self.get.x()
        cnt.y = self.get.y()
    }  
    
    var events = {
        active : function(){
            self.set.active(true)
        },

        releaseLayer : function(){


            pixi.editor.actions.activepane.back()
        }
    }

    var initevents = function(){
        cnt
            .on('pointerdown', events.active)

    }

    var destroyevents = function(){
        cnt
            .off('pointerdown', events.active)
    }

    self.init = function(parent){

        cnt = new PIXI.Container();
        cnt.interactive = true;

        self.add.background()
        self.renders.background()

        layerscnt =  new PIXI.Container();
        content =  new PIXI.Container();
        
        parent.addChild(cnt)

        self.mask.add()
        self.mask.apply()

        cnt.addChild(layerscnt)
        layerscnt.addChild(content)
           
        self.showhelpers()

        self.add.controls(true)     

        initevents()

        self.apply()

    }

    self.export = {
        data : function(){
            return {

                position : {
                    w : self.get.width(),
                    h : self.get.height(),
                    x : self.get.x(),
                    y : self.get.y()
                },

                id : self.id,

                layers : _.map(layers, function(l){

                    return l.export.data()

                })

            }
        }
    }

    self.import = {
        data : function(d){

            self.set.width(d.position.w)
            self.set.height(d.position.h)
            self.set.x(d.position.x)
            self.set.y(d.position.y)

            self.apply()
            self.add.controls()

            _.each(d.layers, function(l){

                console.log("KL", l)

                self.add.layer({
                    type : l.type
                }, l.source).then(layer => {

                    layer.import.data(l)

                })
            })
        }
    }

    self.layers = layers

    return self;
}

export default Pane