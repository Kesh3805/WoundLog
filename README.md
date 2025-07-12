# 🩸 WoundLog

**"Write it. Feel it. Bleed it. Heal it."**

A poetic, expressive journaling and self-reflection platform with a social "Bleed Wall" feature.

## ✨ Features

- **Personal Journaling**: Private, encrypted journal entries with emotion tagging
- **Bleed Wall**: Anonymous social sharing with hearting system
- **Mood Tracking**: Visual emotion tags and mood analytics
- **Mobile-First Design**: Responsive UI with bottom navigation
- **Real-time Interactions**: Heart posts, report inappropriate content
- **Search & Filter**: Find posts by category or search terms
- **Undo Actions**: Toast notifications with undo functionality
- **Accessibility**: Keyboard navigation, screen reader support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT-based auth system
- **Database**: MongoDB Atlas
- **Styling**: TailwindCSS with custom animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd WoundLog
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both `client/` and `server/` directories:
   
   **server/.env:**
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```
   
   **client/.env.local:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the development servers**
   ```bash
   # Start backend (from server directory)
   cd server
   npm start
   
   # Start frontend (from client directory)
   cd client
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
WoundLog/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   │   ├── bleed-wall/ # Social wall pages
│   │   │   └── journal/   # Journal pages
│   │   ├── components/    # React components
│   │   └── lib/          # Utilities and configs
│   ├── public/           # Static assets
│   └── styles/           # Global styles
├── server/               # Express.js backend
│   ├── routes/           # API routes
│   ├── models/           # MongoDB schemas
│   ├── middleware/       # Custom middleware
│   └── utils/           # Backend utilities
└── shared/              # Shared types and utilities
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Journal Entries
- `GET /entries` - Get user's journal entries
- `POST /entries` - Create new journal entry
- `PUT /entries/:id` - Update journal entry
- `DELETE /entries/:id` - Delete journal entry

### Bleed Wall
- `GET /bleed` - Get all bleed posts
- `POST /bleed` - Create new bleed post
- `POST /bleed/:id/heart` - Heart a post
- `DELETE /bleed/:id/heart` - Unheart a post
- `POST /bleed/:id/report` - Report a post
- `GET /bleed/liked` - Get user's liked posts

## 🎨 Key Components

- **BleedPostCard**: Individual post display with heart/report actions
- **BleedFilterBar**: Search and category filtering
- **ToastContext**: Global toast notification system
- **MobileNav**: Bottom navigation for mobile devices
- **LoadingSkeleton**: Loading states for better UX

## 🔒 Security Features

- JWT-based authentication
- Input validation with Zod
- Rate limiting on API endpoints
- XSS protection with content sanitization
- CORS configuration for cross-origin requests

## 📱 Mobile Features

- Responsive design with mobile-first approach
- Bottom navigation bar for easy thumb navigation
- Touch-friendly buttons and interactions
- Optimized layouts for small screens

## 🚀 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Render/Railway)
1. Connect your GitHub repository
2. Set environment variables
3. Configure build command: `npm install`
4. Set start command: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Next.js and Express.js
- Styled with TailwindCSS
- Icons from Lucide React
- Animations powered by Framer Motion  
