# Task Done - Project Overview   

## Description   
The web application has three part which are front-end, backend and database. which we tell more about:   

### Application   
The web application has three part which are front-end, backend and database. The server for devloping and the stackholder needs are limited.  
The stackholder need a website to have pages and backend. He also want the website have REST API to connect with different devices not just  
with the backends render pages. But now, we have a limit which is we only have one server to deploy and the stackholder dosn't need the the  
mobile app or other devices apps, so we need to design desktop pages for rendering with backend and make the website functional and  
making it responsice for other devices (it has less costs. It needs less design and less server space and less server counts) and REST API   
to make the app connects to different devices. So decision is desiging **pages' APIs** which calls the pages and render them, and **REST APIs**  
which the rendered pages and other devices can use them and make connection with backend and database securely. This architecture helps to  
build a full website with frontend side and workable in less cost and limited requires, and a separated REST APIs to use with any devidce  
or frontend sides. **"architecture_design.png"** file in **assets** folder explains about the architecture design.   

### Backend / Database    
The backend and database are connected together using **SQLite** which the backend is managing the backend using **ORM**.   
so the developer is not controlling the database direcly. **"er_diagram.png"** file in **assets** folder explains about the
database diagram and relationship with users and tasks.

### Frontend   
The frontend part connects with APIs (page APIs for getting page files, and REST APIs to make connection with backend and database).
