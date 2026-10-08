## E-commerce Task (database:postgresql,no UI,with postman)


## resource of Database 

-- check schema.prisma --


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
|   |--types
|   |
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
