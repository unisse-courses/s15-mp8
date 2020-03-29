$(document).ready(function() {
    $('#btnsubmit').click(function() {
      var fullname = $('#fullname').val();
      var nickname = $('#nickname').val();
      var email = $('#emailAdd').val();
      var phone = $("#phone").val();
      var pass = $("#pass").val();

      var newUser = {
        fullname: fullname,
        nickname: nickname,
        email: email,
        phone: phone,
        pass: pass
      };

      console.log("newUSer: " + newUser)
      console.log("btn clicked");

      $.post('addUser', newUser, function(data, status) {
        console.log("post here");
        console.log(data);
        if (data.success) {
          console.log("data: " + data);
          $('#message').text(data.message);
          $('#message').removeClass('fail');
          $('#message').addClass('success');
    
          $('#fullname').val('');
          $('#nickname').val('');
          $('#emailAdd').val("");
          $('#phone').val('');
          $('#pass').val('');
          $('#confirmPass').val('');

        } else {
          $('#message').text(data.message);
          $('#message').removeClass('success');
          $('#message').addClass('fail');

        }
      });
    })
});