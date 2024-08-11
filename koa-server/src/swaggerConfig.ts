import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    apis: ['./src/routes/*.ts'],
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SeshHouse API Documentation',
            version: '1.0.0',
            description: 'SeshHouse API Documentation for all available routes',
        },
        tags: [
            {
                name: "Default",
                description: "Default API operations"
            },
            {
                name: "Auth",
                description: "Operations related to User Authentication"
            },
            {
                name: "Users",
                description: "Operations related to users"
            },
            {
                name: "Emails",
                description: "Operations related to users"
            },
            {
                name: "Events",
                description: "Operations related to events"
            },
            {
                name: "EventsToBook",
                description: "Operations related to events to book"
            },
            {
                name: "Cafe Items",
                description: "Operations related to cafe items"
            },
            {
                name: "Files",
                description: "Operations related to files"
            },
        ],
        servers: [
            {
                url: 'https://sesh-house-koa-server-production.up.railway.app', 
                description: 'Production server'
            },
        ],
        paths: {
            '/api/ping': {
                get: {
                    tags: ["Default"],
                    "summary": "Ping endpoint",
                    "description": "Returns a simple 'pong' message to check if the server and database are both up and running properly.",
                    "responses": {
                        "200": {
                            "description": "Successful response with 'pong' message",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "integer",
                                                "example": 200
                                            },
                                            "status": {
                                                "type": "string",
                                                "example": "success"
                                            },
                                            "data": {
                                                "type": "string",
                                                "example": "pong 🏓"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal Server Error"
                        }
                    }
                }
            },
            '/api/whisper': {
                get: {
                    tags: ["Default"],
                    "summary": "Whisper endpoint",
                    "description": "Returns a simple 'shhh' message to check if server authentication middleware is working correctly.",
                    "responses": {
                        "200": {
                            "description": "Successful response with 'shhh' message",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "integer",
                                                "example": 200
                                            },
                                            "status": {
                                                "type": "string",
                                                "example": "success"
                                            },
                                            "data": {
                                                "type": "string",
                                                "example": "shhh 🤫"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "500": {
                            "description": "Internal Server Error"
                        }
                    }
                }
            },
            '/api/login': {
                post: {
                    tags: ["Auth"],
                    "summary": "Log in a user",
                    "description": "Authenticates a user by their username or email and password. Sets a session on successful authentication and returns a JWT token.",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "username_or_email": {
                                            "type": "string",
                                            "description": "Username or email of the user"
                                        },
                                        "password": {
                                            "type": "string",
                                            "description": "Password of the user"
                                        }
                                    },
                                    "required": [
                                        "username_or_email",
                                        "password"
                                    ]
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Login successful",
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
                                            "jwt": {
                                                "type": "string",
                                                "description": "JWT token for authenticated user"
                                            },
                                            "user": {
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
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Username/Email and Password are required.",
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
                                        },
                                        "required": [
                                            "code",
                                            "status",
                                            "message"
                                        ]
                                    }
                                }
                            }
                        },
                        "401": {
                            "description": "Unauthorized. Invalid password.",
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
                                        },
                                        "required": [
                                            "code",
                                            "status",
                                            "message"
                                        ]
                                    }
                                }
                            }
                        },
                        "404": {
                            "description": "Not Found. User not found.",
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
                                        },
                                        "required": [
                                            "code",
                                            "status",
                                            "message"
                                        ]
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
                                                "type": "integer"
                                            },
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            }
                                        },
                                        "required": [
                                            "code",
                                            "status",
                                            "message"
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            '/api/logout': {
                post: {
                    tags: ["Auth"],
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
                    tags: ["Users"],
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
                post: {
                    "tags": ["Users"],
                    "summary": "Create a new user",
                    "description": "Creates a new user with the provided details. Password is hashed before storing.",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
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
                                        "password": {
                                            "type": "string",
                                            "description": "User's password"
                                        }
                                    },
                                    "required": ["first_name", "last_name", "username", "email", "password"]
                                }
                            }
                        }
                    },
                    "responses": {
                        "201": {
                            "description": "User created successfully",
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
                                                    },
                                                    "password_hash": {
                                                        "type": "string"
                                                    }
                                                }
                                            }
                                        },
                                        "required": ["code", "status", "data"]
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. All fields are required.",
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
                                        },
                                        "required": ["code", "status", "message"]
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
                                                "type": "integer"
                                            },
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            }
                                        },
                                        "required": ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                },
                get: {
                    tags: ["Users"],
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
                put: {
                    tags: ["Users"],
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
            },
            '/api/user/{id}': {
                delete: {
                    tags: ["Users"],
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
                get: {
                    tags: ['Events'],
                    summary: 'Retrieve a list of events',
                    description: 'Fetches a list of events from the database. This route requires authentication.',
                    responses: {
                        200: {
                            description: 'A list of events',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: {
                                                type: 'number',
                                                description: 'Status code of the response'
                                            },
                                            status: {
                                                type: 'string',
                                                description: 'Response status'
                                            },
                                            data: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        id: {
                                                            type: 'number',
                                                            description: 'Unique identifier of the event'
                                                        },
                                                        title: {
                                                            type: 'string',
                                                            description: 'Title of the event'
                                                        },
                                                        description: {
                                                            type: 'string',
                                                            description: 'Description of the event'
                                                        },
                                                        date: {
                                                            type: 'string',
                                                            format: 'date-time',
                                                            description: 'Date and time of the event'
                                                        },
                                                        location: {
                                                            type: 'string',
                                                            description: 'Location where the event takes place'
                                                        },
                                                        capacity: {
                                                            type: 'number',
                                                            description: 'Maximum number of participants'
                                                        },
                                                        organizer_id: {
                                                            type: 'number',
                                                            description: 'ID of the event organizer'
                                                        },
                                                        type: {
                                                            type: 'string',
                                                            description: 'Type or category of the event'
                                                        },
                                                        registration_deadline: {
                                                            type: 'string',
                                                            format: 'date-time',
                                                            description: 'Deadline for event registration'
                                                        },
                                                        registration_fee: {
                                                            type: 'number',
                                                            format: 'float',
                                                            description: 'Fee required for event registration'
                                                        },
                                                        tags: {
                                                            type: 'string',
                                                            description: 'Tags or keywords related to the event'
                                                        },
                                                        status: {
                                                            type: 'string',
                                                            description: 'Current status of the event'
                                                        },
                                                        attendees_count: {
                                                            type: 'number',
                                                            description: 'Number of attendees registered for the event'
                                                        },
                                                        thumbnail: {
                                                            type: 'string',
                                                            description: 'URL of the event thumbnail image'
                                                        },
                                                        documents: {
                                                            type: 'array',
                                                            items: {
                                                                type: 'string',
                                                                format: 'uri'
                                                            },
                                                            description: 'List of document URLs related to the event'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: 'Internal Server Error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: {
                                                type: 'number',
                                                description: 'Status code of the response'
                                            },
                                            status: {
                                                type: 'string',
                                                description: 'Response status'
                                            },
                                            message: {
                                                type: 'string',
                                                description: 'Error message'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }, 
            '/api/event': {
                get: {
                    tags: ['Events'],
                    summary: 'Retrieve an event by query parameters',
                    description: 'Retrieve event details based on query parameters. At least one query parameter is required.',
                    parameters: [
                        {
                            in: 'query',
                            name: 'id',
                            schema: {
                                type: 'number'
                            },
                            description: 'The event ID'
                        },
                        {
                            in: 'query',
                            name: 'title',
                            schema: {
                                type: 'string'
                            },
                            description: 'The event\'s title'
                        },
                        {
                            in: 'query',
                            name: 'tags',
                            schema: {
                                type: 'string'
                            },
                            description: 'The event\'s associated tags'
                        },
                        {
                            in: 'query',
                            name: 'status',
                            schema: {
                                type: 'string'
                            },
                            description: 'The event\'s associated status'
                        },
                        {
                            in: 'query',
                            name: 'date',
                            schema: {
                                type: 'string'
                            },
                            description: 'The event\'s date'
                        },
                        {
                            in: 'query',
                            name: 'exact_match',
                            schema: {
                                type: 'string',
                                enum: ['true', 'false']
                            },
                            description: 'Whether to perform an exact match (true) or a partial match (false) on query parameters'
                        }
                    ],
                    responses: {
                        200: {
                            description: 'An event object',
                            content: {
                                'application/json': {
                                    schema: {
                                        $ref: '#/components/schemas/Event'
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Bad request. At least one query parameter is required.'
                        },
                        500: {
                            description: 'Internal Server Error'
                        }
                    }
                },
                post: {
                    tags: ['Events'],
                    summary: 'Create a new event',
                    description: 'Creates a new event with the provided details.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        title: {
                                            type: 'string',
                                            description: 'Event title'
                                        },
                                        description: {
                                            type: 'string',
                                            description: 'Description of the Event'
                                        },
                                        date: {
                                            type: 'string',
                                            description: 'Date of the Event'
                                        },
                                        organizer_id: {
                                            type: 'number',
                                            description: 'User id who created the Event'
                                        },
                                        location: {
                                            type: 'string',
                                            description: 'Location of Event'
                                        },
                                        capacity: {
                                            type: 'number',
                                            description: 'Capacity of Event'
                                        },
                                        type: {
                                            type: 'string',
                                            description: 'Event type'
                                        },
                                        registration_deadline: {
                                            type: 'string',
                                            description: 'Deadline to register for Event'
                                        },
                                        registration_fee: {
                                            type: 'number',
                                            format: 'float',
                                            description: 'Fee to register for Event'
                                        },
                                        tags: {
                                            type: 'string',
                                            description: 'Event tags (separated by `,`)'
                                        },
                                        status: {
                                            type: 'string',
                                            description: 'Event status'
                                        },
                                        attendees_count: {
                                            type: 'number',
                                            description: 'Count of attendees currently registered for Event'
                                        },
                                        thumbnail: {
                                            type: 'string',
                                            description: 'Event thumbnail'
                                        },
                                        documents: {
                                            type: 'string',
                                            description: 'Event documents'
                                        }
                                    },
                                    required: ['title', 'description', 'date', 'organizer_id']
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Created event',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: {
                                                type: 'number',
                                                description: 'Status code of the response'
                                            },
                                            status: {
                                                type: 'string',
                                                description: 'Response status'
                                            },
                                            data: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        id: {
                                                            type: 'string',
                                                            description: 'Unique identifier of the event'
                                                        },
                                                        title: {
                                                            type: 'string',
                                                            description: 'Title of the event'
                                                        },
                                                        description: {
                                                            type: 'string',
                                                            description: 'Description of the event'
                                                        },
                                                        date: {
                                                            type: 'string',
                                                            format: 'date-time',
                                                            description: 'Date and time of the event'
                                                        },
                                                        location: {
                                                            type: 'string',
                                                            description: 'Location where the event takes place'
                                                        },
                                                        capacity: {
                                                            type: 'number',
                                                            description: 'Maximum number of participants'
                                                        },
                                                        organizer_id: {
                                                            type: 'number',
                                                            description: 'ID of the event organizer'
                                                        },
                                                        type: {
                                                            type: 'string',
                                                            description: 'Type or category of the event'
                                                        },
                                                        registration_deadline: {
                                                            type: 'string',
                                                            format: 'date-time',
                                                            description: 'Deadline for event registration'
                                                        },
                                                        registration_fee: {
                                                            type: 'number',
                                                            format: 'float',
                                                            description: 'Fee required for event registration'
                                                        },
                                                        tags: {
                                                            type: 'string',
                                                            description: 'Tags or keywords related to the event'
                                                        },
                                                        status: {
                                                            type: 'string',
                                                            description: 'Current status of the event'
                                                        },
                                                        attendees_count: {
                                                            type: 'number',
                                                            description: 'Number of attendees registered for the event'
                                                        },
                                                        thumbnail: {
                                                            type: 'string',
                                                            description: 'URL of the event thumbnail image'
                                                        },
                                                        documents: {
                                                            type: 'string',
                                                            description: 'List of document URLs related to the event'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: 'Bad request. All fields are required.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: {
                                                type: 'number'
                                            },
                                            status: {
                                                type: 'string'
                                            },
                                            message: {
                                                type: 'string'
                                            }
                                        },
                                        required: ['code', 'status', 'message']
                                    }
                                }
                            }
                        },
                        500: {
                            description: 'Internal Server Error',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: {
                                                type: 'number'
                                            },
                                            status: {
                                                type: 'string'
                                            },
                                            message: {
                                                type: 'string'
                                            }
                                        },
                                        required: ['code', 'status', 'message']
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    tags: ['Events'],
                    summary: 'Update an existing event',
                    description: 'Updates an existing event with the provided details. The event ID is required in the request body.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number', description: 'Unique identifier of the event' },
                                        title: { type: 'string', description: 'Event\'s title' },
                                        description: { type: 'string', description: 'Description of the event' },
                                        date: { type: 'string', description: 'Date of the event' },
                                        location: { type: 'string', description: 'Location of the event' },
                                        capacity: { type: 'number', description: 'Capacity of the event' },
                                        organizer_id: { type: 'number', description: 'User ID who created the event' },
                                        type: { type: 'string', description: 'Event type' },
                                        registration_deadline: { type: 'string', description: 'Deadline to register for the event' },
                                        registration_fee: { type: 'number', format: 'float', description: 'Fee to register for the event' },
                                        tags: { type: 'string', description: 'Event tags (separated by `,`)' },
                                        status: { type: 'string', description: 'Event status' },
                                        attendees_count: { type: 'number', description: 'Count of attendees currently registered for the event' },
                                        thumbnail: { type: 'string', description: 'Event thumbnail' },
                                        documents: { type: 'string', description: 'Event documents' }
                                    },
                                    required: ['id', 'title', 'description', 'date', 'organizer_id']
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: 'Updated event',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: { type: 'number', description: 'Status code of the response' },
                                            status: { type: 'string', description: 'Response status' },
                                            data: {
                                                type: 'object',
                                                properties: {
                                                    id: { type: 'number', description: 'Unique identifier of the event' },
                                                    title: { type: 'string', description: 'Title of the event' },
                                                    description: { type: 'string', description: 'Description of the event' },
                                                    date: { type: 'string', format: 'date-time', description: 'Date and time of the event' },
                                                    location: { type: 'string', description: 'Location where the event takes place' },
                                                    capacity: { type: 'number', description: 'Maximum number of participants' },
                                                    organizer_id: { type: 'number', description: 'ID of the event organizer' },
                                                    type: { type: 'string', description: 'Type or category of the event' },
                                                    registration_deadline: { type: 'string', format: 'date-time', description: 'Deadline for event registration' },
                                                    registration_fee: { type: 'number', format: 'float', description: 'Fee required for event registration' },
                                                    tags: { type: 'string', description: 'Tags or keywords related to the event' },
                                                    status: { type: 'string', description: 'Current status of the event' },
                                                    attendees_count: { type: 'number', description: 'Number of attendees registered for the event' },
                                                    thumbnail: { type: 'string', description: 'URL of the event thumbnail image' },
                                                    documents: {
                                                        type: 'array',
                                                        items: { type: 'string', format: 'uri' },
                                                        description: 'List of document URLs related to the event'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: { description: 'Bad request. ID, title, description, date, and organizer_id are required.' },
                        500: { description: 'Internal Server Error' }
                    }
                },
            },
            '/api/event/{id}': {
                delete: {
                    tags: ['Events'],
                    summary: 'Delete an event',
                    description: 'Deletes an event by its ID.',
                    parameters: [
                        { in: 'query', name: 'id', schema: { type: 'number' }, required: true, description: 'Unique identifier of the event to be deleted' }
                    ],
                    responses: {
                        200: {
                            description: 'Event deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: { type: 'number', description: 'Status code of the response' },
                                            status: { type: 'string', description: 'Response status' }
                                        }
                                    }
                                }
                            }
                        },
                        400: { description: 'Bad request. ID is required.' },
                        500: { description: 'Internal Server Error' }
                    }
                }
            },
            '/api/events-to-book': {
                get: {
                    "tags": ["EventsToBook"],
                    "summary": "Retrieve a list of events to book",
                    "description": "Fetches a list of events to book from the database. This route requires authentication.",
                    "responses": {
                        "200": {
                            "description": "A list of events to book",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "number",
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
                                                            "type": "number",
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
                                                            "type": "number",
                                                            "description": "Maximum number of participants"
                                                        },
                                                        "organizer_id": {
                                                            "type": "number",
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
                                                            "type": "array",
                                                            "items": {
                                                                "type": "string"
                                                            },
                                                            "description": "Tags or keywords related to the event"
                                                        },
                                                        "rooms": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "string",
                                                                "enum": [
                                                                    "CAFE",
                                                                    "MUSIC_STUDIO",
                                                                    "PODCAST_ROOM",
                                                                    "UPSTAIRS_BAR",
                                                                    "STAGE_HALL",
                                                                    "UPSTAIRS_BACK_ROOM"
                                                                ]
                                                            },
                                                            "description": "Rooms for the event"
                                                        },
                                                        "attendees_count": {
                                                            "type": "number",
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
                                                "type": "number",
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
                                        },
                                        "required": ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                }
            }, 
            '/api/event-to-book': {
                get: {
                    "tags": ["EventsToBook"],
                    "summary": "Retrieve an event to book by query parameters",
                    "description": "Retrieve event to book details based on query parameters. At least one query parameter is required.",
                    "parameters": [
                        {
                            "in": "query",
                            "name": "id",
                            "schema": {
                                "type": "number"
                            },
                            "description": "The event ID"
                        },
                        {
                            "in": "query",
                            "name": "title",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The event's title"
                        },
                        {
                            "in": "query",
                            "name": "tags",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The event's associated tags"
                        },
                        {
                            "in": "query",
                            "name": "rooms",
                            "schema": {
                                "type": "array",
                                "items": {
                                    "type": "string",
                                    "enum": [
                                        "CAFE",
                                        "MUSIC_STUDIO",
                                        "PODCAST_ROOM",
                                        "UPSTAIRS_BAR",
                                        "STAGE_HALL",
                                        "UPSTAIRS_BACK_ROOM"
                                    ]
                                }
                            },
                            "description": "The event's associated rooms"
                        },
                        {
                            "in": "query",
                            "name": "type",
                            "schema": {
                                "type": "string"
                            },
                            "description": "The event's associated type"
                        },
                        {
                            "in": "query",
                            "name": "date",
                            "schema": {
                                "type": "string",
                                "format": "date"
                            },
                            "description": "The event's date"
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
                            "description": "An event to book object",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "$ref": "#/components/schemas/BookEventType"
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. At least one query parameter is required"
                        },
                        "500": {
                            "description": "Internal Server Error"
                        }
                    }
                },
                post: {
                    "security": [
                        {
                            "BearerAuth": []
                        }
                    ],
                    "tags": ["EventsToBook"],
                    "summary": "Create a new event to book",
                    "description": "Creates a new event to book with the provided details.",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "title": {
                                            "type": "string",
                                            "description": "Event's title"
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "Description of the Event"
                                        },
                                        "dates": {
                                            "type": "object",
                                            "description": "Date of the Event"
                                        },
                                        "organizer_id": {
                                            "type": "number",
                                            "description": "User ID who created the Event"
                                        },
                                        "location": {
                                            "type": "string",
                                            "description": "Location of the Event"
                                        },
                                        "capacity": {
                                            "type": "number",
                                            "description": "Capacity of the Event"
                                        },
                                        "type": {
                                            "type": "string",
                                            "description": "Event type"
                                        },
                                        "registration_deadline": {
                                            "type": "string",
                                            "format": "date-time",
                                            "description": "Deadline to register for the Event to book"
                                        },
                                        "registration_fee": {
                                            "type": "number",
                                            "format": "float",
                                            "description": "Fee to register for the Event to book"
                                        },
                                        "tags": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            },
                                            "description": "Tags related to the Event to book (separated by `,`)"
                                        },
                                        "rooms": {
                                            "type": "array",
                                            "items": {
                                                "type": "string",
                                                "enum": [
                                                    "CAFE",
                                                    "MUSIC_STUDIO",
                                                    "PODCAST_ROOM",
                                                    "UPSTAIRS_BAR",
                                                    "STAGE_HALL",
                                                    "UPSTAIRS_BACK_ROOM"
                                                ]
                                            },
                                            "description": "Rooms for the Event to book"
                                        },
                                        "attendees_count": {
                                            "type": "number",
                                            "description": "Count of attendees currently registered for the Event to book"
                                        },
                                        "thumbnail": {
                                            "type": "string",
                                            "description": "URL of the Event to book thumbnail"
                                        },
                                        "documents": {
                                            "type": "object",
                                            "description": "URLs of the Event to book documents"
                                        }
                                    },
                                    "required": ["title", "description", "rooms", "type"]
                                }
                            }
                        }
                    },
                    "responses": {
                        "201": {
                            "description": "Created event",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "number",
                                                "description": "Status code of the response"
                                            },
                                            "status": {
                                                "type": "string",
                                                "description": "Response status"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
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
                                                    "dates": {
                                                        "type": "string",
                                                        "format": "date-time",
                                                        "description": "Date and time of the event"
                                                    },
                                                    "location": {
                                                        "type": "string",
                                                        "description": "Location where the event takes place"
                                                    },
                                                    "capacity": {
                                                        "type": "number",
                                                        "description": "Maximum number of participants"
                                                    },
                                                    "organizer_id": {
                                                        "type": "number",
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
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        },
                                                        "description": "Tags or keywords related to the event to book"
                                                    },
                                                    "rooms": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string",
                                                            "enum": [
                                                                "CAFE",
                                                                "MUSIC_STUDIO",
                                                                "PODCAST_ROOM",
                                                                "UPSTAIRS_BAR",
                                                                "STAGE_HALL",
                                                                "UPSTAIRS_BACK_ROOM"
                                                            ]
                                                        },
                                                        "description": "Rooms for the event"
                                                    },
                                                    "attendees_count": {
                                                        "type": "number",
                                                        "description": "Number of attendees registered for the event to book"
                                                    },
                                                    "thumbnail": {
                                                        "type": "string",
                                                        "description": "URL of the event thumbnail image"
                                                    },
                                                    "documents": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        },
                                                        "description": "List of document URLs related to the event to book"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Required fields are missing.",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "number"
                                            },
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            }
                                        },
                                        "required": ["code", "status", "message"]
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
                                                "type": "number"
                                            },
                                            "status": {
                                                "type": "string"
                                            },
                                            "message": {
                                                "type": "string"
                                            }
                                        },
                                        "required": ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    "security": [
                        {
                            "BearerAuth": []
                        }
                    ],
                    "tags": ["EventsToBook"],
                    "summary": "Update an existing event to book",
                    "description": "Updates an existing event to book with the provided details. The event to book ID is required in the request body.",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "id": {
                                            "type": "number",
                                            "description": "Unique identifier of the event"
                                        },
                                        "title": {
                                            "type": "string",
                                            "description": "Event's title"
                                        },
                                        "description": {
                                            "type": "string",
                                            "description": "Description of the event"
                                        },
                                        "location": {
                                            "type": "string",
                                            "description": "Location of the event"
                                        },
                                        "capacity": {
                                            "type": "number",
                                            "description": "Capacity of the event"
                                        },
                                        "organizer_id": {
                                            "type": "number",
                                            "description": "User ID who created the event"
                                        },
                                        "type": {
                                            "type": "string",
                                            "description": "Event type"
                                        },
                                        "registration_deadline": {
                                            "type": "string",
                                            "format": "date-time",
                                            "description": "Deadline to register for the event"
                                        },
                                        "registration_fee": {
                                            "type": "number",
                                            "format": "float",
                                            "description": "Fee to register for the event"
                                        },
                                        "tags": {
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            },
                                            "description": "Event tags (separated by `,`)"
                                        },
                                        "rooms": {
                                            "type": "array",
                                            "items": {
                                                "type": "string",
                                                "enum": [
                                                    "CAFE",
                                                    "MUSIC_STUDIO",
                                                    "PODCAST_ROOM",
                                                    "UPSTAIRS_BAR",
                                                    "STAGE_HALL",
                                                    "UPSTAIRS_BACK_ROOM"
                                                ]
                                            },
                                            "description": "Rooms for the event"
                                        },
                                        "attendees_count": {
                                            "type": "number",
                                            "description": "Count of attendees currently registered for the event"
                                        },
                                        "thumbnail": {
                                            "type": "string",
                                            "description": "Event thumbnail"
                                        },
                                        "documents": {
                                            "type": "array",
                                            "items": {
                                                "type": "string",
                                                "format": "uri"
                                            },
                                            "description": "Event documents"
                                        }
                                    },
                                    "required": ["id"]
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Updated event",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "code": {
                                                "type": "number",
                                                "description": "Status code of the response"
                                            },
                                            "status": {
                                                "type": "string",
                                                "description": "Response status"
                                            },
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "id": {
                                                        "type": "number",
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
                                                        "type": "number",
                                                        "description": "Maximum number of participants"
                                                    },
                                                    "organizer_id": {
                                                        "type": "number",
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
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string"
                                                        },
                                                        "description": "Tags or keywords related to the event"
                                                    },
                                                    "rooms": {
                                                        "type": "array",
                                                        "items": {
                                                            "type": "string",
                                                            "enum": [
                                                                "CAFE",
                                                                "MUSIC_STUDIO",
                                                                "PODCAST_ROOM",
                                                                "UPSTAIRS_BAR",
                                                                "STAGE_HALL",
                                                                "UPSTAIRS_BACK_ROOM"
                                                            ]
                                                        },
                                                        "description": "Rooms for the event"
                                                    },
                                                    "attendees_count": {
                                                        "type": "number",
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
                        },
                        "400": {
                            "description": "Bad request. ID is required."
                        },
                        "500": {
                            "description": "Internal Server Error"
                        }
                    }
                }
            },
            '/api/event-to-book/{id}': {
                delete: {
                    tags: ['EventsToBook'],
                    summary: 'Delete an event to book',
                    description: 'Deletes an event to book by its ID.',
                    parameters: [
                        { in: 'query', name: 'id', schema: { type: 'number' }, required: true, description: 'Unique identifier of the event to book to be deleted' }
                    ],
                    responses: {
                        200: {
                            description: 'Event deleted successfully',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            code: { type: 'number', description: 'Status code of the response' },
                                            status: { type: 'string', description: 'Response status' }
                                        }
                                    }
                                }
                            }
                        },
                        400: { description: 'Bad request. ID is required.' },
                        500: { description: 'Internal Server Error' }
                    }
                }
            },
            "/api/cafeitems": {
                get: {
                    tags: [
                        "Cafe Items"
                    ],
                    summary: "Get all cafe items",
                    description: "Fetches all the cafe items",
                    responses: {
                        200: {
                            description: "A list of cafe items",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/CafeItem"
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal Server Error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "/api/cafeitem": {
                get: {
                    tags: [ "Cafe Items" ],
                    summary: "Get a cafe item by ID",
                    description: "Fetches a cafe item based on the provided ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "number"
                            },
                            required: true,
                            description: "The cafe item ID"
                        }
                    ],
                    responses: {
                        200: {
                            description: "Fetched cafe item",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            data: {
                                                $ref: "#/components/schemas/CafeItem"
                                            }
                                        },
                                        required: ["code", "status", "data"]
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Cafe item not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal Server Error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                },
                post: {
                    tags: [
                        "Cafe Items"
                    ],
                    summary: "Create a new cafe item",
                    description: "Creates a new cafe item with the provided details",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/CafeItem"
                                }
                            }
                        }
                    },
                    responses: {
                        201: {
                            description: "Created cafe item",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            data: {
                                                $ref: "#/components/schemas/CafeItem"
                                            }
                                        },
                                        required: ["code", "status", "data"]
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Bad request. Required fields are missing.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal Server Error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                },
                put: {
                    tags: [
                        "Cafe Items"
                    ],
                    summary: "Update a cafe item by ID",
                    description: "Updates a cafe item with the provided details based on the given ID",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        id: {
                                            type: "number",
                                            description: "Cafe item's title"
                                        },
                                        title: {
                                            type: "string",
                                            description: "Cafe item's title"
                                        },
                                        description: {
                                            type: "string",
                                            description: "Description of the cafe item"
                                        },
                                        type: {
                                            type: "string",
                                            description: "Type of the cafe item (e.g., beverage, pastry)"
                                        },
                                        tags: {
                                            type: "string",
                                            description: "Tags associated with the cafe item"
                                        },
                                        thumbnail: {
                                            type: "string",
                                            description: "URL of the cafe item thumbnail image"
                                        },
                                        online_purchase_fee: {
                                            type: "number",
                                            format: "float",
                                            description: "Fee applied for online purchases of the cafe item"
                                        },
                                        stock_quantity: {
                                            type: "number",
                                            description: "Stock quantity of the cafe item"
                                        },
                                        price: {
                                            type: "number",
                                            format: "float",
                                            description: "Price of the cafe item"
                                        },
                                        is_available: {
                                            type: "boolean",
                                            description: "Indicates whether the cafe item is available"
                                        },
                                        ingredients: {
                                            type: "string",
                                            description: "List of ingredients in the cafe item"
                                        },
                                        brand: {
                                            type: "string",
                                            description: "Brand associated with the cafe item"
                                        },
                                        expiration_date: {
                                            type: "string",
                                            format: "date-time",
                                            description: "Expiration date of the cafe item"
                                        },
                                        nutritional_info: {
                                            type: "object",
                                            description: "Nutritional information of the cafe item",
                                            properties: {
                                                calories: {
                                                    type: "number",
                                                    format: "float",
                                                    description: "Calories in the cafe item"
                                                },
                                                fat: {
                                                    type: "number",
                                                    format: "float",
                                                    description: "Fat content in grams"
                                                },
                                                carbohydrates: {
                                                    type: "number",
                                                    format: "float",
                                                    description: "Carbohydrates content in grams"
                                                },
                                                protein: {
                                                    type: "number",
                                                    format: "float",
                                                    description: "Protein content in grams"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    responses: {
                        200: {
                            description: "Updated cafe item",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            data: {
                                                $ref: "#/components/schemas/CafeItem"
                                            }
                                        },
                                        required: ["code", "status", "data"]
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Bad request. Required fields are missing.",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Cafe item not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal Server Error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                },
            },
            "/api/cafeitem/{id}": { 
                delete: {
                    tags: [
                        "Cafe Items"
                    ],
                    summary: "Delete a cafe item by ID",
                    description: "Deletes a cafe item based on the provided ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            schema: {
                                type: "number"
                            },
                            required: true,
                            description: "The cafe item ID"
                        }
                    ],
                    responses: {
                        200: {
                            description: "Deleted cafe item",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Cafe item not found",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Internal Server Error",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            code: {
                                                type: "number"
                                            },
                                            status: {
                                                type: "string"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        },
                                        required: ["code", "status", "message"]
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "/api/file": {
                post: {
                    "tags": [
                        "Files"
                    ],
                    "summary": "Upload a file and save metadata",
                    "description": "Uploads a file to UploadThing and saves the metadata in PostgreSQL.",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "multipart/form-data": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "file": {
                                            "type": "string",
                                            "format": "binary",
                                            "description": "The file to upload"
                                        },
                                        "user_id": {
                                            "type": "string",
                                            "description": "The ID of the user uploading the file"
                                        },
                                        "type": {
                                            "type": "string",
                                            "enum": [
                                                "profile_picture",
                                                "event_thumbnail",
                                                "cafe_item_thumbnail",
                                                "cafe_item_image",
                                                "hero_image"
                                            ],
                                            "description": "The type of the file being uploaded"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "201": {
                            "description": "File uploaded and metadata saved successfully",
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
                                            "data": {
                                                "type": "object",
                                                "properties": {
                                                    "file_url": {
                                                        "type": "string",
                                                        "description": "URL of the uploaded file"
                                                    },
                                                    "user_id": {
                                                        "type": "string",
                                                        "description": "User ID of the file uploader"
                                                    },
                                                    "uploaded_at": {
                                                        "type": "string",
                                                        "format": "date-time",
                                                        "description": "Timestamp of when the file was uploaded"
                                                    },
                                                    "type": {
                                                        "type": "string",
                                                        "description": "Type of the uploaded file"
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "400": {
                            "description": "Bad request. Missing required fields or file",
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
                        "500": {
                            "description": "Internal Server Error",
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
                        }
                    }
                }
            },
            "/api/send-email": {
                post: {
                    "tags": ["Emails"],
                    "summary": "Send an email",
                    "description": "Sends an email using the specified parameters.",
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "to": {
                                            "type": "string",
                                            "description": "The recipient's email address"
                                        },
                                        "subject": {
                                            "type": "string",
                                            "description": "The subject of the email"
                                        },
                                        "first_name": {
                                            "type": "string",
                                            "description": "The first name of the recipient"
                                        },
                                        "last_name": {
                                            "type": "string",
                                            "description": "The last name of the recipient"
                                        }
                                    },
                                    "required": ["to", "subject", "first_name", "last_name"]
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Email sent successfully",
                            "content": {
                                "application/json": {
                                    "schema": {
                                        "type": "object",
                                        "properties": {
                                            "success": {
                                                "type": "boolean"
                                            },
                                            "messageId": {
                                                "type": "string"
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
                                            "success": {
                                                "type": "boolean"
                                            },
                                            "message": {
                                                "type": "string"
                                            },
                                            "error": {
                                                "type": "object"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            // "/api/receive-email": {
            //     post: {
            //         "tags": ["Emails"],
            //         "summary": "Receive an email",
            //         "description": "Handles incoming emails from SendGrid Inbound Parse.",
            //         "requestBody": {
            //             "required": true,
            //             "content": {
            //                 "application/json": {
            //                     "schema": {
            //                         "type": "object",
            //                         "properties": {
            //                             "from": {
            //                                 "type": "string",
            //                                 "description": "The sender's email address"
            //                             },
            //                             "subject": {
            //                                 "type": "string",
            //                                 "description": "The subject of the email"
            //                             },
            //                             "text": {
            //                                 "type": "string",
            //                                 "description": "The body of the email"
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         },
            //         "responses": {
            //             "200": {
            //                 "description": "Email received successfully",
            //                 "content": {
            //                     "text/plain": {
            //                         "schema": {
            //                             "type": "string"
            //                         }
            //                     }
            //                 }
            //             },
            //             "500": {
            //                 "description": "Internal Server Error",
            //                 "content": {
            //                     "application/json": {
            //                         "schema": {
            //                             "type": "object",
            //                             "properties": {
            //                                 "message": {
            //                                     "type": "string"
            //                                 }
            //                             }
            //                         }
            //                     }
            //                 }
            //             }
            //         }
            //     }
            // }
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
                        "role": {
                            "type": "string",
                            "description": "User's role type",
                            "example": "USER",
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
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier of the event'
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the event'
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the event'
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date and time of the event'
                        },
                        location: {
                            type: 'string',
                            description: 'Location where the event takes place'
                        },
                        capacity: {
                            type: 'number',
                            description: 'Maximum number of participants'
                        },
                        organizer_id: {
                            type: 'number',
                            description: 'ID of the event organizer'
                        },
                        type: {
                            type: 'string',
                            description: 'Type or category of the event'
                        },
                        registration_deadline: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Deadline for event registration'
                        },
                        registration_fee: {
                            type: 'number',
                            format: 'float',
                            description: 'Fee required for event registration'
                        },
                        tags: {
                            type: 'string',
                            description: 'Tags or keywords related to the event'
                        },
                        status: {
                            type: 'string',
                            description: 'Current status of the event'
                        },
                        attendees_count: {
                            type: 'number',
                            description: 'Number of attendees registered for the event'
                        },
                        thumbnail: {
                            type: 'string',
                            description: 'URL of the event thumbnail image'
                        },
                        documents: {
                            type: 'string',
                            description: 'List of document URLs related to the event'
                        }
                    }
                },
                BookEventType: {
                    "type": "object",
                        "properties": {
                        "id": {
                            "type": "string",
                                "description": "Unique identifier of the event to book"
                        },
                        "title": {
                            "type": "string",
                                "description": "Title of the event to book"
                        },
                        "description": {
                            "type": "string",
                                "description": "Description of the event to book"
                        },
                        "date": {
                            "type": "string",
                                "format": "date-time",
                                    "description": "Date and time of the event to book"
                        },
                        "location": {
                            "type": "string",
                                "description": "Location where the event to book takes place"
                        },
                        "capacity": {
                            "type": "number",
                                "description": "Maximum number of participants"
                        },
                        "organizer_id": {
                            "type": "number",
                                "description": "ID of the event to book organizer"
                        },
                        "type": {
                            "type": "string",
                                "description": "Type or category of the event to book"
                        },
                        "registration_deadline": {
                            "type": "string",
                                "format": "date-time",
                                    "description": "Deadline for event to book registration"
                        },
                        "registration_fee": {
                            "type": "number",
                                "format": "float",
                                    "description": "Fee required for event to book registration"
                        },
                        "tags": {
                            "type": "array",
                                "items": {
                                "type": "string"
                            },
                            "description": "Tags or keywords related to the event to book"
                        },
                        "rooms": {
                            "type": "array",
                                "items": {
                                "type": "string",
                                    "enum": [
                                        "CAFE",
                                        "MUSIC_STUDIO",
                                        "PODCAST_ROOM",
                                        "UPSTAIRS_BAR",
                                        "STAGE_HALL",
                                        "UPSTAIRS_BACK_ROOM"
                                    ]
                            },
                            "description": "Rooms for the event to book"
                        },
                        "attendees_count": {
                            "type": "number",
                                "description": "Number of attendees registered for the event to book"
                        },
                        "thumbnail": {
                            "type": "string",
                                "description": "URL of the event to book thumbnail image"
                        },
                        "documents": {
                            "type": "object",
                            "description": "List of document URLs related to the event to book"
                        }
                    }
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
                },
                File: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Unique identifier of the file'
                        },
                        user_id: {
                            type: 'string',
                            description: 'User id of the user who uploaded file'
                        },
                        file_url: {
                            type: 'string',
                            description: 'File url'
                        },
                        uploaded_at: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Date and time of the file upload'
                        },
                        type: {
                            type: 'string',
                            description: 'Type of file'
                        },
                    }
                }
            },
        }
    },
};

export default swaggerJSDoc(options);