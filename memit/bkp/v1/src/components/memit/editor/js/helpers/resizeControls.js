var Color = require('color');

import Area from "./area"

var ResizeControls = function({
    pane,
    settings = {},
    direction = 'right'
}){
    var self = this;

    var active = false;
    var cnt = null;

    var bg, cross;

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
        initial : {}
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
                })

                .on('pointerout', function(){
                    state.addpane = false
                })
            }
        },

        resize : {
            text : "Resize current Pane",
            area : null,

            x : 0,
            y : 0,

            x1 : 0,
            y1 : 0,

            events : function(cnt){


                cnt.on('pointerover', function(){

                    actions.increasePane()

                    state.resize = true
                })

                .on('pointerout', function(){
                    actions.reducePane()

                    state.resize = false

                    pane.set.ratio(state.ratio)
                })
            }
        }

    }

    settings = _.extend(dsettings, settings)

    var render = function(){          
        
        var l = pane.get.cnt()

        var bgcolor = Color(settings.bg)
        var linecolor = active ? Color(settings.colorActive) : Color(settings.color);

        var size =  (settings.size / l.scale.x) / pane.editor.env.get.scale() / pane.editor.env.zoom.get()
        var width = (settings.width / l.scale.x) / pane.editor.env.get.scale() / pane.editor.env.zoom.get()

        ///// bg

        
           
            bg.clear()   

            bg.beginFill(bgcolor.rgbNumber(), 1);
            bg.drawCircle (
                0, 0, size
            );

            bg.closePath();
            bg.endFill();

            

        ////// cross

            
            cross.clear()   
            
            cross.lineStyle(width, linecolor.rgbNumber());

            cross.moveTo(0 - size / 2, 0 );
            cross.lineTo(0 + size / 2, 0 );

            cross.moveTo(0, 0 - size / 2);
            cross.lineTo(0, 0 + size / 2);

            
    }

    var makeareas = function(){

        var height = pane.get.height()
        var width = pane.get.width()
        
        if(direction == 'left') { 
            places.addpane.x = 0
            places.addpane.y = 0
            
            places.addpane.x1 = 0
            places.addpane.y1 = 0

            //

            places.resize.x = 0
            places.resize.y = 0

            places.resize.x1 = 0
            places.resize.y1 = 0
        }

        if(direction == 'left') { 
            places.addpane.x = 0
            places.addpane.y = 0
            
            places.addpane.x1 = 0
            places.addpane.y1 = 0

            //

            places.resize.x = 0
            places.resize.y = 0

            places.resize.x1 = 0
            places.resize.y1 = 0
        }

        if(direction == 'right') { 
            places.addpane.x = width / 2 + settings.size / 2
            places.addpane.y = 0
            
            places.addpane.x1 = width - settings.size / 2
            places.addpane.y1 = height / 2 - settings.size * 1.5

            //

            places.resize.x = width / 2 + settings.size / 2
            places.resize.y =  height / 2 + settings.size * 1.5

            places.resize.x1 = width - settings.size / 2
            places.resize.y1 = height - settings.size / 2
        }

        _.each(places, function(place){
            place.area = new Area({
                text : place.text,
                x : place.x, 
                y : place.y,
                x1 : place.x1,
                y1: place.y1,

                parent : pane.get.cnt()
            }).init()


            place.events(place.area.cnt())

            //place.area.cnt().zIndex = 10000
        })
 
       
    }

    var add = function(){

        var height = pane.get.height()
        var width = pane.get.width()

            cnt = new PIXI.Container();
            cnt.interactive = true
            cnt.buttonMode = true;

            bg  = new PIXI.Graphics()
            cnt.addChild(bg);

            cross = new PIXI.Graphics()         
            cnt.addChild(cross);

        var x = 0,
            y = 0;

        
        if(direction == 'left')     { x = 0 + settings.size / 2;  y = height / 2 + settings.size / 2}
        if(direction == 'bottom')   { x = width / 2+ settings.size / 2;  y = height - settings.size / 2}
        if(direction == 'right')    { x = width - settings.size / 2;  y = height / 2 + settings.size / 2}
        if(direction == 'top')      { x = width / 2+ settings.size / 2;  y = 0 + settings.size / 2}

        cnt.x = x
        cnt.y = y      
        
        state.initial.x = x
        state.initial.y = y

        cnt.zIndex = 10000

        pane.get.cnt().addChild(cnt)

    }

    var actions = {

        
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

            this.reducePane()

            pane.get.light().enable()

            /// add areas

            makeareas()

            
        },

        resizeaddmodeLeave : function(){

            if(!state.resize){
                pane.set.ratio(state.ratio)
            }
            
            pane.resizeaddmode = false;

            actions.increasePane()

            cnt.x = state.initial.x
            cnt.y = state.initial.y

            //render()

            //pane.get.light().disable()

           

            pane.editor.env.apply()


                pane.get.light().enable()

                pane.add.controls()

           


            _.each(places, function(place){

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

            state.data = event.data

            state.x = state.data.originalEvent.x
            state.y = state.data.originalEvent.y

            state.dragging = true

            state.ratio = pane.get.ratio()

            actions.resizeaddmodeEnter()

        },

        dragEnd : function(){

            
            state.dragging = false
            

            pane.resizeaddmode = false;

            actions.resizeaddmodeLeave()

            state.resize = false
        },
       
        drag : function(e){

            if (state.dragging) {
                cnt.x += e.data.originalEvent.movementX / pane.editor.env.get.scale() / pane.editor.env.zoom.get()
                cnt.y += e.data.originalEvent.movementY / pane.editor.env.get.scale() / pane.editor.env.zoom.get()

                if (state.resize){

                   events.resize(e)

                }
            } 

        },

        resize : function(e){
            var to = 0;
            var from = state.ratio
            var pmove = 0;

            if (direction == 'right' || direction == 'left'){
                to = 0.3
            }
            else{
                to = 3
            }

            if (direction == 'right'){
                pmove = ( state.x - e.data.originalEvent.x) / (places.resize.x1 - places.resize.x)// / pane.editor.env.get.scale() / pane.editor.env.zoom.get()
            }

            var ratio = from - (from - to) * pmove

            pane.set.ratio(ratio)

            //pane.editor.env.apply()
        }
    }

    var initevents = function(){
        cnt
            .on('pointerover', events.over)
            .on('pointerout', events.out)

            .on('pointerdown', events.dragStart)
            .on('pointerup', events.dragEnd)
            .on('pointerupoutside', events.dragEnd)
            .on('pointermove', events.drag)
    }

    var removeevents = function(){
        cnt
            .off('pointerover', events.over)
            .off('pointerout', events.out)

            .off('pointerdown', events.dragStart)
            .off('pointerup', events.dragEnd)
            .off('pointerupoutside', events.dragEnd)
            .off('pointermove', events.drag)
    }

    self.init = function(){

        add()

        render()

        initevents()

        return self;
    }

    self.render = render

    self.destroy = function(){
        removeevents()

        cnt.removeChild(bg);
     
        cnt.removeChild(cross);

        cnt.destroy()
    }   

    return self;
}

export default ResizeControls