# The instruction of how to run locally the application:-

> Please hit the EndPoint by access token according to your need. User or Admin 
* start:dev- this script for run typsript with auto restert

> total 8 datas there are in model of course. and id is mongodb generated id. have no any custom id;


# "scripts":--

* "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",




# Now i will explain all Endpoints of this project
### 1. Create a User
   * Endpoint: http://localhost:5000/api/auth/register
  * Method: POST
  * Request Body:
 ``` {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "User12@#",
    "role": "user"
}
```

### 2. Login a User
   * Endpoint: http://localhost:5000/api/auth/login

  * Method: POST
  * Request Body:
 ``` {
    "username": "john_doe",
    "password": "User1@#"
}
```


### 3. Change Password
   * Endpoint: http://localhost:5000/api/auth/change-password

  * Method: POST
  * Request Body:
 ```{
    "currentPassword": "User7@##",
    "newPassword": "User7@####"
}
```




### 4. Create a Course
   * Endpoint: http://localhost:5000/api/courses
  * Method: POST
  * Request Body:
 ``` {
    "title": "Sample Course",
    "instructor": "Jane Doe",
    "categoryId": "657adf8d456bd9a903ec43a9",
    "price": 49.99,
    "tags": [
        {
            "name": "Programming",
            "isDeleted": false
        },
        {
            "name": "Web Development",
            "isDeleted": false
        }
    ],
    "startDate": "2023-01-15",
    "endDate":"2023-03-14",
    "language": "English",
    "provider": "Tech Academy",
    "details": {
        "level": "Intermediate",
        "description": "Detailed description of the course"
    }
}
```

### 5. Get Paginated and Filtered Courses.
* Endpoint: http://localhost:5000/api/courses
* Method: GET
> Query Parameters for API Requests:-

* Example:? page=2
* Example:? limit=4
* Example:? sortBy=startDate
* Example:? sortOrder=desc
* Example:? minPrice=20.00&maxPrice=50.00
* Example:? tags=Programming
* Example:? startDate=2023-01-01&endDate=2023-12-31
* Example:? language=English
* Example:? provider=Tech Academy
* Example:? durationInWeeks=13
* Example:? level=Intermediate



### 6. Create a Category
* Endpoint: http://localhost:5000/api/categories
* Method: POST
* Request Body:
```
{
    "name": "Programming"
}
```

### 7. Get All Categories
* Endpoint: http://localhost:5000/api/categories
* Method: GET
* Response:  `please hit the endpoint with for response`


### 8. Create a Review
* Endpoint:  http://localhost:5000/api/reviews
* Method: POST
* Request Body:

```
{
    "courseId": "658cf680ca702c021b2ddecc",
    "rating": 4,
    "review": "Great course, very informative and well-structured."
}
```


### 9. Update a Course (Partial Update with Dynamic Update)**
* Endpoint:   http://localhost:5000/api/courses/658cf680ca702c021b2ddecc
* Method: PUT
* Request Body:

```
{
    "price": 59.99,
    "tags": [
        {"name": "Programming", "isDeleted": false},
        {"name": "Web Development", "isDeleted": false},
        {"name": "JavaScript", "isDeleted": false}
    ],
    "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
    }
}
```

### 10. Get Course by ID by Reviews**
* Endpoint: http://localhost:5000/api/courses/658cf680ca702c021b2ddecc/reviews
* Method: GET
* Response: `please hit the endpoint for response`

### 11. Get the Best Course Based on Average Review (Rating)
* Endpoint: http://localhost:5000/api/course/best
* Method: GET
* Response: `please hit the endpoint for response`

