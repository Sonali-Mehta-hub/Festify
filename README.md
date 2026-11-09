# Festify

Festify helps people discover and share destinations for festivals, weddings,
and other celebrations.

-Live Demo: https://festify-fx0n.onrender.com/


## Stack

- React and Vite frontend (`client/`)
- Express REST API and session authentication
- MongoDB Atlas with Mongoose
- Cloudinary image uploads
- Passport local and Google OAuth authentication

## Run locally

1. Install Node.js 22.15 or newer and install dependencies:

   ```sh
   npm install
   ```

2. Set these values in the root `.env` file:

   ```env
   ATLASDB_URL=your-mongodb-atlas-connection-string
   SECRET=a-long-random-session-secret
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret
   ```

   Google OAuth and Cloudinary credentials are needed only for those
   integrations. Keep `.env` private and never commit it.

3. In Google Cloud, add
   `http://localhost:5173/auth/google/callback` as an authorized redirect URI
   if you want to test Google sign-in locally.

4. Start the API and React development server:

   ```sh
   npm run dev
   ```

   Open `http://localhost:5173`. Vite forwards `/api` and `/auth` requests to
   the Express server on port 8080.

## Production

Build the React app and start the Express server:

```sh
npm run build
npm start
```

For Render, use `npm install --include=dev && npm run build` as the build command and
`npm start` as the start command. Set the environment variables above in the
Render service settings. The production Google OAuth redirect URI is
`https://festify-fx0n.onrender.com/auth/google/callback`; keep it registered in
Google Cloud and set `GOOGLE_CALLBACK_URL` if the deployed URL changes.

## API overview

- `GET /api/me` — current session user
- `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/logout`
- `GET /api/listings`, `GET /api/listings/:id`
- `POST /api/listings`, `PUT /api/listings/:id`, `DELETE /api/listings/:id`
- `POST /api/listings/:id/reviews`
- `DELETE /api/listings/:id/reviews/:reviewId`
