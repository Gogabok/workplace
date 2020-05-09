var Snap = function(panes, {

    move = 20,
    layermove = 5,
    rotation = 3,
    angles = [0, 90, 180, 270],
    gridWidth = 1,
    gridColor = 0x102066,
    editor


} = {}){
    var self = this

    var others = function(pane){
        return _.filter(panes, p => {
            return p.id != pane.id
        })
    }

    var current = {
        cnt : null,
        grid : null,
        gr : null,
        id : null
    }


    var snapmove = function(coord, othersobjects, xyxy, zmove){


        if (xyxy){

            if(_.isArray(xyxy)){
                othersobjects = othersobjects.concat(othersobjects, xyxy)
            }
            else{
                othersobjects.push(xyxy)
            }

            
        }

        var closest = {}

        if (othersobjects.length){

            // avers x to x, x1 to x1

            _.each(coord, function(d, i){
                

                var close = _.minBy(othersobjects, function(p){

                    var v = p.get ? p.get[i]() : p[i]

                    return Math.abs(coord[i] - v)
                })

                var v = close.get ? close.get[i]() : close[i]

                if(Math.abs(coord[i] - v) <= zmove){
                    closest[i] = {
                        value : v,
                        obj : close
                    }
                }

            })


            othersobjects = _.filter(othersobjects, function(p){
                return p.get
            })

            if(othersobjects.length){
                // reverse x1 to x, x to x1

                _.each(coord, function(d, i){

                    var j = null;

                    if (i == 'x1') j = 'x'
                    if (i == 'x') j = 'x1'
                    if (i == 'y') j = 'y1'
                    if (i == 'y1') j = 'y'

                    var close = _.minBy(othersobjects, function(p){

                        return Math.abs(coord[i] - p.get[j]())
                    })

                    if(Math.abs(coord[i] - close.get[j]()) <= zmove){
                        closest[i] = {
                            value : close.get[j](),
                            pane : close
                        }
                    }

                })
            }

            

        }

        return closest
    }

    self.move = function(coord, pane, xyxy){

        return snapmove(coord, others(pane), xyxy, move / pane.editor.env.zoom.get())

    }

    self.moveapply = function(coord, pane, withme){
        var newcoord = _.clone(coord)
        var cl = self.move(coord, pane, withme)

        _.each(cl, function(c, i){
            newcoord[i] = c.value
        })

        return {
            xyxy : newcoord,
            snap : cl
        }
    }

    self.extendWithManually = function(snap, pane){

        _.each(pane.manuallyResized, function(v, i){

            if(!snap[i]){

                snap[i] = {
                    value : pane.get[i](),
                    pane : pane
                }

            }

        })
    }

    self.layers = {
        others : function(layers, layer, lopt){
            var ls = _.filter(layers, function(l){

                if(l.type == 'text') return

                return l.id != layer.id
            })

            if (lopt) ls.push(lopt)

            return ls
        },

        rotation : function(layers, layer, lopt){

            //helper

            var clf = function(o){

                var angle = 0;

                if(typeof o.angle != 'undefined') angle = o.angle
                else angle = o.px.angle

                return Math.abs((angle) % 360 - layer.px.angle % 360)
            }
            

            /// 0 90 180 270

            var snaprotation = null

            var angle = _.find(angles, function(angle){
                return Math.abs(angle % 360 - layer.px.angle % 360) < rotation
            })  

            if (typeof angle != 'undefined'){

                snaprotation = {
                    value : (angle % 360) * Math.PI / 180,
                    layer : close
                }

            }

            // other layers

            else{

                var others = self.layers.others(layers, layer, lopt)

                if (others.length){

                    var close = _.minBy(others, function(o){
    
                        return clf(o)
        
                    })
        
                    if(close){
    
                        if(clf(close) < rotation){
    
                            var _rotation = 0;
    
                            if(typeof close.rotation != 'undefined') _rotation = close.rotation
                            else _rotation = close.px.rotation
    
                            snaprotation = {
                                value : (_rotation),
                                layer : close
                            }
    
                        }
                    }
                }
            }
            return snaprotation

            
        },

        move : function(layers, layer, lopt){

            /// with pane


            var pane = layer.pane


            var paneborder = {
                x : 0,
                y : 0,
                x1 : pane.get.width(),
                y1 : pane.get.height()
            }

            lopt = [lopt, paneborder]

            /// with layers

            var snap = snapmove({

                x : layer.get.x(),
                x1 : layer.get.x1(),
                y : layer.get.y(),
                y1 : layer.get.y1()

            }, self.layers.others(layers, layer), lopt, layermove / layer.pane.editor.env.zoom.get())

            

            /*_.each(snap, function(s, i){



            })*/

            return snap
        }
    }

    self.clear = function(){

        if (current.id){
            current.gr.clear()
            current.cnt.removeChild(current.grid)

            current.id = null
            current.gr = null
            current.grid = null
            current.cnt = null
        }

    }

    self.light = function(cnt, snap, id){

        if(!id) return

        if (current.id != id){
            if (current.id){
                self.clear()
            }

            current.id = id
            current.cnt = cnt;

            current.grid = new PIXI.Container();
            current.grid.zIndex = 0;
            current.cnt.addChild(current.grid);

            current.gr = new PIXI.Graphics();
            current.grid.addChild(current.gr);
        }   

        current.gr.clear()
       
        var line = current.gr

        var w = cnt.width,
            h = cnt.height

        
        _.each(snap, function(s, i){

            line.lineStyle(1 / editor.env.zoom.get(), gridColor);

            if(i == 'x' || i == 'x1'){
                line.moveTo(s.value, 0 - 10000);
                line.lineTo(s.value, h + 10000);
            }
            else
            {
                line.moveTo(0 - 10000, s.value);
                line.lineTo(w + 10000, s.value);
            }

    
            //current.gr.addChild(line);

        })


    }

    return self
}   

export default Snap