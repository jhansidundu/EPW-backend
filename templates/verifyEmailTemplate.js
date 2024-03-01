const template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 20px;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        h1 {
            margin-bottom: 10px;
        }

        p {
            line-height: 1.5;
        }

        .button {
            text-align: center;
        }

        .button a {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Hi [User Name],</h1>
        <p>Welcome to Pareeksha! We're excited to have you join our growing community.</p>
        <p>To complete your registration, please verify your email address by clicking the button below</p>
        <div class="button">
            <a href="[Verification Link]">Verify your email</a>
        </div>
        <p>If you didn't request this email, please disregard it.</p>
        <p>Thanks</p>
        <p>Regards</p>
        <p>Pareeksha Team</p>
    </div>
</body>

</html>
`;
export default template;
