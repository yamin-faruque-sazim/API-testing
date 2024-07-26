# API Testing Assessment

This repository contains a simple Express.js application for Section 2 Part B of the assessment.

## Getting Started

To get started with this project, follow the instructions below.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone this repository to your local machine.
2. Install the necessary depencies: npm install
3. Start the server via: node server.js
 
The server will start running on http://localhost:3000 by default.


## Endpoints

- **Generate Temporary Token:**
  - Method: POST
  - Endpoint: `/api/generate-token`
  - Purpose: Generate a temporary JWT token for authentication.
 
    **Note: This token is necessary for guarded endpoints only.

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
  - Purpose: Create a new product.

- **Update Product by ID:**
  - Method: PUT
  - Endpoint: `/api/products/:id`
  - Purpose: Update an existing product.

- **Delete Product by ID:**
  - Method: DELETE
  - Endpoint: `/api/products/:id`
  - Purpose: Delete product.





