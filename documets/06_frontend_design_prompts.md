# Task Done - Frontend Design Prompt

## Description  
**AI Tool**, **Prompt Design** and **Prompt Enginnering** tried to use for the frontend of this project. using differente parameters such as  
software engineering parameters, UI/UX parameter, some user experience parameters, used technologies parameters, and design and pictures parameters.  
after revieving AI generated code, controlling the code and making more compatible with the projects codes tried. the prompt used such as:

#### Introduction Prompt
> I need you to be as an software enginner, web developer and UI UX designer
> and make some modern website webpages codes which I'll tell you later, I will
> explain each page for you and you give me code and then I will go to the next
> page. you need to design its UI UX too and I will give you some points that
> that is my idea for it. the project is for Django and you need to design codes
> only with HTML, Bootstrap and maybe some CSS. Also I need to all pages use
> semantic HTML standards, in some cases I need JavaScript too because the Project
> architecture is I need to send and render the pages with Django but the pages
> must use APIs to getting data. I also want to all pages be responsive for
> desktop, tablet, and mobile. the website concept is about task managing.

#### Base File Prompt
> I need a base HTML file for linking Bootstrap, setting the page title,
> and including its personal CSS file. However, each page has its own CSS files,
> so this file needs to allow other CSS files to be implemented as well.
> This page has a navbar for all pages, which should be designed here.
> The text links need to stay in the center, the brand icon should be on the left,
> and there should be only one login button on the right side.
> After the user logs in, the login button should be replaced with a circle.
> Inside the circle, it should display the first letter of the username.
> When I click on the circle, it should show a Logout option, and by clicking on it,
> the user should be logged out.
> For responsive design, the navigation links should adapt properly on different
> screen sizes, and the user profile circle should remain on the right side of the
> page while becoming smaller on smaller screens. Use proper UI/UX standards
> for the responsive behavior.
> I also need to use an API for login authentication and JavaScript to handle
> checking the user session in a secure way. Please implement it using the best
> practices and a proper software engineering approach.

#### Home Page Prompt
> ok now lets go for designing home page:
> use the base html file for navbar and its other features. in this page I need a modern home page with a beautiful and modren style. I need only landing page in this page with a button wich has written "Go To > Workplace" and some text at the left of the button which has a message like do you tasks comfortable(you can make it like a hook massage or something that user feels friendly with website and relax). also I have > picture that iI send you now to use it for landing page. use the standards of UI UX to make the text and button better view. I mean standards that picture at the backside which button and text is on it. also > the colore you use need to compatible with the picture and some like the user feel comfortable and relaxed.


#### Login Page Prompt
> great, lets go for next page. now, I need a modern login page. use the color that is compatible with home page and its picture but don't use its picture. the login page has user and password inputs without any > forgot your password and other features. the username and password and login process most be safe and secure, using crf and other security features. using form submit or other design is up to you, use the best > way and also more secure way. remember the login process should be with api.

#### Tasks List (Workplace) Page Prompt
> ok great, now I need a task list page, use the same design as other pages, make a modern list task page. in this page we have search input and also a "my tasks" check box which the user check that button, the > page must should show the tasks that the user have created, otherwise, it must show all tasks. each task card should show title, description (you just need to show only one or two line and after that use > something like shadow or anything that shows the text has more and then user can click on the card and it locates to another page to shows whole task completely), which user created this and when created, or > updated (if created_by with updated_by was not equal it needs to write updated in UI and shows the date), and status which status is checkbox too, it is a boolean which if it was false, it should write not done > and if it true, it needs to write "Done!" and also its card should get whiter or transparent, some thing like the card is done so it needs to be different of other card which are not done (remember when the > task Done you do not need to lock the checkbox, maybe user want to uncheck again so the card needs go get back like its past). also in each card it needs edit and delete button and use icon buttons like you know > want to use as standard UI UX icons for this. also this icons (delete and edit) must enables only for users which have created that task. also when its icon buttons are disabled, it should has it space, you > know the layout must not changes with the enabling and disabling icon buttons. but for the entire page we show use create a task in the top right of the tasks cards box which click on it it should go the another > page, also same for edit and delete they are go for their pages after clicking on it, if you think it can be better, I will send a picture for you to use on the right side of left side of the boxes. also >remember the lists must get by API in JSON. search input and my tasks filter need to use API, and getting the data Json too.







