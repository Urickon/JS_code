/*
Docker image - это read-only шаблон. Он состоит из слоев. Каждый слой доступен лишь для чтения, все вместе они формируют такую сущность как образ.

Контейнер (Docker container) - это запущеная копия образа докер. По сути контейнер - это виртуальная машина, внутри которой запускается приложение.
Внутри контейнера крутится операционка, как правило linux-семейства, внутри нее устанавливаются приложения, необходимые для работы.
На одном сервере можно запсукать несколько контейнеров - и в каждом из них будет своя среда, которую можно настроить.
В этом и есть фишка докера - "работает у меня - будет работать везде, где есть докер".
Контейнер изолирован и поэтому безопасен.
Контейнер можно перемещать, удалять, создавать, запускать и останавливать.
Контейнер по сути добавляет еще один слой к образу, в который уже можно записывать - называется это RW layer.

Бэк и фронт можно запустить в разных контейнерах, а можно все приложения запускать в одном.
Для настроек взаимодействия между контейнерами используется утилита docker-compose.

Можно указать для разных контейнеров разные порты, по которым можно обращаться к приложениям.
*/
