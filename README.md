# movies-explorer-api

API для дипломного проекта

Доступно по ссылке: https://api.kostinpract.nomoreparties.sbs/

### Возвращает информацию о пользователе (email и имя)
GET /users/me

### Обновляет информацию о пользователе (email и имя)
PATCH /users/me

### Возвращает все сохранённые текущим пользователем фильмы
GET /movies

### Создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId
POST /movies

### Удаляет сохранённый фильм по id
DELETE /movies/_id

### Создаёт пользователя с переданными в теле email, password и name
POST /signup

### Проверяет переданные в теле почту и пароль и возвращает JWT
POST /signin
