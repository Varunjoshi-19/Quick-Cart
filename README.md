IN ORDER TO INTEGRATE SHADCH IN YOUR PROJECT SOME PREREQUSITES REQUIRED :
LIKE FIRST INSTALL  TAILWINDCSS AND SOME CHANGE  REQUIRED IN YOUR CONFIGRATION FILES : 

## npm install -D @types/node
## npm install --save-dev @types/node


1. install tailwindcss : 
       npm install -D tailwindcss@3.4.3 postcss autoprefixer 
       npx tailwindcss init -p

## change the tailwind file configartion : 


2. tsconfig.json : 
 add this line :  

  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/*": [
        "./*"
      ]
    }
  }

# vite.config.ts : add this line ; 

resolve : {
     alias : {
       "@" : path.resolve(__dirname , "src")
     }
  }

## tsconfig.app.json : add this line in compiler options : 
 "baseUrl": "./src",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }

AFTER THIS YOU CAN EASILY INSTALL AND USE SHADCN IN YOUR PROJECT .






## The project is currently a work in progress. So some features might not work as expected.
