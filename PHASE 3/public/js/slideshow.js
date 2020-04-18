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
        if(value>0){
            value--;
                document.getElementById(id).value = value;
        }
    });
})
        