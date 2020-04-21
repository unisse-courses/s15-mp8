
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