$(document).ready(function() { 
    $(`div[id^="delete-drink-"]`).click(function() {
        var id = this.id;
        var index = id.substring(13, id.length);

        var drinkNameId = "drink-name-" + index;
        var drinkname = $(`#${drinkNameId}`).text();

        $("#drink-delete").text(drinkname);
    });
});