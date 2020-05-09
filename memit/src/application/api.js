import moment from 'moment'

var { error } = require('./error')

var Api = function({
    vm
}){

    var self = this;

    var axios;

    var s = vm.$store

    var cache = {}

    async function request(action, data){

        data || (data = {})
        data.action = action

        try{
            var result = await axios({
                data
            })

            return Promise.resolve(result)
        }

        catch (e){

            return Promise.reject(e)
        }
    }

    var kit = {

        get : (_module, vname) =>{

            if (_module){
                return s.state[_module][vname]
            }
            else{
                return s.state[vname]
            }
            
        },

        commit : (module, vname, value) =>{

            console.log(module, vname)

            if (module){
                s.commit(module + '/' + vname, value)
            }
            else{
                s.commit(vname, value)
            }
            
        }
    }

    function crequest(action, {

        module,
        value,
        time,
        refresh,
        storage

    } = {}, data){

        var cachekey = module || 'common'
        
        time || (time = 'inf')

        cache[cachekey] || (cache[cachekey] = {})

        if (refresh){
            cache[cachekey][value] = null
        }
       
        if(!kit.get(module, value) || 
        
                (!cache[cachekey][value] || 
                    (cache[cachekey][value] != 'inf') && moment(cache[cachekey][value]) > moment() 
                )

            ){

                return request(action, data).then(result => {

                    if(time == 'inf'){
                        cache[cachekey][value] = 'inf'
                    }
                    else{
                        cache[cachekey][value] = moment().add(time, 'milliseconds').format(); 
                    }

                    if(storage) result = result[storage]

                    if(result){
                        kit.commit(module, value, result)

                        return result
                    }

                    else{
                        return Promise.reject(error(602))

                    }

                    

            })

        }

        return Promise.resolve()
    }

    self.account = {

        signin : function(data){

            return request("LOGON", data)

        },

        info : function(){
            return crequest("GETUSERINFO", {
                value : 'info',
                module : 'account',
                storage : 'UserInfo'
            })
        }

    }

    self.setaxios = function(_a){
        axios = _a
    }
    
    return self;
}

export default Api