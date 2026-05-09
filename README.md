# 🏥 Smart Patient Queue Management System (PQMS)

A modern, responsive healthcare queue management web application built with vanilla HTML, CSS, and JavaScript. Features intelligent patient prioritization, real-time queue updates, and a professional healthcare interface.

## 🌟 Features

### 🚨 **Emergency Prioritization**
- Emergency patients automatically moved to front of queue
- Visual indicators with red highlighting
- Separate token prefixes (E- for Emergency, N- for Normal)

### 📊 **Real-time Dashboard**
- Live queue statistics and monitoring
- Current serving and next patient displays
- Wait time calculations
- Activity feed with recent registrations

### 📱 **Mobile-First Design**
- Fully responsive across all devices
- Touch-optimized interface
- Progressive Web App (PWA) ready
- Accessibility compliant (WCAG guidelines)

### 💾 **Data Persistence**
- Client-side storage using localStorage
- Queue state maintained between sessions
- No backend required for basic functionality

### 🎨 **Professional Healthcare UI**
- Healthcare-themed color scheme
- Loading animations and transitions
- Professional branding and certification badges
- Print-friendly layouts

## 🚀 Live Demo

**Deployed on Vercel:** [https://your-app-name.vercel.app](https://your-app-name.vercel.app)

## 📁 Project Structure

```
├── index.html          # Main dashboard with live queue monitoring
├── registration.html   # Patient registration form
├── Queue.html         # Queue status and management panel
├── contact.html       # Contact and support page
├── style.css          # Comprehensive styling and responsive design
├── queue_val.js       # Core queue management logic
├── reg_val.js         # Registration form validation
├── cont_val.js        # Contact form validation
├── server.js          # Node.js server for deployment
├── vercel.json        # Vercel deployment configuration
└── package.json       # Project dependencies and scripts
```

## 🛠️ Local Development

### Prerequisites
- Node.js 18+ (for deployment server)
- Modern web browser
- Git

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/pqueue-management.git
   cd pqueue-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

### Alternative: Static File Server
For simple development, you can serve static files directly:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve .

# Using PHP
php -S localhost:8000
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `./`

### Deploy to Netlify

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Drag and drop the project folder to Netlify
   - Or connect your GitHub repository

### Deploy to GitHub Pages

1. **Enable GitHub Pages in repository settings**
2. **Set source to main branch**
3. **Access via:** `https://yourusername.github.io/pqueue-management`

## 📖 Usage Guide

### 1. **Patient Registration**
- Navigate to Registration page
- Fill in patient details (name, age, category)
- Select triage category (Normal or Emergency)
- Generate queue token

### 2. **Queue Management**
- Monitor live queue on Dashboard
- Use "Call Next Patient" to advance queue
- View detailed patient list on Queue page
- Emergency patients automatically prioritized

### 3. **System Monitoring**
- Real-time statistics on Dashboard
- Activity feed shows recent registrations
- System status indicators
- Mobile-friendly interface

## 🔧 Configuration

### Environment Variables
```bash
PORT=3000                    # Server port (default: 3000)
NODE_ENV=production         # Environment mode
```

### Customization
- **Colors:** Modify CSS variables in `style.css`
- **Branding:** Update logos and text in HTML files
- **Features:** Extend JavaScript functionality in validation files

## 🧪 Testing

### Manual Testing Checklist
- [ ] Register normal patient
- [ ] Register emergency patient
- [ ] Verify emergency prioritization
- [ ] Test "Call Next Patient" functionality
- [ ] Verify mobile responsiveness
- [ ] Test form validations
- [ ] Check localStorage persistence

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security & Privacy

- **Client-side only:** No sensitive data transmitted to servers
- **Local storage:** Patient data stored locally in browser
- **No tracking:** No analytics or tracking scripts
- **HTTPS ready:** Secure deployment on modern platforms

## 🚧 Known Limitations

- **Single-device:** No multi-device synchronization
- **Browser storage:** Limited by localStorage capacity (~5-10MB)
- **No backup:** Data lost if browser storage cleared
- **Concurrent access:** No multi-user conflict resolution

## 🛣️ Roadmap

- [ ] **Backend Integration:** REST API for multi-device sync
- [ ] **Real-time Updates:** WebSocket support for live updates
- [ ] **Advanced Analytics:** Queue performance metrics
- [ ] **Print Support:** Queue tickets and reports
- [ ] **Offline Mode:** Service Worker for offline functionality
- [ ] **Multi-language:** Internationalization support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yosef Melaku**
- Healthcare Queue Management Specialist
- Full-Stack Developer

## 🙏 Acknowledgments

- Healthcare professionals for workflow insights
- Open source community for inspiration
- Modern web standards for accessibility guidelines

## 📞 Support

For technical support or questions:
- Use the Contact page in the application
- Create an issue on GitHub
- Email: [your-email@example.com]

---

**Built with ❤️ for healthcare professionals worldwide**
