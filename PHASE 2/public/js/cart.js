$(document).ready(function() {
    $(".increase").on("click", function(){
        var id = this.id;
        var len = id.length;
        id = id.substring(9, len);
        id = "number-" + id;
        var value = parseInt(document.getElementById(id).value, 10);
        value = isNaN(value) ? 0 : value;
        if(value<10){
            value++;
                document.getElementById(id).value = value;
        }
        // console.log(value);
    }),

    $(".decrease").on("click", function(){
        var id = this.id;
        var len = id.length;
        id = id.substring(9, len);
        id = "number-" + id;
        var value = parseInt(document.getElementById(id).value, 10);
        value = isNaN(value) ? 0 : value;
        if(value>1){
            value--;
                document.getElementById(id).value = value;
        }
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
        var request = $(`#${drinkRequestId}`).val();

        console.log("request is " + request)

        $("#drink-name").text(drinkname);
        $("#request").val(request);
    });
});