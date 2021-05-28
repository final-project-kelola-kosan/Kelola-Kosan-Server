# Kelola Kost CMS
A website app to simplify flat owners to manage their property

## List Routes
- POST `/login`
- POST `/register`

# **Login**

* **URL**

  /login

* **Method:**

  `POST`
  
*  **Request Header**

   **Required:**
``` 
  None
```   

* **Request Body**

  **Required:**
```
  {
    "email": "<User's email>",
    "password": "<User's password>"
  }
```
*  **URL Params**

   **Required:**
``` 
  None
``` 
  

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
```
      {
        "access_token": "<user's access token(JWT String)>"
      }
```

* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:**
```
    {
      "Error" :  "USER_NOT_AUTHENTICATED"
      "Message": "Invalid email/password"
    }
```
  OR

* **Code:** 500 <br />
    **Content:**
```
    {
      "Error" :  "UNKNOWN_ERROR"
    }
```

**Register**

* **URL**

  /register

* **Method:**

  `POST`
  
*  **Request Header**

   **Required:**
``` 
  None
```   

* **Request Body**

  **Required:**
```
  {
    "email": "<User's email>",
    "username": "<User's username>"
    "password": "<User's password>"
  }
```
*  **URL Params**

   **Required:**
``` 
  None
``` 

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**
```
      {
        "id": 1,
        "email": "admin@mail.com"
        "username": "admin"
      }
```

* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:**
```
    {
      "Error" :  "BAD REQUEST"
      "Message": ""Email cannot be empty", 
                  "Username cannot be empty",
                  "Password is  at least 5 characters", 
                  "Username is already exist", 
                  "Email is already exist""
    }
```
  OR

* **Code:** 500 <br />
    **Content:**
```
    {
      "Error" :  "UNKNOWN_ERROR"
    }
```