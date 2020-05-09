var diff = require('deep-diff').diff;
var applyChange = require('deep-diff').applyChange;
var clone = require('clone');

var history = function(editor){

    var self = this;

    var pool = [];

    var key = 'history'

    var difference = function(statenew, state){

        return diff(state, statenew)

    }

    var finallyState = function(fi){
        if(pool.length){

            var state = clone(pool[0].state)
    
            for(var i = 1; i < pool.length; i++){

                if(!fi || i < fi){
                    _.each(pool[i].difference, function(d){
                        applyChange(state, true, d)
                    })
                }
            }

            return state

        }

        return {}
    }

    self.cropHistory = function(){

        var ldiff = pool.length - 20

        if (ldiff > 0){

            var fstate = finallyState(ldiff + 1);

            pool.splice(0, ldiff + 1, {
                state : fstate
            })

        }
    }

    self.add = function(state, ini){

        if(!state) state = editor.actions.export.data()

        console.log(state)

        if (pool.length){

            console.log("PREV", finallyState())

            var d = difference(state, finallyState())

            if (d){
                pool.push({
                    difference : d
                })

                self.cropHistory()
            }

           

        }
        else{

            pool.push({
                state : state
            })

        }

        console.log('pool', pool)

        if(!ini)
            localStorage[key] = JSON.stringify(pool)
    }

    self.load = function(){
        return JSON.parse(localStorage[key] || "[]")
    }

    self.set = function(_pool){
        pool = _pool
    }

    self.finally = finallyState

    return self
}

export default history