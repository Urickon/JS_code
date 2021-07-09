/*
Докер решает проблему того, что разные приложения нужно запускать по разному. Докер позволяет хранить приложения и запускать их
используя единый интерфейс, что очень упрощает работу разработчика.

Docker image - это read-only шаблон. Он состоит из слоев. Каждый слой доступен лишь для чтения, все вместе они формируют такую сущность
как образ. Условно первый базовый слой - ubuntu. Добавим еще один слой - питончик. И так далее. Все слои readonly, то есть по сути
образ нельзя изменять.
Образы хранятся как локально, так и удаленно в Dockerhub.
При создании образа сначала ищется/скачивается базовый образ.
Алгоритм создания образа находится в Dockerfile. Каждая команда ADD, COPY, FROM, RUN в Dockerfile - новый слой в образе.
RUN - во время создания образа.
CMD - во время запуска контейнера.
ADD - копирует файлы и папки в контейнер, может распаковать архив, может скачать файл.
COPY - просто копирует файлы из локального контекста.

ENV - константы окружения, например url  каким-либо апишкам.
Они доступны во время работы контейнера.
Можно также задавать переменные окружения при запуске контейнера по флагу -e VAR=value

WORKDIR - рабочая папка для команд RUN и COPY.
VOLUME - создать том при запуске контейнера.
ARG - переменные, доступные только в режиме сборки (можно передать им значени еиз командной строки или установить значение по дефолту)

Контейнер (Docker container) - это запущеная копия образа докер. По сути контейнер - это виртуальная машина, внутри которой запускается приложение.
Внутри контейнера крутится операционка, как правило linux-семейства, внутри нее устанавливаются приложения, необходимые для работы.
На одном сервере можно запсукать несколько контейнеров - и в каждом из них будет своя среда, которую можно настроить.
В этом и есть фишка докера - "работает у меня - будет работать везде, где есть докер".
Контейнер изолирован и поэтому безопасен.
Контейнер можно перемещать, удалять, создавать, запускать и останавливать.
Контейнер по сути добавляет еще один слой к образу, в который уже можно записывать - называется это RW layer (read and write).
На основе одного образа можно запустить сколько угодно контейнеров.
Изначально контейнер полностью изолирован от других систем, чтобы заставить его общаться с внешним миром, исользуются порты.
Их можно прямо указать в Dockerfile (EXPOSE), давая докеру понять, что такой-то порт можно пробросить наружу.
Но это лишь декларация, что порт пробросить можно. Чтобы это сделать - надо указать при запуске контейнера -p 80:80.
Первый порт - на нашей машине - второй - на внутренней контейнера.

docker run (--name --rm -d -e -v)

Бэк и фронт можно запустить в разных контейнерах, а можно все приложения запускать в одном.
Для настроек взаимодействия между контейнерами используется утилита docker-compose.
docker-compose up - запускаем все контейнеры.
docker-compose down - остановит все контейнеры.
Docker-compose - утилита для быстрого развертывания сложных приложений, которые нужно запускать контейнеры.
Позволяет переносить проект на новый сервер в несколько операций. 

Можно указать для разных контейнеров разные порты, по которым можно обращаться к приложениям.

Хранение данных в Docker
Обычно данные хранятся только пока работает контейнер.
Привязать папку можно и при запуске docker run с опцией -v. Но этот способ е очень удобен.
Чтобы хранить их всегда, например как базу данных - используется volume. Volume - Это надстройка для обычной папки, которую можно
примонтировать к контейнеру. Они полностью самостятельны и отдельны от контейнеров, можно шифровать, можно даже разместить в облаке.
Привязать volume можно также при запуске контейнера.

docker volume (create, rm, ls...) - управление томами.

Хранение образов - Dockerhub. Docker login, docker push, docker pull.
*/
