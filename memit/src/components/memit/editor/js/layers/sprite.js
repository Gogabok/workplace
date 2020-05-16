import PixiApngAndGif from 'pixi-apngandgif'
var SpriteLayer = function(pixi, pane, {

    image = null

}){
    var self = this;


    var set = {
        image : function(image){
           
            // self.pxc = new PIXI.Sprite.from('https://isparta.github.io/compare/image/dongtai/gif/1.gif');     
            // console.log(self.pxc)         
            // self.px.addChild(self.pxc)
            // const imgs = {
            //     gif: "http://isparta.github.io/compare/image/dongtai/gif/1.gif",
            //     apng: "http://isparta.github.io/compare/image/dongtai/apng/1.png"
            // };

            // let gif = new PixiApngAndGif("http://isparta.github.io/compare/image/dongtai/gif/1.gif");
            // console.log(gif)
            // gif.sprite.x = 0;
            // gif.sprite.y = 0;
            // self.px.addChild(gif.sprite);
        }
    }

    var texture = null;

    self.ini = function(clbk){

        return new Promise(function(resolve, reject){

            try{
                const imgs = {
                    gif: "http://isparta.github.io/compare/image/dongtai/gif/1.gif",
                    apng: "http://isparta.github.io/compare/image/dongtai/apng/1.png"
                };

                let gif = new PixiApngAndGif(imgs.gif);
                window.gif = gif;
                gif.sprite.x = 0;
                gif.sprite.y = 0;
                self.px.addChild(gif.sprite);
                resolve(self)
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