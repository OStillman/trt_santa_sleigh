/**
 * Cloudflare Pages Worker for Sleigh Dates Page
 * This file is named _worker.js and should be placed in the root of the repository
 * or the output directory when using Cloudflare Pages Git integration.
 * It serves the entire page using the Worker's logic, making it deployable directly from GitHub.
 */

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thornbury Round Table Sleigh Dates</title>
    <link href="https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@400;700&family=Nunito+Sans:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --christmas-red: #B22222; /* Firebrick */
            --christmas-green: #228B22; /* ForestGreen */
            --christmas-gold: #FFD700; /* Gold */
            --christmas-white: #F8F8F8; /* Light off-white */
            --dark-text: #333;
            --light-text: #fff;
        }

        body {
            font-family: 'Nunito Sans', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(to bottom, #d6eaf8, #f8f8f8); /* Light blue to white gradient */
            color: var(--dark-text);
            line-height: 1.6;
            padding-bottom: 100px; /* Space for fixed Santa button */
            min-height: 100vh;
            box-sizing: border-box;
            overflow-x: hidden; /* Prevent horizontal scroll from snowflakes */
        }

        .container {
            max-width: 800px;
            width: 95%;
            margin: 30px auto;
            background-color: var(--christmas-white);
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            position: relative;
            z-index: 10; /* Ensure content is above background elements */
        }

        .logo-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .logo-header img {
            max-width: 200px; /* Adjust as needed */
            height: auto;
            border-radius: 8px; /* Slightly rounded corners for the logo if it has a background */
            /* No box-shadow for the logo by default unless desired */
        }

        h1 {
            font-family: 'Mountains of Christmas', cursive;
            color: var(--christmas-red);
            text-align: center;
            margin-bottom: 35px;
            font-size: 3em;
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
            position: relative;
            padding-bottom: 15px;
        }

        h1::after {
            content: '';
            position: absolute;
            left: 50%;
            bottom: 0;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background-color: var(--christmas-green);
            border-radius: 2px;
        }

        .date-list {
            list-style: none;
            padding: 0;
        }

        .date-list li {
            background-color: #fff;
            border: 1px solid #eee;
            margin-bottom: 15px;
            padding: 20px 25px;
            border-left: 8px solid var(--christmas-green);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
        }

        .date-list li:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .date-list li strong {
            display: block;
            margin-bottom: 8px;
            color: var(--christmas-red);
            font-size: 1.3em;
            font-family: 'Mountains of Christmas', cursive;
            font-weight: 700;
        }

        .santa-tracker {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
        }

        .santa-tracker a {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--christmas-red);
            color: var(--light-text);
            padding: 18px 28px;
            text-decoration: none;
            border-radius: 50px;
            font-size: 1.2em;
            font-weight: bold;
            transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
            box-shadow: 0 8px 20px rgba(var(--christmas-red), 0.4);
            min-width: 180px;
            height: 60px;
            position: relative;
            overflow: hidden;
        }

        .santa-tracker a::before {
            content: '⭐'; /* Star or snowflake icon */
            position: absolute;
            top: -10px;
            left: -10px;
            font-size: 2em;
            opacity: 0.8;
            transition: transform 0.4s ease-out;
            transform: translate(-100%, -100%);
        }

        .santa-tracker a:hover::before {
            transform: translate(0, 0);
        }

        .santa-tracker a:hover {
            background-color: var(--christmas-green);
            transform: scale(1.05);
            box-shadow: 0 10px 25px rgba(var(--christmas-green), 0.5);
        }

        /* Festive Background Overlay (Snowflakes) */
        .snowflake {
            color: #fff;
            font-size: 1em;
            font-family: Arial, sans-serif;
            text-shadow: 0 0 5px #aaa;
            position: absolute;
            top: -10%;
            z-index: 1; /* Below content, above body background */
            animation: fall linear infinite;
        }

        /* Dynamically create snowflakes with varying sizes and speeds for visual interest */
        @keyframes fall {
            to {
                transform: translateY(100vh);
            }
        }

        /* Mobile Adjustments */
        @media (max-width: 600px) {
            body {
                padding: 10px;
                padding-bottom: 90px;
            }
            .container {
                padding: 20px;
                margin: 15px auto;
                width: 98%;
            }
            .logo-header img {
                max-width: 150px;
            }
            h1 {
                font-size: 2.2em;
                margin-bottom: 25px;
            }
            .date-list li {
                padding: 15px 20px;
                font-size: 0.95em;
            }
            .date-list li strong {
                font-size: 1.1em;
            }
            .santa-tracker {
                bottom: 20px;
                right: 20px;
            }
            .santa-tracker a {
                padding: 15px 20px;
                font-size: 1em;
                min-width: 140px;
                height: 50px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-header">
            <!-- Logo URL has been updated to use the temporarily hosted image -->
            <img src="https://imagedelivery.net/ghlK2Yx2d4Rcnb1jP8x8pg/b621532f-48d1-450f-6893-b6d80d22df00/public" alt="Thornbury Round Table Logo">
        </div>
        <h1>Christmas Sleigh Dates</h1>
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
        <p style="text-align: center; margin-top: 30px; color: #666; font-style: italic;">
            (All dates are based on the original provided schedule. Subject to change.)
        </p>
    </div>

    <div class="santa-tracker">
        <!-- Remember to replace this placeholder link with your actual Santa Tracker URL! -->
        <a href="YOUR_SANTA_TRACKER_LINK_HERE" target="_blank">Track Santa Live!</a>
    </div>

    <script>
        // JavaScript for dynamic snowflake background
        const numSnowflakes = 30; // Number of snowflakes
        for (let i = 0; i < numSnowflakes; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.innerHTML = '❅'; // Snowflake character

            // Randomize position, size, and animation duration
            snowflake.style.left = Math.random() * 100 + 'vw';
            snowflake.style.animationDuration = (Math.random() * 10 + 5) + 's'; // 5-15 seconds
            snowflake.style.animationDelay = (Math.random() * 10) + 's';
            snowflake.style.fontSize = (Math.random() * 1.5 + 0.8) + 'em'; // 0.8 to 2.3em
            snowflake.style.opacity = (Math.random() * 0.7 + 0.3); // 0.3 to 1 opacity

            document.body.appendChild(snowflake);
        }
    </script>
</body>
</html>
`;

export default {
    async fetch(request) {
        return new Response(htmlContent, {
            headers: {
                'content-type': 'text/html;charset=UTF-8',
            },
        });
    },
};