var f = {}

f.deep = function(obj, key){
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

var makeid = function(valid){

    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }

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

var flball = function(str){
    if(!str || !str.split) return str

    var exception = ["2ndEdison, 3dCarbon", "A-Pmcs"];
    var lower = ["TO", "K", "X", "10X", "THE", "AN", "AND", "OR", "AT", "BUT", "BY", "FOR", "IN", "OF", "OFF", "ON", "OUT", "PER", "UP", "VIA", "AS", "FOR"];
    var upper = ["2MCBL",  "USA", "TONS", "BHCC", "LLC", "LTD", "1BWK", "AGMA", "VIII", "XIII", "BHCC"];
    var capital = ["LAS", "LAW","SON", "DEE", "ST", "PET", "BIG", "WAY", "AIR", "ALL", "TOP", "JOY", "CO", "INC", "INC.", "AVE", "PAY", "ST.", "FOX", "CAR", "TAX", "DAY", "MAN", "CO.", "NEW"];
    var capitalReg = new RegExp(capital.join('|'));
    var upperReg = new RegExp(upper.join('|'));


    var nameArr = str.split(' ').map(function(word){
        if (exception.some(function(w){return w.toUpperCase()===word})){

            return exception.find(function(w) {return w.toUpperCase()===word});
        }

        if (
            lower.some( function(w){
                if(w===word){
                    return true;
                };
                var wArr = w.split(' ');
                for (var i = 0; i <wArr.length; i++){
                    if(/[0-9]/.test(wArr[i]) && /ST|ND|RD|TH|K/.test(wArr[i+1] + wArr[i+2])){
                        return true;
                    }
                }
                return false;
            })
            ) 
        {
            return word.toLowerCase();
        }

        if (capitalReg.test(word)){
            return word[0]+word.slice(1).toLowerCase();
        }
        if(word.replace(/\(|\)/g, '').length<=3 || upperReg.test(word)){
            return word;
        }
        var wordCap = word.toLowerCase().replace(/[A-Za-z]/, function(l){return l.toUpperCase()});
        var wordArr = [];
        wordArr.push(wordCap[0]);
        for (var i = 0; i < wordCap.length; i++){
            if (wordCap[i+1] && (/\.|\/|[0-9]|\&|\-|\s/.test(wordCap[i]) || (wordCap[i-1]+wordCap[i]).toLowerCase() === 'mc')){
                wordArr.push(wordCap[i+1].toUpperCase());
            } else if (wordCap[i+1]){
                wordArr.push(wordCap[i+1])
            }
        };
        return wordArr.join('')
    })

    return flb(nameArr.join(' '))
}

var flb = function (str) {
    return str[0].toUpperCase() + str.substr(1);
}

var flbs = function (str) {

    return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

var flbb = function (str) {

    var s = str.split(' ');

    return _.map(s, function(s){
        return flbs(s);
    }).join(' ')

}


f.flball = flball
f.flb = flb
f.flbs = flbs
f.flbb = flbb
f.makeid = makeid

export default f