# sms-backend
backend for sms website


.env

PORT = 3000
MONGODB_URI = 'mongodb://localhost/dev'
ACCESS_TOKEN = '<dropbox access token>'





hit submit form (front end)
post /photos/:id
  goes to MONGODB photos for that Car ID and deletes everything for it in DB 
  goes to dropbox folder for that CarID and gets all fileBlobs
  for each file -> save blob to DB
  
get /photos/:id
  goes to MONGODB for the car ID and downloads all photos for car 

