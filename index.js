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
        method: 'POST'
      }).done(function(data, textStatus, jqxhr){
        console.log(data.token);
        simpleStorage.set('token', data.token);
        $('#work-order-visible').removeClass('hide');
        window.location.href = "work_orders.html";
      }).fail(function(jqshr, textStatus, errorThrown){
        console.log('login failed');
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
      });
  });


  var jobShowTemplate = Handlebars.compile($('#job-show-template').html()); // CREATE ME

  $("#job-show").on('click', function(event){
   $.ajax({ // change this button
     url: sa + "/jobs/" + $("#job-id").val(),
     method: 'GET',
     headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
     }).done(function(job){
       $("#show-job").html(jobShowTemplate({
         job: response.job
        }));
     }).fail(function(data){
       console.error(data);
     });
  }); // end job show

  var jobIndexTemplate = Handlebars.compile($('#job-index-template').html());

  $("#job-index").on('click', function(event){
   $.ajax({
     url: sa + "/jobs",
     metho: 'GET',
     headers: {
        Authorization: 'Token token=' + simpleStorage.get('token')
      }
    }).done(function(data){
     $("#index-job").html(jobIndexTemplate({
       job: data
     }));
    }).fail(function(data){
     console.error(data);
    });
  }); // end workshop index






});
