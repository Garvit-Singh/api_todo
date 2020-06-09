I have attached my Schema which will consist of subdocument. There is parent schema with User,Password,Email,notes and id.
This notes is a subdocument which will have each note uploaded by the user with id (number to keep track of the note number easily should be passed by front-end developer while making note) and main note will consist of two parts title and discription and these two are not complusory.

<image src="images/ProjectSchema.png" width="700" height="400" float="left">

To view or check all the users available in database USE GET METHODGet to your environment path followed by '/notes' as shown in following link .
http://localhost:4000/notes/
Database Response will be something like this where u are not allowed to see other users password or notes they have saved.

<image src="images/allusers.png" width="700" height="400" float="left">

To sign up as a new user to add your account in database USE POST METHOD to your environment path followed by '/notes/signup' as shown in following link .
Information need to be passed includes Email address(unique for each user, multiple accounts with same mail-address are not allowed),
User name and password. Id will be alloted by database which can be used to access data of user in future.
Parameter to be passed in json format {"user","password","email"}.
http://localhost:4000/notes/signup

signup with already existing mail is not allowed will show error as follows:

<image src="images/signup1.png" width="700" height="400" float="left">

Signup with different mails are allowed and will yield user information as follows and UserId to be used in future for further working with database

<image src="images/signup2.png" width="700" height="400" float="left">

To login USE POST METHOD to your environment path followed by '/notes/login' as shown in following link. Provide with user,email,password.Login will give you a token which will be used for security reasons.
http://localhost:4000/notes/login 

<image src="images/login.png" width="700" height="400" float="left">

For information of particular user USE GET METHOD to your environment path followed by '/notes/:userId' as shown in following link.
userId is id given at the time of creating user.
http://localhost:4000/notes/:userId

<image src="images/particularuser.png" width="700" height="400" float="left">

U can updaate user information such as user name, password, email-address to the same path using PATCH METHOD.
http://localhost:4000/notes/:userId

<image src="images/updateuserinfo1.png" width="700" height="400" float="left">

<image src="images/updateuserinfo2.png" width="700" height="400" float="left">

U can also delete user to the same path using DELETE METHOD
http://localhost:4000/notes/:userId

<image src="images/deleteuser1.png" width="700" height="400" float="left">
  
In order to delete all notes in one go of a particular user USE DELETE METHOD to your environment path followed by '/notes/user/:userId' as shown in following link.
http://localhost:4000/notes/user/:userId

<image src="images/deleteallusernote1.png" width="700" height="400" float="left">

After deleting notes will be an empty array as shown: 
<image src="images/deleteallusrenote2.png" width="700" height="400" float="left">
  
To create or add new notes to the users account in subdocument or notes schema USE PATCH METHOD to your environment path followed by '/notes/:userId/:id' as shown in following link.(id for each note should be different as notes are different and to be provided by front-end developer)
http://localhost:4000/notes/user/:userId/:id

<image src="images/updatenote1.png" width="700" height="400" float="left">

In order to delete particular note with note id = id USE DELETE METHOD to your environment path followed by '/notes/user/:userId/:id' as shown in following link.
http://localhost:4000/notes/user/:userId/:id

<image src="images/deletenoteofuser.png" width="700" height="400" float="left">
  
<image src="images/deletenoteofuser1.png" width="700" height="400" float="left">
  

PLEASE ENJOY WORKING WITH MY API 
(comment below for further changes u want)
