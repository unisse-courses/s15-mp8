$(document).ready(function() {
    $(".increase").on("click", function(){
        var id = this.id;
        var len = id.length;
        var _id = id.substring(9, len);
        id = "number-" + _id;

        var value = parseInt(document.getElementById(id).value, 10);


        var origprice =  $(`#price-${_id}`).text();
            origprice = origprice.substring(4, origprice.length);
            origprice = parseInt(origprice);
            origprice = origprice/value;

        var price;

        value = isNaN(value) ? 0 : value;
        if(value<10){
            value++;
            document.getElementById(id).value = value;

            price = parseInt(value) * parseInt(origprice);
            price = parseInt(price);

            document.getElementById("price-" + _id).innerHTML = "PHP " + price.toString() + ".00";
        }

        var totalCart = 0;
        var noItems = 0;

        $('.price').each(function(){
            var temp = $(this).text();
            temp = temp.substring(4, temp.length);
            totalCart += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        document.getElementById("total-price").innerHTML = "PHP " + totalCart.toString() + ".00";

        $('.number').each(function(){
            var temp = $(this).val();
            noItems += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        document.getElementById("noItems").innerHTML = noItems;

        var drinkorder = {
            id: _id,
            quant: value,
            price: price
        }

        updateQuant(drinkorder);
    })

    $(".decrease").on("click", function (){
        var id = this.id;
        var len = id.length;
        var _id = id.substring(9, len);
        id = "number-" + _id;

        var value = parseInt(document.getElementById(id).value, 10);

        var origprice =  $(`#price-${_id}`).text();
            origprice = origprice.substring(4, origprice.length);
            origprice = parseInt(origprice);
            origprice = origprice/value;

        var price;

        value = isNaN(value) ? 0 : value;
        if(value>1){
            value--;
            document.getElementById(id).value = value;

            price = parseInt(value) * parseInt(origprice);
            price = parseInt(price);
            document.getElementById("price-" + _id).innerHTML = "PHP " + price.toString() + ".00";
        }

        var totalCart = 0;
        var noItems = 0;

        $('.price').each(function(){
            var temp = $(this).text();
            temp = temp.substring(4, temp.length);
            totalCart += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        document.getElementById("total-price").innerHTML = "PHP " + totalCart.toString() + ".00";

        $('.number').each(function(){
            var temp = $(this).val();
            noItems += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        document.getElementById("noItems").innerHTML = noItems;

        var drinkorder = {
            id: _id,
            quant: value,
            price: price
        }

        updateQuant(drinkorder);
    });

    function updateQuant(drinkorder) {
        $.post('/customer/updateQuant', drinkorder, function(data, status) {
            
        });
    }

    $('#changeBtn').click(function() {
        var _id = $("#id").val();
        var request = $("#request").val();

        var req = {
            id: _id,
            request: request
        }
        document.getElementById("request-"+_id).innerHTML = request;

        updateReq(req);
    })

    function updateReq(req) {
        return $.post('/customer/updateRequest', req, function(data, status) {
            //if(data.success) ? 
        });
    }
    
    $('#yesDelete').click(function () {
        var _id = $("#id").val();
        console.log("del clicked");

        var totalCart = 0;

        $('.price').each(function(){
            var temp = $(this).text();
            temp = temp.substring(4, temp.length);
            totalCart += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        $(`#div-${_id}`).attr('style', 'display: none');
        $(`#price-${_id}`).removeClass('price');

        var priceDelete = $(`#price-${_id}`).text();
        priceDelete = priceDelete.substring(4, priceDelete.length)
        var quantDelete = $(`#number-${_id}`).val();

        console.log("priceDelete:" + priceDelete);
        console.log("quantDelete:" + quantDelete);

        totalCart -= parseInt(priceDelete);

        document.getElementById("total-price").innerHTML = "PHP " + totalCart.toString() + ".00";

        if (totalCart == 0)
            $(`#checkout`).attr('style', 'display: none');

        $(`#number-${_id}`).removeClass("number");

        var noItems = 0;

        $('.number').each(function(){
            var temp = $(this).val();
            noItems += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        document.getElementById("noItems").innerHTML = noItems;

        var obj = {
            id: _id,
            total: totalCart
        }

        deleteDrink(obj);
    })

    function deleteDrink(obj) {
        return $.post('/customer/deleteDrink', obj, function(data, status) {
            //if success

        })
    }

    $(`div[id^="delete-drink-"]`).click(function() {
        var id = this.id;
        var _id = id.substring(13, id.length);

        var drinkNameId = "drink-name-" + _id;
        var drinkname = $(`#${drinkNameId}`).text();

        $("#id").val(_id);

        $(".drink-delete").text(drinkname);
    });
    
    $(`a[id^="drink-request-"]`).click(function() {
        var id = this.id;
        var _id = id.substring(14, id.length);

        var drinkNameId = "drink-name-" + _id;
        var drinkRequestId = "request-" + _id;
        var drinkname = $(`#${drinkNameId}`).text();
        var request = $(`#${drinkRequestId}`).text();

        console.log("request is " + request)

        $("#id").val(_id);
        $("#drink-name").text(drinkname);
        $("#request").val(request);
    });


    $("#closeOrderNum").click(function() {
        // var ids = []
        
        // $('.order').each(function(){
        //     var id = $(this).id;
        //     id = id.substring(4, id.length);
        //     ids.push(id);
        // });
        $("#closeOrderNum").off('click');

        // $.when(updateQuant(), updateReq(), deleteDrink()).done(function() {
            $.post('/customer/checkout', function(data, status) {
                if (data.status == "ok") {
                    // console.log("ok");
                    window.location = "/customer/order-status";
                }
            })
        // })

        
    })
});