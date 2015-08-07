'use strict';

$(function() {
  // url root
  var sa = 'http://localhost:3000';


  // hides order review and edit options untill buttons below clicked
  $("#showIndex").hide();
  $("#jobCrud").hide();

  // show review options when review orders button clicked
  $("#review-orders").on('click', function() {
    $("#showIndex").show();
    $("#jobCrud").hide();
  });

  // show edit order CRUD buttons when edit order button clicked
  $("#edit-orders").on('click', function() {
    $("#jobCrud").show();
    $("#showIndex").hide();
  });


  // hide section untill 'show all' button clicked
  $("#job-index-sect").hide();

  // hide section untill 'find order' button clicked
  $("#job-show-sect").hide();


  // new user create/register handler
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

  // user login click handler
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


  // create job click handler - for admin only
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

  // job update click handler - for admin only
  $("#job-update").on('click', function(){
    debugger;
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

  // job destroy click handler - for admin only
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


  // handlebars template for 'show' jobs
  var jobShowTemplate = Handlebars.compile($('#job-show-template').html());

  // click handler for showing job by id
  $("#job-show").on('click', function(event){
   $.ajax({
     url: sa + "/jobs/" + $("#job-show-id").val(),
     method: 'GET',
     headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
     }).done(function(data){
        console.log(data);
        var newJobHtml = jobShowTemplate({job: data}); // FIX ME
        $("#show-jobs-list").html(newJobHtml);
        $("#job-show-sect").show();
        $("#job-index-sect").hide();
        console.log(newJobHtml);
     }).fail(function(data){
        console.error(data);
        alert('Failed to show job ' + $("#job-show-id") + '. Please make sure this job exists before trying again.');
     });
  });


  // handlebars template for 'index' jobs
  var jobIndexTemplate = Handlebars.compile($('#job-index-template').html());

  // click handler for indexing all jobs
  $("#job-index").on('click', function(event){
   $.ajax({
     url: sa + "/jobs",
     method: 'GET',
     headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
    }).done(function(data){
      console.log(data);
      var newJobHtml = jobIndexTemplate({jobs: data.jobs});
      $("#index-jobs-list").html(newJobHtml);
      $("#job-index-sect").show();
      $("#job-show-sect").show();
    }).fail(function(data){
     console.error(data);
     alert('Failed to show all jobs. You may not have any active jobs.');
    });
  });




});
