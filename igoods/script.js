$(document).ready(function() {
    
    //              выбор города

    const cityinput = $('#input3');
    let IndexCity; 

    function AdressSearch(city, func) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.novaposhta.ua/v2.0/json/",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
          
            },
            "processData": false,
            "data": JSON.stringify({
              "apiKey": "6408873de8a6a5b00065ecd7034ade93",
               "modelName": "Address",
                  "calledMethod": "searchSettlements",
                  "methodProperties": {
                      "CityName": city,
                      "Limit": 5
                  }
              })
          }
          
            $.ajax(settings).done(function (response) {
                if(response.success)
                    func(response);   
            });  
    }
    
    cityinput.on("input",function() {
        $("#hidden3").html('<ul class="list-group" style="margin-top: 20px;" id="hiddenlist3"></ul>');

        let value = $(this).val();
        AdressSearch(value, function(data){

            //console.log(data.data[0]);
    
            data.data[0].Addresses.forEach(element => {
                $("#hiddenlist3").append(`<li class="list-group-item hiddenlist3__" id="${element.Ref}">${element.Present}</li>`);
            });
        })
    });

    $(document).on('click','.hiddenlist3__', function(){
        var value = $(this).html();
        cityinput.val(value);
        $("#hidden3").html("");
        IndexCity = $(this).attr("id");
        //console.log(value);
    });

    cityinput.blur(function() {
        //console.log("не в фокусе");
        setTimeout(() => $("#hidden3").html(""), 100);
    });

        
    //          выбор отделения

    const atdelInput = $('#input4');
    

    function get_atder(city_id, func)
    {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.novaposhta.ua/v2.0/json/",
            "method": "POST",
            "headers": {
              "content-type": "application/json",
          
            },
            "processData": false,
            "data": JSON.stringify({
                "modelName": "AddressGeneral",
                "calledMethod": "getWarehouses",
                "methodProperties": {
                     "Language": "ru",
                     "SettlementRef": city_id,
                },
                "apiKey": "6408873de8a6a5b00065ecd7034ade93"
            }
              )
          }
          
        $.ajax(settings).done(function (response) {
            func(response);
        });  
    }


    atdelInput.focus(function() {
        get_atder(IndexCity, function(data){
            $("#hidden4").html('<ul class="list-group" style="margin-top: 20px;" id="hiddenlist4"></ul>');

            data.data.forEach(element => {
                $("#hiddenlist4").append(`<li class="list-group-item" id="hds4">${element.Description}</li>`);
            }); 

        });
    });

    atdelInput.blur(function() {
        //console.log("не в фокусе");
        setTimeout(() => $("#hidden4").html(""), 100);
    });
    

    $(document).on('click','#hds4', function(){
        var value = $(this).html();
        atdelInput.val(value);
        $("#hidden4").html("");
    });


    atdelInput.on("input",function() {
        let value = $(this).val();

        get_atder(IndexCity, function(data){
            $("#hidden4").html('<ul class="list-group" style="margin-top: 20px;" id="hiddenlist4"></ul>');

            data.data.forEach(element => {
                
                console.log(element.Number);
                if(test(value, element.Number))
                    $("#hiddenlist4").append(`<li class="list-group-item" id="hds4">${element.Description}</li>`);
            }); 

        });
    });

    function test(x, y)
    {
        if(x.length > y.length)
            return false;

        for(var i = 0; i<x.length; i++)
        {
            if(y[i]!=x[i])
                return false;
        }
        return true;
    }


});
