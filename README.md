# 🩸 WoundLog

**"Write it. Feel it. Bleed it. Heal it."**

A poetic, expressive journaling and self-reflection platform with a beautiful social "Bleed Wall" where users share their deepest emotions anonymously. Experience the art of vulnerability through carefully crafted design and meaningful interactions.

## ✨ Features

### 🎭 **Bleed Wall - Social Expression**
- **Featured Posts**: Curated emotional content always displayed first
- **Anonymous Sharing**: Share your deepest thoughts without judgment  
- **Heart System**: Express empathy with others' wounds (optimistic UI)
- **Smart Filtering**: Search by content, category, or emotion tags
- **Blur Effect**: Gentle content reveal on hover for emotional protection
- **Report System**: Community-driven content moderation

### 📖 **Personal Journaling**
- **Private Entries**: Encrypted personal journal with rich text support
- **Emotion Tagging**: Track and categorize your emotional journey
- **Mood Analytics**: Visual insights into your emotional patterns

### 🎨 **Beautiful Design**
- **Grain Texture**: Authentic, tactile visual experience
- **Dynamic Themes**: Responsive color schemes and typography
- **Floating Particles**: Subtle animations for emotional depth
- **Glass Morphism**: Modern, ethereal UI components
- **Mobile-First**: Seamless experience across all devices

### ⚡ **Advanced Interactions**
- **Optimistic UI**: Instant feedback with server sync
- **Toast Notifications**: Elegant feedback with undo actions
- **Real-time Updates**: Live content without page refreshes
- **Error Recovery**: Graceful handling of network issues
- **Accessibility**: Full keyboard navigation and screen reader support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, TailwindCSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT-based secure auth system
- **Database**: MongoDB with optimized queries
- **Styling**: TailwindCSS with custom animations and effects
- **State Management**: React Context API with optimistic updates
- **Error Handling**: Comprehensive client/server error boundaries

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kesh3805/WoundLog.git
   cd WoundLog
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies (for concurrent development)
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Environment Setup**
   
   Create `.env` files in both root and `server/` directories:
   
   **server/.env:**
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key_here
   PORT=4000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   # From root directory - starts both client and server
   npm run dev
   
   # Or start individually:
   # Backend: npm run dev:server (runs on port 4000)  
   # Frontend: npm run dev:client (runs on port 3000)
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000
   - BleedWall: http://localhost:3000/bleed-wall

## 📁 Project Structure

```
WoundLog/
├── client/                    # Next.js 15 frontend
│   ├── src/
│   │   ├── app/              # App router pages
│   │   │   ├── bleed-wall/   # Social wall pages
│   │   │   │   └── liked/    # Liked posts page
│   │   │   ├── journal/      # Personal journal pages
│   │   │   ├── login/        # Authentication pages
│   │   │   └── register/     # User registration
│   │   ├── components/       # Reusable React components
│   │   │   ├── BleedPostCard.tsx    # Post display with blur effect
│   │   │   ├── BleedFilterBar.tsx   # Search and filtering
│   │   │   ├── ToastContext.tsx     # Global notifications
│   │   │   └── ThemeContext.tsx     # Theme management
│   │   ├── lib/              # API utilities and helpers
│   │   │   ├── bleedApi.ts   # Bleed wall API functions
│   │   │   └── api.ts        # General API utilities
│   │   └── hooks/            # Custom React hooks
│   ├── components/           # Additional components
│   ├── public/              # Static assets
│   └── styles/              # Global styles and themes
├── server/                  # Express.js backend
│   ├── routes/              # API route handlers
│   │   ├── bleed.js         # Bleed wall endpoints
│   │   ├── auth.js          # Authentication routes
│   │   └── entries.js       # Journal entries
│   ├── models/              # MongoDB schemas
│   │   ├── BleedPost.js     # Social post model
│   │   ├── User.js          # User account model
│   │   ├── Entry.js         # Journal entry model
│   │   └── Report.js        # Content reporting model
│   ├── middleware/          # Custom middleware
│   │   └── auth.js          # JWT authentication
│   └── utils/              # Backend utilities
│       ├── auth.js         # Auth helpers
│       └── gemini.js       # AI integration
└── package.json            # Root package with dev scripts
```

## 🔧 API Endpoints

### Authentication
- `POST /auth/register` - User registration with validation
- `POST /auth/login` - User login with JWT token
- `GET /auth/me` - Get current authenticated user

### Journal Entries
- `GET /entries` - Get user's private journal entries
- `POST /entries` - Create new journal entry
- `PUT /entries/:id` - Update existing journal entry
- `DELETE /entries/:id` - Delete journal entry

### Bleed Wall (Social Features)
- `GET /bleed` - Get all public bleed posts with pagination
- `POST /bleed` - Create new anonymous bleed post
- `POST /bleed/:id/heart` - Heart a post (with duplicate prevention)
- `DELETE /bleed/:id/heart` - Remove heart from post
- `GET /bleed/liked` - Get user's hearted posts
- `POST /bleed/:id/report` - Report inappropriate content

### Special Features
- **Featured Posts**: Static posts always shown first (client-side only)
- **Optimistic Updates**: Immediate UI feedback with server sync
- **Error Recovery**: Automatic state synchronization on API errors

## 🎨 Key Components

### Core Components
- **BleedPostCard**: Post display with blur reveal, heart system, and reporting
- **BleedFilterBar**: Advanced search with category and emotion filtering  
- **BleedNewPostModal**: Rich post creation with emotion tagging
- **ToastContext**: Global notification system with undo actions

### UI Components  
- **GlassCard**: Glassmorphism container with theme integration
- **MoodBackground**: Dynamic background with particle effects
- **ThemeContext**: Comprehensive theming with multiple contexts
- **NavBarWrapper**: Responsive navigation with mobile optimization

### Advanced Features
- **Optimistic UI**: Instant feedback while syncing with server
- **Error Boundaries**: Graceful error handling and recovery
- **Accessibility**: Full WCAG compliance with keyboard navigation
- **Performance**: Memoized components and optimized re-renders

## 🔒 Security Features

- **JWT Authentication**: Secure token-based user sessions
- **Input Validation**: Server-side validation with comprehensive sanitization
- **Rate Limiting**: API endpoint protection against abuse
- **XSS Protection**: Content sanitization and CSP headers
- **CORS Configuration**: Secure cross-origin request handling
- **Featured Post Protection**: Client/server validation for system posts
- **Report System**: Community-driven content moderation with automatic actions

## 📱 Mobile & Accessibility Features

- **Mobile-First Design**: Optimized for touch interfaces and small screens
- **Responsive Layouts**: Fluid design that works on any device
- **Touch Interactions**: Gesture-friendly buttons and swipe actions
- **Keyboard Navigation**: Full accessibility without mouse
- **Screen Reader Support**: ARIA labels and semantic HTML
- **High Contrast**: Readable colors and sufficient contrast ratios
- **Focus Management**: Clear focus indicators for navigation

## 🎭 User Experience Highlights

- **Blur Reveal Effect**: Gentle content discovery to protect emotional wellbeing
- **Optimistic UI**: Instant feedback while maintaining data consistency  
- **Featured Content**: Curated posts to inspire and guide emotional expression
- **Smart Filtering**: Find relevant content without overwhelming choices
- **Graceful Errors**: Helpful error messages with recovery suggestions
- **Toast Notifications**: Non-intrusive feedback with actionable options
- **Theme Consistency**: Cohesive visual language throughout the app

## 🚀 Deployment

### Using Vercel + Railway/Render

#### Frontend (Vercel)
```bash
# Connect GitHub repo to Vercel
# Environment variables:
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

#### Backend (Railway/Render)  
```bash
# Build command: npm install
# Start command: npm start
# Environment variables:
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-super-secure-secret
PORT=4000
NODE_ENV=production
```

### Self-Hosting with Docker
```dockerfile
# Dockerfile example for full-stack deployment
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000 4000
CMD ["npm", "run", "start:prod"]
```

## 📊 Current Status

- ✅ **Full-stack Application**: Complete frontend and backend implementation
- ✅ **Authentication System**: Secure user registration and login
- ✅ **Bleed Wall**: Social sharing with heart system and featured posts
- ✅ **Journal System**: Private personal entries with emotion tracking
- ✅ **Mobile Responsive**: Works seamlessly on all device sizes
- ✅ **Error Handling**: Comprehensive error boundaries and recovery
- ✅ **Featured Posts**: Curated content system with proper type safety
- ✅ **Optimistic UI**: Instant feedback with server synchronization
- 🔄 **Analytics Dashboard**: Coming soon - mood tracking visualizations
- 🔄 **AI Integration**: Planned - sentiment analysis and writing suggestions

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following our coding standards:
   - Use TypeScript for type safety
   - Follow the existing component structure
   - Add proper error handling
   - Write meaningful commit messages
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Follow the configured linting rules  
- **Component Structure**: Keep components focused and reusable
- **Error Handling**: Always include proper error boundaries
- **Accessibility**: Ensure WCAG compliance in all components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Built with**: Next.js 15 and Express.js for robust full-stack architecture
- **Styled with**: TailwindCSS for beautiful, responsive design
- **Powered by**: MongoDB for reliable data persistence
- **Enhanced by**: React 19 for cutting-edge frontend features
- **Inspired by**: The human need to express, connect, and heal through shared vulnerability

## 📞 Support

- **Issues**: Report bugs and feature requests on [GitHub Issues](https://github.com/Kesh3805/WoundLog/issues)
- **Discussions**: Join community discussions for help and ideas
- **Documentation**: Check the `/docs` folder for detailed guides

---

**"In every wound, there is a story. In every story, there is healing."** 🩸✨  
