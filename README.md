# Todo List Project with React, TypeScript, and Vite .

## О проекте

Этот проект представляет собой список задач (to-do list), созданный с использованием React и Vite. Он предоставляет удобный интерфейс для управления товарами, их ценами и количеством. Также он включает в себя различные функции сортировки и уникальные методы обработки дублирующихся продуктов.

## Установка и запуск

**Чтобы запустить этот проект, выполните следующие шаги:**

- Склонируйте репозиторий или скачайте архив с проектом.
- В терминале перейдите в каталог проекта и установите все необходимые зависимости с помощью команды:

```js
npm install

```

- Запустите локальный сервер в терминале командой:

```js
npm run dev
```

- После запуска, нажмите на ссылку "local" в терминале, чтобы открыть проект в браузере.

## Основные возможности

- Добавление продукта: возможность добавления нового продукта с указанием названия, цены и количества.

- Сортировка:
  - По названию: щелчок по заголовку "Title" отсортирует список в алфавитном порядке.
  - По цене: щелчок по заголовку "Price" отсортирует список по возрастанию цены.
  - По количеству: щелчок по заголовку "Stock" отсортирует список по возрастанию количества.

- Уникальность продукта:
  - Если вы вводите название продукта, которое уже существует, появляется окно подтверждения (confirm).
  - Если вы соглашаетесь, то данные существующего продукта изменяются.
  - Если вы отказываетесь, то добавляется новый продукт с тем же названием, но с другим уникальным ID.

- Использование:
  - Для добавления нового продукта, заполните поля "title", "price", и "stock", затем нажмите кнопку "Create".
  - Чтобы удалить продукт или уменьшить его количество, используйте соответствующую кнопку на карточке продукта.

## Дополнительная информация

**При нулевом количестве всех продуктов выйдет надпись: Not products available.**

- Проект разработан с использованием React, TypeScript, и Vite.
- Для создания модальных окон используется Ant Design.
