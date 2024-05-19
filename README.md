# The instruction of how to run locally the application:-

> Please hit the EndPoint by access token according to your need. 
* start:dev- this script for run typsript with auto restert

# "scripts":--

* "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",




# Now i will explain all Endpoints of this project
### 1. Create a User
   * Endpoint: http://localhost:5000/api/register
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
   * Endpoint: http://localhost:5000/api/login

  * Method: POST
  * Request Body:
 ``` {
    "email": "ph.hero@gmail.com",
    "password": "12345"
}
```

### 3. Create a trips
   * Endpoint: http://localhost:5000/api/trips
  * Method: POST
  * Request Body:
 ``` {
   "userId": "db87cdfc-13ac-4ffb-9c54-57d332efa9e9",
    "destination": "Bangladeseh, Bandarban, Coxes bazar",
    "startDate": "2024-11-20",
    "endDate": "2024-11-27",
    "budget": 5900,
    "activities": ["Sea Beach", "Saint Martin"]
}
```

### 4. Get Paginated and Filtered in Trips.
* Endpoint: http://localhost:5000/api/trips
* Method: GET
> Query Parameters for API Requests:-

* Example:? destination=Paris, France
* Example:? startDate=2024-07-17&endDate=2024-08-15
* Example:? budget=4500
* Example:? minBudget=1000&maxBudget=1900
* Example:? searchTerm=dubai
* Example:? page=2
* Example:? limit=4
* Example:? sortBy=budget/destination
* Example:? sortOrder=desc/asc


### 5. Send Travel Buddy Request
* Endpoint: http://localhost:5000/api/trip/:f6d89a39-ae80-4ed3-98d3-4339c48928e0/request

* Method: POST
* Request Body:
```
{
    "userId": "db87cdfc-13ac-4ffb-9c54-57d332efa9e9"
}
```

### 6.  Get Potential Travel Buddies For a Specific Trip
* Endpoint: http://localhost:5000/api/travel-buddies/3ccb63d1-1e95-44c7-aec4-1a1f7a1d0622
* Method: GET
* Response:  `please hit the endpoint for response`


### 7.Respond to Travel Buddy Request
* Endpoint:  http://localhost:5000/api/travel-buddies/9ee791eb-dbd8-45d4-8958-fb748ad0a065/respond
* Method: PUT
* Request Body:

```
{
    "tripId": "2e8e7ce9-627f-483c-a86e-4f6d0857c871",
    "status": "APPROVED"
}
```

### 8.  Get User Profile
* Endpoint: http://localhost:5000/api/profile
* Method: GET
* Response: `please hit the endpoint for response with token of any user`


### 9. Update a Course (Partial Update with Dynamic Update)**
* Endpoint:   http://localhost:5000/api/Update User Profile
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

