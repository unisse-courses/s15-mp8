
// $(document).ready(function() {
//     function changeImage() {
//         var path = document.getElementById("inputfile").value;
//         var filename = path.replace(/^.*\\/, "");
//         document.getElementById("newavatar").src = filename;
//     }

//     function openDeleteModal() {
//         $('#edit-item-modal').modal('hide');
//         $('#deleteModal').modal('show');
//     };
    
//     $(`a[id^="chosen-drink-"]`).click(function() {
//         var id = this.id;
//         var index = id.substring(13, id.length);
        
//         console.log("index " + index)

//         var drinkNameId = "drink-name-" + index;
//         var drinkPicId = "drink-pic-" + index;
//         var img = $(`#${drinkPicId}`).attr('src');
//         var drinkname = $(`#${drinkNameId}`).text();

//         var pricelist = {
//             tall: $("#price-tall-" + index).text(),
//             grande: $("#price-grande-" + index).text(),
//             venti: $("#price-venti-" + index).text()
//         }

//         $("#drink-name").attr('placeholder',drinkname);

//         $("#venti-price").attr('placeholder', pricelist.venti);
//         $("#grande-price").attr('placeholder', pricelist.grande);
//         $("#tall-price").attr('placeholder', pricelist.tall);
        
//         $("#drink-pic").attr("src", img);
//     });
    
//     $("#update-btn").click(function() {
        
//     });

//     $("#delete-btn").click(function() {
        
//     });
// });


$(document).ready(function() {
    function checkField(field, val) {
        var valid = val;

        if(field.val() == '') {
            valid = false;
        } else {
            field.css('background-color', 'white');
        }

        return valid;
    }

    $(".addDrinkForm").submit(function(e) {
        e.preventDefault();
        var valid = true;
        valid = checkField($("#drinkPic"), valid);
        valid = checkField($("#drinkName"), valid);
        valid = checkField($("#tallPrice"), valid);
        valid = checkField($("#grandePrice"), valid);
        valid = checkField($("#ventiPrice"), valid);

        if (!valid) {
            $(".messageModal").text("There's a missing field. Answer all fields.");
        }
            
        else {
            var newDrink = {
                drinkName: $("#drinkName").val(),
                tallPrice: $("#tallPrice").val(),
                grandePrice: $("#grandePrice").val(),
                ventiPrice: $("#ventiPrice").val(),
                category: $("#category").val()
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
                        $("#drinkPic").val("");
                        $("#drinkName").val("");
                        $("#tallPrice").val("");
                        $("#grandePrice").val("");
                        $("#ventiPrice").val("");
                        // console.log("ok hehe")
                        // console.log("will submit")
                        window.location = "/admin/menu/update/" + url;
                }
            });
        } 

    })
});