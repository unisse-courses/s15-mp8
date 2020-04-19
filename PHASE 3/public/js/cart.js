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
        $('.price').each(function(){
            var temp = $(this).text();
            temp = temp.substring(4, origprice.length);
            totalCart += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        document.getElementById("total-price").innerHTML = "PHP " + totalCart.toString() + ".00";

        var drinkorder = {
            id: _id,
            quant: value,
            price: price
        }

        $.post('/customer/updateQuant', drinkorder, function(data, status) {
            
        });
    })

    $(".decrease").on("click", function(){
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
        $('.price').each(function(){
            var temp = $(this).text();
            temp = temp.substring(4, origprice.length);
            totalCart += parseInt(temp);  // Or this.innerHTML, this.innerText
        });

        document.getElementById("total-price").innerHTML = "PHP " + totalCart.toString() + ".00";

        var drinkorder = {
            id: _id,
            quant: value,
            price: price
        }

        $.post('/customer/updateQuant', drinkorder, function(data, status) {
            
        });
    });
    
    $(`div[id^="delete-drink-"]`).click(function() {
        var id = this.id;
        var index = id.substring(13, id.length);

        var drinkNameId = "drink-name-" + index;
        var drinkname = $(`#${drinkNameId}`).text();

        $(".drink-delete").text(drinkname);
    });
    
    $(`a[id^="drink-request-"]`).click(function() {
        var id = this.id;
        var index = id.substring(14, id.length);

        var drinkNameId = "drink-name-" + index;
        var drinkRequestId = "request-" + index;
        var drinkname = $(`#${drinkNameId}`).text();
        var request = $(`#${drinkRequestId}`).text();

        console.log("request is " + request)

        $("#drink-name").text(drinkname);
        $("#request").val(request);
    });
});