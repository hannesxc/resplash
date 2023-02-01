# Resplash  
  
## About  
  
Unsplash like website, where unauthenticated users can browse the site freely for images (view them, download them, etc). Authentication on the other hand, is done through OAuth2, and authenticated users can upload images, like them, view metadata, etc. Users also have their own dashboard where they can view information about their account/likes/postings.  
  
## Project  
  
This app was bootstrapped by vite-react, and uses TailwindCSS for styling, OAuth2 for authentication, Firebase as backend (for storage, and individual user entries).  
  
## Run this app locally   
  
Fork this repo, and clone it to your local machine. Create an .env.local file in base directory, and put in your firebase config keys with their values following the respective key names in `config.js` file. Make sure you have npm installed prior to executing these commands.  

> `npm install` to install the required dependancies.  
  
> `npm run dev` to run the app on your localhost.  
