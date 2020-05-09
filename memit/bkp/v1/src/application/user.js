var sha1 = require('sha1');
var Fingerprint2 = require('fingerprintjs2');
var { error } = require('./error')

var User = function({
    vm : vm,
    api
}){

    var fingerprint = '';

    var state = {

        value : -1,

        set _value(v){
            this.value = v;

            vm.$store.commit('auth', this.value)
           
        },

        is : function(){

            switch (this.value) {
                case -1:
                    
                    token.init()
                
                    if (token.value){
    
                        signin({
                            token : token.value
                        }).then(
                            result => {},
                            error => {}
                        ).catch(e => {
                            console.log(e)
                        })
    
                    }
                    else{
                        this._value = 0;
    
                        return Promise.resolve(this.value)
                    }
    
                    break;
    
                case 0:
                case 1:
                    return Promise.resolve(this.value)
    
                case 2:
                    alert( 'Перебор' );
                    break;
    
                default:
                    this._value = -1;
                    return this.is()
            }
        }

    };

    var rxtoken = {
        value : "",
        set _value(v){
            if(v){

                this.value = v;

                localStorage.setItem(prefix + '-rxtoken', v);
            }
            else{
                localStorage.removeItem(prefix + '-rxtoken');
            }
        },

        init : function(){
            this.value = localStorage[prefix + '-rxtoken'] || "";
        }
    };

    var token = {
        value : "",
        set _value(v){
            if(v){

                this.value = v;

                localStorage.setItem(prefix + '-token', v);
            }
            else{
                localStorage.removeItem(prefix + '-token');
            }
        },

        init : function(){
            this.value = localStorage[prefix + '-token'] || "";
        }
    };

    var ip = {
        value : "",
        set _value(v){
            if(v){
                
                this.value = v;

            }
            else{
                this.value = ''
            }
        }
    };

    var salt = process.env.VUE_APP_RX_SALT;
    var prefix = process.env.VUE_APP_RX_APP_PREFIX;
    var axios = null;

    function crypt (password){
        return sha1(password + salt).toUpperCase()
    }

    async function extendA(data){

        data.fingerprint = fingerprint

        if(state.value != 1){

            return Promise.resolve(data)

        }
        else{

            if (data.system == 'Larkspur'){
	
				if (login.value)
					data.login = login.value
	
				if (rxtoken.value)
					data.token = rxtoken.value
	
				if (ip.value)
					data.IP = ip.value
	
			}
	
			else
			{
				if (token.value && !data.Token)
				{
					data.Token = token.value;
				}	
			}

            return Promise.resolve(data)
        }
    }

    function extendU(data){

        if(state.value != 1){

			if(data.Token)
			{
				token._value = data.Token
			}

			if(data.RxToken)
			{
                rxtoken._value = data.RxToken
            }

            if(data.IP)
			{
                ip._value = data.IP
            }
            
        }
        
    }

    function setaxios(_axios){
        axios = _axios
    }

    function prepare(){
        
    }

    function setFingerPrint(){

        if(typeof window != 'undefined'){

            if(!fingerprint){

                return Fingerprint2.getPromise({}).then(function (components) {
    
                    var values = components.map(function (component) { return component.value })
                        fingerprint = Fingerprint2.x64hash128(values.join(''), 31)
        
                    return fingerprint
                })
    
            }
            
        }

        return Promise.resolve(fingerprint)

    }

    function info(){
        return api.account.info()
    }

    async function signin({
        token : token,
        password : password,
        login : login
    }){

        state._value = 2

        var en = false

        var data = {}

        if (token){
            data.Token = token
            en = true;
        }

        if (password && login){
            data.password = crypt(password)
            data.login = login
            en = true;
        }

        if (en){

            return api.account.signin(data).then( data => {

                state._value = 1

                return state.value

            }).then(state => {

                return info()

            }).then(() => {

                return state.value

            }).catch(e => {


                state._value = 0

                return e
            })

        }


        state._value = 0

        return Promise.reject(error(511))

    }

    return {
        state,
        prepare,
        setaxios,
        extendA,
        extendU,
        setFingerPrint,
        signin,
        info 
    }

}



export default User