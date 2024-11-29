
# Repository for team project in CS261 course
### (Group 7 Section 100001)
Currently, this repository has only one main branch: *`'main'`*

**--> Current completed task (project status, Sprint 2):**  
*Student:*  
- Login system that calls the TU API to verify identity + Logout system (manually logout and session timeout).
- The online's requests form system consists of a main page where application forms can be written, a request history page showing a list of applications currently in progress, and a personal history page containing student information.
- A database system that can record student information and written requests, including sending requests to the professor's side.
*Professor:*  
- Login in professors side with Mockup account for use in developing, testing and presenting (demo) systems + Logout system.
- Online request system for professor, which can choose to approve or reject student's requests, and record the status of the request in the system, consisting of a main page and a request history page.
- Database system for recording the processing of requests by professor.
  
### **Navigation:**  
[Branch Structure](#branch-structure "Branch information")  
[Download Project](#download-project "Install the project on your local")  
[Install and Running server](#install-and-running-server "Install and running server by Docker")  


## Branch Structure
### This is the 'main' branch
The profile branch is now a repository for working projects. As of this writing, the project is still in development.  

This branch contains 3 main folders:
>
>* **Backend/**
>>   * Folder for the backend part, which is related to the system's database and API system
>> 
>* **Frontend/**
>>   * Contains files for web page display and user interaction. Including functions related to calling the backend system
>>
>* **server-setup/**
>>   * To store docker files to run the docker image to create a NodeJS server in Docker app
>
and there are other folders and files related to system testing
  
## Download Project 
You can install the *Default branch (main)* of this project by **cloning project** using the command:  
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
