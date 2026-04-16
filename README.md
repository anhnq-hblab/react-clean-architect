# 🏛️ React Clean Architecture + MVVM Base

A modern React base project implementing **Clean Architecture** with **MVVM Pattern**.

## 🚀 Tech Stack

- **Vite** - Fast build tool
- **React 18** - UI library
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Axios** - HTTP client

## 📁 Project Structure

```
src/
├── core/                    # 🏛️ DOMAIN LAYER (Business Logic)
│   ├── entities/           # Business models (User, etc.)
│   ├── usecases/           # Business rules (LoginUseCase, etc.)
│   └── repositories/       # Repository interfaces
│
├── data/                    # 📊 DATA LAYER
│   ├── repositories/       # Repository implementations
│   ├── datasources/        # API & local data sources
│   └── mappers/            # DTO ↔ Entity mappers
│
├── presentation/            # 🖼️ PRESENTATION LAYER (MVVM)
│   ├── pages/              # View components
│   ├── viewmodels/         # ViewModel hooks
│   ├── routes/             # Route configuration
│   ├── components/         # Reusable UI (atoms/molecules/organisms)
│   └── layouts/            # Layout components
│
├── infrastructure/          # ⚙️ INFRASTRUCTURE
│   ├── store/              # Redux store & slices
│   ├── i18n/               # Internationalization
│   └── config/             # App configuration
│
└── shared/                  # 🔧 SHARED UTILITIES
    ├── constants/
    ├── types/
    ├── utils/
    └── hooks/
```

## 🔄 Data Flow (MVVM)

```
View (Page) ──► ViewModel (Hook) ──► UseCase ──► Repository ──► DataSource ──► API
       ◄── state ──┘                    │
                                        ▼
                              Entity (Domain Model)
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build
npm run build
```

## 📝 Key Patterns

### UseCase (Domain Layer)
```typescript
// Business logic independent of framework
export class LoginUseCase {
  constructor(private authRepo: IAuthRepository) {}
  
  execute(email: string, password: string) {
    // validation & business rules
    return this.authRepo.login(email, password);
  }
}
```

### ViewModel (Presentation Layer)
```typescript
// Connects View with Domain
export const useLoginViewModel = () => {
  const loginUseCase = useMemo(() => new LoginUseCase(authRepository), []);
  
  const handleLogin = async () => {
    const { user } = await loginUseCase.execute(email, password);
    dispatch(setUser(user));
  };
  
  return { form, isLoading, error, handleLogin };
};
```

### View (Page Component)
```typescript
// Pure UI - all logic in ViewModel
export const LoginPage = () => {
  const { form, handleLogin } = useLoginViewModel();
  
  return <LoginForm {...form} onSubmit={handleLogin} />;
};
```

## 📜 License

MIT
