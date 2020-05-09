var TextLayer = function(pixi, pane, {

    text = ''

} = {}){
    var self = this;

    var defaults = {
        style : {
            fontFamily: 'Segue UI',
            fontSize: '32px',
            color : "#FFFFFF",
            padding : '12px'
        }
    }

    var value = text;

    var style = _.clone(defaults.style)

    var events = {
        keydown : keycode=>{


            if(keycode == 13){
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
        self.px.on('keydown', events.keydown)
        self.px.on('blur', events.blur)
    }

    var destroyEvents = function(){
        self.px.off('keydown', events.keydown)
        self.px.off('blur', events.blur)
    }

    self.actions = {

        checkempty : function(){

            console.log('value ,self.px.text', value ,self.px.text)

            if(!value){
                self.actions.delete()
            }
        },

        edit : function(){
            self.px.disabled = false;
            self.px.focus()
        },
    
        save : function(){

            if(self.px.disabled) return

            self.px.blur()
            self.px.disabled = true;
    
            value = self.px.text;

            pixi.editor.actions.edit.release()

            self.actions.checkempty()
        },
    
        cancel : function(){

            if(self.px.disabled) return

            self.px.blur()
            self.px.disabled = true;
    
            self.px.text = value;

            pixi.editor.actions.edit.release()

            self.actions.checkempty()
        }
    }

    

    self.del = function(){
        destroyEvents()
    }

    self.ini = function(){
        var style = new PIXI.TextStyle(style);

        //self.px = new PIXI.Text(text, style);

        self.px = new PIXI.TextInput({
            input: defaults.style,
            box: {
                default: {},
                focused: {},
                disabled: {}
            }
        })

        self.px.text = text;
        self.px.placeholder = ''
        self.px.disabled = true;

        self.px.x =  pane.get.width() / 2;
        self.px.y =  pane.get.height() / 2;

        self.cnt.addChild(self.px)

        initEvents()

        return Promise.resolve()
    }

    return self;
}

export default TextLayer