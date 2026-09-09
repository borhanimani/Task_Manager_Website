### Welcome to my new Backend (Full Stack) Website Task Done!

## Setup Instructions: 
  1. Clone the project:
       https://github.com/borhanimani/Task_Manager_Website.git   
       *you can download the project zip and extract it*
  
  3. Open the project file or go to the project file with the command:  
       ```cd Task_Manager_Website```
  
  5. Setting up the Virtual Environment:  
       #### Windows:  
       ```python -m venv myenv```
     
       #### macOS / Linux:  
       ```python3 -m venv myenv```  

    
  7. Activating the Virtual Environment  
       #### Windows:
       ```myenv\Scripts\activate```  

       #### macOS / Linux:
       ```source myenv/bin/activate```    
       *after activating you will see something similar to: (myenv)*

  8. Installing Required Packeges:  
       ```pip install -r requirements.txt```   

  9. Make Database:  
       ```cd task_manager_website```  
       ```python manage.py makemigrations```  
       ```python manage.py magrate```  

  10. Create Admin:    
       ```python manage.py createsuperuser```

  11. Run the project:  
       ```cd task_manager_website```  
       ```python manage.py runserver```  
       *after that you can go to the admin site with: domain/admin and making an user and then use the webapp.*  

## About the project
Task Done is a simple task management web application built for learning purposes.

The application allows users to create, view, update, and delete their own tasks. 
Users can also search for tasks, filter their own tasks, and mark tasks as completed.
> **Note:** You can get more imformation about the project and its documents in the "documents" folder.
#### Technology used is this project:
  **Python/Django**, **Django REST Framework**, **HTML5**, **CSS3**, **JavaScript**, **Bootstrap 5 & Bootstrap Icons**, **SQLite**.
  Also the project deployed in **pythonanywhere Website**

> **Note:** This project was created for learning and educational purposes. It is not intended to be a production application.   

## Usage Notice

This notice applies to the entire project, including all source code, files, and project history available in this repository, including content committed before this notice was added.

This project is provided solely for personal learning and educational purposes.

You may clone this repository to your own computer, install its required dependencies, and run it locally for learning and evaluation purposes.

Viewing and studying the source code is permitted.

Redistributing, republishing, selling, sublicensing, or creating and distributing modified or derivative versions of this project is not permitted.

Third-party libraries and components used by this project remain subject to their respective licenses.

This project is provided "as is" and is not intended for production use. The author is not responsible for any damage, data loss, security issues, malware, or other consequences resulting from unauthorized modifications or misuse of the project.

