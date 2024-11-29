
# Repository for team project in CS261 course
### (Group 7 Section 100001)
Currently, this repository has 2 branches: *`'main' (Default)`*, *`'profile'`*  

**--> Current completed task (project status):**
- Login system that calls the TU API to verify identity (Professor use Mock) + Logout
- Home page
- Profile page
- Form pages 
  
### **Navigation:**  
[Branch Structure](#branch-structure "Branch information")  
[Download Project](#download-project "Install the project on your local")  
[Install and Running server](#install-and-running-server "Install and running server by Docker")  


## Branch Structure
### This is the 'profile' branch
The profile branch is now a repository for working projects. As of this writing, the project is still in development.  

This branch contains 3 main folders:
>
>* **Frontend/**
>>   * .html **/** .css **/** .js **/** .json **/** .png (images) **/** .gitignore
>> 
>* **Server-Setup/**
>>   * .dockerfile (docker image for build & run on Docker)  
>>
>* **Backend/**
>>   * Database and API Management
>
  
## Download Project 
You can install the ~~latest version~~ *Default branch (main)* of this project by **cloning project** using the command:  
>`git clone https://github.com/CSnimiu/cs261-group7-100001`  

To download ***only this*** sub-branch, please use the command:
>`git clone -b main https://github.com/CSnimiu/cs261-group7-100001` 

or select the download option via **Code > Download Zip** and then extract the zip file to access the working folder.  
  
**If you already have this project branch on your device**, you can use the command to grab the updated version of the project using the command:  
>`git pull origin main`  


## Install and Running server
The last two lines of the **DockerContainer_NodeJS.dockerfile** file in `server-setup` folder contain the commands used to ***build*** and ***run*** the docker image to create a NodeJS server.  

> **Build**  
>`docker build -f server-setup/DockerContainer_NodeJS.dockerfile -t node-js-image .`  

> **Run**  
>`docker run -d --name node-js --network mynetwork -p 3000:3000 node-js-image`

***Note that:*** these commands only work properly if you build the docker file in the same location as the `frontend` and `server-setup` folders, so use the code with caution.  

.  
.  
.  
*The project will be updated continuously...*
