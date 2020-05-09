var Ticker = function(pixi, editor){

    var self = this;

    self.current = {

    }

    self.add = function(f, key, time){

        if(self.current[key]){
            self.remove(key)
        }

        self.current[key] = {
            f : delta => {


                var p = 1;
    
                if (self.current[key].t != 'inf'){
    
                    p = self.current[key].t / time

                    if(self.current[key].t - delta <= 0){
                        p = 0
                    }
    
                }
    
                f(delta, p)
    
                if (self.current[key].t != 'inf'){
                    self.current[key].t -= delta
    
                    if(self.current[key].t <= 0){
                        self.remove(key)
                    }
                }
    
                
    
            },
            t : time || 'inf'
        }

        pixi.ticker.add(self.current[key].f)

    }

    self.remove = function(key){
        if(!self.current[key]) return

        pixi.ticker.remove(self.current[key].f)

        delete self.current[key]
    }

    return self
}

export default Ticker