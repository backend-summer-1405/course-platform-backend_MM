## E-commerce Task (database:postgresql,no UI,with postman)

`(not completed)`

## resource of Database 

--user
   |
   |  id : String @id @default(uuid())
   |  userName : String (contain fname or lname of the User)
   |  email : String (...@gmail.com) unique
   |  password : String 
   |  role : String ("user","admin") default : user
   |  profileImage: string
   |  images : Array (UserImage[]) --relation
   |  favorites : Array (course[]) --relation
   |  course : Array (course[]) --relation after buy the course
   |  podcast : Array (podcast[]) --relation
   |  
   ----------------------------------

--course
   |
   |  id : String @id @default(uuid())
   |  title : String (text that contain name and brand of the course )
   |  description : String (text that contain specifications of the course)
   |  teacher_id : user_id of teacher --relation
   |  create_at : String (iso Date)
   |  price : Number (Integer)
   |  images : Array (courseImage[])
   |  categories : Array (Category[])
   |  
   |
   ---------------------------------------

--userImage
   |
   |  id : Int  @id @default(autoincrement())
   |  url : String 
   |  user_id : String (id of the User)
   |  user : object (User) --relation
   |  

--courseImage
   |
   |  id : Int  @id @default(autoincrement())
   |  url : String 
   |  course_id : String (id of the course)
   |  course : object (course) --relation
   |     
   ------------------------------------------

--podcast   
   |
   |  id : Int  @id @default(autoincrement())
   |  url : String 
   |  teacher_id : String (id of the teacher)
   |  
   |     
   ------------------------------------------

--category
   |
   | id: Int  @id @default(autoincrement())
   | name : String
   | courses : Array (course[]) --relation
   |

--favorite
   |
   | id : Int  @id @default(autoincrement())
   | user_id : String (id of the User)
   | course_id : String (id of the course)
   | courses : Array (course[]) --relation


## project_structure :

|-prisma
|   |
|   |_schema.prsima (for adding resource model in database (user,course,...))
|    
|
|--src 
|   |
|   |--middleware
|   |     |
|   |     |_authenticate.ts
|   |     |_authorize.ts
|   |     |_error_middleware.ts
|   |     |_response_handler.ts
|   |
|   |--modules (contain controller validation types routes)
|   |    |_auth     
|   |    |_user     
|   |    |_wallet   
|   |    |_course   
|   |    |_podcast  
|   |    |_news
|   |
|   |--uploads (contain audio image)
|   |    |
|   |    |_user
|   |    |_course   
|   |    |_podcast
|   |    |_news
|   |    
|   |    
|   |--util
|   |
|   |_app.ts
|




## api structure : 

--- document in Postman ---
