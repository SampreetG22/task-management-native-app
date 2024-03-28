**task-management-native-app**

**OVERVIEW**
1. The App was developed in an iPhone 13 Pro Max using Expo Go since it is not a development build and can be very useful if there are any future developments.
2. The instructions are pretty simple. Firstly, clone the repo locally and install all the node modules using the command **npm i**. 
3. Install the app, **Expo Go** on your mobile and then just simply run the application on the Expo Go server using **npx expo start --go** in your terminal.
3. This will generate a QR Code which can be scanned directly from the stock camera and you will be redirected to the app. If you are using Android, the QR Code can be scanned within the app itself.
4. When the app opens, the developed application can be seen.
  
**DEFAULTS**
To test the app and UI, a default tasks list is hardcoded in the codes since there is no backend involved in this whole application. This list covers all the statuses "Pending", "In Progress", "Completed", "Deployed" and "Deferred". Any new task added or edited will be pushed into this default list. 
