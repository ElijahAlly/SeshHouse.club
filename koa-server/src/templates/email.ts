export interface EmailTemplateOptions {
    first_name?: string;
    last_name?: string;
}

// HTML template for the email
export const htmlTemplate = ({
    first_name,
    last_name
}: EmailTemplateOptions) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .header {
            background-color: #f7f7f7;
            padding: 10px;
            text-align: center;
        }
        .team-will-get-back {
            color: green;
        }
        .content {
            margin: 20px 0;
        }
        .link {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            border-radius: 5px;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            color: #aaa;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Hi ${first_name} ${last_name}! Thank you for booking an event!</h1> 
            <h2 class="team-will-get-back">Our team will get back to you shortly to confirm or deny your request.</h2> 
            <h3>Continue to check your email or use <a href="https://duckduckgo.com/?q=events&ia=web" class="link">this link</a> to check for updates.</h3>
        </div>
        <div class="content">
            <p>Here is some more info about SeshHouse</p>
            <img src="http://www.gettyimages.com.au/gi-resources/images/Homepage/171795015.jpg" alt="Iceberg image" style="max-width: 100%; height: auto;">
            <a href="https://duckduckgo.com" class="link">Visit DuckDuckGo</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 SeshHouse</p>
        </div>
    </div>
</body>
</html>
`;