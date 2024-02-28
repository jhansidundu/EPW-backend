const emailTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enrollment Invitation for [Exam Name]</title>
    <style>
        /* You can add your own styles here */
        body {
            font-family: sans-serif;
            background-color: #f5f5f5;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 10px;
        }

        .details {
            margin-bottom: 20px;
        }

        .details dt {
            font-weight: bold;
        }

        .details dd {
            margin-left: 10px;
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
        <h1 class="title">You're Invited to Take the Exam</h1>
        <p>Dear,</p>
        <p>We're excited to invite you to participate in the upcoming exam.</p>

        <div class="details">
            <dl>
                <dt>Exam Name:</dt>
                <dd>[Exam Name]</dd>
                <dt>Date:</dt>
                <dd>[Exam Date]</dd>
                <dt>Duration:</dt>
                <dd>[Exam Duration] minutes</dd>
            </dl>
        </div>

        <div class="button">
            <a href="[Enrollment Link]">Click here to enroll</a>
        </div>

        <p>Please note that enrollment is required to take the exam. Click the button above to register and confirm your
            participation.</p>
        <p>We encourage you to review the exam information and preparation materials before enrolling. You can find more
            information on our website at [Link to Exam Information Page].</p>
        <p>If you have any questions, please don't hesitate to contact us at [Contact Email/Phone Number].</p>
        <p>Sincerely,</p>
        <p>[Exam Organizer Name/Organization]</p>
    </div>
</body>

</html>`;
export default emailTemplate;
