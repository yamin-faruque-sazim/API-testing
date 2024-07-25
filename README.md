# API Testing Assessment

This repository contains a simple Express.js application for an API testing assessment. The application provides endpoints to perform CRUD operations on products, including support for nested information such as categories and details.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone this repository to your local machine.
2. Install the necessary depencies: npm install
3. Start the server via: node server.js
 
The server will start running on http://localhost:3000 by default.

### Testing the APIs

1. Use Postman or any other API testing tool to interact with the provided endpoints.

2. Manually create requests to the APIs.
   - HTTP method (GET, POST, PUT, DELETE)
   - Request URL (e.g., http://localhost:3000/api/products)

4. Send requests to test the functionality of the APIs as instructed.

## Available Endpoints

- **Generate Temporary Token:**
  - Method: POST
  - Endpoint: `/api/generate-token`
  - Purpose: Generate a temporary JWT token for authentication.
 
    **Note: This token is necessary for guarded endpoints only.
    To use this token, add a new header with the key "Authorization" and the value "{JWT token here}"

- **Get All Products:**
  - Method: GET
  - Endpoint: `/api/products`
  - Purpose: Retrieve a list of all products.

- **Get Product by ID:**
  - Method: GET
  - Endpoint: `/api/products/:id`
  - Purpose: Retrieve a specific product by its ID.

- **Create Product:**
  - Method: POST
  - Endpoint: `/api/products`
  - Purpose: Create a new product. Make sure the product has a name, price, description, category, brand, weight, dimensions and color. 

- **Update Product by ID:**
  - Method: PUT
  - Endpoint: `/api/products/:id`
  - Purpose: Update the name, brand and weight of an existing product.

- **Delete Product by ID:**
  - Method: DELETE
  - Endpoint: `/api/products/:id`
  - Purpose: Delete product 3



