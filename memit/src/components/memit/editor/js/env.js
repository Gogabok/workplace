import PaneGlobal from "./paneglobalv2.js"

var env = function(editor){

    var self = this;

    var el = null;
    var pixi = null;
    var pane = null;

    var minWidth = 50;
    var minHeight = 50;

    var grid = null;
    var viewport = null;

    var dragmode = false;
    
    var actions = {
        renderersize : function(){

            var width = el.offsetWidth || 0;
            var height = el.offsetHeight || 0;
    
            if (width < minWidth) width = minWidth
            if (height < minHeight) height = minHeight

            pixi.renderer.resize(width, height);

            console.log('pixi.screen.width', pixi.screen.width, pixi.screen.height)

            /*if (viewport)
                viewport.resize({
                    screenWidth: pixi.screen.width,
                    screenHeight: pixi.screen.height,
                    worldWidth: pixi.screen.width,
                    worldHeight: pixi.screen.height
                })*/
            
        }
    }

    var initevents = function(){

        _.each(self.on, function(e, i){
            _on[i] = function(){
                on(i)
            }
        })

        window.addEventListener('resize', _on.resize);

    }

    var removeEvents = function(){

        _on = {}

        _.each(self.on, function(e, i){
            var d = [];

            _.each(e, function(c, j){
                if(j != 'me'){
                    d.push(j)
                }  
            })

            _.each(d, function(ds){
                delete e[ds] 
            })
            
        })

     
        window.removeEventListener('resize', _on.resize);
    }

    var on = function(e){

        _.each(self.on[e], function(c){
            c()
        })

    }   

    self.on = {
        resize : {
            me : function(){
                actions.renderersize()
                self.grid.render()

                if (pane){
                    pane.apply()
                }
            }
        },

        zoom : {
            me : function(){
                editor.vuem.zoom = Math.round(viewport.scaled * 100)

                if(editor.vuem.zoom == 100){

                   
                }
            }
        }
    }

    var _on = {}    

    self.viewport = {
        fit : function(){
            viewport.plugins.resume('bounce')
            viewport.plugins.plugins.bounce.bounce()

            setTimeout(function(){
                viewport.plugins.pause('bounce')
            }, 150)
        },
        init : function(){

            viewport = new Viewport.Viewport({

                screenWidth: pixi.screen.width,
                screenHeight: pixi.screen.height,
                worldWidth: pixi.screen.width,
                worldHeight: pixi.screen.height,
                interaction: pixi.renderer.plugins.interaction, 
                passiveWheel : false
            
            })

            pixi.stage.addChild(viewport)
 
            // activate plugins
            viewport
                .bounce()
                .drag()
                .wheel({
                    smooth : 10
                })

            // viewport.snap({x : 0, y : 0})

            viewport.plugins.pause('drag')
            viewport.plugins.pause('bounce')

            viewport.on('zoomed', () => {

                _on.zoom()

               

            })

            

        }
    } 

    self.grid = {
        init : function(){

            grid = {
                h : [],
                v : [],
                l : new PIXI.Container()
            }

            pixi.stage.addChild(grid.l);

        },

        clear : function(){
            _.each(grid.h, function(l){
                l.destroy()
            })

            _.each(grid.v, function(l){
                l.destroy()
            })

            grid.v = [];
            grid.h = [];
        },

        render : function({
            size = 150,
            color = 0x202030,
            width = 1
        } = {}){

            self.grid.clear()                     
    
            var line;
    
            var w = pixi.screen.width
            var h = pixi.screen.height
    
            var count = 0;
    
            count = w / size
    
            for (var i = 1; i < count; i += 1) {
    
                line = new PIXI.Graphics()
                
                line.lineStyle(width, color);
    
                line.moveTo(i * w / count, 0);
                line.lineTo(i * w / count, h);
    
                grid.l.addChild(line);
                grid.v.push(line)
    
            }
    
            count = h / size
    
            for (var i = 1; i < count; i += 1) {
    
                line = new PIXI.Graphics()
                
                line.lineStyle(width, color);
    
                line.moveTo(0, i * h / count);
                line.lineTo(w, i * h / count);
    
                grid.l.addChild(line);
                grid.h.push(line)
    
            }
            
            
        }
    }

    self.make = {
        pane : function(){
            
            pane = new PaneGlobal(pixi, editor, viewport)

            pane.init()
            
        },
    } 

    self.init = function(_el, _pixi){

        el = _el;
        pixi = _pixi;

        actions.renderersize()        

        self.grid.init()
        self.grid.render()

        self.viewport.init()
        self.make.pane()

       
        initevents()
    }

    self.destroy = function(){
        removeEvents()

        el = null;
        pixi = null;
    }

    self.get = {
        pane : function(){
            return pane
        },

        /*width : function(){
            return pane.get.width()
        },

        height : function(){
            return pane.get.height()
        },*/

        scale : function(){
            return 1
        }
    }

    self.zoom = {
        apply : function(value){
            var z = pane.get.zoom()

            z = z * value

            return pane.set.zoom(z)
        },
        set : function(z){

            viewport.setZoom(z, true)

            _on.zoom()

            return z
        },
        get : function(){

            return viewport.scaled
        },


        fit100 : function(){

            pane.maincnt.apply()
            self.zoom.set(1)    
            self.viewport.fit()
            
        },

        fitSize : function(size){

            var w = pixi.screen.width;
            var h = pixi.screen.height;

            var z = 1



            if (size.width > 0 && size.height > 0){

                var mzh = h / (size.height)
                var mzw = w / (size.width)

                var zh = h / (size.height + 40 / Math.min(mzh, mzw))
                var zw = w / (size.width + 40 / Math.min(mzh, mzw))

                z = zh;

                if(zh > zw){
                    z = zw
                }

                pane.maincnt.apply()

                self.zoom.set(z)

                self.viewport.fit()
            }
        },

        fit : function(){

            var size = editor.get.size();

            this.fitSize(size)
            
        }
    }

    self.set = {
        dragmode : function(value){

            if(dragmode == value) return

            dragmode = value

            if(value){
                viewport.plugins.resume('drag')
            }
            else{
                viewport.plugins.pause('drag')
            }
        }
    }
 
    self.apply = function()
    {
        pane.apply()
    }
    
    return self;
}

export default env