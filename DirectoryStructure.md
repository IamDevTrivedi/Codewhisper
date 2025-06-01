# Directory Structure


```
Directory structure:
└── iamdevtrivedi-woc_react_202301150/
    ├── README.md
    ├── Directory structure.md
    ├── LICENSE.md
    ├── bug.txt
    ├── package.json
    ├── client/
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── tailwind.config.js
    │   ├── .env.example
    │   ├── .gitignore
    │   ├── public/
    │   │   ├── _redirects
    │   │   ├── index.html
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src/
    │       ├── App.js
    │       ├── App.test.js
    │       ├── index.css
    │       ├── index.js
    │       ├── setupTests.js
    │       ├── Constants/
    │       │   ├── availableFontSize.js
    │       │   ├── globe.json
    │       │   ├── languages.js
    │       │   ├── themeNames.js
    │       │   └── monaco-themes-master/
    │       │       ├── Active4D.json
    │       │       ├── All Hallows Eve.json
    │       │       ├── Amy.json
    │       │       ├── Birds of Paradise.json
    │       │       ├── Blackboard.json
    │       │       ├── Brilliance Black.json
    │       │       ├── Brilliance Dull.json
    │       │       ├── Chrome DevTools.json
    │       │       ├── Clouds Midnight.json
    │       │       ├── Clouds.json
    │       │       ├── Cobalt.json
    │       │       ├── Cobalt2.json
    │       │       ├── Dawn.json
    │       │       ├── Dominion Day.json
    │       │       ├── Dracula.json
    │       │       ├── Dreamweaver.json
    │       │       ├── Eiffel.json
    │       │       ├── Espresso Libre.json
    │       │       ├── GitHub Dark.json
    │       │       ├── GitHub Light.json
    │       │       ├── GitHub.json
    │       │       ├── IDLE.json
    │       │       ├── Katzenmilch.json
    │       │       ├── Kuroir Theme.json
    │       │       ├── LAZY.json
    │       │       ├── MagicWB (Amiga).json
    │       │       ├── Merbivore Soft.json
    │       │       ├── Merbivore.json
    │       │       ├── Monokai Bright.json
    │       │       ├── Monokai.json
    │       │       ├── Night Owl.json
    │       │       ├── Nord.json
    │       │       ├── Oceanic Next.json
    │       │       ├── Pastels on Dark.json
    │       │       ├── Slush and Poppies.json
    │       │       ├── Solarized-dark.json
    │       │       ├── Solarized-light.json
    │       │       ├── SpaceCadet.json
    │       │       ├── Sunburst.json
    │       │       ├── Textmate (Mac Classic).json
    │       │       ├── Tomorrow-Night-Blue.json
    │       │       ├── Tomorrow-Night-Bright.json
    │       │       ├── Tomorrow-Night-Eighties.json
    │       │       ├── Tomorrow-Night.json
    │       │       ├── Tomorrow.json
    │       │       ├── Twilight.json
    │       │       ├── Upstream Sunburst.json
    │       │       ├── Vibrant Ink.json
    │       │       ├── Xcode_default.json
    │       │       ├── Zenburnesque.json
    │       │       ├── iPlastic.json
    │       │       ├── idleFingers.json
    │       │       ├── krTheme.json
    │       │       ├── monoindustrial.json
    │       │       └── themelist.json
    │       ├── Context/
    │       │   ├── AppContext.js
    │       │   ├── EditorContext.js
    │       │   └── EditorTryContext.js
    │       ├── components/
    │       │   ├── AnimatedPin.js
    │       │   ├── BackgroundLinesUse.js
    │       │   ├── ChatHeader.js
    │       │   ├── ChatInput.js
    │       │   ├── ChatMessage.js
    │       │   ├── CodeBlockForHome.js
    │       │   ├── CodeEditorForDemo.js
    │       │   ├── CodeEditorForMain.js
    │       │   ├── EditorNav.js
    │       │   ├── EditorSidebar.js
    │       │   ├── EditorSidebarForDemo.js
    │       │   ├── FeaturesSectionForHome.js
    │       │   ├── Footer.js
    │       │   ├── GitGlobe.js
    │       │   ├── HeroHighlightUse.js
    │       │   ├── Loading.js
    │       │   ├── LoadingDots.js
    │       │   ├── MacbookScrollUse.js
    │       │   ├── MarkdownMessage.js
    │       │   ├── NavBarHome.js
    │       │   └── ui/
    │       │       ├── 3d-pin.jsx
    │       │       ├── background-lines.jsx
    │       │       ├── button.jsx
    │       │       ├── code-block.jsx
    │       │       ├── globe.jsx
    │       │       ├── hero-highlight.jsx
    │       │       ├── hover-border-gradient.jsx
    │       │       ├── input.jsx
    │       │       ├── label.jsx
    │       │       ├── macbook-scroll.jsx
    │       │       ├── navbar-menu.jsx
    │       │       └── sticky-scroll-reveal.jsx
    │       ├── lib/
    │       │   └── utils.js
    │       └── pages/
    │           ├── About.js
    │           ├── AuroraChat.js
    │           ├── CodeRoom.js
    │           ├── Contact.js
    │           ├── CreateRoom.js
    │           ├── Editor.js
    │           ├── EditorDemo.js
    │           ├── ForgotPassword.js
    │           ├── Home.js
    │           ├── JoinRoom.js
    │           ├── Login.js
    │           ├── NotFound.js
    │           ├── Privacy.js
    │           ├── Room.js
    │           ├── SignUp.js
    │           └── VerifyEmail.js
    └── server/
        ├── index.js
        ├── package-lock.json
        ├── package.json
        ├── .env.example
        ├── Constants/
        │   └── languages.js
        ├── config/
        │   ├── db.config.js
        │   └── nodemailer.config.js
        ├── controllers/
        │   ├── auth.controller.js
        │   ├── gemini.controller.js
        │   ├── health.controller.js
        │   ├── room.controller.js
        │   └── user.controller.js
        ├── lib/
        │   ├── logger.lib.js
        │   ├── otp.lib.js
        │   ├── templates.lib.js
        │   ├── token.lib.js
        │   └── validators.lib.js
        ├── middlewares/
        │   └── auth.middleware.js
        ├── models/
        │   ├── code.model.js
        │   ├── file.model.js
        │   ├── room.model.js
        │   └── user.model.js
        ├── routes/
        │   ├── auth.router.js
        │   ├── gemini.router.js
        │   ├── heath.router.js
        │   ├── room.router.js
        │   └── user.router.js
        └── sockets/
            └── codeRoom.socket.js

```
