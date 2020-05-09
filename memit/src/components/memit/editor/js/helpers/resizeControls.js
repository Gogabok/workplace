var Color = require('color');

import Area from "./area"
import f from '@/application/functions'


var ResizeControls = function({
    pane,
    settings = {},
    direction = 'right'
}){
    var self = this;

    var active = false;
    var cnt = null;

    var bg, cross, cntbgcross;

    var id = f.makeid()

    var dsettings = {
        size : 20,
        width : 1,
        color : '#2020CC',
        colorActive : '#4020FF',
        bg : '#000505',
        scale : 0.5
    }

    var state = {
        dragging : false,
        resize : false,
        last : {},
        initial : {},
        apply : {}
    }

    var places = {

        addpane : {
            text : "Add Pane",
            area : null,

            x : 0,
            y : 0,

            x1 : 0,
            y1 : 0,

            events : function(cnt){
                cnt.on('pointerover', function(){

                    state.addpane = true

                    actions.cancelResize()

                    //actions.reducePane()
                    
                })

                .on('pointerout', function(){

                    state.addpane = false
                    state.resize = true

                    //actions.increasePane()
                })
            }
        },

        cancel : {
            text : "Cancel",
            area : null,

            x : 0,
            y : 0,

            x1 : 0,
            y1 : 0,

            events : function(cnt){

                cnt.on('pointerover', function(){
                    actions.cancelResize()
                })

                .on('pointerout', function(){
                    state.resize = true
                })
            }
        }

    }

    settings = _.extend(dsettings, settings)

    var render = function(){        
        
        
        var l = pane.get.cnt()

        var bgcolor = Color(settings.bg)
        var linecolor = active ? Color(settings.colorActive) : Color(settings.color);

        var size =  (settings.size / l.scale.x)
        var width = (settings.width / l.scale.x)

        var opacity = 1;

        cnt.visible = true
      
        if (pane.active) {

        }
        else{

            /*if(pane.hoveractive){
               
                opacity = 0.2
            }
            else{*/
                cnt.visible = false   

                return
            //}
                
        }

        ///// bg

           
            bg.clear()   

            bg.beginFill(bgcolor.rgbNumber(), opacity);
            bg.drawCircle (
                0, 0, size
            );

            bg.closePath();
            bg.endFill();

            

        ////// cross

            linecolor.alpha(opacity)
            
            cross.clear()   
            
            cross.lineStyle(width, linecolor.rgbNumber());

            cross.moveTo(0 - size / 2, 0 );
            cross.lineTo(0 + size / 2, 0 );

            cross.moveTo(0, 0 - size / 2);
            cross.lineTo(0, 0 + size / 2);

            cntbgcross.scale.x = 1 / pane.editor.env.zoom.get()
            cntbgcross.scale.y = 1 / pane.editor.env.zoom.get()
    }

    var makeareas = function(){

        var height = pane.pixi.screen.height;
        var width = pane.pixi.screen.width;
       

        if(direction == 'right' || direction == 'left') { 
            places.addpane.x = -100
            places.addpane.y = -80
            
            places.addpane.x1 = 100
            places.addpane.y1 = -30

            places.cancel.x = -60
            places.cancel.y = 80
            
            places.cancel.x1 = 60
            places.cancel.y1 = 30
        }

        if(direction == 'top') { 
            places.addpane.x = -230
            places.addpane.y = 30
            
            places.addpane.x1 = -30
            places.addpane.y1 = 80

            places.cancel.x = 30
            places.cancel.y = 30
            
            places.cancel.x1 = 230
            places.cancel.y1 = 80
        }

        if(direction == 'bottom') { 
            places.addpane.x = -230
            places.addpane.y = -30
            
            places.addpane.x1 = -30
            places.addpane.y1 = -80

            places.cancel.x = 30
            places.cancel.y = -30
            
            places.cancel.x1 = 230
            places.cancel.y1 = -80
        }

        _.each(places, function(place){
            place.area = new Area({
                text : place.text,
                x : place.x, 
                y : place.y,
                x1 : place.x1,
                y1: place.y1,

                parent : cnt,

                settings : {
                    opacity : 0.9,
                    bg : "#0044dd",
                    bgActive : '#2667fc',
                    text : "#ffffff",
                    textActive: "#ffffff"
                }
            }).init()

            var c = place.area.cnt();
                c.scale.x = 1 / pane.editor.env.zoom.get()
                c.scale.y = 1 / pane.editor.env.zoom.get()
                c.buttonMode = true;

            place.events(c)

            //place.area.cnt().zIndex = 10000
        })
 
       
    }

    var position = function(){

        var height = pane.get.height()
        var width = pane.get.width()

        var x = 0,
            y = 0;

        
        if(direction == 'left')     { x = 0;  y = height / 2}
        if(direction == 'bottom')   { x = width / 2;  y = height}
        if(direction == 'right')    { x = width;  y = height / 2}
        if(direction == 'top')      { x = width / 2;  y = 0}

        cnt.x = x
        cnt.y = y      
        
        state.initial.x = 0
        state.initial.y = 0
    }

    var add = function(){
        
        cnt = new PIXI.Container();
        //cnt.sortableChildren = true

        cntbgcross  = new PIXI.Container();
        cntbgcross.zIndex = 1000
        cntbgcross.interactive = true
        cntbgcross.buttonMode = true;
        cnt.addChild(cntbgcross);

        bg  = new PIXI.Graphics()
        cntbgcross.addChild(bg);

        cross = new PIXI.Graphics()         
        cntbgcross.addChild(cross);

        position()

        cnt.zIndex = 10000

        pane.get.cnt().addChild(cnt)

    }

    var actions = {

        cancelResize : function(){
            state.resize = false
            
            pane.manuallyResized = _.clone(state.manuallyResized)

            pane.set.width(state.width)
            pane.set.height(state.height)
        },
        reducePane : function(){
            /// calculation

            var height = pane.get.height()
            var width = pane.get.width()

            var l = pane.get.layerscnt()

                /// pane

                var n = {
                    x : 0,
                    y : 0
                }
            
                if(direction == 'left')     { n.x = width / 2;  n.y = height / 2 - settings.scale * height / 2}
                if(direction == 'bottom')   { n.x = width / 2 - settings.scale * width / 2;  n.y = 0}
                if(direction == 'right')    { n.x = 0;  n.y = height / 2 - settings.scale * height / 2}
                if(direction == 'top')      { n.x = width / 2 - settings.scale * width / 2;  n.y = height / 2}

                /// marker

                var nm = {
                    x : 0,
                    y : 0
                }

                if(direction == 'left')     { n.x = width / 2;  n.y = height / 2 - settings.scale * height / 2}
                if(direction == 'bottom')   { n.x = width / 2 - settings.scale * width / 2;  n.y = 0}
                if(direction == 'right')    { nm.x = nm.x + width / 2; }
                if(direction == 'top')      { n.x = width / 2 - settings.scale * width / 2;  n.y = height / 2}

            /// animation   

            pane.editor.ticker.add(function(delta, percent){

                var p = 1 - percent

                l.scale.x = 1 - p * settings.scale
                l.scale.y = 1 - p * settings.scale

                l.x = p * n.x
                l.y = p * n.y

                //render()

            }, 'panezoom', 10)
        },

        
        increasePane : function(){

            var l = pane.get.layerscnt()

            var c = {
                x : l.x,
                y : l.y
            }

            pane.editor.ticker.add(function(delta, percent){

                var p = 1 - percent

                l.scale.x = 1 - percent * settings.scale
                l.scale.y = 1 - percent * settings.scale

                l.x = c.x - c.x * p
                l.y = c.y - c.y * p

                //render()

            }, 'panezoom', 10)
        },

        resizeaddmodeEnter : function(){
            pane.resizeaddmode = true;


            pane.get.light().enable()

            /// add areas

            makeareas()

            
        },

        resizeaddmodeLeave : function(){

            var layerscnt = pane.get.layerscnt()

            if(!state.resize){
                pane.set.width(state.width)
                pane.set.height(state.height)
            }

            if (state.addpane)
                actions.increasePane()
            
            cntbgcross.x = state.initial.x
            cntbgcross.y = state.initial.y


            pane.get.light().disable()

            //

            pane.add.controls()

            if (state.resize && !state.addpane){

                if (layerscnt.x){
                    pane.set.x(pane.get.x() + layerscnt.x)
                    pane.manuallyResized.x = true
                }

                if (layerscnt.y){
                    pane.set.y(pane.get.y() + layerscnt.y)
                    pane.manuallyResized.y = true
                }

            }

            layerscnt.x = 0;
            layerscnt.y = 0;

            

            _.each(places, function(place){

                if (place.area)
                    place.area.destroy()
                    place.area = null

            })  
     
        }
    }

    var events = {
        over : function(){
            active = true;

            render()
        },

        out : function(){
            active = false;

            render()
        },

        dragStart : function(event){


            var content = pane.get.content()

            state.data = event.data

            state.x = state.data.originalEvent.x
            state.y = state.data.originalEvent.y
            state.lx = content.x
            state.ly = content.y
            state.xyxy = pane.get.xyxy()
            state.manuallyResized = _.clone(pane.manuallyResized)

            state.dragging = true
            state.resize = true

            state.width = pane.get.width()
            state.height = pane.get.height()

            state.snapid = f.makeid();

            actions.resizeaddmodeEnter()
            

        },

        dragEnd : function(){

            if(state.dragging){
                pane.resizeaddmode = false;

                actions.resizeaddmodeLeave()

                if (state.addpane){
                    pane.editor.actions.add.panedirection(pane, direction)
                }

                pane.editor.env.zoom.fit()

                state.resize = false
                state.dragging = false
                state.addpane = false
                
                pane.editor.snap.clear(state.snapid)

                state.snapid = null

                position()

                pane.editor.history.add()
            }
            
            
            
        },
       
        drag : function(e){

            if (state.dragging) {
                cntbgcross.x += e.data.originalEvent.movementX / pane.editor.env.zoom.get()
                cntbgcross.y += e.data.originalEvent.movementY / pane.editor.env.zoom.get()

                if (state.resize){

                   events.resize(e)

                }
            } 

        },

        resize : function(e){

            var w = state.width
            var h = state.height

            var content = pane.get.content()
            var layerscnt = pane.get.layerscnt()

            var pmovex = (state.x - e.data.originalEvent.x) / pane.editor.env.zoom.get()
            var pmovey = (state.y - e.data.originalEvent.y) / pane.editor.env.zoom.get()


            if (direction == 'right'){
                w = state.width - pmovex
            }

            if (direction == 'left'){
                w = state.width + pmovex
            }

            if (direction == 'top'){
                h = state.height + pmovey
            }

            if (direction == 'bottom'){
                h = state.height - pmovey
            }

            var x = (state.width - w)
            var y = (state.height - h)


            var xcnt = pane.get.x()
            var ycnt = pane.get.y()


            if(w > 100 && h > 100){

                var newcoords = {
                    x : xcnt,
                    y : ycnt,
                    x1 : xcnt + w,
                    y1 : ycnt + h
                }

                if (direction == 'left' || direction == 'top'){
                    newcoords.x += x
                    newcoords.y += y
                    newcoords.x1 += x
                    newcoords.y1 += y
                }             

                var otherpanes = pane.editor.get.otherPanes(pane)


                    var s = pane.editor.snap.moveapply(newcoords, pane, state.xyxy)
                    newcoords = s.xyxy
                    
                    pane.editor.snap.light(pane.editor.env.get.pane().mcnt, s.snap, state.snapid)

                    var bs = _.map(otherpanes, p=>{
                        return p.get.xyxy()
                    })

                    var c = pane.editor.actions.collisions.intersections.block(newcoords, bs)


                    if (c.length) {


                        newcoords = pane.editor.actions.collisions.intersections.objectToBorder(newcoords, c, direction)
                       
                        if(!newcoords) return
                        //return
                    }
                  

                if(newcoords.x1 - newcoords.x > 100 && newcoords.y1 - newcoords.y > 100){

                    if (direction == 'left'){
                        content.x = state.lx - (newcoords.x - xcnt)
                        layerscnt.x = newcoords.x - xcnt
                    }
    
                    if (direction == 'top'){
                        content.y = state.ly - (newcoords.y - ycnt)
                        layerscnt.y = newcoords.y - ycnt
                    }

                    var lx1 = pane.get.x1()
                    var ly1 = pane.get.y1()
    
                    pane.set.width(newcoords.x1 - newcoords.x)
                    pane.set.height(newcoords.y1 - newcoords.y) 

                    if (direction == 'right' && newcoords.x1 != lx1){
                        pane.manuallyResized.x1 = true
                    } 
                    
                    if (direction == 'bottom' && newcoords.y1 != ly1){
                        pane.manuallyResized.y1 = true
                    } 
                   
                }
                
                
            }

           
        }
    }

    var initevents = function(){
        cntbgcross
            .on('pointerover', events.over)
            .on('pointerout', events.out)

            .on('pointerdown', events.dragStart)
            .on('pointerup', events.dragEnd)
            .on('pointerupoutside', events.dragEnd)
            .on('pointermove', events.drag)


        pane.editor.env.on.zoom[id] = render
    }

    var removeevents = function(){
        cntbgcross
            .off('pointerover', events.over)
            .off('pointerout', events.out)

            .off('pointerdown', events.dragStart)
            .off('pointerup', events.dragEnd)
            .off('pointerupoutside', events.dragEnd)
            .off('pointermove', events.drag)

        delete pane.editor.env.on.zoom[id]
    }

    self.init = function(){

        add()

        render()

        initevents()

        return self;
    }

    self.render = render
    self.position = position

    self.destroy = function(){
        removeevents()

        cntbgcross.removeChild(bg);
        cntbgcross.removeChild(cross);

        cnt.removeChild(cntbgcross);

        cnt.destroy()
    }   

    return self;
}

export default ResizeControls