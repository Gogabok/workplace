import TextLayer from "./text.js"
import SpriteLayer from "./sprite.js"
import Panel from "./panel.js"

import f from '@/application/functions'

import croprotate from "@/assets/icons/crop.svg"

var layers = {
    Text : TextLayer,
    Sprite : SpriteLayer
}

function hackedBounds()
{
    this._bounds.clear();

    this._calculateBounds();

    for (let i = 0; i < this.children.length; i++)
    {
        const child = this.children[i];

        if (child.lvisible /*|| !child.renderable*/)
        {
            continue;
        }

        child.calculateBounds();

        if (child._mask)
        {
            child._mask.calculateBounds();
            this._bounds.addBoundsMask(child._bounds, child._mask._bounds);
        }
        else if (child.filterArea)
        {
            this._bounds.addBoundsArea(child._bounds, child.filterArea);
        }
        else
        {
            this._bounds.addBounds(child._bounds);
        }
    }

    this._lastBoundsID = this._boundsID;
}

var Layer = function({
    type = 'Sprite'
} = {}, source, pixi, pane){

    var self = new layers[type](pixi, pane, source);

    var state = {
        dragging : false,
        rotating : false,
        data : null,
        initial : null,
        layerHover : false
    }

    var settings = {
        movebounds : {
            image : 0.1,
            text : 0.49
        },
        minscale : 0.05,
        maxscale : 10,

        panel : {
            color : '#0096EF',
            bgcolor : "#FFFFFF",
            thinkness : 2,
            size : 30,
            opacity : {
                default : 0,
                active : 1,
                hover : 1
            }
        },

        resizeIcon : {
            size : 28,
            opacity : {
                default : 0,
                active : 0.2,
                hover : 0.3,
                action : 0.6
            }
        }
    }

    

    self.px = null;
    self.pxc = null;
    self.cnt = null;

    self.id = f.makeid()
    self.pane = pane
    self.lock = false;  

    self.resizeIcon = null;
    self.panel = new Panel(self, {});
    

    self.areas = {
        rotating : 'rotating',
        dragging : 'dragging'
    }

    var _parent = null;

    self.type = type;

    if(self.type == 'Sprite') self.type = 'image'
    if(self.type == 'Text') self.type = 'text'


    self.panelactions = {
        rotate : {
            position : 'righttop',
            action : function(event){

                

                state.rotating = true

                state.initial = event.data.getLocalPosition(self.pxc);
                state.initial.rotate = rotationbase(event.data) + self.px.rotation;            
            }
        },
        scale : {
            position : 'rightbottom',
            action : function(event){

                console.log("scaling")

                state.initial = event.data.getLocalPosition(self.pxc);
                state.scaling = true

            }
        },
        edit : {
            position : 'leftbottom',
            action : function(){}
        },
        remove : {
            position : 'lefttop',
            action : function(){}
        }
    }


    if(self.type == 'image') delete self.panelactions.edit
    

    var initEvents = function(){
        self.px
            .on('pointerdown', on.dragStart)
            .on('pointerup', on.dragEnd)
            .on('pointerupoutside', on.dragEnd)
            .on('pointermove', on.drag)

            .on('pointerdown', on.layerActive)
            .on('pointerover', on.layerOver)
            .on('pointerout', on.layerOut)

            //.on('pointerupoutside', on.layerDisactive)
    }

    var destroyEvents = function(){
        self.px
            .off('pointerdown', on.dragStart)
            .off('pointerup', on.dragEnd)
            .off('pointerupoutside', on.dragEnd)
            .off('pointermove', on.drag)

            .off('pointerdown', on.layerActive)
            .off('pointerover', on.layerOver)
            .off('pointerout', on.layerOut)

            //.off('pointerupoutside', on.layerDisactive)
    }

    self._panel = {
        init : function(){
            self.panel = new PIXI.Container();

                bg = new PIXI.Graphics()
                cnt.addChild(bg);

            self.px.addChild(self.panel)
        },

        render : function(){

        }
    }

    var xybytybe = function(xy){
      
        //xy.x -= self.px.pivot.x
        //xy.y -= self.px.pivot.y

        return xy
    }

    
/*
    var area = function(xy){

        var size = (settings.resizeIcon.size / self.px.scale.x) / pane.editor.env.zoom.get()

        var wi = self.pxc.width;
        var hi = self.pxc.height;

        var x = xy.x// + wi / 2
        var y = xy.y //+ hi / 2

        if(self.type == 'text'){
            x = xy.x
            y = xy.y
        }

        size = Math.min(Math.min(wi * settings.movebounds[self.type], size), hi * settings.movebounds[self.type])


        var moveboundX = size * 2
        var moveboundY = size * 2



        var rotate = (x > wi - moveboundX) && (y < moveboundY)
        

        if (rotate) return 'rotating'

        return 'dragging'

    }*/

    var rotationbase = function(data){

        var gxy = (self.px.getGlobalPosition())

        return Math.atan2(
            data.global.x - gxy.x,
            data.global.y - gxy.y
        )
    }

    var helpers = {
        panel : {
            getopacity : function(){

                if (state.dragging) return settings.panel.opacity.active

                if (state.rotating) return settings.panel.opacity.active

                if (state.layerHover) return settings.panel.opacity.active

                return settings.panel.opacity.default
            },

            setopacity : function(){
                
                var curalpha = self.panel.px.alpha
                var toalpha = helpers.panel.getopacity()

                pane.editor.ticker.add(function(delta, percent){

                    var p = 1 - percent
    
                    self.panel.px.alpha = curalpha + p * (toalpha - curalpha)
    
                }, 'layerPanel' + self.id, 10)

            }
        }
    }

    var on = {     

        layerOver : function(){
            state.layerHover = true

            self.panel.render()
            helpers.panel.setopacity()
        },

        layerOut : function(){
            state.layerHover = false

            helpers.panel.setopacity()
        },

        layerDisactive : function(){
            pane.set.currentlayer(null)
        },

        layerActive : function(){
            pane.set.currentlayer(self)
        },

        dragStart : function(event){
           
            if(pixi.editor.vuem.dragmode) return
            if(self.lock) return

            state.data = event.data
            
            
            state.snapid = f.makeid()

            state.inilayer = {
                angle : self.px.angle,
                rotation : self.px.rotation,
                x : self.get.x(),
                y : self.get.y(),
                width : self.px.width,
                height : self.px.height,
                x1 : self.get.x1(),
                y1 : self.get.y1()
            }

            if(!state.rotating && !state.scaling) {
                console.log("DRAG", state.scaling, state.rotating)
                state.dragging = true
                state.initial = state.data.getLocalPosition(self.pxc);
            }
            else{
                state.dragging = false
            }

        },

        dragEnd : function(){


            state.dragging = false;
            state.rotating = false;
            state.scaling = false;

            state.data = null;
            state.initial = null;

            pane.editor.snap.clear(state.snapid)

            state.snapid = null

            if (self.actions.apply) 
                self.actions.apply()

            pane.editor.history.add()

            helpers.panel.setopacity();
            self.panel.render()
        },
       
        drag : function(e){

            if (state.dragging) {


                self.px.x += e.data.originalEvent.movementX / pane.editor.env.zoom.get()// newPosition.x;
                self.px.y += e.data.originalEvent.movementY / pane.editor.env.zoom.get()// newPosition.y;


                if(!self.px.rotation){
                    var snapmove = pane.editor.snap.layers.move(pane.layers, self, state.inilayer)

    
                    if (snapmove.x) self.set.x(snapmove.x.value) 
                    else 
                        if (snapmove.x1) self.set.x(snapmove.x1.value - self.px.width)
    
    
                    if (snapmove.y) self.set.y(snapmove.y.value)
                    else 
                        if (snapmove.y1) self.set.y(snapmove.y1.value - self.px.height)
                    
                    pane.editor.snap.light(self.pane.get.layerscnt(), snapmove, state.snapid)
                }

            } 

            console.log('state.scaling', state.scaling, state.dragging)

            if (state.rotating) {     
                
                self.px.rotation  = state.initial.rotate - rotationbase(e.data)   

                var snaprotation = pane.editor.snap.layers.rotation(pane.layers, self, state.inilayer)
            
                if (snaprotation){

                    self.px.rotation = snaprotation.value
                    
                }

            } 

            if (state.scaling) {

                var xy = state.data.getLocalPosition(self.pxc);   
                
                var dx = e.data.originalEvent.movementX / pane.editor.env.zoom.get()
                var dy = e.data.originalEvent.movementY / pane.editor.env.zoom.get()            

                var dxy = dx

                if (Math.abs(dx) < Math.abs(dy)) dxy = dy

                var curw = self.pxc.width * self.px.scale.x

                console.log(curw, dxy)

                var scaleD = (curw + dxy) / curw
        
                self.px.scale.x = Math.min( Math.max(self.px.scale.x * scaleD, settings.minscale), settings.maxscale)    
                self.px.scale.y = self.px.scale.x
            }

            
        }
    }


    self.init = function(parent){

        self.cnt = new PIXI.Container();
        self.px = new PIXI.Container();
        self.px.calculateBounds = hackedBounds;
        
        parent.addChild(self.cnt)

        self.cnt.addChild(self.px)
        //self.px.anchor.set(0.5);

        _parent = parent

        return self.ini().then(function(){

            if (self.type != 'text'){
                self.set.pivot()
            }

            self.panel.init()
            self.panel.render()

            self.px.interactive = true;

            initEvents()

            return Promise.resolve(self)

        })

    }

    self.set = {
        x : function(x){
            self.px.x = (x || 0) + self.px.width / 2;
        },
      
        y : function(y){
            self.px.y = (y || 0) + self.px.height / 2;
        },
        
        pivot : function(){

            var  np = {
                x : self.pxc.width / 2,
                y : self.pxc.height / 2
            }     

            var npd = {
                x : np.x - self.px.pivot.x,
                y : np.y - self.px.pivot.y
            }

            self.px.pivot.set(np.x, np.y)

            if(self.type != 'text'){

                self.px.x += npd.x
                self.px.y += npd.y

            }           


        }
    }

    self.get = {
        x : function(){
            return self.px.x - self.px.width / 2;
        },
        y : function(){
            return self.px.y - self.px.height / 2;
        },
        x1 : function(){
            return self.px.x + self.px.width - self.px.width / 2;
        },
        y1 : function(){
            return self.px.y + self.px.height -self.px.height / 2;
        },
        width : function(){
            return self.px.width
        },
        height : function(){
            return self.px.height
        },

        pivot : {
            x : function(){
                return self.px.pivot.x
            },
            y : function(){
                return self.px.pivot.y
            }
        },

        xyxy : function(){
            return {
                x : self.get.x(),
                y : self.get.y(),
                x1 : self.get.x1(),
                y1 : self.get.y1()
            }
        }
        
    }

    
    self.actions || (self.actions = {})

    self.actions.ratio = function(){
        var wi = self.pxc.width;
        var hi = self.pxc.height;
        var r = wi / hi;
        return r
    }

    self.actions.delete = function(){
        
        if (self.del)
            self.del()

        destroyEvents();

        self.cnt.removeChild(self.px)
        pane.get.cnt().removeChild(self.cnt)

        _parent.removeChild(self.cnt)
        self.cnt.destroy()

        pane.remove.layer(self.id)
        pane.set.currentlayer(self)

        delete pane.editor.env.on.zoom[self.id]

    }

    /// ALIGN IMAGES

    self.actions.align = function(max){
        var w = pane.get.width();
        var h = pane.get.height();

        

        var wi = self.px.width;
        var hi = self.px.height;

        var r = wi / hi;
        var rc = 1;
        var nw = w

        if(!max)
            nw = Math.min(w, wi);
        else nw = w

        var nh = nw / r;

        if (nh > h){

            nh = h;
            nw = nh * r
            
        }

        rc = nw / wi

        self.px.x = w / 2 - pane.get.content().x
        self.px.y = h / 2 - pane.get.content().y


        self.px.scale.set(self.px.scale.x * rc);

        //return rc

    }

    self.actions.clarifypane = function(snap){
        var imageratio = self.pxc.width / self.pxc.height
        var paneratio = pane.get.width() / pane.get.height()

        var wh = {
            width : {},
            height : {}
        }

        var whmap = {
            x : 'width',
            x1 : 'width',
            y : 'height',
            y1 : 'height',
        }

        if(imageratio != paneratio){

            _.each(pane.get.xyxy(), function(v, i){

                if(typeof snap[i] == 'undefined') wh[whmap[i]][i] = v
            })

            var rdif = imageratio - paneratio
            var kdiff = imageratio / paneratio
            var k = null;

            if ((!snap.y || !snap.y1))   k = 'height'
            if ((!snap.x || !snap.x1))   k = 'width'
            

            var l = _.toArray(wh[k]).length

            if (l && k){

                var value = pane.get[k]()
                var d = 0

                if(k == 'width') d = (kdiff * value - value) / l
                if(k == 'height') d = value * (1 / kdiff - 1)

                _.each(wh[k], function(s, c){

                    if(c == 'x' || c == 'y'){

                        var r = pane.editor.actions.coordinates.reverse(c)
                        pane.set[c](s - d / l) 
                        pane.set[r](pane.get[r]() + d / l) 
                    }
                    else{
                        pane.set[c](s + d / l) 
                    }

                })

            }

        }
    }

    self.actions.paneToposition = function(lastcoords, snap){
        var newcoords = pane.get.xyxy();
        var lastcoordscenter = {
            x : (lastcoords.x1 + lastcoords.x) / 2,
            y : (lastcoords.y1 + lastcoords.y) / 2
        }
        

        var w = (newcoords.x1 - newcoords.x)
        var h = (newcoords.y1 - newcoords.y)

        newcoords.x = lastcoordscenter.x - w / 2
        newcoords.x1 = lastcoordscenter.x + w / 2
        newcoords.y = lastcoordscenter.y - h / 2
        newcoords.y1 = lastcoordscenter.y + h / 2

        
        _.each(snap, function(c, i){
            
            var d = c.value - newcoords[i]

            var r = pane.editor.actions.coordinates.reverse(i)

            newcoords[i] = snap[i].value

            if(!snap[r]){
                newcoords[r] = newcoords[r] + d
            }           
        
        })


        pane.set.xyxy(newcoords)
    }

    self.actions.panetolayer = function(){
        pane.set.xyxy({
            x : 0,
            y : 0,
            x1 : self.px.width,
            y1 : self.px.height
        })
    }

    self.actions.fitpane = function(){
        
        var coords = pane.get.xyxy();
        var snap = pane.editor.snap.move(pane.get.xyxy(), pane)      

        pane.editor.snap.extendWithManually(snap, pane) 
        
        
        self.actions.panetolayer()
        self.actions.paneToposition(coords, snap)

        if(pane.get.width() * pane.get.height() / (self.px.width * self.px.height) < 10)
        {
            self.actions.clarifypane(snap)
            self.actions.align(true)
        }
        else{
            self.actions.align()
        }

        pane.apply()
        pane.add.controls()
        pane.editor.env.zoom.fit()
    }

    self.export = {
        data : function(){
            return {
                type : type,

                position : {
                    x : self.px.x,
                    y : self.px.y
                },

                id : self.id,
                pivot : {
                    x : self.get.pivot.x(),
                    y : self.get.pivot.y(),
                },
                rotation : self.px.rotation,
                scale : {
                    x : self.px.scale.x,
                    y : self.px.scale.y
                },

                source : self._export.source()
            }
        }
    }

    self.import = {
        data : function(d){

            self.px.pivot.set(d.pivot.x, d.pivot.y)

            self.px.x = d.position.x
            self.px.y = d.position.y

            self.px.rotation = d.rotation
            self.px.scale.x = d.scale.x
            self.px.scale.y = d.scale.y

            self.panel.render()
        }
    }

    return self
}

export default Layer