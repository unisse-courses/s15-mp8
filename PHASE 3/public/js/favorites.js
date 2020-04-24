$(document).ready(function() { 
    $(`div[id^="delete-drink-"]`).click(function() {

        var id = this.id;
        var index = id.substring(13, id.length);

        var drinkNameId = "drink-name-" + index;
        var drinkname = $(`#${drinkNameId}`).text();

        $("#drink-delete").text(drinkname);
    });

    $("#yesDelete").click(function() {
        
        var drinkname = $("#drink-delete").text();

        var drink = {
            drinkname
        }

        $.post('/customer/deleteFavorite', drink, function(data, status) {
            if(data.status == "ok")
                window.location = '/customer/favorites';
        })
    })

    $("#addToFav").click(function() {
        var drink = $('input[name="drinks"]:checked').val();

        var drink = {
            drink
        }

        $.post('/customer/addToFavorites', drink, function(data, status) {
            console.log("data" + data.status);
            
            if(data.status == "ok")
                window.location = '/customer/favorites';
            else if (data.status == "exist") {
                $("#err-fav").text("Drink already exists in your Favorites!");
            }
        })
    })
});