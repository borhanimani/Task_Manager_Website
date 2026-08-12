### Welcome to my new Backend (Full Stack) Website Task Done!

## Setup Instructions: 
  1. Clone the project:
       https://github.com/borhanimani/Task_Manger_Website.git  
       *you can download the project zip and extract it*
  
  3. Open the project file or go to the project file with the command:  
       `cd Task_Manager_Website
  
  5. Setting up the Virtual Environment:  
       #### Windows:  
       `python -m venv myenv  
       
       #### macOS / Linux:  
       `python3 -m venv myenv  

    
  6. Activating the Virtual Environment  
       #### Windows:
       `myenv\Scripts\activate  

       #### macOS / Linux:
       `source myenv/bin/activate    
       *after activating you will see something similar to: (myenv)*

  7. Installing Required Packeges:  
       `pip install -r requirements.txt 

  8. Make Database:  
       `cd task_manager_website
       `python manage.py makemigrations
       `python manage.py magrate

  9. Create Admin:    
       `python manage.py createsuperuser

  10. Run the project:  
       `cd task_manager_website  
       `python manage.py runserver  
       *after that you can go to the admin site with: domain/admin and making an user and then use the webapp.*  

## About the project
Task Done is a simple task management web application built for learning purposes.

The application allows users to create, view, update, and delete their own tasks. 
Users can also search for tasks, filter their own tasks, and mark tasks as completed.
#### Technology used is this project:
  **Python/Django**, **Django REST Framework**, **HTML5**, **CSS3**, **JavaScript**, **Bootstrap 5 & Bootstrap Icons**, **SQLite**.
  Also the project deployed in **pythonanywhere Website**

> **Note:** This project was created for learning and educational purposes. It is not intended to be a production application.
