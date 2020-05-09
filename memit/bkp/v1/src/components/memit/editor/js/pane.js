import Layer from "./layers/layer.js"
import ResizeControls from "./helpers/resizeControls.js"
import Light from "./helpers/light.js"
import { max } from "moment";

var Pane = function({

    ratio = 1,
    direction = 'center'

} = {}, pixi, parent){

    var self = this;

    var panes = [];
    var layers = [];
    var cnt = null;

    var light = null;

    var layerscnt = null;
    var controls = {
        resize : {
            top : null,
            bottom : null,
            left : null,
            right : null
        }
    }


    var background = null;


    var lighted = false;

   
    var widthactual = false;
    var heightactual = false;

    var width = 0;
    var height = 0;

    var settings = {
        resizeControls : {
            size : 20,
            width : 1,
            color : '#2020CC',
            colorActive : '#4020FF',
            bg : '#001010'
        }
    }

    self.editor = pixi.editor

    /*self.render = {
        light : function(){

            if(lighted){

            }

        }
    }*/

    /*self.actions = {
        resizeaddmode
    }*/

    self.add = {

        pane : function(p){
            var pane = new Pane(p, pixi, self);

            panes.push(pane)
        },
        layer : function(p, source){
            var layer = new Layer(p, source, pixi, self);

                layers.push(layer);

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

            console.log('width, height', width, height)

            light = new Light({

                parent : layerscnt,
               
                width : function(){

                    //console.log('self.get.width()', self.get.width(), parent.get.width(), parent.get.height())

                    return self.get.width()
                },
                height : function(){
                    return self.get.height()
                }

            }).init();
        },

        controls : function(add){

            _.each(controls.resize, function(c, i){
                if(controls.resize[i]){

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
        }
    }

    self.ratio = function(){

        if(!panes.length) return ratio

        var totalratio = ratio;

        for(pane in panes){

            var pratio = pane.ratio();
            var pdirection = pane.get.direction();

            if (pdirection == 'left' || pdirection == 'right'){
                totalratio += pratio
            }
            else{
                totalratio = 1 / ( 1 / totalratio + 1 / pratio)
            }

        }

        return totalratio;
    }

    self.get = {
        light : function(){
            return light
        },
        ratio : function(){
            return ratio
        },
        direction : function(){
            return direction
        },
        panes : function(){
            return panes
        },

        cnt : function(){
            return cnt
        },
        layerscnt : function(){
            return layerscnt
        },

        width : function(){

            if(widthactual){
                return width
            }

            var pw = parent.get.width();

            var maxheight = parent.get.height();

            var h = pw / ratio

            if (h > maxheight){
                pw = maxheight * ratio
            }

            if(!panes.length) width = pw


            widthactual = true

            return width
        },

        height : function(){

            if(heightactual){
                return height
            }

            var pw = self.get.width();

            if(!panes.length) height = pw / ratio


            heightactual = true

            return height
        }
    }

    self.apply = function(){
        widthactual = false;
        heightactual = false;

        self.get.height();

        for(pane in panes){

            pane.apply()

        }

        if (light)

            light.apply()
    }

    self.set = {
        ratio : function(r){
            ratio = r

            self.apply()
        },
        direction : function(d){
            direction = d
        }
    }

    self.init = function(parent){
        cnt = new PIXI.Container();
        layerscnt =  new PIXI.Container();

        parent.addChild(cnt)
        self.apply()

        cnt.addChild(layerscnt)

        self.add.light()
        self.add.controls(true)    

        
    }
    

    return self;
}

export default Pane