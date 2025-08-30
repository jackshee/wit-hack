# PixVerse API Integration Setup

This guide explains how to set up the PixVerse API integration for generating sign language videos.

## Environment Variables

Create a `.env` file in your project root with the following variables:

```bash
# Supabase Configuration
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# PixVerse API Configuration
PIXVERSE_API_KEY=sk-9cd03c60e0de6b9fad992f905b5e8cbc

# Security
BCRYPT_ROUNDS=12
```

## Important Security Notes

1. **Never commit your `.env` file to version control** - it's already in `.gitignore`
2. **Keep your PixVerse API key secure** - it's a sensitive credential
3. **Use different API keys for development and production**

## How It Works

The integration works as follows:

1. **Frontend sends text** to `/api/translate` endpoint
2. **Backend calls PixVerse API** to generate a sign language video
3. **Video generation is asynchronous** - the API returns a video ID
4. **Backend polls the status** until the video is ready
5. **Final video URL is returned** to the frontend

## API Endpoints

- `POST /api/translate` - Demo endpoint (no auth required)
- `POST /translate` - Authenticated endpoint (requires JWT token)

## Error Handling

- If PixVerse API fails, the system falls back to demo videos
- All errors are logged for debugging
- Frontend receives graceful fallback responses

## Testing

1. Start your backend server
2. Send a POST request to `/api/translate` with:
   ```json
   {
     "text": "Hello, how are you?"
   }
   ```
3. The system will generate a sign language video and return the URL

## Troubleshooting

- Check that `PIXVERSE_API_KEY` is set in your `.env` file
- Ensure your API key is valid and has sufficient credits
- Monitor backend logs for detailed error messages
- Video generation can take 1-5 minutes depending on complexity 