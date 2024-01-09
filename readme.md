## Студент

Демина Анастасия Викторовна РИ-310942

- Client Angular https://studentdiaryd.onrender.com/
- Server FastAPI https://2c2d3343-c262-4f72-99af-16ca0546bbc6-00-39iswdjpx6x14.sisko.replit.dev/

## Это -

Учебный проект с бэкендом на fast API и фронтендом на Angular.

Приложение представляет собой электронный дневник для выставления оценок и домашних заданий студентам от преподавателей.

Перед использованием необходимо создать аккаунт или войти под моими данными с предустановлленными предметами:

- email: test@mail.ru
- password: admin

Только что созданный аккаунт по умолчанию будет пустым. Вы можете заполнить его через интерактивную документацию Fast API по ссылке: 'http://127.0.0.1:8000/docs#/' (https://fastapi.strongfoxspirit.repl.co/docs) или через интерфейс.

## Основные используемые версии

- node js: v18.10
- python: v3.11

Рекумендуется придерживаться данных версий при запуске

## Подготовка к запуску локальных серверов

Перед локальным запуском необходимо установить требуемые зависимости и добавить интерпретатор python

`npm i` в директории 'frontend'

`pip install -r requirements.txt` в директории 'fastapi'

Зависимости для фронтенда и бэкенда перечислены в файлах package.json и requirements.txt соответственно

## Запуск локальных серверов

`ng s --open` в директории 'frontend' (флаг open, автоматически откроет вкладку в браузере)

`python .\main.py` в директории 'fastapi'
