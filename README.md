# Skill Up Platform (Front-End)

Next.js 기반 웹 프론트엔드 프로젝트 🚀

## 📌 기술 스택
- Framework: Next.js 14 (App Router)
- Language: TypeScript
- Linting: ESLint

## 📂 프로젝트 구조
```
📦public
 ┗ 📜favicon.ico

📦src
 ┣ 📂app
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜main.module.css
 ┃ ┗ 📜page.tsx
 ┣ 📂assets
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜loginImg.png
 ┃ ┃ ┗ 📜main_banner.jpg
 ┃ ┗ 📂svg
 ┃ ┃ ┣ 📜googleIcon.svg
 ┃ ┃ ┣ 📜kakaoIcon.svg
 ┃ ┃ ┣ 📜naverIcon.svg
 ┃ ┃ ┣ 📜skillUp_black.svg
 ┃ ┃ ┣ 📜skillUp_symbol_black.svg
 ┃ ┃ ┣ 📜skillUp_symbol_white.svg
 ┃ ┃ ┗ 📜skillUp_white.svg
 ┣ 📂components
 ┃ ┣ 📂club
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📂Footer
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┗ 📂Modal
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┣ 📂interest
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┣ 📂LoginContent
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┗ 📂SocialLoginButton
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┣ 📂mainVisual
 ┃ ┃ ┣ 📂IconMenu
 ┃ ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┃ ┗ 📜style.module.css
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜style.module.css
 ┃ ┣ 📂recommend-contents
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂recommend-event
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┗ 📜style.module.css
 ┣ 📂lib
 ┗ 📂styles
 ┃ ┗ 📜global.css
 
 ```

## 🚀 실행 방법
```bash
- 개발 서버로 확인 : npm run dev

- 빌드 후 최종 확인 : npm start