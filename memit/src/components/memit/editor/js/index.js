//import image from "@/assets/logo28.png"
import Env from "./env.js"
import Pane from "./pane.js"
import Ticker from "./ticker.js"
import Snap from "./helpers/snap.js";
import { saveAs } from 'file-saver';

import history from "./history.js"
var Color = require('color');
//import Layer from "./layers/layer.js"
//import cat from "@/assets/testimages/cat2.jpg"

var Editor = function(el, vuem){

    var self = this;
    var app = null;

    var $workspace = el.querySelector('.workspace') 
    //var $menu =  el.querySelector('.menu') 

    self.env = new Env(self);
    self.history = new history(self);

    self.pane = null;
    self.panes = [];
    self.snap = new Snap(self.panes, {
        editor : self
    })

    self.ticker = null;
    self.vuem = vuem;

    self.background = "#FFFFFF"

    //var active = null;
    var activepane = null;
    //var current = null;

    /*var setActive = function(a, obj){
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
    }*/

    self.init = function(){

        app = new PIXI.Application({
            transparent: true, resolution: window.devicePixelRatio || 1,
            antialias: true,
            
        });

       // PIXI.settings.ANISOTROPIC_LEVEL = 16

        app.editor = self;

        self.ticker = new Ticker(app, self)

        $workspace.appendChild(app.view);

        //// env

        self.env.init($workspace, app)

        self.env.on.resize.pane = function(){
            _.each(self.panes, function(pane){
                //pane.apply()
            })
        }

        //// default state

        var pane = new Pane({

            width : 1024,
            height : 1024,

            x : 0,
            y : 0,

            id : 'main'

        }, app, self.env)
        
        self.panes[0] = pane

        pane.init(self.env.get.pane().scnt)

        pane.set.active(true)

        self.env.zoom.fit()
        self.set.background()

        self.history.add(null, true)

        

    }

    self.actions = {

        currentlayer : {
            set : function(l){

                vuem.getmenu('layertext', 'textcolor').color = null; 

                if(l){

                    if(l.type == 'text'){
                        vuem.getmenu('layertext', 'textcolor').color = l.actions.style().color; 
                    }

                }
               
            },

            get : function(){
                return activepane.currentlayer
            }
        },

        activepane : {
            set : function(pane){

                _.each(self.get.otherPanes(pane), p => {
                    p.currentlayer = null
                    p.get.cnt().zIndex = 1
                    p.set.active(false)
                })

                activepane = pane

                vuem.pane = activepane
                
                activepane.get.cnt().zIndex = 2

            },

            back : function(){
                if (activepane){
                    activepane.currentlayer = null
                }
            }
        },
        add : {
            image : function(base64, pane){

                return (pane || activepane).add.layer({
                    type : "Sprite"
                },{
        
                    image : base64,
        
                }).then(function(layer){

                    if(layer.pane.layers.length == 1){
                        layer.actions.fitpane()  
                    }
                    else
                    {
                        layer.actions.align()
                    }
        
                    

                    layer.actions.faceRecognition()

                    self.history.add()

                    return layer
                })

            },

            text : function(pane){

                var bgcolor = Color(self.background)
                var textColor = "#FFFFFF"


                if (bgcolor.isLight()) textColor = "#000000"

                return (pane || activepane).add.layer({

                    type : "Text"
                   

                }, {
                    style : {
                        color : textColor
                    }
                }).then(function(layer){

                    self.actions.edit.textLayer(layer)

                    self.history.add()

                    return layer
                })
            },

            pane : function(w, h, x, y, id){
                var added = new Pane({

                    width : w,
                    height : h,
        
                    x : x,
                    y : y,

                    id : id
        
                }, app, self.env)
        
                self.panes.push(added)
        
                added.init(self.env.get.pane().scnt)

                return added
            },

            panedirection : function(pane, direction){

                var x = 0, y = 0;
                var w = pane.get.width(),
                    h = pane.get.height();

                var to = self.actions.collisions.intersections.alignTo(pane, direction)               

                if (typeof to != 'undefined'){
                    if(direction == 'right' || direction == 'left'){
                        w = Math.abs(to)
                    }

                    if(direction == 'bottom' || direction == 'top'){
                        h = Math.abs(to)
                    }
                }

                console.log("tototo", to, w, h)

                if(direction == 'right'){
                   // x = () => {return pane.get.right() + 1},
                    x = pane.get.right(),
                    y = pane.get.y()
                }

                if(direction == 'bottom'){
                    x = pane.get.x(),
                    y = pane.get.bottom()
                    //y = () => {return pane.get.bottom() + 1}
                }

                if(direction == 'left'){
                    //x = () => {return pane.get.x() - added.get.width() - 1}
                    x = pane.get.x() - w,
                    y = pane.get.y()
                }

                if(direction == 'top'){
                    x = pane.get.x()
                    y = pane.get.y() - h
                    //y = () => {return pane.get.y() - added.get.height() - 1}
                }

                var added = self.actions.add.pane(w, h, x, y)

                added.set.active(true)

                vuem.modals.add = true

            }

        },
        edit : {

            activeLayer : function(){

                if(activepane && activepane.currentlayer){
                    return this.textLayer(activepane.currentlayer)
                }

               
            },

            saveActiveLayer : function(){
                if(activepane && activepane.currentlayer){
                    return this.saveTextLayer(activepane.currentlayer)
                }
               
            },

            cancelActiveLayer : function(){
                if(activepane && activepane.currentlayer){
                    return this.cancelTextLayer(activepane.currentlayer)
                }               
            },

            cancelTextLayer : function(layer){
                
                layer.actions.cancel()
        
            },

            saveTextLayer : function(layer){

                layer.actions.save()
        
            },

            textLayer : function(layer){

                if(layer.type != 'text') return

                vuem.getmenu('layertext', 'back').active = false;
                vuem.getmenu('layertext', 'delete').active = false;
                vuem.getmenu('layertext', 'edit').active = false; 
                vuem.getmenu('layertext', 'textcolor').active = false; 
                
                vuem.getmenu('layertext', 'save').active = true;
                vuem.getmenu('layertext', 'cancel').active = true; 
      
                layer.actions.edit()
        
            },

            release : function(){

                vuem.getmenu('layertext', 'back').active = true;
                vuem.getmenu('layertext', 'delete').active = true;
                vuem.getmenu('layertext', 'edit').active = true;  
                vuem.getmenu('layertext', 'textcolor').active = true; 

                vuem.getmenu('layertext', 'save').active = false;
                vuem.getmenu('layertext', 'cancel').active = false; 

            }
        },
        delete : {
            activeLayer : function(){
                if(activepane && activepane.currentlayer)
                    this.layer(activepane.currentlayer)
            },
            layer : function(layer){
                if (layer){
                    layer.actions.delete()
                }
            }
        },
        collisions : {
            intersections : {

                alignTo : function(pane, direction){
                    var c = 'x'

                    var others = self.get.otherPanes(pane)

                    if(direction == 'right') c = 'x1'
                    if(direction == 'top') c = 'y'
                    if(direction == 'bottom') c = 'y1'

                    var cpane = pane.get[c]()

                    if(others.length){

                        var mp = _.minBy(others, function(p){

                            var cp = p.get[c]()

                            if (Math.abs(cp - cpane) < 10) return Infinity
    
                            return Math.abs(cp - cpane)
    
                        })

                        console.log('mp.xyxy(), cpane, c', mp.get.xyxy(), cpane, c)
    
                        if(mp){
                            if(Math.abs(mp.get[c]() - cpane) > 10){
    
                                return cpane - mp.get[c]()
    
                            }
                        }

                    }

                    
                },  

                maxPaneBorders : function(pane){
                    var borders = {}
                    var others = self.get.otherPanes(pane)

                    if (others.length){    
                        var xyxy = pane.get.xyxy()

                        _.each(others, function(p){
                            var pxyxy = p.get.xyxy();

                            _.each(xyxy, function(v, i){
                                var c = pxyxy[self.actions.coordinates.reverse(i)]

                                if(typeof borders[i] == 'undefined' || Math.abs(borders[i] - xyxy[i]) > Math.abs(c - xyxy[i])){

                                    borders[i] = c

                                }
                            })
                        })
                    }

                    return borders
                },
                objectToBorder : function(a, bs, direction){
                    
                    var _a = _.clone(a)

                    if (direction == 'left'){
                        _.each(bs, function(b){
                            if(b.x1 > _a.x) {
                                _a.x = b.x1 
                            }
                        })
                    }

                    if (direction == 'right'){
                        _.each(bs, function(b){
                            if(b.x < _a.x1) {
                                _a.x1 = b.x 
                            }
                        })
                    }

                    if (direction == 'top'){
                        _.each(bs, function(b){
                            if(b.y1 > _a.y) {
                                _a.y = b.y1 
                            }
                        })
                    }

                    if (direction == 'bottom'){
                        _.each(bs, function(b){
                            if(b.y < _a.y1) {
                                _a.y1 = b.y 
                            }
                        })
                    }
                    
                    if(_a.x1 - a.x < 0) return
                    if(_a.y1 - a.y < 0) return

                    return _a
                },

                block : function(a, bs){
                    var r = []

                    r = _.filter(bs, b => {

                        //var  res = ( a.y < b.y1 || a.y1 > b.y || a.x1 < b.x || a.x > b.x1 );

                        var c1 = ( a.x >= b.x && a.x < b.x1 ) || ( a.x1 > b.x && a.x1 <= b.x1 )
                        var c2 = ( a.y >= b.y && a.y < b.y1 ) || ( a.y1 > b.y && a.y1 <= b.y1 )
                        var c3 = ( b.y >= a.y && b.y < a.y1 ) || ( b.y1 > a.y && b.y1 <= a.y1 )
                        var c4 = ( b.x >= a.x && b.x < a.x1 ) || ( b.x1 > a.x && b.x1 <= a.x1 )

                        var res = (c1 && c2) || (c4 && c3) || ((c1 && c3) || (c4 && c2))

                        return res
                    })

                    return r
                },

                paneWithOthers : function(pane){
                    var others = self.get.otherPanes()

                    var r = []

                    if (others.length){        
                        
                        var a = pane.get.xyxy
                        
                        var bs = _.map(others, function(p){
                            return p.get.xyxy()
                        }) 

                        r = this.block(a, bs)
                        
                    }

                    return r
                },


            }
        },
        coordinates : {
            reverse : function(key){
                if(key == 'x') return 'x1'
                if(key == 'x1') return 'x'
                if(key == 'y1') return 'y'
                if(key == 'y') return 'y1'

            }
        },

        hidehelpers : function(){
            activepane.set.active(false)

            _.each(self.panes, function(p){
                p.hidehelpers()
            })
        },

        showhelpers : function(){
            activepane.set.active(true)

            _.each(self.panes, function(p){
                p.showhelpers()
            })
        },

        export : {
            saveImage : function(){

                self.actions.hidehelpers()

                var img = app.renderer.extract.base64(self.env.get.pane().scnt, 'image/jpeg', 1)

                self.actions.showhelpers()


                saveAs(img, "image.jpg");
            },

            data : function(){
                return {
                    background : self.background,
                    panes : _.map(self.panes, function(p){
                        return p.export.data()
                    })

                }


            }
        },

        import : {
            data : function(data){



                _.each(data.panes, function(p){

                    var cur = _.find(self.panes, function(cp){
                        if(cp.id == p.id) return true
                    })

                    if(!cur){
                        cur = self.actions.add.pane(
                            p.position.width, 
                            p.position.height, 
                            p.position.x, 
                            p.position.y, 
                            p.id
                        )
                    }

                    cur.import.data(p)
                 
                })

                if(data.background){
                    self.set.background(data.background)

                    vuem.backgroundValue = self.background
                }
            },

            history : function(pool){
                self.history.set(pool);

                var state = self.history.finally()

                self.actions.import.data(state)
                console.log(state)
            }
        }

    }

    self.get = {
        otherPanes : function(pane){
            return _.filter(self.panes, p => {
                return p.id != pane.id
            })
        },
        sizeZoomed : function(){
            var s = self.get.size()

            _.each(s, function(v, i){
                s[i] = v * self.env.zoom.get()
            })

            return s
        },
        size : function(){

            var x = undefined, y = undefined, x1 = undefined, y1 = undefined

            _.each(self.panes, function(pane){
                

                var _x = pane.get.x()
                var _y = pane.get.y()

                var _x1 = _x + pane.get.width()
                var _y1 = _y + pane.get.height()


                if (x > _x || typeof x == 'undefined') x = _x
                if (y > _y || typeof y == 'undefined') y = _y

                if (x1 < _x1 || typeof x1 == 'undefined') x1 = _x1
                if (y1 < _y1 || typeof y1 == 'undefined') y1 = _y1


            })

            return {
                width : x1 - x,
                height : y1 - y,

                x : x,
                y : y
            }
        }
    }

    self.set = {
        background : function(color, save){

            if(!color || color == self.background) {
                color = self.background
                save = false
            }

            self.background = color

            _.each(self.panes, function(p){
                p.set.background(color)
            })

            if (save) {
               
                self.history.add()
            }
        }
    }

    return self;
}


export default Editor