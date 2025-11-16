/**
 * Cloudflare Pages Worker for Sleigh Dates Page
 * This file is named _worker.js and should be placed in the root of the repository
 * or the output directory when using Cloudflare Pages Git integration.
 * It serves the entire page using the Worker's logic, making it deployable directly from GitHub.
 */

// Define the complete HTML content as a template literal string
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sleigh Dates</title>
    <style>
        /* General Reset and Body Setup */
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f4f4f4;
            color: #333;
            line-height: 1.6;
            /* Add bottom padding to prevent content from being hidden by the fixed button */
            padding-bottom: 90px;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .container {
            max-width: 800px;
            width: 95%; /* Fluid width for responsiveness */
            margin: 20px auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        h1 {
            color: #d10000;
            text-align: center;
            margin-bottom: 25px;
            font-size: 2.2em;
            letter-spacing: 1px;
            border-bottom: 2px solid #f4c1c1;
            padding-bottom: 10px;
        }
        .date-list {
            list-style: none;
            padding: 0;
        }
        .date-list li {
            display: flex;
            flex-direction: column;
            background-color: #ffebeb;
            margin-bottom: 12px;
            padding: 18px;
            border-left: 6px solid #d10000;
            border-radius: 8px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .date-list li:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
        }
        .date-list li strong {
            display: block;
            margin-bottom: 4px;
            color: #a70000;
            font-size: 1.1em;
            font-weight: bold;
        }
        .header-image {
            text-align: center;
            margin-bottom: 30px;
            /* Note: Since this is a single Worker file, image assets cannot be stored here.
               The user would need to host the image externally (e.g., in R2 or another CDN)
               and link to it here, or use a placeholder/description. */
        }
        
        /* Fixed Santa Tracker Button */
        .santa-tracker {
            position: fixed;
            bottom: 25px;
            right: 25px;
            z-index: 1000;
            /* Ensure the button is easily tappable on mobile */
        }
        .santa-tracker a {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #d10000;
            color: #fff;
            padding: 15px 20px;
            text-decoration: none;
            border-radius: 50px; /* Pill shape */
            font-size: 1.1em;
            font-weight: bold;
            transition: background-color 0.3s ease, transform 0.1s ease;
            box-shadow: 0 4px 15px rgba(209, 0, 0, 0.4);
            min-width: 150px; /* Ensure a decent tap target size */
            height: 50px;
        }
        .santa-tracker a:hover {
            background-color: #a70000;
            transform: scale(1.02);
        }

        /* Mobile Adjustments */
        @media (max-width: 600px) {
            body {
                padding: 10px;
                padding-bottom: 80px;
            }
            .container {
                padding: 15px;
                margin: 10px auto;
            }
            h1 {
                font-size: 1.6em;
            }
            .date-list li {
                padding: 14px;
                font-size: 0.9em;
            }
            .santa-tracker {
                bottom: 15px;
                right: 15px;
            }
            .santa-tracker a {
                padding: 12px 15px;
                font-size: 0.9em;
                min-width: 120px;
                height: 45px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-image">
             <!-- Placeholder for the image mentioned in the prompt -->
        </div>
        <h1>Sleigh Dates - For The Diary</h1>
        <ul class="date-list">
            <li>
                <strong>FRIDAY 5<sup>th</sup> DEC</strong>
                Castle School & Eastland Avenue
            </li>
            <li>
                <strong>SATURDAY 6<sup>th</sup> DEC</strong>
                Park Farm & Butt Lane
            </li>
            <li>
                <strong>SUNDAY 7<sup>th</sup> DEC</strong>
                Morton Meadows & Primrose
            </li>
            <li>
                <strong>FRIDAY 12<sup>th</sup> DEC</strong>
                Streamleaze / Avon Way
            </li>
            <li>
                <strong>SATURDAY 13<sup>th</sup> DEC</strong>
                Bloor & Miller Homes
            </li>
            <li>
                <strong>SUNDAY 14<sup>th</sup> DEC</strong>
                Alveston
            </li>
            <li>
                <strong>FRIDAY 19<sup>th</sup> DEC</strong>
                Local Villages & Pub night
            </li>
            <li>
                <strong>SATURDAY 20<sup>th</sup> DEC</strong>
                Crossways & New Sibland
            </li>
        </ul>
        <p style="text-align: center; margin-top: 30px; color: #555;">(All dates are based on the original provided schedule.)</p>
    </div>

    <!-- Fixed Santa Tracker Button -->
    <div class="santa-tracker">
        <a href="YOUR_SANTA_TRACKER_LINK_HERE" target="_blank">Track Santa Live!</a>
    </div>
</body>
</html>
`;

// The Worker entry point
export default {
    async fetch(request) {
        // Return the HTML content with the correct MIME type
        return new Response(htmlContent, {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
        });
    },
};