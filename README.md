# Nesto Guitar Service
Project #2

This frontend is built for Nesto Guitar Service, a website that details a local luthier's services and allows customers to track the status of their work orders. The code for frontend is made up of JavaScript, HTML, and CSS using jQuery and AJAX requests to interact with the backend. Bootstrap was used primarily for CSS styling as well as Handlebars for rendering JSON from AJAX requests.



This game was created as my second project for General Assembly's Web Development Immersive. My approach to creating this game began with simple wireframes from which my HTML/CSS and JavaScript code developed. I had planned to implement a shop for users to buy guitars and parts and plan to continue working to add this feature. I currently have a contact form template on the contact page, and plan to make this feature send emails to the admin. These are unsolved aspects that I plan to continue working on.



### Wireframes Early Sketches
![Alt text](/wireframes-user-stories/wireframe1.png)
![Alt text](/wireframes-user-stories/wireframe2.png)

## Data Modeling Early Sketches
![Alt text](/wireframes-user-stories/Data-Model.png)
![Alt text](/wireframes-user-stories/data-model2.png)
![Alt text](/wireframes-user-stories/data-model3.png)

## User Stories
My [user stories](/wireframes-user-stories/user-stories.txt) outline basic user activity for registering, logging in and reviewing the status of work orders. They also detail admin activity and the admin's ability to create, update and delete work orders as well as view an index of all open jobs.


Check out my site [here]: (http://tiffboors29.github.io/ng-fe/)
You can register or login to review work orders on the services--> my work orders page. Without administrative functions, however, you will not be able to create, update or delete orders. To get a feel for the site and the admin capabilities, feel free to sign in with
* email: admin@nestoguitars.com
* password: nestoadmin

Logged in as this admin on the my-work-orders page, you will be able to view all orders when you click 'Review Orders' and then click 'Show All'. You will also be able to edit orders by their id number if you click 'Edit Orders'.

To view order as a regular customer or user, login with
* email: guest@nestoguitars.com
* password: nestoguest

Logged in as this guest on the my-work-orders page, you will be able to view only orders associated with this guest customer when you click 'Review Orders' and then click 'Show All'. You will also not be able to edit, create or delete orders because you do not have admin permissions.
