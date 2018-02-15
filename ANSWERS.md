1. We found three .gitignore files, one at the root of the project, one for the client directory,
and one for the server directory. The .gitignore file at the root of the project affects everything,
whereas the .gitignore file in the client directory only affects files in there. The .gitignore file
in the server directory only affects files there. You may want multiple .gitignore files if you want
them to ignore separate things. The .gitignore file in server does not affect the client and vice-versa.

2. We noticed that there are three gradle files, one for the server, one for the client, and one
at the root of the project. The root gradle file depends on both the server and clients' gradle
files. We may wish to have separate gradle files because the client and server might each need
dependencies that the other does not need. This way we can keep the client and server separate and 
more flexible for future changes. 

3. There are two options on the navbar, the home button that takes you to the default
home page, which is '' in app.routes.ts, then there is a users button which routes you
to '/users' in app.routes.ts which will only display that section in the app.component.html
file .You can route to either of these with runClient running regardless of whether 
the server is up. No, the SparkJava server isn't the only thing doing routing. The 
app.routes.ts file is routing to different pages inside of the client.

4. user-list.services.ts contains all the logic. This is globally available to everyone. You could have
the component file act as a service to get user data, but doing this every time you want the data would
be slow and inconvenient. It is more convenient to just have one service file get the data, then you can
make multiple components refer to the one service for user data whenever you want. This is faster. 
