
$(document).ready(function() {
    $(`a[id^="chosen-drink-"`).click(function() {
        var id = this.id;
        var index = id.substring(13, id.length);

        var drinkNameId = "drink-name-" + index;
        var drinkname = $(`#${drinkNameId}`).text();

        var pricelist = {
            tall: $("#price-tall-" + index).text(),
            grande: $("#price-grande-" + index).text(),
            venti: $("#price-venti-" + index).text()
        }

        $("#chosen-drink-name").text(drinkname);

        var chosenSize = $("#sizes").val();
        var quantity = $("#quantity").val();
        var total = 0;
        
        if (chosenSize == "Tall") {
            total = parseInt(pricelist.tall) * parseInt(quantity);
        } else if (chosenSize == "Grande") {
            total = parseInt(pricelist.grande) * parseInt(quantity);
        } else if (chosenSize == "Venti") {
            total = parseInt(pricelist.venti) * parseInt(quantity);
        }

        $("#total-price").text(total);

        $('select').change(function() {
            var chosenSize = $("#sizes").val();
            var quantity = $("#quantity").val();
            var total = 0;
            
            if (chosenSize == "Tall") {
                total = parseInt(pricelist.tall) * parseInt(quantity);
            } else if (chosenSize == "Grande") {
                total = parseInt(pricelist.grande) * parseInt(quantity);
            } else if (chosenSize == "Venti") {
                total = parseInt(pricelist.venti) * parseInt(quantity);
            }
    
            $("#total-price").text(total);
        });
    });
    
    $("#order-btn").click(function() {
        var drinkname = $("#chosen-drink-name").text();
        var size = $("#sizes").val();
        var quantity = $("#quantity").val();
        var requests = $("#request").val();
        var totalprice = parseInt($("#total-price").text());

        // console.log(drinkname, size, quantity, requests, totalprice);

        var drinkorder = {
            drinkname: drinkname,
            size: size,
            quantity: quantity,
            requests: requests,
            totalprice: totalprice
        }

        $.post('/user/customer/addToCart', drinkorder, function(data, status) {
            
        });
    });
});