# Sign Language Translator for Children's Books

A web application that translates text into sign language videos, making children's books accessible to deaf and hard-of-hearing children.

## Features

- **Landing Page**: Hero section describing the project and signup functionality
- **Text Translation**: Input text and receive sign language video output
- **User Management**: Signup and authentication system
- **Responsive Design**: Modern, mobile-friendly interface

## Project Structure

```
WIT/
├── backend/                 # FastAPI backend
│   ├── main.py             # Main API application
│   └── __init__.py         # Package initialization
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   └── package.json        # Frontend dependencies
├── assets/                 # Video assets
└── requirements.txt        # Backend dependencies
```

## Setup Instructions

### Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Python 3.8+**: Ensure Python is installed
3. **Node.js 16+**: For the React frontend

### Backend Setup

#### Step 1: Supabase Configuration

1. Create a new Supabase project
2. Run the database schema from `backend/supabase_schema.sql`
3. Copy your project credentials to a `.env` file
4. See `SUPABASE_SETUP.md` for detailed instructions

#### Step 2: Install and Run

**On macOS/Linux:**
```bash
./setup_backend.sh
./start_backend.sh
```

**On Windows:**
```cmd
setup_backend.bat
start_backend.bat
```

#### Option 2: Manual Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r ../requirements.txt
   ```

4. **Run the FastAPI server:**
   ```bash
   python main.py
   ```
   
   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   
   The frontend will be available at `http://localhost:3000`

## Usage

1. **Landing Page**: Visit the homepage to learn about the project and sign up
2. **Sign Up**: Create an account to access the translator
3. **Try Now**: Click the "Try Now" button to go to the translator page
4. **Translate Text**: Enter text on the left side and click translate
5. **View Results**: See the sign language video on the right side

## API Endpoints

- `POST /signup` - User registration
- `POST /login` - User authentication
- `POST /translate` - Text to sign language translation
- `GET /texts` - Get user's translation history

## Technology Stack

- **Backend**: FastAPI, Python
- **Frontend**: React, React Router
- **Styling**: CSS3 with modern design principles
- **Database**: Supabase (PostgreSQL with real-time features)

## Development Notes

- The backend uses Supabase for persistent data storage
- Video generation is simulated for demo purposes
- CORS is configured for localhost development
- JWT tokens are used for authentication
- Passwords are securely hashed using bcrypt
- Row Level Security (RLS) ensures data privacy

## Future Enhancements

- Real sign language AI model integration
- Database persistence (PostgreSQL/MongoDB)
- User profile management
- Translation history
- Multiple sign language support
- Book upload and management
- Accessibility improvements

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
