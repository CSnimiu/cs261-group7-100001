# Repository for team project in CS261 course
### (Group 7 Section 100001)
This repository has one branche: *'main' (Default)*  

Main branch will be the place to keep up to date with the latest progress of the project. As of this writing, the project is still in development.  
**--> Current completed task:**
- Login system that calls the TU API to verify identity (Frondend code with TU API)
- Main page

## This is the 'main' branch
This branch contains 2 main folders:
>
>- **Frontend/**
>> .html
>>
>> .css
>>
>> .js
>>
>> .json
>>
>> .png (images)
>>
>> .gitignore  
>>
>- **Server-Setup/**
>>.dockerfile (docker image for build & run on Docker)
>>


### Accessing the project  
You can install the latest version of this project by **cloning project** using the command:  
>`git clone https://github.com/CSnimiu/cs261-group7-100001`  

or select the download option via **Code > Download Zip** and then extract the zip file to access the working folder.  
  

**If you already have this project on your device**, you can use the command to grab the updated version of the project using the command:  
>`git pull origin main`  


### Install and Running server
The last two lines of the **DockerContainer_NodeJS.dockerfile** file contain the commands used to build and run the docker image to create a NodeJS server.  

***Note that:*** these commands only work properly if you build the docker file in the same location as the `frontend` and `server-setup` folders, so use the code with caution.  

.
.
.
*The project will be updated continuously...*