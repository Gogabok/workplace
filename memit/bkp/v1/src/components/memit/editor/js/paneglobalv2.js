
var PaneGlobal = function(pixi, editor, viewport){

    var self = this;

    var cnt = null;
    var mask = null;

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

    self.mask = {
        
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
        
        self.maincnt.init()
        self.maincnt.apply()

        self.secondcnt.init()
        self.secondcnt.apply()

        initEvents()   


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