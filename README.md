# KNUckle Frontend

공주대의 모든 것을 알려주는 LLM, KNUckle의 프론트엔드 레포지토리입니다.

## 기술 스택

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form**: React Hook Form
- **Authentication**: NextAuth.js
- **Database**: MongoDB (via Mongoose)

## 기능

- 💬 **AI 채팅**: 질문을 하면 AI가 답변을 해주는 채팅 기능
- 認証 **사용자 인증**: GitHub OAuth를 통한 사용자 인증
- 📚 **대화 라이브러리**: 이전 대화 내용을 확인하고 이어갈 수 있는 기능
- 🔍 **검색**: 대화 내용 검색 기능

## 시작하기

### 1. 레포지토리 클론

```bash
git clone https://github.com/your-username/knuckle-frontend.git
cd knuckle-frontend
```

### 2. 의존성 설치

pnpm을 사용하여 의존성을 설치합니다.

```bash
pnpm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 아래 내용을 채워주세요.

```
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# NextAuth.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# AI Server URL
AI_SERVER_URL=http://localhost:8000
```

### 4. 개발 서버 실행

```bash
pnpm dev
```

이제 브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 KNUckle을 사용할 수 있습니다.

## 스크립트

- `pnpm dev`: 개발 서버를 실행합니다.
- `pnpm build`: 프로덕션 빌드를 생성합니다.
- `pnpm start`: 프로덕션 서버를 실행합니다.
- `pnpm lint`: ESLint를 사용하여 코드 스타일을 검사합니다.