# Course Registration System

Интерактивная форма регистрации на курс с валидацией данных. Проект включает frontend (React + Vite) и backend (Django REST Framework).

## Описание

Приложение позволяет пользователям регистрироваться на курсы через веб-форму. Включает клиентскую и серверную валидацию, обработку ошибок и адаптивный дизайн.

### Функционал
- Форма с полями: ФИО, Email, Телефон, Выбор курса
- Валидация на клиенте и сервере
- Визуальная обратная связь (ошибки, успех)
- Loader при отправке
- Адаптивная верстка (desktop + mobile)
- API для курсов и регистраций

## Требования

- Python 3.8+
- Node.js 16+
- Django 5.2+
- React 18+

## Установка и запуск

### Backend (Django)

1. Перейдите в папку backend:
   ```
   cd backend
   ```

2. Установите зависимости:
   ```
   pip install -r requirements.txt
   ```

3. Примените миграции:
   ```
   python manage.py migrate
   ```

4. Запустите сервер:
   ```
   python manage.py runserver
   ```
   Сервер будет доступен на `http://127.0.0.1:8000`

### Frontend (React + Vite)

1. Перейдите в папку frontend/courses:
   ```
   cd frontend/courses
   ```

2. Установите зависимости:
   ```
   npm install
   ```

3. Запустите dev-сервер:
   ```
   npm run dev
   ```
   Приложение будет доступно на `http://localhost:5173`

## API Endpoints

- `GET /api/courses/` - Получить список курсов
- `POST /api/registrations/` - Создать регистрацию

## Структура проекта

```
course-registration/
├── backend/          # Django backend
│   ├── config/       # Настройки Django
│   ├── registrations/# Приложение для регистраций
│   └── ...
├── frontend/         # React frontend
│   └── courses/      # Vite проект
└── README.md         # Этот файл
```



