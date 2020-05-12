
$(document).ready(function() {
    $('.update-btn').click(function() {
        var btn = this.id;
        var words = btn.split("-");
        
        var status = words[0];
        var id = words[1];

        if (status == "Prepare") 
            status = "Preparing";
        else if (status == "Serve") 
            status = "Ready"
        else if (status == "Done")
            status = "Done"

        var order = {
            id: id,
            status: status
        }

        $(`#order-${id}`).attr('style', 'display: none');

        $.post('/admin/orders/update', order, function(data, status) {
            
        })
    })
});