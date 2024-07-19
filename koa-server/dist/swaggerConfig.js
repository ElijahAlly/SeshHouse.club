"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    apis: ['./src/routes/*.ts'],
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SeshHouse API Documentation',
            version: '1.0.0',
            description: 'SeshHouse API Documentation for all available routes',
        },
        servers: [
            {
                url: 'http://localhost:7654',
            },
        ],
        paths: {
            '/api/login': {
                post: {
                    summary: 'Log in a user',
                    description: 'Authenticate a user by their username or email and password.',
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        username_or_email: { type: 'string' },
                                        password: { type: 'string' }
                                    },
                                    required: ['username_or_email', 'password']
                                }
                            }
                        }
                    },
                    responses: {
                        '200': {
                            description: 'Login successful',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: { type: 'integer' },
                                            status: { type: 'string' },
                                            message: { type: 'string' },
                                            user: {
                                                $ref: '#/components/schemas/User'
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        '400': { description: 'Bad request' },
                        '401': { description: 'Unauthorized' },
                        '404': { description: 'Not Found' },
                        '500': { description: 'Internal Server Error' }
                    }
                }
            },
            '/api/logout': {
                post: {
                    summary: 'Log out a user',
                    description: 'Logs out the current user by clearing the session.',
                    responses: {
                        '200': {
                            description: 'Logout successful',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: { type: 'integer' },
                                            status: { type: 'string' },
                                            message: { type: 'string' }
                                        }
                                    }
                                }
                            }
                        },
                        '500': { description: 'Internal Server Error' }
                    }
                }
            },
            '/api/users': {
                get: {
                    summary: 'Get list of users',
                    description: 'Retrieve a list of users',
                    responses: {
                        '200': {
                            description: 'List of users',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            $ref: '#/components/schemas/User'
                                        }
                                    }
                                }
                            }
                        },
                        '500': { description: 'Internal Server Error' }
                    }
                }
            },
            '/api/user': {
                "get": {
                    "summary": "Retrieve a user by query parameters",
                    "description": "Retrieve user details based on query parameters. At least one query parameter is required.",
                    "parameters": [
                        {
                            "in": "query",
                            "name": "id",
                            "schema": {
                                "type": "integer"
                            },
                            "description": "The user ID"
                        },
                        {
                            "in": "query",
                            "name": "first_name",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The user's first name"
                        },
                        {
                            "in": "query",
                            "name": "last_name",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The user's last name"
                        },
                        {
                            "in": "query",
                            "name": "username",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The user's username"
                        },
                        {
                            "in": "query",
                            "name": "email",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The user's email"
                        },
                        {
                            "in": "query",
                            "name": "phone_number",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The user's phone number"
                        },
                        {
                            "in": "query",
                            "name": "exact_match",
                            "schema": {
                                "type": "string",
                                "enum": ["true", "false"]
                            },
                            "description": "Whether to perform an exact match (true) or a partial match (false) on query parameters"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "A user object",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/User"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. At least one query parameter is required"
                        },
                        "404": {
                            "description": "User not found"
                        },
                        "500": {
                            "description": "Internal Server Error"
                        }
                    }
                },
                "put": {
                    "summary": "Update an existing user",
                    "description": "Updates user information based on provided fields. At least one field to update is required.",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "string",
                                            "description": "Unique identifier of the user"
                                        },
                                        "first_name": {
                                            "type": "string",
                                            "description": "User's first name"
                                        },
                                        "last_name": {
                                            "type": "string",
                                            "description": "User's last name"
                                        },
                                        "username": {
                                            "type": "string",
                                            "description": "User's username"
                                        },
                                        "email": {
                                            "type": "string",
                                            "description": "User's email address"
                                        },
                                        "phone_number": {
                                            "type": "string",
                                            "description": "User's phone number"
                                        },
                                        "password_hash": {
                                            "type": "string",
                                            "description": "User's hashed password"
                                        },
                                        "profile_picture": {
                                            "type": "string",
                                            "description": "URL of the user's profile picture"
                                        },
                                        "bio": {
                                            "type": "string",
                                            "description": "User's bio or description"
                                        },
                                        "date_of_birth": {
                                            "type": "string",
                                            "format": "date",
                                            "description": "User's date of birth"
                                        },
                                        "street": {
                                            "type": "string",
                                            "description": "User's street address"
                                        },
                                        "country": {
                                            "type": "string",
                                            "description": "User's country"
                                        },
                                        "city": {
                                            "type": "string",
                                            "description": "User's city"
                                        },
                                        "state": {
                                            "type": "string",
                                            "description": "User's state"
                                        },
                                        "zipcode": {
                                            "type": "string",
                                            "description": "User's postal code"
                                        },
                                        "twitter_profile": {
                                            "type": "string",
                                            "description": "User's Twitter profile URL"
                                        },
                                        "facebook_profile": {
                                            "type": "string",
                                            "description": "User's Facebook profile URL"
                                        },
                                        "instagram_profile": {
                                            "type": "string",
                                            "description": "User's Instagram profile URL"
                                        },
                                        "snapchat_profile": {
                                            "type": "string",
                                            "description": "User's Snapchat profile URL"
                                        },
                                        "twitch_profile": {
                                            "type": "string",
                                            "description": "User's Twitch profile URL"
                                        },
                                        "youtube_profile": {
                                            "type": "string",
                                            "description": "User's YouTube profile URL"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "User updated successfully",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "integer"
                                            },
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. User ID is required or no fields provided for update."
                        },
                        "404": {
                            "description": "User not found"
                        },
                        "500": {
                            "description": "Internal Server Error"
                        }
                    }
                },
                "delete": {
                    "summary": "Delete a user",
                    "description": "Deletes a user based on their unique ID.",
                    "parameters": [
                        {
                            "in": "query",
                            "name": "id",
                            "schema": {
                                "type": "string"
                            },
                            "required": true,
                            "description": "Unique identifier of the user"
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "User deleted successfully",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "integer"
                                            },
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "string"
                                                    },
                                                    "first_name": {
                                                        "type": "string"
                                                    },
                                                    "last_name": {
                                                        "type": "string"
                                                    },
                                                    "username": {
                                                        "type": "string"
                                                    },
                                                    "email": {
                                                        "type": "string"
                                                    },
                                                    "phone_number": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. User ID is required."
                        },
                        "404": {
                            "description": "User not found"
                        },
                        "500": {
                            "description": "Internal Server Error"
                        }
                    }
                }
            },
            '/api/events': {
                "get": {
                    "summary": "Retrieve a list of events",
                    "description": "Fetches a list of events from the database. This route requires authentication.",
                    "security": [
                        {
                            "BearerAuth": []
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "A list of events",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "integer",
                                                "description": "Status code of the response"
                                            },
                                            "status": {
                                                "type": "string",
                                                "description": "Response status"
                                            },
                                            "data": {
                                                "type": "array",
                                                "items": {
                                                    "type": "object",
                                                    "properties": {
                                                        "id": {
                                                            "type": "integer",
                                                            "description": "Unique identifier of the event"
                                                        },
                                                        "title": {
                                                            "type": "string",
                                                            "description": "Title of the event"
                                                        },
                                                        "description": {
                                                            "type": "string",
                                                            "description": "Description of the event"
                                                        },
                                                        "date": {
                                                            "type": "string",
                                                            "format": "date-time",
                                                            "description": "Date and time of the event"
                                                        },
                                                        "location": {
                                                            "type": "string",
                                                            "description": "Location where the event takes place"
                                                        },
                                                        "capacity": {
                                                            "type": "integer",
                                                            "description": "Maximum number of participants"
                                                        },
                                                        "organizer_id": {
                                                            "type": "integer",
                                                            "description": "ID of the event organizer"
                                                        },
                                                        "type": {
                                                            "type": "string",
                                                            "description": "Type or category of the event"
                                                        },
                                                        "registration_deadline": {
                                                            "type": "string",
                                                            "format": "date-time",
                                                            "description": "Deadline for event registration"
                                                        },
                                                        "registration_fee": {
                                                            "type": "number",
                                                            "format": "float",
                                                            "description": "Fee required for event registration"
                                                        },
                                                        "tags": {
                                                            "type": "string",
                                                            "description": "Tags or keywords related to the event"
                                                        },
                                                        "status": {
                                                            "type": "string",
                                                            "description": "Current status of the event"
                                                        },
                                                        "attendees_count": {
                                                            "type": "integer",
                                                            "description": "Number of attendees registered for the event"
                                                        },
                                                        "thumbnail": {
                                                            "type": "string",
                                                            "description": "URL of the event thumbnail image"
                                                        },
                                                        "documents": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "string",
                                                                "format": "uri"
                                                            },
                                                            "description": "List of document URLs related to the event"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal Server Error",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "integer",
                                                "description": "Status code of the response"
                                            },
                                            "status": {
                                                "type": "string",
                                                "description": "Response status"
                                            },
                                            "message": {
                                                "type": "string",
                                                "description": "Error message"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        components: {
            schemas: {
                User: {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "string",
                            "description": "Unique identifier for the user",
                            "example": "12345"
                        },
                        "first_name": {
                            "type": "string",
                            "description": "User's first name",
                            "example": "John"
                        },
                        "last_name": {
                            "type": "string",
                            "description": "User's last name",
                            "example": "Doe"
                        },
                        "username": {
                            "type": "string",
                            "description": "Unique username chosen by the user",
                            "example": "johndoe"
                        },
                        "email": {
                            "type": "string",
                            "format": "email",
                            "description": "User's email address",
                            "example": "john.doe@example.com"
                        },
                        "phone_number": {
                            "type": "string",
                            "description": "User's phone number",
                            "example": "+1234567890"
                        },
                        "password": {
                            "type": "string",
                            "description": "User's password (used during registration)",
                            "example": "password123",
                            "nullable": true
                        },
                        "password_hash": {
                            "type": "string",
                            "description": "Hash of the user's password (used internally)",
                            "example": "$2a$10$J9Qj9GkY6s9l1QyO4eWuIe6Yq5ZmMfXUzM8B0BJK14O1mZkkD.xue",
                            "nullable": true
                        },
                        "profile_picture": {
                            "type": "string",
                            "description": "URL to the user's profile picture",
                            "example": "https://example.com/profile.jpg",
                            "nullable": true
                        },
                        "bio": {
                            "type": "string",
                            "description": "Short biography or description about the user",
                            "example": "Software developer and tech enthusiast.",
                            "nullable": true
                        },
                        "date_of_birth": {
                            "type": "string",
                            "format": "date",
                            "description": "User's date of birth",
                            "example": "1990-01-01",
                            "nullable": true
                        },
                        "street": {
                            "type": "string",
                            "description": "Street address of the user",
                            "example": "123 Elm St",
                            "nullable": true
                        },
                        "country": {
                            "type": "string",
                            "description": "Country where the user resides",
                            "example": "USA",
                            "nullable": true
                        },
                        "city": {
                            "type": "string",
                            "description": "City where the user resides",
                            "example": "Springfield",
                            "nullable": true
                        },
                        "state": {
                            "type": "string",
                            "description": "State where the user resides",
                            "example": "IL",
                            "nullable": true
                        },
                        "zipcode": {
                            "type": "string",
                            "description": "Postal/ZIP code for the user's address",
                            "example": "62701",
                            "nullable": true
                        },
                        "twitter_profile": {
                            "type": "string",
                            "description": "URL to the user's Twitter profile",
                            "example": "https://twitter.com/johndoe",
                            "nullable": true
                        },
                        "facebook_profile": {
                            "type": "string",
                            "description": "URL to the user's Facebook profile",
                            "example": "https://facebook.com/johndoe",
                            "nullable": true
                        },
                        "instagram_profile": {
                            "type": "string",
                            "description": "URL to the user's Instagram profile",
                            "example": "https://instagram.com/johndoe",
                            "nullable": true
                        },
                        "snapchat_profile": {
                            "type": "string",
                            "description": "URL to the user's Snapchat profile",
                            "example": "https://snapchat.com/add/johndoe",
                            "nullable": true
                        },
                        "twitch_profile": {
                            "type": "string",
                            "description": "URL to the user's Twitch profile",
                            "example": "https://twitch.tv/johndoe",
                            "nullable": true
                        },
                        "youtube_profile": {
                            "type": "string",
                            "description": "URL to the user's YouTube channel",
                            "example": "https://youtube.com/c/johndoe",
                            "nullable": true
                        },
                        "created_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the user was created",
                            "example": "2023-07-18T12:00:00Z",
                            "nullable": true
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the user was last updated",
                            "example": "2023-07-18T12:00:00Z",
                            "nullable": true
                        }
                    },
                    "required": [
                        "first_name",
                        "last_name",
                        "username",
                        "email",
                        "phone_number",
                        "date_of_birth"
                    ]
                },
                Event: {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int32",
                            "description": "Unique identifier for the event"
                        },
                        "title": {
                            "type": "string",
                            "description": "Title of the event"
                        },
                        "description": {
                            "type": "string",
                            "description": "Detailed description of the event"
                        },
                        "date": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Date and time of the event"
                        },
                        "location": {
                            "type": "string",
                            "description": "Location where the event will take place"
                        },
                        "capacity": {
                            "type": "integer",
                            "format": "int32",
                            "description": "Maximum number of attendees"
                        },
                        "organizer_id": {
                            "type": "integer",
                            "format": "int32",
                            "description": "ID of the user organizing the event"
                        },
                        "type": {
                            "type": "string",
                            "description": "Type/category of the event"
                        },
                        "registration_deadline": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Deadline for event registration"
                        },
                        "registration_fee": {
                            "type": "number",
                            "format": "float",
                            "description": "Fee required to register for the event"
                        },
                        "tags": {
                            "type": "string",
                            "description": "Tags associated with the event"
                        },
                        "status": {
                            "type": "string",
                            "description": "Current status of the event (e.g., draft, published)",
                            "default": "draft"
                        },
                        "attendees_count": {
                            "type": "integer",
                            "format": "int32",
                            "description": "Number of attendees who have registered",
                            "default": 0
                        },
                        "thumbnail": {
                            "type": "string",
                            "description": "URL of the event's thumbnail image"
                        },
                        "documents": {
                            "type": "string",
                            "description": "URLs to related documents"
                        }
                    },
                    "required": [
                        "title",
                        "organizer_id",
                    ]
                },
                CafeItem: {
                    type: "object",
                    properties: {
                        id: {
                            type: "integer",
                            description: "Unique identifier for the cafe item",
                            example: 1
                        },
                        "title": {
                            "type": "string",
                            "description": "Title of the cafe item",
                            "example": "Latte"
                        },
                        "description": {
                            "type": "string",
                            "description": "Description of the cafe item",
                            "example": "A creamy latte with a hint of vanilla."
                        },
                        "type": {
                            "type": "string",
                            "description": "Type of the cafe item (e.g., beverage, pastry)",
                            "example": "beverage"
                        },
                        "tags": {
                            "type": "string",
                            "description": "Comma-separated tags for the cafe item",
                            "example": "coffee,hot,vanilla",
                            "nullable": true
                        },
                        "thumbnail": {
                            "type": "string",
                            "description": "URL to the thumbnail image of the cafe item",
                            "example": "https://example.com/latte.jpg",
                            "nullable": true
                        },
                        "online_purchase_fee": {
                            "type": "number",
                            "format": "float",
                            "description": "Fee applied for online purchases of the cafe item",
                            "example": 2.50,
                            "nullable": true
                        },
                        "stock_quantity": {
                            "type": "integer",
                            "description": "Stock quantity of the cafe item",
                            "example": 100,
                            "nullable": true
                        },
                        "price": {
                            "type": "number",
                            "format": "float",
                            "description": "Price of the cafe item",
                            "example": 5.99
                        },
                        "is_available": {
                            "type": "boolean",
                            "description": "Indicates whether the cafe item is available",
                            "example": true,
                            "nullable": true
                        },
                        "created_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the cafe item was created",
                            "example": "2024-07-18T12:00:00Z",
                            "nullable": true
                        },
                        "updated_at": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Timestamp when the cafe item was last updated",
                            "example": "2024-07-18T12:00:00Z",
                            "nullable": true
                        },
                        "ingredients": {
                            "type": "string",
                            "description": "Comma-separated list of ingredients in the cafe item",
                            "example": "coffee, milk, vanilla syrup",
                            "nullable": true
                        },
                        "brand": {
                            "type": "string",
                            "description": "Brand associated with the cafe item",
                            "example": "Starbucks",
                            "nullable": true
                        },
                        "expiration_date": {
                            "type": "string",
                            "format": "date-time",
                            "description": "Expiration date of the cafe item",
                            "example": "2024-12-31T00:00:00Z",
                            "nullable": true
                        },
                        "nutritional_info": {
                            "type": "object",
                            "description": "Nutritional information of the cafe item",
                            "properties": {
                                "calories": {
                                    "type": "number",
                                    "format": "float",
                                    "description": "Calories in the cafe item",
                                    "example": 150
                                },
                                "fat": {
                                    "type": "number",
                                    "format": "float",
                                    "description": "Fat content in grams",
                                    "example": 5.0
                                },
                                "carbohydrates": {
                                    "type": "number",
                                    "format": "float",
                                    "description": "Carbohydrates content in grams",
                                    "example": 20.0
                                },
                                "protein": {
                                    "type": "number",
                                    "format": "float",
                                    "description": "Protein content in grams",
                                    "example": 7.0
                                }
                            },
                            "nullable": true
                        }
                    },
                    "required": [
                        "title",
                        "description",
                        "price"
                    ]
                }
            },
            securitySchemes: {
                BearerAuth: {
                    "type": "http",
                    "scheme": "bearer",
                    "bearerFormat": "JWT"
                }
            }
        }
    },
};
exports.default = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swaggerConfig.js.map