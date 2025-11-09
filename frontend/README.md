# FlashRequest Frontend

React + TypeScript + Vite frontend for FlashRequest marketplace.

## Deployment on Render

### Build Command:
```
npm install && npm run build
```

### Publish Directory:
```
dist
```

### Environment Variables Required:
- `VITE_API_BASE_URL`: URL of your deployed backend service (e.g., https://your-backend.onrender.com)

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file with required variables (see `.env.example`)

3. Run development server:
```bash
npm run dev
```

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.
