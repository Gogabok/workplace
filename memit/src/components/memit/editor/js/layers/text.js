var TextLayer = function(pixi, pane, {

    text = '',
    style = {}

} = {}){
    var self = this;

    var defaults = {

        style : {

            fontFamily: "'Segoe UI', SegoeUI, 'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: '32px',
            color : "#FFFFFF",   

        },

        exstyle : {
            padding : '0px',
            multiline : true,            
            width : "10px",
            height : "40px",
            overflow : "hidden",
            whiteSpace : "nowrap"
        }
    }

    var value = text;


    _.each(defaults.style, function(v, i){
        if(!style[i])
            style[i] = v
    })

    
    var buffer = null;

    var createBuffer = function(){

        if(!buffer){
            buffer = document.createElement('div');
            buffer.className = "textLayerBuffer";
    
            self.pxc._dom_input.parentNode.insertBefore(buffer, self.pxc._dom_input);    
    

            applyBuffer(value)
        }
       
    }

    var destoyBuffer = function(){
        if(buffer){
            buffer.remove()
            buffer = null
        }   
    }

    var applyBuffer = function(text){

        if (buffer){

            var t = text.replace(/\n/g, "<br />")

            if (!t.length || (t[t.length - 1] == '>')){ 
                t += '&nbsp;'                
            }

            buffer.innerHTML = t

            buffer.style.fontSize = style.fontSize
            buffer.style.lineHeight = style.fontSize
            buffer.style.fontSize = style.fontSize

            _.each(style, function(v, i){
                buffer.style[i] = v
            })
    
            self.pxc.setInputStyle('width', buffer.clientWidth + 'px')
            self.pxc.setInputStyle('height', buffer.clientHeight + 'px')

            self.set.pivot()
            self.panel.render()
            
        }       

    }

    var events = {
        keydown : function(keycode){


            var ctrlDown = false// this.ctrlKey || this.metaKey

            var tos = String.fromCharCode(keycode)

            if (keycode == 13) tos = '\n'

            applyBuffer(self.pxc._dom_input.value + tos)

            if(keycode == 13 && ctrlDown){
                self.actions.save()
            }

            if(keycode == 27){
                self.actions.cancel()
            }

        },

        blur : function(){
            setTimeout(function(){
                self.actions.save()
            }, 150)
        }
    }

    var initEvents = function(){
        self.pxc.on('keydown', events.keydown)
        self.pxc.on('blur', events.blur)
    }

    var destroyEvents = function(){
        self.pxc.off('keydown', events.keydown)
        self.pxc.off('blur', events.blur)
    }


    self.actions = {

        set : {
            color : function(color){
                style.color = color

                self.pxc.setInputStyle('color', color)
            }
        },

        apply : function(){
            self.actions.scale(self.px.scale.x)
            
            self.px.scale.x = 1
            self.px.scale.y = 1

            self.set.pivot()
        },
        scale : function(scaleD){
            style.fontSize = (style.fontSize.replace("px", '') * scaleD) + 'px'

            self.pxc.setInputStyle('fontSize', style.fontSize)

            applyBuffer(self.pxc.text)

            self.panel.render()
        },

        checkempty : function(){

            if(!value){
                self.actions.delete()
            }
        },

        edit : function(){
            self.pxc.disabled = false;
            self.pxc.focus()
        },
    
        save : function(){

            if(self.pxc.disabled) return            

            self.pxc.blur()
            self.pxc.disabled = true;

            value = self.pxc.text;

            pixi.editor.actions.edit.release()

            self.actions.checkempty()

            self.panel.render()

            pixi.editor.history.add()
        },
    
        cancel : function(){

            if(self.pxc.disabled) return            

            self.pxc.blur()
            self.pxc.disabled = true;
    
            self.pxc.text = value;

            applyBuffer(value)

            pixi.editor.actions.edit.release()

            self.actions.checkempty()

            self.panel.render()
        },

        style : function(s){
            if(s){

            }
            else{
                return style
            }
        }
    }   

    self.del = function(){
        destoyBuffer()
        destroyEvents()
    }

    self.ini = function(){
      
        self.pxc = new PIXI.TextInput({
            input: _.extend(_.clone(style), defaults.exstyle),
            box: {
                default: {},
                focused: {},
                disabled: {}
            }
        })

        self.pxc.text = text;
        self.pxc.placeholder = ''
        self.pxc.disabled = true;

        self.px.x =  pane.get.width() / 2;
        self.px.y =  pane.get.height() / 2;

        self.px.addChild(self.pxc)

        createBuffer()

        initEvents()

        return Promise.resolve()
    }

    self._export = {
        source : function(){
            return {
                style : style,
                text : self.pxc.text
            }   
        }
    }

    return self;
}

export default TextLayer