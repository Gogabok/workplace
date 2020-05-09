import image from "@/assets/logo28.png"

var PaneGlobal = function(pixi, editor, viewport){

    var self = this;

    var cnt = null;
    var mask = null;

    var maxWidth = 1024;
    var maxHeight= 1024;

    var maskWidth = 0,
        maskHeight = 0;

        self.mcnt = null;
        self.scnt = null;

    var offset = {
        x : 0,
        y : 0
    }

    var initEvents = function(){
    }

    var destroyEvents = function(){
      
    }

    var state = {
        dragging : false
    }

    var on = {
       
        dragStart : function(event){

            if(!pixi.editor.vuem.dragmode) return

            state.dragging = true

        },

        dragEnd : function(){
            state.dragging = false
        },
       
        drag : function(e){

            if(!pixi.editor.vuem.dragmode){
                state.dragging = false;
            }

            if (state.dragging) { 

                offset.x -= e.data.originalEvent.movementX
                offset.y -= e.data.originalEvent.movementY

                self.secondcnt.apply()
            } 

        }
    }

    self.mask = {
        apply : function(){

            return

            var w = pixi.screen.width
            var h = pixi.screen.height

            mask.clear();

            mask.lineStyle(0);
            mask.beginFill(0xFFFFFF, 1);
            
            mask.moveTo(-maskWidth / 2, -maskHeight / 2);
            mask.lineTo( maskWidth / 2, -maskHeight / 2);
            mask.lineTo( maskWidth / 2,  maskHeight / 2);
            mask.lineTo(-maskWidth / 2,  maskHeight / 2);

            mask.closePath();
            mask.endFill();

            mask.x = w / 2;
            mask.y = h / 2;

        },
        add : function(){


            /*mask = new PIXI.Graphics();

            cnt.addChild(mask);
            cnt.mask = mask;*/

            
        },
        size : function(){

            var ratio = editor.pane.ratio();

            var w = pixi.screen.width
            var h = pixi.screen.height

            var _maskWidth = 0,
                _maskHeight = 0;

                _maskWidth = Math.min(maxWidth, w) 
                _maskHeight = _maskWidth / ratio

            var maxHeightInPixi = Math.min(maxHeight, h) 

            if (_maskHeight > maxHeightInPixi){
                _maskHeight = maxHeightInPixi
                _maskWidth = _maskHeight * ratio
            }

            

            maskWidth = _maskWidth;
            maskHeight = _maskHeight;

            console.log('apply', maskWidth, maskHeight)

        }
    }

    self.secondcnt = {

        test : function(){

            return

            var bg = new PIXI.Graphics();

            bg.beginFill(0x000000, 1);
            bg.drawRect(
                0, 
                0, 
                20, 
                20
            );

            bg.closePath();
            bg.endFill();

            self.scnt.addChild(bg);

            var bg2 = new PIXI.Graphics();

            bg2.beginFill(0x000000, 1);
            bg2.drawRect(
                maskWidth / self.mcnt.scale.x - 20, 
                maskHeight / self.mcnt.scale.y - 20, 
            
                20,
                20
            );

            bg2.closePath();
            bg2.endFill();

            self.scnt.addChild(bg2);

            var bg3 = new PIXI.Graphics();

            bg3.beginFill(0x000000, 1);
            bg3.drawRect(
                maskWidth / 2/ self.mcnt.scale.y, 
                maskHeight / 2/ self.mcnt.scale.y, 
            
                20,
                20
            );

            bg3.closePath();
            bg3.endFill();

            self.scnt.addChild(bg3);

            var bg4 = new PIXI.Graphics();

            bg4.beginFill(0x000000, 1);
            bg4.drawRect(
                maskWidth - 20, 
                maskHeight - 20, 
            
                20,
                20
            );

            bg4.closePath();
            bg4.endFill();

            self.scnt.addChild(bg4);
        },
        
        init : function(){
            self.scnt = new PIXI.Container();

            self.mcnt.addChild(self.scnt);
            
            self.scnt.interactive = true
            this.test()

           

        },

       

        apply : function(){

            var c = self.get.center()

            self.scnt.x = c.x
            self.scnt.y = c.y

            self.scnt.pivot.set(c.x + offset.x, c.y + offset.y)
     
        }
    }

    self.maincnt = {

        test : function(){

            var bg = new PIXI.Graphics();

            bg.beginFill(0x000000, 1);
            bg.drawRect(
                0, 
                0, 
                20, 
                20
            );

            bg.closePath();
            bg.endFill();

            self.mcnt.addChild(bg);

            var bg2 = new PIXI.Graphics();

            bg2.beginFill(0x000000, 1);
            bg2.drawRect(
                maskWidth / self.mcnt.scale.x - 20, 
                maskHeight / self.mcnt.scale.y - 20, 
            
                20,
                20
            );

            bg2.closePath();
            bg2.endFill();

            self.mcnt.addChild(bg2);

            var bg3 = new PIXI.Graphics();

            bg3.beginFill(0x000000, 1);
            bg3.drawRect(
                maskWidth / 2/ self.mcnt.scale.y, 
                maskHeight / 2/ self.mcnt.scale.y, 
            
                20,
                20
            );

            bg3.closePath();
            bg3.endFill();

            self.mcnt.addChild(bg3);

            var bg4 = new PIXI.Graphics();

            bg4.beginFill(0x000000, 1);
            bg4.drawRect(
                maskWidth - 20, 
                maskHeight - 20, 
            
                20,
                20
            );

            bg4.closePath();
            bg4.endFill();

            self.mcnt.addChild(bg4);
        },
        
        init : function(){
            self.mcnt = new PIXI.Container();


            cnt.addChild(self.mcnt);
        },

        scale : function(){
            var s = maskWidth / maxWidth

            self.mcnt.scale.set(s)
        },

        apply : function(){

            var w = pixi.screen.width
            var h = pixi.screen.height

            self.mcnt.x = (w - maskWidth) / 2
            self.mcnt.y = (h - maskHeight) / 2 

            self.mcnt.pivot.set(0, 0)

            self.maincnt.scale()

            
        }
    }

    self.apply = function(){
        self.mask.size()  
        self.mask.apply()   
        self.maincnt.apply()  
        //self.secondcnt.apply()  
    }

    self.init = function(){

        cnt = new PIXI.Container(); 
        cnt.pivot.set(0.5)
        

        viewport.addChild(cnt);

        self.mask.size()
        self.mask.add()
        self.mask.apply()      
        
        self.maincnt.init()
        self.maincnt.apply()

        //self.maincnt.test()

        self.secondcnt.init()
        self.secondcnt.apply()

        initEvents()   
        
        ////

        /*var bg = new PIXI.Graphics();

        bg.beginFill(0x000000, 0.3);
        bg.drawRect(0, 0, pixi.screen.width, pixi.screen.height);

        bg.closePath();
        bg.endFill();

        cnt.addChild(bg);*/

        



    }

    self.get = {
        cnt : function(){
            return cnt
        },

        width : function(){

            var s = maskWidth / maxWidth

            console.log('maskWidth, maxWidth, s', maskWidth, maxWidth, s)

            return maskWidth / s
        },

        height : function(){

            var s = maskWidth / maxWidth

            return maskHeight / s
        },

        scale : function(){
            return  maskWidth / maxWidth
        },

      
        relativexy : function(screenxy){
            var w = pixi.screen.width / 2 
            var h = pixi.screen.height / 2

            var nx = (screenxy.x - w + maskWidth / 2) / self.mcnt.scale.x
            var ny = (screenxy.y - h + maskHeight / 2) / self.mcnt.scale.y

            return {
                x : nx,
                y : ny
            }
        },

        center : function(){
            return {
                x : (maskWidth  /  self.mcnt.scale.x) / 2,
                y : (maskHeight  /  self.mcnt.scale.y) / 2
            }
        }
    }

    self.set = {
      
        
    }

    return self;
}

export default PaneGlobal