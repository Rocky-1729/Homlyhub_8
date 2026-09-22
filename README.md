# 🏡 HomlyHub

### Smart Stay & Travel Platform

HomlyHub is a full-stack web application designed to simplify **property discovery, accommodation booking, and trip planning** in one platform.

Users can explore available properties, search and filter stays by destination and booking details, view detailed property information, create accounts, manage their profiles, make bookings, and generate personalized travel plans using AI.

🔗 **Live Demo:** https://homlyhub.netlify.app/
💻 **GitHub Repository:** https://github.com/Rocky-1729/Homlyhub_8

---

## ✨ Features

### 🏠 Property Discovery

* Browse available properties and accommodations
* Search properties by destination
* Filter properties based on booking requirements
* Paginated property listing
* Property cards with images, location and price
* Detailed property pages

### 🔎 Search & Filtering

* Search by destination
* Select check-in and check-out dates
* Specify number of guests
* Filter available properties according to user requirements

### 🏘️ Property Details

Each property provides:

* Property name
* Description
* Property type
* Room type
* Maximum guest capacity
* Amenities
* Price per night
* Check-in and check-out time
* Property images
* Location information
* Interactive map

### 👤 User Authentication

* User registration
* User login
* Secure logout
* JWT-based authentication
* Protected routes
* Password hashing using bcrypt
* Session checking
* Profile management
* Update profile information
* Update password

### 🔐 Password Recovery

* Forgot password functionality
* Secure password reset token
* Reset-link expiration
* Email-based password recovery

### 🏡 Accommodation Management

Registered users can:

* Add new properties
* Upload property images
* Manage their own accommodations
* Store property details and amenities

### 📅 Booking System

Users can:

* Select check-in and check-out dates
* Select number of guests
* Calculate booking information
* Create a booking
* View booking history
* Open individual booking details

### 💳 Payment Flow

HomlyHub includes a booking payment workflow with:

* Order creation
* Payment summary
* Booking confirmation
* Payment status handling
* Booking creation after successful payment

> The current implementation uses an application-level payment flow rather than a production payment-provider integration.

### 🤖 AI Trip Planner

HomlyHub integrates **Groq AI** to generate personalized travel itineraries.

Users provide:

* Destination
* Budget
* Number of days
* Number of people
* Travel interests

The AI generates:

* Trip summary
* Day-by-day itinerary
* Morning, afternoon and evening activities
* Budget-aware suggestions
* Travel tips

### ✍️ AI Property Description Generator

Property owners can generate attractive property descriptions automatically using AI based on:

* Property type
* Room type
* Guest capacity
* Amenities
* Location
* Price
* Additional information

### 🗺️ Interactive Maps

Property locations are displayed using:

* React Leaflet
* OpenStreetMap
* Nominatim geocoding

### 🖼️ Image Management

Property and user images are handled through **ImageKit**, allowing the application to store image URLs rather than storing image files directly inside MongoDB.

### 🎨 Frontend Experience

* Responsive interface
* React component-based architecture
* Redux Toolkit state management
* React Router navigation
* GSAP animations
* Toast notifications
* Loading states
* Responsive CSS styling

---

## 🛠️ Tech Stack

### Frontend

* React 18
* Vite
* React Router DOM
* Redux Toolkit
* React Redux
* Axios
* Ant Design
* GSAP
* React Leaflet
* Leaflet
* React DatePicker
* React Hot Toast
* Lucide React
* Moment.js

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Nodemailer
* Mailgen
* ImageKit
* Groq SDK
* dotenv
* CORS
* Cookie Parser
* Validator
* Slugify

### AI

* Groq API
* `openai/gpt-oss-120b`

---

## 🏗️ Architecture

HomlyHub follows a **client-server architecture**.

```text
                 ┌─────────────────────────┐
                 │       User Browser      │
                 │   React + Vite Frontend  │
                 └────────────┬────────────┘
                              │
                              │ HTTP / REST API
                              ▼
                 ┌─────────────────────────┐
                 │      Express Server     │
                 │   Node.js Backend API   │
                 └────────────┬────────────┘
                              │
             ┌────────────────┼────────────────┐
             │                │                │
             ▼                ▼                ▼
       ┌──────────┐     ┌────────────┐   ┌────────────┐
       │ MongoDB  │     │   ImageKit │   │  Groq AI   │
       │ Database │     │   Images   │   │ AI Services│
       └──────────┘     └────────────┘   └────────────┘
```

---

## 📁 Project Structure

```text
Homlyhub_8/
│
├── backend/
│   ├── package.json
│   └── src/
│       ├── Models/
│       │   ├── bookingModel.js
│       │   ├── propertyModel.js
│       │   └── userModel.js
│       │
│       ├── ai/
│       │   ├── aiClient.js
│       │   ├── generateDescription.js
│       │   └── tripPlanner.js
│       │
│       ├── contollers/
│       │   ├── authController.js
│       │   ├── bookingController.js
│       │   ├── propertyControllor.js
│       │   └── tripController.js
│       │
│       ├── routes/
│       │   ├── bookingRouter.js
│       │   ├── propertyRouter.js
│       │   ├── tripRouter.js
│       │   └── userRoutes.js
│       │
│       ├── utills/
│       │   ├── APIFeatures.js
│       │   ├── ImagekitIO.js
│       │   ├── db.js
│       │   ├── mail.js
│       │   └── token.js
│       │
│       └── index.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── accomodation/
│   │   │   ├── aiTripPlanner/
│   │   │   ├── home/
│   │   │   ├── myBookings/
│   │   │   ├── payment/
│   │   │   ├── propertyListing/
│   │   │   └── user/
│   │   │
│   │   ├── store/
│   │   │   ├── Accomodation/
│   │   │   ├── Booking/
│   │   │   ├── Payment/
│   │   │   ├── PropertyDetails/
│   │   │   ├── User/
│   │   │   └── property/
│   │   │
│   │   ├── css/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## 🔑 Main API Modules

### Authentication

```text
/api/v1/rent/user
```

Handles:

* Signup
* Login
* Logout
* Authentication protection
* Profile updates
* Password updates
* Forgot password
* Password reset
* Session checking

### Property APIs

```text
/api/v1/rent/listings
```

Handles:

* Get all properties
* Search properties
* Filter properties
* Pagination
* Get property details
* Create accommodation
* Get user's properties

### Booking APIs

```text
/api/v1/rent/user/booking
```

Handles:

* Create booking/order
* Verify payment
* Get user bookings
* Get booking details

### AI / Trip APIs

```text
/api/v1/rent/trip
```

Handles:

* AI trip planning
* AI-generated property descriptions

---

## 🔐 Environment Variables

Create a `.env` file inside the backend directory.

Example:

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d

ORIGIN_ACCESS_URL=http://localhost:5173

GROQ_API_KEY=your_groq_api_key

IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint

MAIL_HOST=your_mail_host
MAIL_PORT=your_mail_port
MAIL_USERNAME=your_mail_username
MAIL_PASSWORD=your_mail_password
MAIL_FROM=your_email
```

Do **not** commit your `.env` file or API keys to GitHub.

---

## 🚀 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Rocky-1729/Homlyhub_8.git
cd Homlyhub_8
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment

Create:

```text
backend/.env
```

Add the required MongoDB, JWT, Groq, ImageKit and email configuration.

### 4. Start backend

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:8000
```

### 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

### 6. Configure frontend environment

Create:

```text
frontend/.env
```

and configure the API base URL used by the application.

### 7. Start frontend

```bash
npm run dev
```

The frontend will be available through the Vite development server.

---

## 🌐 Deployment

The frontend is deployed on **Netlify**:

🔗 https://homlyhub.netlify.app/

For a complete production deployment, the frontend and backend should be deployed separately with the correct environment variables and CORS configuration.

---

## 🔄 User Flow

```text
Visit HomlyHub
      │
      ▼
Search Destination
      │
      ▼
Choose Dates + Guests
      │
      ▼
Browse Properties
      │
      ▼
View Property Details
      │
      ▼
Select Booking Dates
      │
      ▼
Proceed to Payment
      │
      ▼
Booking Confirmed
      │
      ▼
View My Bookings
```

### AI Trip Flow

```text
Destination
     +
Budget
     +
Days
     +
People
     +
Interests
     │
     ▼
   Groq AI
     │
     ▼
Personalized Trip Plan
     │
     ▼
Travel Activities + Tips
```

---

## 🗄️ Database Models

### User

Stores:

* Name
* Email
* Password
* Phone number
* Role
* Avatar
* Password reset information
* Timestamps

### Property

Stores:

* Property name
* Description
* Property type
* Room type
* Guest capacity
* Amenities
* Images
* Price
* Address
* Owner
* Booking information
* Check-in/check-out time
* Slug

### Booking

Stores:

* Property
* User
* Price
* Booking dates
* Number of guests
* Number of nights
* Payment status
* Timestamps

---

## 🔒 Security

The application includes several authentication and security mechanisms:

* JWT authentication
* HTTP-only authentication cookies
* Password hashing with bcrypt
* Protected routes
* Password reset tokens
* Token expiration
* Password-change invalidation
* Request validation
* CORS configuration
* Sensitive user fields excluded from JSON responses

---

## 📸 Screenshots

Add screenshots of the main application pages here:

```md
![Home Page](screenshots/home.png)

![Property Listing](screenshots/property.png)

![AI Trip Planner](screenshots/ai-trip-planner.png)

![Booking](screenshots/booking.png)

![Profile](screenshots/profile.png)
```

---

## 🧪 Current Project Scope

HomlyHub currently demonstrates:

* Full-stack React + Node.js architecture
* REST API development
* MongoDB database integration
* Authentication and authorization
* Property listing and accommodation management
* Booking workflow
* Payment workflow
* Image upload and hosting
* Geolocation and interactive maps
* AI-powered travel planning
* AI-assisted property description generation
* Global frontend state management with Redux Toolkit

---

## 🚀 Future Improvements

Potential future improvements include:

* Integration with a production payment gateway such as Stripe or Razorpay
* Real-time booking availability validation
* Property reviews and ratings
* Wishlist / favorites
* Advanced location-based search
* Admin dashboard
* Booking cancellation and refund management
* Google Maps integration
* Better recommendation engine
* Email notifications for booking events
* Improved property-owner analytics
* Automated deployment with CI/CD

---

## 👨‍💻 Author

### Rocky-1729

GitHub:
https://github.com/Rocky-1729

---

## 📄 License

This project is currently provided for educational and development purposes.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**HomlyHub — Find a stay. Plan a trip. Enjoy the journey. 🏡✈️**
