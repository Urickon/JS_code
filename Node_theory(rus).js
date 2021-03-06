/*Конспект книги NODE HERO*/

УРОК 1 ОСНОВЫ

/*Нода сочетает в себе очень производительный серверный код на JS, оснвоанный на
хромовском движке V8. Под капотом у нее библиотека на C под названием libuv
Стаблильные версии ноды начинаются с четных цифр, экспирементальные с нечетных. 
На момент написание этих строк крайняя версия - 15 экспирементальная.

Node.js - это платформа, как и браузер. Платформа, которая понимает JavaScript*/

package.json - главный файл проекта на ноде. 
node-modules - папка со всеми модулями проекта. Их там может быть очень много, более 100.
//Модули ноды - это колеса, которые уже изобрели до тебя.

/*В package.json содержатся основные данные, а также зависимости проекта и скрипты.
--save в dependences (нужные во время работы сайта)
-save-dev в devDependences (нужные только во время разработки)
Также базовые скрипты, такие как test, start, evry_script(любой ваш скрипт)
Запуск npm run evry_script*/

NPM-node package manager.
/*Есть глобальные пакеты, а есть именные(с локальной видимостью). Так получилось потому-что глобальных 
стало слишкоммного, имена начали повторятся. 
Теперь пактеы с локальной видимостью называются через имяпользователя.
@username/package

Глобально в проекте, разработанном на node, ее цель - подгружать необходимые для разработки проекты.*/
--------------------------------------------------------------------------------------------------------

УРОК 2 МОДУЛИ

/*Фактически модуль - это подключаемый файл.
Модули бывают разных типов. JS, JSON (для хранения данных) и Node(пока что нам не интересен).
require нужен для подключения различных модулей или файлов. 
Можно подключать папку через эту же команду. Нода сначала поищет файл с таким именем,
затме папку. Найдя ее, попытается открыть в ней файл index.js */

require ('./module');
let mod = require ('Module');

/* Модули нельзя называть именами системных модулей.
Внутри каждого модуля перменные локальные, Подключива модуль, просто так их не получится использовать. 
Зато таким образом они не перемешиваются друг с другом.
Можно поместить перменные, объявленные в модуле, в глобальный объект
(не рекомендуется так делать, так как при этом теряется всякий смысл модульной системы):*/

var x = 10;
function test () => {};
//Помещаем в глобальный объект:
global.number = x;
global.func = test;
//Далее они вызываются в других модулях как number и func.

//Вместо этого рекомендуется использовать объект exports в конце модуля.
exports.number = x;
exports.func = test;
//Используются они так:
let mod = require ('./mod');
mod.number;
mod.func;

//Объект модуля module содержит в себе множество свойств, в том числе exports. 
//К нему можно получить доступ через this
Либо module.exports = {
	variable : x,
	func : test
};
mod.func;
Свойство parent будет иметь значение, если модуль является подключаемым.

if (module.parent){
	module.exports = Ourfunction_constructor;
}
В данном случае мы можем вызвать Ourfunction_constructor:
let mod = require ('./mod');
let cn = new mod();
cn.connect();

/*Можно подгружать разные файлы, также методом require. Джейсоны сразу преобразуются в JS-объект.
В одном модуле можно изменять свойства объектов из дургих модулей, если он был подгружен ранее.*/
-------------------------------------------------------------------------------------------------------

Урок 3 ПОНИМАНИЕ АСИНХРОННОСТИ

/*Асинхронность в JS - одновременное выполнение не зависящих друг от друга задач.
Вместо блока "try catch" в Node используется коллбэк, где первым аргументом всегда идет ошибка. */

const fs = require('fs')
console.log('start reading a file...')
fs.readFile('file.md', 'utf-8', function (err, content) {
    if (err) {
        console.log('error happened during reading the file')
        return console.log(err)
    }

    console.log(content)
})

console.log('end of the file')
/*В этом примере сначала выполнится console.log('end of the file'), а лишь потом вылетит ошибка.
Так произойдет, потмоу что event loop.*/

/*event loop - это цикл событий. Более подробно про это можно почитать в асинхронности JS. 
В Ноде используется async/await и promises для упрощения организации асинхронности.*/

/*Улучшение кода на ноде для избегания callback hell и отлова ошибок:

1. Don't nest functions. Give them names and place them at the top level of your program.

2. Use function hoisting to your advantage to move functions 'below the fold'.

3. Handle every single error in every one of your callbacks. 
Use a linter like standard to help you with this.

4. Create reusable functions and place them in a module to reduce the cognitive load 
required to understand your code. 
Splitting your code into small pieces like this also helps you handle errors, 
write tests, forces you to create a stable and documented public 
API for your code, and helps with refactoring.*/

-------------------------------------------------------------------------------------------------------































