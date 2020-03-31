$(document).ready(function() {
  $('#btnsubmit').click(function() {
    var fullname = $('#fullname').val();
    var nickname = $('#nickname').val();
    var emailAddress = $('#emailAdd').val();
    var phone = $("#phone").val();
    var password = $("#pword").val();
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

    $.post('/user/addUser', newUser, function(data, status) {
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
        $('#pword').val('');
        $('#confirmPass').val('');

        // window.location = "/user/customer/home";

      } else {
        $('#message').text(data.message);
        $('#message').removeClass('success');
        $('#message').addClass('fail');

      }
    });
  });

    $('#loginCustomer').click(function() { 
      
      var emailAddress = $('#email').val();
      var password = $('#pass').val();

      var user = {
        emailAddress: emailAddress,
        password: password
      }
      console.log("before routing email: " + user.emailAddress + " password: " + user.password);

      console.log("login btn clicked");
      $.post('/user/login', user, function(data, status) {
        if (!data.success) {
          $('#loginMsg').text(data.message);
          $('#message').addClass('fail');
          console.log("invalid user");
        }
        else {
          // res.send({redirect: 'customer/home'});
          console.log("user found!");
          window.location = "/user/customer/home";
        }
      });
    });
});