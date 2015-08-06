'use strict';

$(function() {
  var sa = 'http://localhost:3000';

  // navbar modal open for login
  $('.btn-login').click(function(){
    $('#myLoginModal').modal({show:true});
  });

  // navbar modal open for login
  $('.btn-register').click(function(){
    $('#myRegisterModal').modal({show:true});
  });

  $('#work-order-show-sect').hide();
  $('#admin-crud').hide();

  $("#review-orders").click(function(){
    $('#work-order-show-sect').show();
  });

  $("#edit-orders").click(function(){
    $('#admin-crud').show();
  });


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
        method: 'POST'
      }).done(function(data, textStatus, jqxhr){
        console.log(JSON.stringify(data));
        simpleStorage.set('token', data.token);
        window.location.href = "work_orders.html";
      }).fail(function(jqxhr, textStatus, errorThrown){
        console.log('registration failed');
        alert('Registration failed. Please try again.');
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
        method: 'POST'
      }).done(function(data, textStatus, jqxhr){
        console.log(data.token);
        simpleStorage.set('token', data.token);
        window.location.href = "work_orders.html";
      }).fail(function(jqshr, textStatus, errorThrown){
        console.log('login failed');
        alert('Login failed. Please make sure your email and password are correct.');
      });
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
      },
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
      }).done(function(data){
          console.log("Created job");
      }).fail(function(data){
        console.error(data);
        alert('Job creation failed. If you are not an admin, you are not authorized to create jobs.');
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
      },
      headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
      }).done(function(data){
          console.log("Updated job");
      }).fail(function(data){
        console.error(data);
        alert('Job update failed. If you are not an admin, you are not authorized to update jobs.');
      });
    });

  $("#job-destroy").on('click', function(){
    $.ajax(sa + '/jobs/' + $("#job-id").val(), {
        method: 'DELETE',
        headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
      }).done(function(data){
          console.log("Deleted job");
      }).fail(function(data){
        console.error(data);
        alert('Job deletion failed. If you are not an admin, you are not authorized to delete jobs.');
      });
  });


  var jobShowTemplate = Handlebars.compile($('#job-show-template').html()); // CREATE ME

  $("#job-show-template").on('click', function(event){
   $.ajax({
     url: sa + "/jobs/" + $("#job-show-id").val(),
     method: 'GET',
     headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
     }).done(function(data){
      console.log(data);
        var newJobHtml = jobShowTemplate({jobs: data});
        $("#show-jobs-list").html(newJobHtml);
     }).fail(function(data){
       console.error(data);
       alert('Failed to show job' + $("#job-show-id") + '. Please make sure this job exists before trying again.');
     });
  }); // end job show

  var jobIndexTemplate = Handlebars.compile($('#job-index-template').html());

  $("#job-index").on('click', function(event){
   $.ajax({
     url: sa + "/jobs",
     method: 'GET',
     headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
    }).done(function(data){
      console.log(data);
      var newJobHtml = jobIndexTemplate({jobs: data});
      $("#index-jobs-list").html(newJobHtml);
    }).fail(function(data){
     console.error(data);
     alert('Failed to show all jobs. You may not have any active jobs.');
    });
  }); // end job index






});
