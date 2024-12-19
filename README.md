# Basic-Book-Directory-API
Build a simple RESTful API that allows users to manage a collection of books.  
Users can create, read, update, and delete book entries.

## Table of Content
- [Installation](#Installation)
- [Usage](#Usage)
- [Endpoints](#Endpoints)
- [Contributing](#Contributing)
- [License](#License)

##  Installation
This project was developed using **JavaScript** and **Node.js**. Follow the steps below to install the project:
1. Make sure you have Node.js installed. (To download Node.js: [Node.js Official Site](https://nodejs.org))
2. Clone the repository:
   ``` bash 
   git clone https://github.com/faikmermer/Basic-Book-Directory-API.git 
3. Install the dependencies:  
   ```bash
   npm install  
4. Start the server:
   ```bash
    npm start


## Usage

To use the API, send HTTP requests to the provided endpoints. You can use tools like Postman or cURL to interact with the API.

## Endpoints
 ### 1- POST /books
* Request Body:
``
{
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "year": 1925
} 
``

* Response Body:
``
 {
   "id": 1,
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "year": 1925
}
``

### 2- GET /books
* Response:
```
[
  {
   "id": 1,
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "year": 1925
  }
]
```
### 3- Get /books/:id
* Response:
``
{
   "id": 1,
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald",
   "year": 1925
}
``

### 4- PUT /books/1
* Request Body:
``
{
   "title": "The Great Gatsby - Updated",
   "author": "F. Scott Fitzgerald",
   "year": 1925
}
``

* Response:
 ```
{
   "id": 1,
   "title": "The Great Gatsby - Updated",
   "author": "F. Scott Fitzgerald",
   "year": 1925
} 
```


### 5- DELETE /books/1
* Response:
`` 
{
"message": "Book deleted successfully"
}
``

## Contributing
Contributions are welcome! To contribute to the project, follow these steps:

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License
Distributed under the Unlicense License.
