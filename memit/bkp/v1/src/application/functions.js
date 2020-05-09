function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}

////////////

function deep(obj, key){
    var  _key = key.split(".");

    var tkey = _key[0];

    if(typeof obj == 'undefined' || !obj) return undefined;

    if(typeof obj[tkey] != 'undefined')
    {
        _key.splice(0, 1);

        if(_key.length == 0)
        {
            return obj[tkey];
        }
        else
        {
            return deep(obj[tkey], _key.join("."))
        }
    }
    else
    {
        return undefined;
    }
}

function makeid(valid){

    if(!valid)
    {
        return  s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
    }

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < 16; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

export  {makeid, deep}