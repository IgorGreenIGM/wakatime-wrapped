# WakaTime Wrapped Backend

## 🚀 Overview
The backend for WakaTime Wrapped serves as the core engine for processing user data, managing APIs, and enabling seamless communication with the front-end. Built with Python and Flask, it leverages Redis for caching and AWS Lambda for on-demand rendering of videos and other assets.

## ✨ Features
- **Data Processing**: Handles and processes yearly WakaTime stats via the WakaTime API.
- **Caching**: Speeds up requests and reduces redundant API calls using Redis.
- **Video Rendering**: Integrates with AWS Lambda to generate personalized animations and recaps.
- **RESTful API**: Provides endpoints for front-end communication and data retrieval.


## 🛠️ Technologies Used

### Core Backend
- **Python + Flask**: A lightweight framework for creating the REST API and handling backend logic.
- **Redis**: For caching temporary data and minimizing API latency.

### Cloud Services
- **AWS Lambda**: For rendering animations and videos dynamically, ensuring scalability and efficiency.

### API Integration
- **WakaTime API**: The source for fetching yearly coding statistics.

---

## 📂 Directory Structure
```
backend/
├── run.py               # Entry point for running the Flask app
├── requirements.txt     # Python dependencies
├── app/                 
│   ├── routes/          # API route definitions
│   │   ├── auth.py      # Handles WakaTime API authentication
│   │   └── stats.py     # Manages routes for fetching and processing stats
│   ├── services/        
│   │   ├── card.py      # Generates visual stat cards
│   │   ├── remotion.py  # Integrates with Remotion for video rendering
│   │   └── wakatime.py  # Interacts with WakaTime API
│   ├── utils/           
│   │   ├── date_utils.py 
│   │   ├── extractors.py 
│   │   └── statistics.py 
│   └── cards/           # Stores generated cards
└── README.md            # Backend documentation

```

---

## 🔧 Setup Instructions

### Prerequisites
- Python 3.6+
- Redis installed and running locally or accessible remotely
- AWS account with Lambda configured ([see Remotion lambda setup](https://www.remotion.dev/docs/lambda/setup))

### Installation
1. Clone the repository:
   ```bash
   git clone -b backend --single-branch https://github.com/IgorGreenIGM/wakatime-wrapped.git
   cd backend
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Go to WakaTime [(here)](https://wakatime.com/apps) and create an App  for be able to access user data.

5. Set up environment variables in a `.env` file:
   ```env
    WAKATIME_CLIENT_ID=
    WAKATIME_CLIENT_SECRET=
    WAKATIME_REDIRECT_URI=
    REMOTION_AWS_ACCESS_KEY_ID=
    REMOTION_AWS_SECRET_ACCESS_KEY=
    REMOTION_APP_SERVE_URL=
    REMOTION_APP_FUNCTION_NAME=
    REMOTION_APP_REGION=
    REDISPORT=
    REDISHOST=
    REDIS_PASSWORD=
   ```
6. Start the server:
   ```bash
   waitress-serve --port=8080 --call run:create_app
   ```



## 📄 License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
