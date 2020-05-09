var Axios = require('axios');
var { error, byError } = require('./error')
var { deep } = require('./functions')

import qs from 'qs';

var Axioswr = function({
    user : user,
    vm : vm,
    api
}){

    async function axios ({
        to : to,
        data : data
    }){

        to || (to = 'main')

        console.log('vm', vm)

        data || (data = {})
        data.system || (data.system = vm.systems.main)

        


        if(vm.servers[to]){

            data = await user.extendA(data)
           

            try{
                const response = await Axios({
                    method: 'post',
                    headers: { 'content-type': 'application/x-www-form-urlencoded' },
                    url: vm.servers[to],
                    data: qs.stringify(data)
                })
                
                var prefix = vm.prefix[to];
                var rdata = {};
                var e = null


                if(response.status != 200){
                    e = error(response.status)
                }

                if(!e && (!response.data || _.isEmpty(response.data) || (prefix && !response.data[prefix]) )){
                    e = error(527)
                }

                if(!e) {
                    rdata = response.data[prefix]

                    e = byError(rdata.Result)
                }

                
                if (e){
                    return Promise.reject( e )
                }

                user.extendU(rdata)

                return Promise.resolve(rdata)
               
            }
            catch(e){

                console.log("ERROR", e)

                if(e.isError){
                    return Promise.reject( e )
                }

                return Promise.reject( error(500) )
            }

            

        }
    }

    ////////////////////

    user.setaxios(axios)
    api.setaxios(axios)

    return {
        axios
    }

}

export default Axioswr