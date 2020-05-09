var zoomlevels = [
    10,
    5,
    3.5,
    2,
    1.5,
    1,
    0.75,
    0.5,
    0.25,
    0.10
]

export function zoomcheck(zoom){
    if(zoom >= zoomlevels[0]) return zoomlevels[0];

    if(zoom <= zoomlevels[zoomlevels.length - 1]) return zoomlevels[zoomlevels.length - 1];

    return zoom
}

export function zoomin(from){

    var to = from;

    for(var i = zoomlevels.length - 1; i >= 0; i--){

       

        if(zoomlevels[i] > from){
            to = zoomlevels[i];

            break
        }

    }

   return to

}

export function zoomout(from){

    var to = from;

    for(var i = 0; i <= zoomlevels.length - 1; i++){

        console.log('zoomlevels[i] > from', zoomlevels[i], from)

        if(zoomlevels[i] < from){
            to = zoomlevels[i];

            break
        }

    }

   return to

}
