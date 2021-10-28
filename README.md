# Deaffee Default Installation guide
1. Open a terminal and type "npm install -g @ionic/cli" 
2. Type "npm install" in the project folder
3. Use the command "ionic capacitor run android -l --external" to run the app on a emulator or with a phone that is connected and trusted with your pc.

# Deaffee Test Installation guide
1. Type "npm install" in the project folder
2. Type "npm run test:e2e" for e2e tests.
3. Type "npm run test:unit" for unit tests.

# Alternative root url etc.
Our application uses the .env file to get the root url and the client id and client secret.
>Yes we know the secret is supposed to be secret but its a school project :)

*VUE_APP_NAME="Deaffee"*

*VUE_APP_ROOT_API="https://ondergrondseontwikkeling.nl/"*

*VUE_APP_CLIENT_ID=2*

*VUE_APP_CLIENT_SECRET="BFjwuj2Rd8HtduFIDeR5jP95gyiQmKIP68MlQOpZ"*

# Problems
When you open the project in android studio there might be an issue running the project with the "ionic capitator run" command. To solve this you will need to delete the "android" folder and run "ionic cap add android". After this things should run fine.
