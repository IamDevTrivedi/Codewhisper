# CodeWhisper

CodeWhisper is a collaborative coding platform that allows developers to write, share, and collaborate on code in real-time. With support for multiple programming languages and a robust feature set, CodeWhisper provides a seamless environment for both individual developers and teams.

## 🌐 Live Demo

Live at: [https://codewhisper.vercel.app/](https://codewhisper.vercel.app/)


## ✨ Features

1. **Custom User Authentication & Private Routing**

   - Implement a custom user authentication system.
   - Secure routes so that only authenticated users can access specific pages.

2. **Editor Demo**

   - A single-file editor mode that does not require login.
   - Designed to give users a real-time, hassle-free editing experience without saving.

3. **Full-Featured Code Editor**

   - **Multi-Language Support**
     - Supports various programming languages.
     - Provides proper code formatting.
   - **File Management**
     - Files are saved into the user’s account.
     - Accessible from anywhere once the user is logged in.
   - **Usable Features**
     - Delete, rename, download, and upload files.
     - Upload input and run code within the editor.
   - **Convenient Features**
     - Drag-and-drop functionality for uploading files.

4. **Collaborative Code Room (Extra Feature)**

   - Allows users to create or join a collaborative coding room using a room ID.
   - **Real-Time Collaboration**
     - Multiple users can work on the same file concurrently.
     - Includes features like upload, download, and run code for collaborative work.

5. **AI Assistant**
   - Integrates Gemini’s model for code assistance.
   - **Output Handling**
     - Parses Gemini’s Markdown output into HTML and is styled with TailwindCSS to enhance the user experience.


## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- MongoDB (for database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/IamDevTrivedi/WoC_React_202301150.git
```

2. install the Dependency from the Root Directory:

```bash
npm run init
```

3. Configure environment variables:

  - Rename `.env.example` to `.env` in both client and server directories
  - Update the values in the `.env` files with your actual configuration

4. Start the application from the Root Directory:

```bash
npm start
```

## 🛠️ Technology Stack

### Frontend

- React
- Three.js for 3D visualizations
- Monaco Editor for code editing
- Socket.IO for real-time features
- UI Libraries:
  - Acernity UI
  - shadCN
  - Ant Design
  - Material UI
  - Framer Motion
- Additional packages:
  - @react-three/fiber & drei
  - React Router
  - Axios
  - Tailwind CSS

### Backend

- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time communication
- JWT for authentication
- Additional features:

  - Nodemailer for email services
  - bcryptjs for encryption
  - CORS support
  - Cookie parsing

## 👤 Contact & Support

- **Created by**: [@IamDevTrivedi](https://github.com/IamDevTrivedi)
- **LinkedIn**: [Dev Trivedi](https://www.linkedin.com/in/contact-devtrivedi/)
- **GitHub**: [@IamDevTrivedi](https://github.com/IamDevTrivedi)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Made with ❤️ by Dev Trivedi