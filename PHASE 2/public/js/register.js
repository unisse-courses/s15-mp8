$(document).ready(function() {
  $('#btnsubmit').click(function() {
    var fullname = $('#fullname').val();
    var nickname = $('#nickname').val();
    var emailAddress = $('#emailAddress').val();
    var phone = $("#phone").val();
    var password = $("#password").val();
    var confirmPass = $("#confirmPass").val();

    console.log("password: " + password);
    console.log("email: " + emailAddress);

    var newUser = {
      fullname: fullname,
      nickname: nickname,
      emailAddress: emailAddress,
      phone: phone,
      password: password, 
      confirmPass: confirmPass
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
        $('#emailAddress').val("");
        $('#phone').val('');
        $('#password').val('');
        $('#confirmPass').val('');

      } else {
        $('#message').text(data.message);
        $('#message').removeClass('success');
        $('#message').addClass('fail');

      }
    });
  });

    $('#loginCustomer').click(function() { 
      
      var emailAddress = $('#emailAddress').val();
      var password = $('#password').val();

      var user = {
        emailAddress: emailAddress,
        password: password
      }
      console.log("login btn clicked");
      $.post('login', user, function(data, status) {
        if (!data.success) {
          $('#loginMsg').text(data.message);
          $('#message').addClass('fail');
        }
        else {
          res.send({redirect: '/home-customer'});
        }
      });
    });
});