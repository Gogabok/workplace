var Color = require('color');


var Light = function({

    width, height,

    parent,

    settings = {}
}){

    var dsettings = {
        bg : '#000505',
        bgActive : '#000515',

        bgOpacity : 0.0,
        bgOpacityActive : 0.15,

        line : '#666699',
        lineActive : '#6666AA',
        
    }

    settings = _.extend(dsettings, settings)

    var self = this;
    var cnt = null;

    var bg = null;
    var active = false
    var disabled = true

    var render = function(){
        var bgcolor = active ? Color(settings.bgActive) : Color(settings.bg)
        var linecolor = active ? Color(settings.lineActive) : Color(settings.line)

        //bg

        bg.clear()

        if(!disabled){
            bg.beginFill(bgcolor.rgbNumber(), active ? settings.bgOpacity : settings.bgOpacityActive);
            bg.drawRect(
                0, 
                0, 
                width(), 
                height()
            );

            bg.closePath();
            bg.endFill();    
        }           

    }

    self.enable = function(){
        disabled = false;
        render()
    }

    self.disable = function(){
        
        disabled = true;
        render()
    }

    self.active = function(a){
        active = a;
        render()
    }

    self.apply = function(){
        render()
    }

    self.init = function(){

        cnt = new PIXI.Container();

        bg = new PIXI.Graphics()
        cnt.addChild(bg);

        parent.addChild(cnt)
        
        render()

        return self
    }

    self.destroy = function(){

        bg.destroy()
        cnt.removeChild(bg);

        cnt.destroy()
    }

    self.cnt = function(){
        return cnt
    }

    return self
}

export default Light