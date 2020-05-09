
var PaneGlobal = function(pixi, editor, viewport){

    var self = this;

    var cnt = null;
    var mask = null;

    var maskWidth = 0,
        maskHeight = 0;

        self.mcnt = null;
        self.scnt = null;


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
            self.scnt.zIndex = 2;
            self.scnt.sortableChildren = true

            self.mcnt.addChild(self.scnt);

            this.test()
        },

        apply : function(){

            var c = self.get.center()

            self.scnt.x = c.x
            self.scnt.y = c.y

            self.scnt.pivot.set(c.x, c.y)

           
     
        }
    }

    self.grid = function(){
        ////center

        return

        var c = self.get.center()

        var color = 0x102066
        var width = 3

        var cxline = new PIXI.Graphics()
                
            cxline.lineStyle(width, color);

            cxline.moveTo(c.x - 100, c.y);
            cxline.lineTo(c.x + 100, c.y);

            cnt.addChild(cxline);

        var cyline = new PIXI.Graphics()
            
            cyline.lineStyle(width, color);

            cyline.moveTo(c.x, c.y - 100);
            cyline.lineTo(c.x, c.y + 100);

            cnt.addChild(cyline);

    }

    self.maincnt = {
        
        init : function(){
            self.mcnt = new PIXI.Container();
            self.mcnt.sortableChildren = true;

            cnt.addChild(self.mcnt);
        },
        apply : function(){

            var size = editor.get.size();


            self.mcnt.x = (-size.x + (pixi.screen.width  - size.width) / 2) 
            self.mcnt.y = (-size.y + (pixi.screen.height - size.height) / 2)

            
        }
       
    }

    self.apply = function(){
        
    }

    self.init = function(){

        cnt = new PIXI.Container(); 
        cnt.pivot.set(0.5)

        viewport.addChild(cnt);
        
        self.maincnt.init()
        self.maincnt.apply()

        self.secondcnt.init()
        self.secondcnt.apply()

        self.grid()

    }

    self.get = {
        cnt : function(){
            return cnt
        },

        /*width : function(){

            var s = maskWidth / maxWidth


            return maskWidth / s
        },

        height : function(){

            var s = maskWidth / maxWidth

            return maskHeight / s
        },

        scale : function(){
            return  maskWidth / maxWidth
        },*/

        center : function(){
            return {
                x : pixi.screen.width / 2,
                y : pixi.screen.height / 2
            }
        }
    }

    self.set = {
      
        
    }

    return self;
}

export default PaneGlobal