Get all data of database (use GET METHOD)
http://localhost:4000/notes/

<image src="images/allusers.png" width="400" height="400">

To get sign up or add user to database (use POST METHOD)
Provide email, user(for user name), password(protected and to be remebered)
http://localhost:4000/notes/signup

signup with already existing mail is not allowed
<image src="images/signup1.png" width="400" height="400">
signup with different mails are allowed and will yield this
<image src="images/signup2.png" width="400" height="400">

to login after signup use (use POST METHOD)
http://localhost:4000/notes/login 
as shown below
<image src="images/login.png" width="400" height="400">

to get particular user data append id as in below link(use GET method)
http://localhost:4000/notes/:userId
<image src="images/particularuser.png" width="400" height="400">

to update user information such as email and name or password use as shown below(use PATCH method)
http://localhost:4000/notes/:userId
<image src="images/updateuserinfo1.png" width="400" height="400">
<image src="images/updateuserinfo2.png" width="400" height="400">

to delete user ( use DELETE METHOD)
http://localhost:4000/notes/:userId
<image src="images/deleteuser1.png" width="400" height="400">

to create new notes (use PATCH METHOD)
http://localhost:4000/notes/user/:userId/:id
userId is unique for each user and provided however notes id should be different for each note created therefore
give different id for each notes in request
<image src="images/updatenote1.png" width="400" height="400">

to delete particular note access it by the unique note id developer provided (use DELETE METHOD)
http://localhost:4000/notes/user/:userId/:id
<image src="images/deletenoteofuser.png" width="400" height="400">
<image src="images/deletenoteofuser1.png" width="400" height="400">

to delete all notes in one go of a particular user ( use DELETE METHOD)
http://localhost:4000/notes/user/:userId
<image src="images/deleteallusernote1.png" width="400" height="400">
<image src="images/deleteallusernote2.png" width="400" height="400">

PLEASE ENJOY WORKING WITH MY API 
(comment below for further changes u want)