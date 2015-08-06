'use strict';

$(function() {
  var sa = 'http://localhost:3000';

    $('#register').on('click', function(e){
      $.ajax(sa + '/users', {
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
          credentials: {
            given_name: $('#given_name').val(),
            surname: $('#surname').val(),
            email: $('#email').val(),
            password: $('#password').val()
          }
        }),
        dataType: 'json',
        method: 'POST',
        headers: {
          Authorization: 'Token token=' + $('#token').val()
        }
      }).done(function(data, textStatus, jqxhr){
        console.log(JSON.stringify(data));
        // $('#myRegisterModal').modal('hide'); // FIX ME
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log('registration failed');
      });
    });

    $('#login').on('click', function(e) {
      $.ajax(sa + '/login', {
        contentType: 'application/json',
        processData: false,
        data: JSON.stringify({
          credentials: {
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val()
          }
        }),
        dataType: 'json',
        method: 'POST',
        headers: {
          Authorization: 'Token token=' + $('#token').val()
        }
      }).done(function(data, textStatus, jqxhr){
        console.log(data.token);
        $('#token').val(data.token);
      }).fail(function(jqshr, textStatus, errorThrown){
        console.log('login failed');
      });
    });




    // navbar modal open for login
    $('.btn-login').click(function(){
      $('#myLoginModal').modal({show:true});
    });

    // navbar modal open for login
    $('.btn-register').click(function(){
      $('#myRegisterModal').modal({show:true});
    });

    // alert('just before job-create');

  $("#job-create").on('click', function(){
    $.ajax(sa + '/jobs', {
      method: 'POST',
      data: {
        job: {
          title: $('#job-title').val(),
          description: $('#job-description').val(),
          status: $('#job-status').val(),
          cost: $('#job-cost').val(),
          user_id: $('#job-user-id').val()
        }
      }
      }).done(function(data){
          console.log("Created job");
      }).fail(function(data){
        console.error(data);
      });
    });

  $("#job-update").on('click', function(){
    $.ajax(sa + '/jobs/' + $('#job-id').val(), {
      method: 'PATCH',
      data: {
        job: {
          title: $('#job-title').val(),
          description: $('#job-description').val(),
          status: $('#job-status').val(),
          cost: $('#job-cost').val(),
          user_id: $('#job-user-id').val()
        }
      }
      }).done(function(data){
          console.log("Updated job");
      }).fail(function(data){
        console.error(data);
      });
    });

  $("#job-destroy").on('click', function(){
    $.ajax(sa + '/jobs/' + $("#job-id").val(), {
        method: 'DELETE'
      }).done(function(data){
          console.log("Deleted job");
      }).fail(function(data){
        console.error(data);
      });
  });







});
