import TextLayer from "./text.js"
import SpriteLayer from "./sprite.js"

var {makeid} = require('@/application/functions.js')

console.log('makeid', makeid)

var layers = {
    Text : TextLayer,
    Sprite : SpriteLayer
}

var Layer = function({
    type = 'Sprite'
} = {}, source, pixi, pane){

    var self = new layers[type](pixi, pane, source);

    var state = {
        dragging : false,
        rotating : false,
        data : null,
        initial : null
    }

    var settings = {
        movebounds : 0.1,
        minscale : 0.05,
        maxscale : 3
    }

    self.px = null;
    self.cnt = null;
    self.id = makeid()

    self.lock = false;

    self.type = 'image'

    if(type == 'Text') self.type = 'text'
    

    var initEvents = function(){
        self.px
            .on('pointerdown', on.dragStart)
            .on('pointerup', on.dragEnd)
            .on('pointerupoutside', on.dragEnd)
            .on('pointermove', on.drag)

            .on('pointerdown', on.layerActive)
    }

    var destroyEvents = function(){
        self.px
            .off('pointerdown', on.dragStart)
            .off('pointerup', on.dragEnd)
            .off('pointerupoutside', on.dragEnd)
            .off('pointermove', on.drag)

            .off('pointerdown', on.layerActive)
    }

    var area = function(xy){

        var wi = self.px.width / self.px.scale.x;
        var hi = self.px.height / self.px.scale.y;

        var moveboundX = wi * settings.movebounds
        var moveboundY = hi * settings.movebounds

        var x = xy.x +  wi / 2
        var y = xy.y  + hi / 2


        var rotate = (/*x < moveboundX ||*/ x > wi - moveboundX) && (y < moveboundY /* || y > hi - moveboundY*/)

        if (rotate) return 'rotating'

        return 'dragging'

    }

    var on = {
        layerDisactive : function(){
            pixi.editor.setActive()
        },
        layerActive : function(){
            pixi.editor.setActive(self)

        },
        dragStart : function(event){

            if(pixi.editor.vuem.dragmode) return
                

            if(self.lock) return

            state.data = event.data

            state.initial = state.data.getLocalPosition(self.px);
            state.initialRotate = Math.atan2(event.data.global.x - self.px.position.x, event.data.global.y - self.px.position.y) + self.px.rotation
            state.initialScale = self.px.scale.x
            state.prevScale = state.initial;

            var a = area(state.initial)

            state[a] = true

        },

        dragEnd : function(){
            state.dragging = false
            state.rotating = false
            state.data = null
            state.initialRotate = null
            state.initialScale = null
        },
       
        drag : function(e){

            if (state.dragging) {
                self.px.x += e.data.originalEvent.movementX// newPosition.x;
                self.px.y += e.data.originalEvent.movementY// newPosition.y;
            } 

            if (state.rotating) {

                var xy = state.data.getLocalPosition(self.px);   
               
                var c = 0;               
              
                self.px.rotation = -Math.atan2(e.data.global.x - self.px.position.x, e.data.global.y - self.px.position.y) + state.initialRotate

                var dx = self.px.scale.x * (xy.x - state.prevScale.x) / (pixi.screen.width);
                var dy = self.px.scale.y * (xy.y - state.prevScale.y) / (pixi.screen.height);

                
                if(dx > 0 && dy < 0) c = 1
                if(dx < 0 && dy > 0) c = -1
                

                self.px.scale.x = Math.min(Math.max( self.px.scale.x * (1 + 0.1 * c * Math.sqrt(dx*dx + dy*dy)), settings.minscale), settings.maxscale)
                self.px.scale.y = self.px.scale.x

            } 
        }
    }


    self.init = function(parent){

        self.cnt = new PIXI.Container();

        parent.addChild(self.cnt)

        return self.ini().then(function(){

            self.px.pivot.set(0.5);

            self.px.interactive = true;


            initEvents()

            return Promise.resolve(self)

        })

    }

    
    self.actions || (self.actions = {})

    self.actions.align = function(){
        var w = pane.get.width();
        var h = pane.get.height();

        var wi = self.px.width;
        var hi = self.px.height;

        var r = wi / hi;
        var rc = 1;


        var nw = Math.min(w, wi);

        var nh = nw / r;

        if (nh > h){

            nh = h;
            nw = nh * r
            
        }

        rc = nw / wi

        self.px.x = w / 2
        self.px.y = h / 2

        self.px.scale.set(rc);

    }


    self.actions.delete = function(){
        
        if (self.del)
            self.del()

        destroyEvents();

        self.cnt.removeChild(self.px)
        pane.get.cnt().removeChild(self.cnt)

        pane.remove.layer(self.id)

        pixi.editor.setActive()

    }

    return self
}

export default Layer