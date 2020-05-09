var Color = require('color');


var Area = function({
    text = 'Default Area Text',

    x = 0,y = 0,

    x1 = 100, y1 = 100,

    parent,

    settings = {}
}){

    var dsettings = {
        bg : '#000505',
        bgActive : '#000515',

        text : '#666699',
        textActive : '#6666AA'
    }

    settings = _.extend(dsettings, settings)

    var self = this;
    var cnt = null;

    var bg = null;
    var textl = null;

    var active = false

    var render = function(){
        var bgcolor = active ? Color(settings.bgActive) : Color(settings.bg)
        var textcolor = active ? Color(settings.textActive) : Color(settings.text)

        //bg

            

            bg.clear()
            bg.beginFill(bgcolor.rgbNumber(), 0.2);
            bg.drawRect(
                x, 
                y, 
                x1, 
                y1
            );

            bg.closePath();
            bg.endFill();

            

        // text

            var style = {

                fontFamily: 'Arial',
                fontSize: 18,
                fill: textcolor.hex(), 
                stroke: textcolor.hex(),
                strokeThickness: 0,
                align : 'center'
            }

            if (textl) 
                cnt.removeChild(textl);

            textl = new PIXI.Text(text, style);

            textl.x = x + (x1 - x) / 2
            textl.y = y + (y1 - y) / 2

            cnt.addChild(textl);
    }

    var events = {
        over : function(){
            self.active(true)
        },

        out : function(){
            self.active(false)
        }
    }

    var initevents = function(){
        cnt
            .on('pointerover', events.over)
            .on('pointerout', events.out)
    }

    self.active = function(a){
        active = a;

        render()
    }

    self.init = function(){

        cnt = new PIXI.Container();
        cnt.interactive = true

        bg = new PIXI.Graphics()
        cnt.addChild(bg);

        parent.addChild(cnt)
        
        render()

        initevents()

        return self
    }

    self.destroy = function(){

        textl.destroy()
        bg.destroy()

        cnt.removeChild(textl);
        cnt.removeChild(bg);

        cnt.destroy()
    }

    self.cnt = function(){
        return cnt
    }

    self.bg = function(){
        return bg
    }

    return self
}

export default Area