$(document).ready(function() {
    function checkField(field, val) {
        var valid = val;

        if(field.val() == '') {
            valid = false;
            field.css('background-color', 'red');
        } else {
            field.css('background-color', 'white');
        }

        return valid;
    }

    function checkNumber (field, val) {
        var valid = val;

        if (isNaN(field.val())) {
            field.css('background-color', 'red');
            valid = false;
        }
        else
            field.css('background-color', 'white');
        
        return valid;
    }

    $(".addDrinkForm").submit(function(e) {
        e.preventDefault();

        var valid = true;
        valid = checkField($("#drinkPic"), valid);
        valid = checkField($("#drinkName"), valid);

        valid = checkField($("#tallPrice"), valid);
        valid = checkNumber($("#tallPrice"), valid)
        valid = checkField($("#grandePrice"), valid);
        valid = checkNumber($("#grandePrice"), valid)
        valid = checkField($("#ventiPrice"), valid);
        valid = checkNumber($("#ventiPrice"), valid);

        if (!valid) {
            $(".messageModal").text("There's a missing field. Please answer all fields.");
        }
            
        else {
            var newDrink = {
                drinkName: $("#drinkName").val(),
                tallPrice: $("#tallPrice").val(),
                grandePrice: $("#grandePrice").val(),
                ventiPrice: $("#ventiPrice").val(),
                category: $(".categ").val()
            }

            var url;

            if (newDrink.category == "Espresso")
                url = "espresso";
            else if (newDrink.category == "Chocolate")
                url = "chocolate";
            else if (newDrink.category == "Teavana Teas")
                url = "teavana-teas";
            else if (newDrink.category == "Frappuccino")
                url = "frappuccino";
            else if (newDrink.category == "Coffee Craft")
                url = "coffee-craft";


            // $.post('/admin/menu/addDrink', newDrink, function(data, status) {
            $(this).ajaxSubmit({
                data: {newDrink: newDrink},
                contentType: 'application/json',
                success: function(response) {
                        if (response.status == "ok") {
                            $("#drinkPic").val("");
                            $("#drinkName").val("");
                            $("#tallPrice").val("");
                            $("#grandePrice").val("");
                            $("#ventiPrice").val("");
                            // console.log("ok hehe")
                            // console.log("will submit")
                            window.location = "/admin/menu/update/" + url;
                        } else if (response.status == "exist") {
                            $(".messageModal").text("Drink name already exists.");
                        }
                        
                }
            });
        } 

    });

    $(".updateDrinkForm").submit(function(e) {
        e.preventDefault();
        
        var btn = $(this).find("input[type=submit]:focus" );
        console.log("btn clicked is " + btn.attr('id'));

        if (btn.attr('id') == "update-btn") {
            var id = $("#drinkId").val();
            var priceId = $("#chosenPriceId").val();
            console.log("priceId is " + priceId);
            var pricelist = {
                priceId: priceId,
                tall: $("#updateTallPrice").val(),
                grande: $("#updateGrandePrice").val(),
                venti: $("#updateVentiPrice").val()
            }

            var updateDrink = {
                drinkId: id,
                drinkName: $("#updateDrinkName").val(),
                category: $(".categ").val()
            }
            var url;

            if (updateDrink.category == "Espresso")
                url = "espresso";
            else if (updateDrink.category == "Chocolate")
                url = "chocolate";
            else if (updateDrink.category == "Teavana Teas")
                url = "teavana-teas";
            else if (updateDrink.category == "Frappuccino")
                url = "frappuccino";
            else if (updateDrink.category == "Coffee Craft")
                url = "coffee-craft";


            $(this).ajaxSubmit({
                data: {updateDrink: updateDrink, pricelist: pricelist},
                contentType: 'application/json',
                success: function(response) {
                    window.location = "/admin/menu/update/" + url;
                    // $("#updateDrinkPic").val("");
                    // $("#updateDrinkName").val("");
                    // $("#updateTallPrice").val("");
                    // $("#updateGrandePrice").val("");
                    // $("#updateVentiPrice").val("");
                }
            });
        }
    });

    $(`a[id^="chosen-drink-"]`).click(function() {
        var id = this.id;
        var index = id.substring(13, id.length);
        var priceId = $("#priceid-" + index).val();
        console.log("index " + index)

        var drinkNameId = "drink-name-" + index;
        var drinkPicId = "drink-pic-" + index;
        var img = $(`#${drinkPicId}`).attr('src');
        var drinkname = $(`#${drinkNameId}`).text();

        var pricelist = {
            tall: $("#price-tall-" + index).text(),
            grande: $("#price-grande-" + index).text(),
            venti: $("#price-venti-" + index).text()
        }
        $("#drinkId").val(index);

        $("#updateDrinkName").val(drinkname);
        
        $("#updateVentiPrice").val(pricelist.venti);
        $("#updateGrandePrice").val(pricelist.grande);
        $("#updateTallPrice").val(pricelist.tall);

        $("#chosenPriceId").val(priceId);

        $("#drink-pic").attr("src", img);
    });

    $("#delete-btn").click(function() {
        console.log("delete clicked")

        var priceId = $("#chosenPriceId").val()
        var drinkId = $("#drinkId").val()


        var drinkname = $(`#updateDrinkName`).val();

        console.log(drinkname)

        $("#delete-drink-name").text(drinkname);

        $("#yesDelete").click(function() {
            var ids = {
                priceId: priceId,
                drinkId: drinkId
            }
    
            var url = $(".categ").val();
    
            if (url == "Espresso")
                url = "espresso";
            else if (url == "Chocolate")
                url = "chocolate";
            else if (url == "Teavana Teas")
                url = "teavana-teas";
            else if (url == "Frappuccino")
                url = "frappuccino";
            else if (url == "Coffee Craft")
                url = "coffee-craft";
    
            $.post('/admin/menu/deleteDrink', ids, function (data, status) {
                if (data.status == "ok")
                    window.location = "/admin/menu/update/" + url;
            })
        })
    });
});