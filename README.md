# Law Society Website - Web Intern Test Case

A responsive homepage implementation based on the Law Society of Singapore website mockup, built as a submission for the Web Intern Test Case. This project demonstrates UI accuracy, responsive design, and third-party REST API integration.

## 🚀 Tech Stack

- **Framework:** React (Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API:** The Guardian Open Platform API

## ✨ Features Implemented

- **Pixel-Perfect UI:** Closely matched the Figma design including typography, colors, spacing, and image proportions.
- **Responsive Layout:** 
  - Desktop (≥ 1280px): Full navigation and 3 carousel cards visible.
  - Tablet (768px – 1279px): Condensed layout and 2 carousel cards visible.
  - Mobile (< 768px): Hamburger menu and 1 carousel card visible.
- **Dynamic News Carousel:** Fetches real data from The Guardian API.

## 🛠️ Setup Instructions

To run this project locally on your machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone [url]
   cd <YOUR_PROJECT_FOLDER_NAME>

    Install dependencies:
    Bash

    npm install

    Set up Environment Variables:

        Create a new file named .env in the root directory of the project.

        Add your Guardian API Key to the file using the following format:
        Cuplikan kode

        VITE_GUARDIAN_API_KEY=your_actual_api_key_here

    Run the development server:
    Bash

    npm run dev

    Open your browser and navigate to http://localhost:5173 (or the port specified in your terminal).

📰 API Information

This project uses The Guardian Open Platform API to populate the News Carousel section.

Why this API?
It provides generous free limits, returns high-quality thumbnail images, and delivers clean metadata (like trailText for excerpts) which perfectly maps to the card design requirements.
How to get an API Key:

    Visit The Guardian Open Platform.

    Select the Developer tier (Free).

    Fill out the short registration form (you can put "Web Intern Test Case" as the product name).

    Submit the form, and your API Key will be instantly sent to your email address.

    Copy the key and paste it into your .env file as shown in the setup instructions.

⚠️ Known Issues / Notes

    Ripple effect color a bit doesn't match with figma mockup
    Statue sizing in medium screen a bit challenging

Coded with passion for the Web Intern Test Case evaluation.
