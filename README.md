### Github Link: https://github.com/Porgramming-Hero-web-course/l2-b2-fullstack-track-assignment-8-abdullahboshir

### App Live Link: https://travel-buddy-matching-ass-8.vercel.app/

### Video record Link: https://www.loom.com/share/469ed5f2250d40a487cf5a33c5225679


# The instruction of how to run locally the application:-

> Please hit the EndPoint by access token according to your need. 
* start:dev- this script for run typsript with auto restert

# "scripts":--

* "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",




# Now i will explain all Endpoints of this project
### 1. Create a User
   * Endpoint: https://travel-buddy-matching-ass-8.vercel.app/api/register
  * Method: POST
  * Request Body:
 ``` {
 {
    "name": "Ph Hero",
    "email": "ph.hero@gmail.com",
    "password": "12345"
  }
}
```

### 2. Login a User
   * Endpoint: https://travel-buddy-matching-ass-8.vercel.app/api/login

  * Method: POST
  * Request Body:
 ``` {
    "email": "ph.hero@gmail.com",
    "password": "12345"
}
```

### 3. Create a trips
   * Endpoint: https://travel-buddy-matching-ass-8.vercel.app/api/trips
  * Method: POST
  * Request Body:
 ``` {
   "userId": "60dd752d-4eb2-495c-8470-3c2f5f6ea057",
    "destination": "Bangladeseh, Bandarban, Coxes bazar",
    "startDate": "2024-11-20",
    "endDate": "2024-11-27",
    "budget": 5900,
    "activities": ["Sea Beach", "Saint Martin"]
}
```

### 4. Get Paginated and Filtered in Trips.
* Endpoint: https://travel-buddy-matching-ass-8.vercel.app/api/trips
* Method: GET
> Query Parameters for API Requests:-

* Example:? destination=Paris, France
* Example:? startDate=2024-07-17&endDate=2024-09-15
* Example:? budget=1900
* Example:? minBudget=1000&maxBudget=2200
* Example:? searchTerm=Tokyo
* Example:? page=2
* Example:? limit=4
* Example:? sortBy=budget/destination
* Example:? sortOrder=desc/asc


### 5. Send Travel Buddy Request
* Endpoint: https://travel-buddy-matching-ass-8.vercel.app/api/trip/2467c7e7-21b5-4714-9077-599ef9e22fa0/request

* Method: POST
* Request Body:
```
{
    "userId": "60dd752d-4eb2-495c-8470-3c2f5f6ea057"
}
```

### 6.  Get Potential Travel Buddies For a Specific Trip
* Endpoint: https://travel-buddy-matching-ass-8.vercel.app/api/travel-buddies/2467c7e7-21b5-4714-9077-599ef9e22fa0
* Method: GET
* Response:  `please hit the endpoint for response`


### 7.Respond to Travel Buddy Request
* Endpoint:  https://travel-buddy-matching-ass-8.vercel.app/api/travel-buddies/59cf1d81-c90b-4dc5-b95c-3acaa59a6439/respond
* Method: PUT
* Request Body:

```
{
    "tripId": "2467c7e7-21b5-4714-9077-599ef9e22fa0",
    "status": "APPROVED"
}
```

### 8.  Get User Profile
* Endpoint: https://travel-buddy-matching-ass-8.vercel.app/api/profile
* Method: GET
* Response: `please hit the endpoint for response with token of any user`


### 9. Update a User 
* Endpoint:   https://travel-buddy-matching-ass-8.vercel.app/api/profile User Profile
* Method: PUT
* Request Body:

```
{
    "name": "John Sina",
    "email": "john.doe@example.com"
}
OR
{
    "age": 50,
    "bio": "update a user bio with mandatory information"
}
```

