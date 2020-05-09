var SpriteLayer = function(pixi, pane, {

    image = null

}){
    var self = this;


    var set = {
        image : function(image){
           
            self.pxc = new PIXI.Sprite(image);              
            self.px.addChild(self.pxc)
        }
    }

    var texture = null;

    self.ini = function(clbk){

        return new Promise(function(resolve, reject){

            try{
                PIXI.loader.add(self.id, image).load(function(loader, resources){

                    texture = resources[self.id].texture


                    set.image(texture)
    
                    resolve(self)
        
                })
            }


            catch(e){

                texture = PIXI.Texture.from(image);

                set.image(texture)

                resolve(self)
            }
           

        })  
        
    }

    self.del = function(){

    }

    self.actions = {
        faceRecognition : function(){

            /*var tracker = new tracking.ObjectTracker(['face', 'eye', 'mouth']);
                tracker.setStepSize(1.7);


            var imageObj = new Image();
                imageObj.src = image;


                tracking.track(imageObj, tracker);
                

                tracker.on('track', function(event) {
                    console.log(event)
                });*/

        }
    }

    self._export = {
        source : function(){
            return {
                image : image
            }
        }
    }

    return self;
}

export default SpriteLayer