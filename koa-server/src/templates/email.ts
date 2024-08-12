export interface EmailTemplateOptions {
    first_name: string;
    last_name: string;
    event_link: string;
}

export const htmlTemplateEventCreated = ({
    first_name,
    last_name,
    event_link
}: EmailTemplateOptions) => first_name && last_name && event_link ? `
<!DOCTYPE html>
<html>
<head>
    <style>
        .body {
            padding: 20px;
            background-color: #000000;
        }
        .container {
            height: fit-content;
            font-family: Palantino, sans-serif;
            margin: 20px;
            background-color: #000000;
            border-left: 1.5px solid #10b981;
            border-right: 1.5px solid #10b981;
            border-bottom: 1.5px solid #10b981;
            border-bottom-left-radius: 6px;
            border-bottom-right-radius: 6px;
            padding-bottom: 20px;
        }
        .container div p {
            color: aliceblue;
        }
        .header {
            background-color: #10b981;
            padding: 10px;
            text-align: center;
            border-bottom-left-radius: 18%;
            border-bottom-right-radius: 18%;
        }
        .white-text {
            color: aliceblue;
        }
        h2 {
            margin: 9px;
        }
        .content {
            height: 699px;
            margin: 20px 0;
            padding-top: 30px;
            padding-left: 20px;
            padding-right: 20px;
        }
        .link {
            background-color: transparent;
            color: #000000;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            transition-duration: 0.3s;
            transition-timing-function: ease-in-out;
        }
        .link:hover {
            color: #08477b;
            text-decoration-line: underline;
            text-underline-offset: 2px;
            text-decoration-color: #08477b;
        }
        .footer {
            margin-top: 20px;
            text-align: center;
            padding-left: 20px;
            padding-right: 20px;
        }
    </style>
</head>
<body class="body">
    <div class="container">
        <div class="header">
            <h1 class="white-text">Hi ${first_name} ${last_name}! Thank you for booking with us!</h1> 
            <h2 class="white-text">Our team will get back to you shortly to Approve or Deny your request.</h2> 
            <h3 class="white-text">For status updates, continue to check this email or <a href=${event_link} class="link">View Your Event</a></h3>
        </div>
        <div class="content">
            <p>Here is some more info about SeshHouse...</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 SeshHouse. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
` : htmlTemplateSomethingWentWrong;

const htmlTemplateSomethingWentWrong = `
<!DOCTYPE html>
<html>
<head>
<body>
    <p>Something Went Wrong :(</p>
    <a href="mailto:support@seshhouse.club">email support</a>
</body>
</head>
</html>
`;