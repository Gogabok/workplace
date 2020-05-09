var Color = require('color');

let textures = {
    rotate : require('!!raw-loader!@opuscapita/svg-icons/lib/rotate_right.svg').default,
    scale : require('!!raw-loader!@opuscapita/svg-icons/lib/crop_free.svg').default,
    edit : require('!!raw-loader!@opuscapita/svg-icons/lib/edit.svg').default,
    remove : require('!!raw-loader!@opuscapita/svg-icons/lib/cancel.svg').default,   
}

var LayerPanel = function(layer, {
    color = '#0096EF',
    bgcolor = "#FFFFFF",
    thinkness = 2,
    size = 30
}){
    var self = this
        self.px = null

    var border = null
    var icons = {

    }

    self.init = function(){

        icons = {}

        self.px = new PIXI.Container();
       

        border = new PIXI.Graphics();

        self.px.addChild(border);       

        layer.px.addChild(self.px)

        self.px.lvisible = true
        self.px.alpha = 0

        _.each(layer.panelactions, function(a, i){

            //textures[i].contentDocument.getElementsByTagName("svg")[0]

            var texture = PIXI.Texture.from(textures[i]);

            var icn = {}

                icn.cnt = new PIXI.Container();
                icn.spacer = new PIXI.Graphics();
                icn.bg = new PIXI.Graphics();

                icn.icon = new PIXI.Sprite(texture); 
                
                icn.icon.anchor.set(0.5);
                

                icn.cnt.addChild(icn.spacer);   
                icn.cnt.addChild(icn.bg);   
                icn.cnt.addChild(icn.icon);   

                self.px.addChild(icn.cnt);     

                icons[i] = icn

                console.log('a', a)

                icn.spacer.interactive = true
                icn.spacer.on('pointerdown', a.action)

        })

        layer.pane.editor.env.on.zoom[layer.id + 'panel'] = self.render

    }

    self.render = function(){

        if(!self.px) return

        var _thinkness = (thinkness  / layer.px.scale.x) / layer.pane.editor.env.zoom.get()
        var _size = (size  / layer.px.scale.x) / layer.pane.editor.env.zoom.get()
        var _bsize = _size * 1.5


        border.clear()
        

        border.beginFill(Color(color).rgbNumber(), 1);

        border.drawRect(
            - _thinkness / 2, 
            - _thinkness / 2, 
            layer.pxc.width + _thinkness, 
            _thinkness
        );

        border.drawRect(
            - _thinkness / 2, 
            - _thinkness / 2, 
            _thinkness,
            layer.pxc.height + _thinkness, 
        );

        border.drawRect(
            layer.pxc.width - _thinkness / 2, 
            - _thinkness / 2, 
            _thinkness, 
            layer.pxc.height  + _thinkness
        );

        border.drawRect(
            - _thinkness / 2, 
            layer.pxc.height - _thinkness / 2,
            layer.pxc.width + _thinkness,
            _thinkness
        );

        border.closePath();

        border.endFill();    


        console.log('icons', self.px.alpha)


        _.each(icons, function(icn, i){

            icn.icon.x = _bsize / 2
            icn.icon.y = _bsize / 2

            icn.icon.width = _bsize / 2.5
            icn.icon.height = _bsize / 2.5

            icn.bg.x = _bsize / 2
            icn.bg.y = _bsize / 2

            icn.spacer.x = _bsize / 2
            icn.spacer.y = _bsize / 2

            icn.bg.clear()
            icn.spacer.clear()

            icn.spacer.beginFill(Color(bgcolor).rgbNumber(), 0.1);
            icn.spacer.drawCircle(0, 0, _bsize / 2)
            icn.spacer.closePath();
            icn.spacer.endFill(); 

            icn.bg.beginFill(Color(bgcolor).rgbNumber());
            icn.bg.lineStyle(_thinkness, Color(color).rgbNumber());
            icn.bg.drawCircle(0, 0, _size / 2 + _thinkness / 2)
            icn.bg.closePath();
            icn.bg.endFill(); 

            icn.cnt.pivot.set(_bsize / 2, _bsize / 2)

            var position = layer.panelactions[i].position

            if(position == 'righttop'){
                icn.cnt.x = layer.pxc.width
                icn.cnt.y = 0
            }

            if(position == 'rightbottom'){
                icn.cnt.x = layer.pxc.width
                icn.cnt.y = layer.pxc.height
            }

            if(position == 'leftbottom'){
                icn.cnt.x = 0
                icn.cnt.y = layer.pxc.height
            }

            if(position == 'lefttop'){
                icn.cnt.x = 0
                icn.cnt.y = 0
            }

        })
        
    }

    self.destroy = function(){
        delete layer.pane.editor.env.on.zoom[layer.id + 'panel']
    }

    return self
}

export default LayerPanel