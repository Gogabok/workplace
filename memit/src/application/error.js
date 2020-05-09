var _ = require('lodash');

var errors = {
    500 : 'networkerror',
    401 : 'unauthorized',
    511 : 'needcredentials',
    527 : 'emptyresponse',

    600 : "Wrong token",
    601 : "Can not login",
    602 : "Empty response"
}

function error(code){
    return {
        code,
        error : errors[code] || "undefined",
        isError : true
    }
}

function byError(_error){

    var code = _.findKey(errors, text => {
        return text == _error
    })

    if (code){
        return error(code)
    }

    return null

   
}

export {
    error,
    byError
}