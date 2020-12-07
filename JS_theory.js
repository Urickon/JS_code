
<----------------КОНСПЕКТЫ ПО JAVASCRIPT()----------------->

=====================================================================================================
КОНЦЕПЦИЯ ООП (BASICS)

//Принципы:

Абстракция 
/*Это отделение концепции от ее экземпляра. 
Это использование только необходимых характеристик объекта, без потери его основных свойств. 
Абстракция данных - это предоставление миру только необходимых данных, и скрытие фоновой информации.*/

Полиморфизм 
/*Это реализация задач одной и той же идеи разными способами. 
Один и тот же код может работать с разными типами данных. 
Обобщенное программирование - код, который можно применять к разным типам данных, 
не меняя его при этом. Есть языки программирования с разными типизациями.
Языки в целом бывают типизированные (Python, C, JS, Java) и нетипизированные (ассемблер)

Типизированные делятся на несколько пересекающихся категорий.
Тип типизации - на статическую типизацию, где конечные типы устанавливаются уже на 
этапе компиляции(C, C#, Java) и динамическую типизацию (JS, Python). 

Сильная/слабая - сильная не позволяет смешивать данные в одной операции, 
например вычитать из строки число (Java, Python) и слабая допускает операции 
с разными данными (C, JS).

Явная или неявная. Явная при объявлении переменной требует указывать ее тип (C++, C#), 
неявная перекладывает задачу определения типа на компилятор (JS, PHP).*/

Наследование
/*Это способность объекта или класса базироваться на другом объекте или классе. 
Это главный механизм для повторного использования кода. Наследственное отношение классов 
четко определяет их иерархию. Принято называть абстрактные прототипы классами.
Базовый класс - объект, находящийся на вершине иерархии.*/

Инкапсуляция 
/*Это размещение одного объекта или класса внутри другого для разграничения доступа к ним. 
Это ограждение какого-либо кода для ограничения доступа к нему и предотвращения его влияния
на другой код.
Пользователю предоставляется лишь интерфейс для взаимодействия с объектом. Сам же объект
он менять не может. К примеру, в JS:*/

function User (name) { //функция-конструктор объекта
    this.name = name;
    var _age = 1; //вместо того, чтобы задавать свойство, мы вводим локальную переменную
    this.displayInfo = function(){
        console.log("Имя: " + this.name + "; возраст: " + _age);
    };
    this.getAge = function() { //это Геттер. Вызвав его, можно получить переменную.
        return _age;
    }
    this.setAge = function(age) { //это сеттер, с помощью его можно менять значение _age
        if(typeof age === "number" && age >0 && age<110){ //вводим условия
            _age = age;
        } else {
            console.log("Недопустимое значение");
        }
    }
}

/*Смысл этого извращения в том, что мы имеем больший контроль над свойством _age.
Мы можем выставлять любые условия для его изменения (setAge).
В этом и есть основной смысл инкапсуляции. */

=====================================================================================================
ОСНОВЫ JS

Типы данных

Преобразование данных

Переменные let, var, const
/*let, const - это переменные локальные, только для функции или цикла. 
var существует и до объявления(во всем коде). Но ее значение до объявления будет undefined. 
let существует только после объявления. 
var влияет на всю область видимости (либо весь код, либо функция). 
let объявленая в функции видна только в функции(а также внутри внутренних элементов функции). 
var в функции влияет на вар глобально.

Var, объявленная в глобальной области видимости, записывается в свойства window*/

let, var и const в циклах. 
/*Var - видима из любого участка кода. Но опредлена лишь после своего определения. 
Для цикла var одна, она просто меняется для каждой итерации. 

Let живет только в квадратных скобках, в которых была определена. 
Для каждой итеарции она своя, глобально при этом ее вообще нет. 
Это легко решает проблему замыкания функций в циклах 
(в каждом цикле у каждой функции будет своя переменная). 
С var так не получится, так как в итоге она будет общей для всех итераций. 
Const ведет себя так же как let в цикле.*/

Циклы
=====================================================================================================

ФУНКЦИИ

функция-генератор
/*function* - это функция-генератор. 
Она может прерваться во время выполнения и возвратить промежуточный результат,
а потом в произвольный момент времени продолжать свое выполнение.

При запуске такой функции самой по себе, ее код не выполняется, 
вместо этого она возвращает генератор.

Генератор - это объект особого типа. Это замороженный вызов функции.*/

.next()
/*Основной метод работы с ним это .next(). Он возвращает JSON, 
где первое поле - значение, второе булеан, который определяет, завершена ли функция. 
В метод next() можно также передавать значения, они попадут обратно в генератор на следующий вызов. 
Так можно взаимодействовать с генератором.

Если функция дошла до конца (последнее значение return), 
то все следующие запуски будут возвращать значения done: true. 
Он начинает, либо продолжает выполнение генератора до следующего ключевого слова yield. 
То есть с ней нужно работать так:*/

function* generator () => { //объявление функции
    yield 1;
    yield 2;
    return 3;
}
let generate = generator(); //возвращаем генератор и присваиваем его в переменную

let first = generate.next(); //присвоит first значение JSON, где 
//{value: значение из yield, done: false/true} Иными словами:

console.log(JSON.stringify(first)); // {value: 1, done: false}

//Часто его используют как итератор. 

function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}

let generator = generateSequence();

for(let value of generator) {
    alert(value); }
// 1, затем 2, а 3 не выведется, так как циклы не работают с return(done: true), 
//вместо этого для корректного отображения нужно указать три поля yield.


Композиция генераторов
//Композиция генераторов это по сути заключение одного генератора в другой. 
//При каждом вызове внешнего
//генератора будут выполняться все действия внутреннего.
;
function* generateSecuence (start, end) { //генератор для вставки внутрь
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function* generateSomeNums () { //Внешний генератор
    yield* generateSecuence(1, 5)
    yield* generateSecuence(7, 10)
}

//Если пробежаться по внешнему генератору циклом и составить из результатов строку,
//то мы получим:

let str = ''
let generator = generateSomeNums()
for (let value of generator) {
    str += value
}
//str = '1234578910'


/*Взаимодействие с генератором.
Получаем из генератора запрос, образно говоря,
взаимодействуем с ним, выполняем любые асинхронные операции, а потом
передаем результат обартно в генератор и продолжаем его выполнение.*/

function *gena () {
    let surname = 'Smith'
    let result = yield "name" //Нам нужно значение name 
    let fullname = name + surname
    alert (fullname)
}

let generator = gena()
let query = generator.next().value //получаем запрос "name", генератор стоит
//Some code, ищем name
generator.next('John') //передаем в генератор значение и продолжаем его выполнение
//Функция генератор завершит выполнение с полученными данными.

/*Чаще всего генераторы используются в т.н. плоском асинхронном коде. 
В этом случае генератор yield'ит промисы.
Когда промис выполняется, то специальная функция. работающая с генератором, снова
запускает его, передавая в next() значение выполненного промиса.
Это называется библиотек co*/

---------------------------------

=====================================================================================================
АСИНХРОННОСТЬ

асинхронность в JS
/*JS это однопотчный яп. Однопоточный значит - имеет один стэк вызовов.
Синхронность - означает, что пока выполняется первая строка, вторая не будет выполнена. 
В одну единиц времени может быть выполнено лишь какое-то одно действие.*/

/*Есть данные, которые изначально содержаться в JS в формате кучи (heap). 
При синхронном выполнении JS закидывается в стек, выполняется, достается оттуда 
и только потом туда закидывается следующая строка(команда).
При выполнении функции в функции (например, рекурсия), 
стек вызовов наполняется ими, пока не дойдет до последней вложенной. 
Далее все начинает раскурчиваться обратно. Выполняется самое верхнее действие в стеке. 
Максимальный объем действие в стеке - 16 тысяч. Если лимит превышен - то движок JS V8 очищает его.

Асинхронность - первая строка запускается в фоновом режиме, позволяя второй не дожидаться ее окончания. 
Если бы не было асинхронности, то сайты бы зависали, ожидая выполнения какой-либо команды, 
и не работал бы никакой функционал.

Самый наглядный пример на JS это setTimeout()*/

console.log(1)
setTimeout(() => {
	console.log(2)
}, 2000)
console.log(3)

/*Выведет 1,3,2. setTimeout попадая в стек вызовов, уходит из него невыполненным, уступая место 3. 
А затем возвращается обратно (через 2 секунды) и выполняется. 
Куда ходил таймер? 
Тут вступают в игру Web Api и Event Loop.*/

Event loop
/*Когда setTimeout попадает в очередь запросов, он не выполняется, а перемещается оттуда в Web API. 
Там он ожидает указанное время. В это время стек пустой, и туда попадют другие строки кода. 
По прошествии 2 секунд он должен отправиться в стек. 
Но у Web API нет права закидывать что-либо напрямую в стек, так что он отправит setTimeout 
в очередь задач (Task queue или callback queue). 
Event Loop (цикл событий) добавляет первое событие в списке в стек, когда стек пустой. 
У нас одно событие, так что оно сразу попадет в стек и выполнится. 
Благодаря этому события из Task queue попадают в стек вызовыв по очереди.*/

setTimeout
/*Кстати говоря, setTimeout гарантирует лишь минимальную задержку, так как когда он попадет в 
Event loop, стек вызовов может быть переполнен.*/

Render queue
/*Помимо этого, есть Render queue (обновление экрана, опять же работает лишь когда стек вызовов пустой).
Каждые 16 мс, или 60 раз в секунду, он при наличии пустого стека вызовов обновляет экран. 
Render queue имеет приоритет над Task queue, так что Event loop всегда будет давать им 
просочиться между событиями из Task queue. 
Таким образом, асинхронные действия, приходящие из Task queue, не будут мешать странице обновляться. 
Из этого следует, что все сложные анимации и затратные операции не стоит делать синхронными, 
иначе они будут вызывать фризы экрана.*/

Event listeners
/*События при нажатии кнопки, слушатели событий - все находятся в Web API, 
они попадают туда сразу же при создании подобного события. оттуда они уже попадают в Task queue 
и выполняются при налчии свободного стека вызовов.*/

/*Pyramid of Doom или CallBack Hell - это огромное количество колл-бэков, включенных друг в друга. 
Чтобы такого не было, есть промисы(см. далее).*/

async () и await функции.
/*Это синтаксический сахар для удобства. Можно и на промисах то же самое делать.

Async перед функцией означает, что она вернет промис. 
Промис с результатом, который мы передаем в ретурн. 
Фактически с тем же успехом можно вернуть функцией промис return new Promise. 
Await используется ТОЛЬКО внутри Async (возвращающих промис) функций. 
По факту это эквивалент метода промисов then. 
Он также не мешает коду выполняться дальше, ожидая заврешения промиса. 
Если есть желание использовать await на верхнем уровне вложенности, 
то достаточно просто обернуть ее в анонимную стрелочную async функцию.
Пример:*/

(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();

/*Если промис, которого ждет await закончится с ошибкой (reject), то автоматически 
будет выброшено исключение, как при throw. 
Его можно отлавливать через блок try-catch. 
Блоком try можно охватить неограниченное количество промисов, и все ошибки отловит catch.*/

.then == await promise //это одно и тоже

async function f() {
	let promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('Ready!')
		}, 1000);
	});
	let result = await promise; //ждет выполнения промиса
	console.log(result)	//не выполнится, пока не завершится предыдущая строка
}

f()
console.log('Are you ready?') //выполнится первым, так как функция асинхронна.


/*Обычные итераторы не работают с асинхронными командами. 
Они не будут ждать, когда выполнится функция или промис, так что если нам нужен 
результат предыдущей итерации для рассчета новой, например при использовании forEach, 
то получится ошибка. Для асинхронных операций сработает:*/

for (item of someArray) {
 await foo();
}

//Либо через специальные библиотеки.

--------------------------------

Промисы (Promise)

/*Promises упрощают асинхронность. Собственно внутри него пишется асинхронный код. 
Промис нужен, чтобы соединить создающий и потребляющий участки кода. 
Чтобы не посылать бесконечно запросы, а дождаться выполнения и сразу же запустить другой код, 
который зависит от данных первого. При этом промис не мешает запуститься остальной части кода, 
которая не зависит от него. Также плюс промисов в том, что они могут отлавливать ошибки.
Итак, еще раз, они - просто удобная форма для записи асинхронности. 
Можно создавать цепочку промисов при помощи chaining, просто возваращая в then новый промис.*/

console.log('Requesting data...')
const p = new Promise((resolve, reject) => {
    setTimeout(() => {    //происходит асинхронная операция внутри промиса
        console.log('Preparing data...')
        const backendData = {
            server: 'aws',
            status: 'working'
        }
        resolve(backendData) //выполняет промис и передает дальше данные
    }, 2000)
})

p.then((data) => { //then запускает коллбэк после выполнения промиса с переданными данными
    return new Promise((resolve, reject) => { //возвращает новый промис из метода then
        console.log('Modifying data...')
        setTimeout(() => {    //происходит асинхронная операция внутри промиса
            data.modified = true;
            resolve(data) //передает изменные даные
        }, 2000)
    })

})  
    .then((modifiedData) => { //этот then уже от вложенного промиса
        console.log('Data received...', modifiedData)
    })
    .catch((err) => {
        console.error('Error: ', err) //в случает reject у прошлого промиса выведет ошибку
    })
    .finally(() => {
        console.log('Finish!') //выполнится в любом случае
    })


/*Использование промисов в функциях. Они запускаются одновременно, но заканчивают действие 
в разное время. Обе функции выполняются асинхронно, т.е. одновременно. 
С этими функциями можно работать методами промисов, так как они возвращают промис.*/

const sleep = (ms) => { //функция возвращает промис
    return new Promise (resolve => {
        setTimeout(() => {
            resolve();
        }, ms) //таймер сработает через ms секунд
    })
}

//теперь можно вызывать эти функции и они будут выполняться асинхронно.
sleep(2000).then(() => {
    console.log('after 2 seconds') //работаем методами промиса
})


Методы промисов
/*К ним относятся уже перечисленные выше .then, .catch, .finally
Еще два важных метода промисов это .all и .race. Например:*/

Promise.all([Promise1, Promise2]).then(() => {
    console.log('Это сработает лишь тогда, когда выполнятся и Promise1 и Promise2');
})

/*Они работают с массивами промисов и выполняются либо когда все промисы 
(или функции, возвращающие промис) выполнены, либо когда хотя бы одна из них (race)*/

=====================================================================================================
СОБЫТИЯ, ОБРАБОТКА СОБЫТИЙ
=====================================================================================================





=====================================================================================================

КЛАССЫ

=====================================================================================================

МАССИВЫ И ИХ МЕТОДЫ

=====================================================================================================

ОБЪЕКТЫ И ИХ МЕТОДЫ, this

/*Чтобы прототип не потерялся, нельзя задавать его целиком, необходимо лишь вписывать в 
него определенное свойство.*/
Object.prototype = {
    someFunc: function()
}
//Нужно писать так:
Object.prototype.someFunc: function()


Цикл for (let value in obj)
/*Не делает различия между объектом и его прототипом, проходится по всем свойствам (properties).
Для того, чтобы этого избежать есть метод*/
object.hasOwnProperty('property')

for (let value in obj) {
    if (obj.hasOwnProperty('property')) {
        //some code
    }
}

--------------------------------

Object.create()
/*Создание объекта через Object.create(prototype) обладает рядом особенностей.
В данном случае мы задаем свойства объекта как объекты (через property descriptors).
По умолчанию они false.
Прототипом в этом случае выступает пустой объект.*/

Object.create({}, {
    name: {
        value: 'Yury',
        enumerable: true, //определяет можно ли пробегать по нему циклу
        writable: true, //определяет можно ли изменять свойство
        configurable: true //определяет, можно ли удалять свойство
    },

    age: {
        ...
    }
})


Дескрипторы свойств
//Получить дескриптор можно при помощи
Object.getOwnPropertyDescriptor(object, propertyName)
//Возвращает объект-дескриптор свойства
{value: x, enumerable: false, ...}
//Изменить дескриптор свойства можно след. образом
Object.defineProperty(object, 'propertyName', {
    writable: false
})
//Определить сразу несколько свойств
Object.defineProperties(obj, { //obj - новый или старый объект, которому определяют свойства.
    propX: {value: 'x', writable: true},
    ...
})

//Также все это можно настраивать глобально для всех свойств объекта.
Object.preventExtensions(obj) //Запрещает добавлять новые свойства
Object.seal(obj) //Запрещает добавлять/удалять свойства.
//Устанавливает configurable: false для всех существующих свойств.
Object.freeze(obj) //Запрещает добавлять, изменять, удалять новые свойства.


/*В целом свойства объекта бывают двух типов. Это
свойства-данные (data properities),
свойства-аксессоры (acsessor properities)*/

Геттер и сеттер
/*Свойства аксессоры - это геттер и сеттер.
По сути это просто куски кода, которые выполняют всю работу за кулисами.
Но при этом обращаться к ним можно как к обычным свойствам объекта JS. 
Причем, сеттер может выполнять практически любые функции, не только внутри объекта.
Пример:*/

let user = {
    name: 'Yury',
    surname: 'Korotovskikh',
    get fullName () {
        return `Full name is ${this.name}, ${this.surname}` //Возвращает что-либо
    },
    set fullName (value) {
        document.body.style.background = 'red' //Можно творить любую дичь
        [this.name, this.surname] = value.split(' ')//Изменять свойства объекта через this
    }
}

//Другой вариант записи геттера/сеттера, в этом случае вызывается по-другому.

let user = {
    name: 'Yury',
    surname: 'Korotovskikh',
    fullName: {
        get () {
            return `Full name is ${this.name}, ${this.surname}`
        },
        set (value) {
            document.body.style.background = 'red'
            [this.name, this.surname] = value.split(' ')
        }
    }
}

//Свойство объекта может быть либо аксессором, либо свойством с данными. 
//При попытке указать в одном дескрипторе  свойства и get, и value в одном будет ошибка.

//Геттер и сеттер также используются и во внутренних переменных объекта _var.
//В целом их можно изменять через:
Object._var = ...
//Но по негласному соглашению так не принято делать, поэтому то же самое делается
//через сеттер, в который выставляется условие:

let user = {
    get name () {
        return this._name
    },
    surname: 'Korotovskikh',
    set name (value) {
        if (typeof value != 'string') {
            console.log('Type a string.')
            return
        } else {
            this._name = value
        }
    }
}

=====================================================================================================

ПРОТОТИПЫ prototype, __proto__



=====================================================================================================
СЕТЕВЫЕ ЗАПРОСЫ



=====================================================================================================




=====================================================================================================
ПРОЧЕЕ
