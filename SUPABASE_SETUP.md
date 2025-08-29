# Supabase Setup Guide for Sign Language Translator

This guide will walk you through setting up Supabase as your backend database to replace the simulated database.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `sign-language-translator` (or your preferred name)
   - **Database Password**: Choose a strong password (save this!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://abcdefghijklmnop.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)
   - **Service role key** (starts with `eyJ...`)

## Step 3: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query
3. Copy and paste the contents of `backend/supabase_schema.sql`
4. Click "Run" to execute the SQL
5. Verify the tables were created in **Table Editor**

## Step 4: Configure Environment Variables

1. In your project root, create a `.env` file:
   ```bash
   cp backend/env_example.txt .env
   ```

2. Edit the `.env` file with your Supabase credentials:
   ```env
   # Supabase Configuration
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   
   # JWT Configuration
   JWT_SECRET_KEY=your_super_secret_jwt_key_here
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   
   # Security
   BCRYPT_ROUNDS=12
   ```

3. **Important**: Add `.env` to your `.gitignore` file to keep credentials secure

## Step 5: Install Dependencies

Run the updated setup script:
```bash
./setup_backend.sh
```

This will install the new Supabase dependencies.

## Step 6: Test the Setup

1. Start the backend:
   ```bash
   ./start_backend.sh
   ```

2. Check the health endpoint:
   ```bash
   curl http://localhost:8000/health
   ```

3. Try creating a user:
   ```bash
   curl -X POST http://localhost:8000/signup \
     -H "Content-Type: application/json" \
     -d '{"username":"test","email":"test@example.com","password":"password123"}'
   ```

## Database Schema Overview

### Users Table
- `id`: Unique UUID identifier
- `username`: User's display name
- `email`: Unique email address
- `password_hash`: Bcrypt-hashed password
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### Text Translations Table
- `id`: Unique UUID identifier
- `user_id`: Reference to users table
- `text`: Input text to translate
- `video_url`: Generated sign language video URL
- `created_at`: Translation creation timestamp
- `updated_at`: Last update timestamp

## Security Features

- **Password Hashing**: Bcrypt with configurable rounds
- **JWT Authentication**: Secure token-based auth
- **Row Level Security**: Users can only access their own data
- **Input Validation**: Pydantic models for data validation
- **CORS Protection**: Configured for frontend communication

## Troubleshooting

### Common Issues

1. **Environment Variables Not Found**
   - Ensure `.env` file exists in project root
   - Check variable names match exactly
   - Restart the backend after changes

2. **Database Connection Failed**
   - Verify Supabase URL and keys
   - Check if project is active
   - Ensure database is not paused

3. **Table Not Found**
   - Run the SQL schema in Supabase SQL Editor
   - Check table names match exactly
   - Verify RLS policies are enabled

4. **Authentication Errors**
   - Check JWT secret key
   - Verify token expiration settings
   - Ensure proper token format in requests

### Debug Mode

To see detailed error messages, you can temporarily modify the error handling in `main.py` to return full error details (remove in production).

## Next Steps

Once Supabase is working:

1. **Real Video Generation**: Integrate with sign language AI models
2. **File Storage**: Use Supabase Storage for video files
3. **User Profiles**: Add profile pictures and preferences
4. **Analytics**: Track usage patterns and popular translations
5. **Multi-language**: Support different sign language variants

## Production Considerations

- Use strong, unique JWT secrets
- Enable Supabase backups
- Set up monitoring and logging
- Implement rate limiting
- Use environment-specific configurations
- Set up CI/CD pipelines

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Supabase Community](https://github.com/supabase/supabase/discussions) 