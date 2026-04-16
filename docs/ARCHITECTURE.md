# React Clean Architecture + MVVM - Walkthrough

## 📁 Cấu trúc đầy đủ

```
src/
├── core/                              # Domain Layer
│   ├── entities/User.ts              
│   ├── repositories/IAuthRepository   
│   └── usecases/auth/                
│
├── data/                              # Data Layer  
│   ├── datasources/
│   │   ├── remote/api/               # Axios client
│   │   └── local/                    # LocalDataSource ✅
│   ├── repositories/AuthRepository   
│   └── mappers/UserMapper            
│
├── presentation/                      # Presentation Layer
│   ├── components/
│   │   ├── atoms/                    # Button, Input ✅
│   │   ├── molecules/                # FormField ✅
│   │   └── organisms/                # Sidebar ✅
│   ├── layouts/                      # MainLayout ✅
│   ├── viewmodels/auth/              
│   ├── pages/                        
│   └── routes/                       
│
├── infrastructure/                    # Infrastructure
│   ├── store/                        
│   ├── config/                       # App config ✅
│   ├── i18n/                         # EN/VI locales ✅
│   └── theme/                        # Theme tokens ✅
│
└── shared/                           # Shared
    ├── constants/                    # Routes, keys ✅
    ├── types/                        # Common types ✅
    ├── hooks/                        # useToggle, useModal, etc ✅
    └── utils/tokenStorage.ts
```

---

## 🚀 Chạy project

```bash
cd /Users/anhnq/projects/swipe/1571_fe/react-clean-base
npm run dev
```

---

## 🔄 GraphQL Support

Project hỗ trợ cả **REST API** và **GraphQL**. Switch qua env:

```env
# .env
VITE_USE_GRAPHQL=true     # Enable GraphQL
VITE_GRAPHQL_URL=http://localhost:3000/graphql
```

**Cấu trúc GraphQL:**
```
data/datasources/remote/graphql/
├── graphqlClient.ts       # Apollo Client config
├── queries/auth.queries.ts
├── mutations/auth.mutations.ts
└── AuthGraphQLDataSource.ts
```

---

## ✓ Verified

- ✅ Build production thành công
- ✅ REST + GraphQL dual support
- ✅ TypeScript compile không lỗi
