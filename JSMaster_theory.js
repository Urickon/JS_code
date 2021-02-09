
<----------------ПРОДВИНУТЫЙ JAVASCRIPT()----------------->

=====================================================================================================

S O L I D

/*Это набор принципов, используемых в работе программиста.
Они помогают оптимизировать процесс.
Глобально эти принципы можно расширить и на другие области деятельности.
Расшифровывается эта аббревиатура следующим образом:

S - Single responsibility principle
O - Open close principle
L - Liskov Substitutional principle
I - Interface segregation principle
D - Dependency invertial principle*/

---------------------------------------------------------

//Single responsibility principle
/*Вкратце - этот приницп говори нам, что один класс или одна функция, или просто некий
элемент, обладающий определенным функционалом, должен отвечать только за выполнение определенного
функционала. Нельзя, например, смешивать в одном классе создание объекта и методы его 
представления пользователю. Так как количество таких методов со временем может сильно возрасти,
что приведет к разрастанию класса.
Должен быть отдельный класс, отвечающий за создание объекта. И отдельный класс, отвечающий
за его представлеие пользователю. Так будет удобнее масштабировать их в будущем.
Пример:*/

class News {
	constructor(title, text) {
		this.title = title
		this.text = text
		this.modified = false
	}

	update(text) {
		this.text = text
		this.modified = true
	}
}

const news = new News('Путин','Новая конституция')

/*Все, это был класс создания новости. Размещать в нем методы представления новости
в разных форматах - неправильно. Это будет работать, но сделает класс громоздким и
нарушит правило, что он должен отвечать лишь за одну вещь.
Например, будет неправильно добавить в класс News метод преобразования в HTML:*/

toHTML() {
	return `
		<div class="news">
			<h1>${this.title}</h1>
			<p>${this.text}</p>
		</div>
	`
}

//Вместо этого мы создаем отдельный класс и реализуем все методы там.
//Правильный вариант будет выгялдеть так:
class News {
	constructor(title, text) {
		this.title = title
		this.text = text
		this.modified = false
	}

	update(text) {
		this.text = text
		this.modified = true
	}
}

class NewsPrinter {
	constructor (news) {
		this.news = news
	}

	html() {
		return `
			<div class="news">
				<h1>${this.news.title}</h1>
				<p>${this.news.text}</p>
			</div>
		`
	}

	json() {
		return JSON.stringify({
			title: this.news.title,
			text: this.news.text,
			modified: this.news.modified
		}, null, 2)
	}
}

//Теперь для того, чтобы программа работала будем создавать "принтер" на основе новости
const printer = new NewsPrinter(
	new News ('Путин','Новая конституция')
)
//Выводим в любом формате
console.log(printer.json())
console.log(printer.html())
//Принцип соблюден, каждый класс отвечает только за один функционал.

------------------------------------------------------------

//Open close principle
/*Этот принцип говорит, что сущности (как правило это касается работы с классами):
-Могут быть открыты для расширения (open), путем создания новых типов сущеностей.
-Закрыты для изменения (close), то есть расширение их функционала не должно производиться за
счет изменений в уже написанном коде (добавления условий, новых проверок итп.). Никто не вправе
изменять код уже готовых классов и модулей.

Код, подчиняющийся данному принципу, не требует изменений при расширении, а значит, лишних трудозатрат.
Такой код позволит создать систему, которая будет устойчива при изменениях и переживет множество версий.
В данном случае не придется рыскать по всему коду в поисках всех мест, где необходимо заменить/добавить
данные. Мы лишь расширяем функционал путем создания новых наследников класса более высокого порядка.

Пример, нам нужно содать калькулятор, считающий площадь всех фигур (разной формы):*/

class Square {
	constructor(size) {
		this.type = 'square'
		this.size = size
	}
}

class Circle {
	constructor (radius) {
		this.type = 'circle'
		this.radius = radius
	}
}

//Сделаем калькулятор

class AreaCalculator {
	constructor (shapes = []) {
		this.shapes = shapes
	}

	//метод будет считать сумму всех площадей
	sum() {
		return this.shapes.reduce((acc, shape) => {
			switch (shape.type) {
				case 'square':
					acc += shape.size ** 2
					break
				case 'circle':
					acc += (shape.radius ** 2) * Math.PI
					break
			}
		}, 0)
	}
}

const calc = new AreaCalculator([
	new Circle(2),
	new Square(4)
])


//Теперь, допустим, у нас появились другие фигуры (очень много фигур, для примера возьмем лишь треугольник)
//Чтобы его пощадь тоже считалась, нам придется менять уже готовый класс AreaCalculator, так как
//там не указан тип 'rect'. Это будет нарушение принципа.
//Вместо этого сделаем класс высшего порядка shape, а от него уже будем наследовать другие фигуры.
//AreaCalculator будет работать только с shape, так что менять ничего не придется.
//Дадим ему метод area

class Shape {
	//по умолчанию сделаем, если метод не задан, то выбрасывается ошибка
	area() {
		throw new Error ('Method area must be implemented')
	}
}

//И далее в дочерних классах реализуем этот метод по-своему для каждой фигуры:

class Square extends Shape {
	constructor (size) {
		super()
		this.size = size
	}

	area() {
		return this.size ** 2
	}
}

class Circle extends Shape {
	constructor (radius) {
		super()
		this.radius = radius
	}

	area() {
		return (this.radius ** 2) * Math.PI
	}
}

//Теперь в AreaCalculator делаем общую функцию для всех
class AreaCalculator {
	constructor (shapes = []) {
		this.shapes = shapes
	}

	sum() {
		return this.shapes.reduce((acc, shape) => {
			acc += shape.area()
			return acc
		}, 0)
	}
}

const calc = new AreaCalculator([
	new Circle(2),
	new Square(4)
])
calc.sum()
//Плюс данного подхода в том, что нам уже не нужно менять AreaCalculator, если мы захотим
//добавить или убрать фигуру.

-----------------------------------------------------------

//Barbara Liskov Substitutional Principle
/*Этот принцип говорит, что при наследовании классов дочерний класс должен полностью сохранять
функционал родительского. В связи с этим предлагается делать больше слоев наследования,
разделяя один и тот же класс на два, если необходимо сделать у них разные методы. 
Недопустимо запрещать использование метода в дочернем классе при помощи вывода ошибки
либо другим способом. Это может привести к далеко идущим последствиям, когда другой
программист быдет использовать ваш код. Он возьмет дочерний класс в полной уверенности, что
он наследует все методы родителя, хотя на деле некоторые методы будет там запрещены.
И данная ошибка может выплыть не сразу, а лишь тогда, когда потребуется этот метод, так
что может получиться, что придется менять большой кусок кода.

Чтобы этого избежать, нужно соблюдать LSP или явно указывать в коде, что этот приницп нарушен,
и использовать дочерний класс нельзя.

Пример:*/

class Person {
	//делаем класс высшего порядка для всех людей
	//здесь не указываем специфичные методы, так как у одной дочки он будет, а у другой нет.
}

class WorkerOfYandex {
	access () {
		console.log('You have an access!')
	}
}

class WorkerOfGoogle {
	access () {
		console.log('Access denied!')
	}
}

//Теперь в соответствии с LSP нужно делать для них разные функции. То есть не стоит
//делать функцию для Person (и отлавливать в ней ошибки при входе человека из Гугла),
//нужна отельная для входа работника Яндекса.

function openSecretDoor (member) {
	member.access()
}

openSecretDoor(new WorkerOfYandex)

/*Подводя итог, суть принципа LSP в том, что нельзя было дать метод access() классу Person, а потом
наследовать его только для WorkerOfYandex, а у WorkerOfGoogle отменить. Если у родителя присутствовал
метод, то он должен функционировать для всех потомков. Именно поэтому мы вводим метод access() только
в дочерних классах. При одном названии суть этого метода разная. Это более оптимальный подход,
защищающий от потенциальных ошибок в будущем.*/

--------------------------------------------------------

//Interface Segregation Principle (ISP)
/*Вкратце - этот принцип говорит нам, что при наличии толстого интерфейса со множеством методов
нужно разделять его на более мелкие интерфейсы.
В частности, во фронденде нет смысла передавать все методы в интерфейс обычного пользователя.
Есть методы и данные для администратора, есть для обычного юзера, а есть для премиум-юзера.

Не нужно каждый раз с базы данных передавать все данные и методы. Задача фронтенда - 
сформировать правильный запрос к БД и получить необходимые для пользователя данные. То есть 
определяем, какой пользователь, и потом уже в зависимотси от этого, подгружаем нужные данные. 
Таким образом, задача фронтендера - понимать, какой нужен интерфейс и просить его у бэкенда, а не
наоборот, получать все и потом уже убирать лишнее. Надо делать более конкретный запрос бэку.

Вообще, в оригинале Роберта Мартина принцип звучит так: "Клиенты не должны зависеть от 
методов, которые они не используют." То есть, если какой-либо метод не используется клиентом, то
изменения этого метода не должны затрагивать клиентский код.

В чем-то этот принцип перекликается с принципом SRP - каждый элемент (интерфейс в нашем случае)
должен отвечать за выполнение определенного функционала.

В данном случае наглядный пример не приводится.*/

--------------------------------------------------------

//Dependency Invertial Principle (DIP)
/*Краткая формулировка принципа.
Модули верхнего уровня не должны зависеть от модулей нижнего уровня, от добавления их количества
или изменения в этих модулях. Все модули должны зависеть от абстракций.
Абстракции не должны зависеть от деталей. Детали не должны зависеть от абстракций.

Опять же, нужно делать так, чтобы модули более высокого порядка не нужно было изменять
при добавлении или изменении модулей низшего порядка.
Пример:*/

//Есть классы низшего уровня, отвечающие за то, откуда брать данные - с сервера или из
//Local Storage. С ними взаимодействует класс высшего уровня Database. Чтобы Database был
//стабильным, и его не нужно было бы менять каждый раз при добавлении нового способа получения данных,
//сделаем классы-прослойки. Database будет взаимодействовать только лишь с прослойками при помощи
//одного общего метода. Таким образом Database как высший класс будет независим от классов
//низшего порядка.

//Низшие классы для получения данных, их можно потом добавить сколько угодно много:
class Fetch {
	request(url) {
		return fetch(url).then(response => response.json())
	}
}

class LocalStorage {
	get(key) {
		const dataFromStorage = localStorage.getItem('key')
	}
}

//Теперь сделаем для них "обертки-адаптеры", чтобы обобщить для взаимодействия с Database:
class FetchClient {
	constructor (url) {
		this.url = url
		this.fetch = new Fetch()
	}

	clientGet () {
		return this.fetch.request(this.url)
	}
}

class LocalStorageClient {
	constructor (key) {
		this.key = key
		this.ls = new LocalStorage()
	}

	clientGet () {
		return this.ls.get(this.key)
	}
}

//Теперь сделаем класс высшего порядка Database. 
class Database {
	constructor (client) {
		this.client = client
	}

	getData() {
		return this.client.clientGet()
	}
}

//Теперь, благодаря соблюдению принципа DIP, мы можем создавать Database через одну команду
//для разных источников данных.

const db = new Database(new FetchClient('url'))
const db_2 = new Database(new LocalStorageClient('key'))

//Один и тот же метод
db.getData()
db_2.getData()

//Таким образом, Database не зависит от классов низкого уровня.
//Часто такой способ применяется при работе с разными платежными системами.


=====================================================================================================

ПАТТЕРНЫ И ШАБЛОНЫ ПРОЕКТИРОВАНИЯ НА JS

/*Паттерн - это способ решения какой-либо типовой задачи.
Это не самостоятельный код, а лишь способ решения задачи с использованием кода.
Нельзя также путать паттерн и алгоритм. Алгоритм - это четкая последовательность действий, в то время
как паттерн - это более высокоуровневая конструкция, это описание решения.

Один и тот же паттерн может быть реализован по-разному в разных средах, самое важное -
это принцип или способ, которым решается проблема. Он остается неизменным.

Паттерны бывают поведенческие (behavioral), структурные (structural),
порождающие (creational).

creational - позволяют создавать объекты или классы, отслеживать создание.
structural - работа с большой системой, выстраивание связей между элементами.
behavioral - взаимодействие элементов.*/

----------------------------------------------------------------

//=========================== Creational Design Patterns ===============================

Constructor
/*Создание объектов. После ES6 это делается через классы. До него были
популярны функции-конструкторы.*/
function User (name, id) {
    this.name = name
    this.id = id
}

//задаем метод для всех новых User.
User.prototype.getName = function () {
    console.log(`The name is ${this.name}`)
}

//создадим юзера через конструктор
const user1 = new User('Uriy', 1)
//метод работает
user1.getName() //`The name is Uriy`



//Новая запись конструктора (с ES6 синтаксисом)
class User {
    constructor (name, id) {
        this.name = name
        this.id = id
    },

    getName () {
        console.log(`The name is ${this.name}`)
    }
}

const user1 = new User('Uriy', 1) 
//Такое же создание, метод также будет работать.

----------------------------------------------------------------

Factory (фабрика)
/*Плюс этого паттерна в том, что он дает возможность через один глобальный класс
"Фабрика" создавать объекты разных классов, и при этом добавлять им общие свойства и методы.*/

//Сначала зададим классы для базового функционала
class SimpleMembership {
    constructor (name) {
        this.name = name
        this.cost = 50
    }
}

class StandartMembership {
    constructor (name) {
        this.name = name
        this.cost = 150
    }
}

class PremiumMembership {
    constructor (name) {
        this.name = name
        this.cost = 500
    }
}

//Собственно, сама фабрика
class MemberFactory {
    static list = {
        simple: SimpleMembership,
        standart: StandartMembership,
        premium: PremiumMembership
    }

    create (name, type = 'simple') {
        const Membership = MemberFactory.list[type] || MemberFactory.list['standart'] 
        //если была ошибка в type(не найден), то сработает второй вариант после ||
        const member = new Membership(name)
        //теперь мы можем расширить функционал и добавить другие методы или свойства объекту.
        MemberFactory.list[type] //зададим стандартный тип, если он не был найден.
            ? member.type = type
            : member.type = 'standart'
        
        member.define = function () {
            console.log(`User ${this.name} has ${this.type}, it costs ${this.cost}`)
        }

        return member
    }
}

//Теперь создадим саму фабрику (поместим класс в переменную)
const factory = new MemberFactory()

//Создаем юзера и сразу помещаем в массив юзеров
let members = []

members.push(factory.create('Uriy', 'standart'))
members.push(factory.create('Olga')) //type задан по умолчанию
members.push(factory.create('Alina', 'premium'))
members.push(factory.create('Egor', 'spremium')) //spremium будет не найден, поэтому 
//будет присвоен стандартный Membership и type 'standart'.

members[...].define() //выдает информацию для любого элемента массива, тк метод общий.

----------------------------------------------------------------

Prototype (для создания объектов)
/*В этом случае мы используем некоторый базовый объект как прототип для создания нового.
Свойства и методы старого объекта будут в прототипе нового.*/

var car = {
    wheels: 4,
    init() {
        console.log(`I\'m a car! I have ${this.wheels} wheels and my owner is ${this.owner}`)
    }
}

const carX = Object.create(car, {
    owner: {
        value: 'Oleg'
    }
})

carX.init() //I'm a car! I have 4 wheels and my owner is Oleg
carX.__proto__ === car // true

----------------------------------------------------------------

Singleton
/*Создается специальный класс, у которого может быть лишь один инстанс.
Используется, например в mongoose, дабы избежать лишних подключений к базе данных.*/

class Database {
    constructor(data) {
        //эта проверка позволит понять, что у класса уже есть инстанс
        if (Database.exists) {
            return Database.instance
        }

        //при первом создании эти поля класса заполняются
        Database.instance = this
        Database.exists = true

        this.data = data
    }

    getData() {
        return this.data
    }
}

const mongo = new Database('MongoDB')
console.log(mongo.getData()) //'MongoDB'

const mySQL = new Database('MySQL')
console.log(mySQL.getData()) //'MongoDB' т.к. класс использует instance, который 
//был получен при первом создании.

----------------------------------------------------------------

//=========================== Structural Design Patterns ===============================

Adapter
/*Позволяет интегрировать старый инетрфейс в новый интерфейс и работать им
совместно, не ломая при этом приложение.
Для примера создадим калькуляторы старой и новой версии.*/

class OldCalc {
    operations(t1, t2, operation) {
        switch (operation) {
            case 'add': return t1 + t2
            case 'sub': return t1 - t2
            default: return NaN
        }
    }
}

class NewCalc {
    add(t1, t2) {
        return t1 + t2
    }

    sub(t1, t2) {
        return t1 - t2
    }
}

//Работа со старым калькулятором
let calc = new OldCalc
console.log(calc.operations(2, 4, 'add'))

//Работа с новым калькулятором
let calc2 = new NewCalc
console.log(calc2.add(2, 4))

//Иначе говоря, у нас есть два способа взаимодействия с калькулятором - со старой версией
//свой способ, а с новой свой способ. Необходимо сделать так, чтобы любой способ работал через
//один интерфейс. То есть, чтобы был универсальный способ, который поддерживает как старый
//тип обращения к калькулятору, так и новый.

//Создадим класс Adapter, который позволит скомбинировать эти два класса и 
//получить на их основе высшую абстракцию.

class CalcAdapter {
    constructor () {
        this.calc = new NewCalc
    }

    operations(t1, t2, operation) {
        switch (operation) {
            case 'add': return this.calc.add(t1, t2)
            case 'sub': return this.calc.sub(t1, t2)
            default: return NaN
        }
    }
}

//Теперь даже используя старый интерфейс, мы будем использовать новый функционал
let calc3 = new CalcAdapter
console.log(calc3.operations(2, 4, 'add')) //будет вычисляться по-другому, но результат 
//тот же, старый интерфейс теперь позволяет работать с новым классом NewCalc.

----------------------------------------------------------------

Decorator
/*Добавляет новое поведение или функционал для существующих классов.
Скажем так, у нас есть базовый класс для создания серверов:*/

class Server {
    constructor (ip, port) {
        this.ip = ip
        this.port = port
    }

    get url () {
        return `https://${this.ip}:${this.port}`
    }
}

//создание объекта Server
const serv1 = new Server('12.12.12.12', 8080)

//Теперь мы хотим создать функции декораторы для двух типов серверов - Амазон и Азуры.
//Она будет добавлять функционал в объекты. создаваемые через класс Server или
//любой другой. который мы передадим в эту функцию.

function aws(server) { //декоратор
    server.isAWS = true //add flag
    server.awsInfo = function () {
        return server.url
    }

    return server //для удобства сразу вернем объект с обновленными свойствами
}

//создание объекта Server оборачиваем в декоратор
const servAmazon = aws(new Server('12.12.12.12', 8080))
servAmazon.isAWS // working! Flag and method added


//======================================================
//Создадим декортор для сервиса от Майкрософта Азуры

function azure(server) { //декоратор
    server.isAWS = true //add flag
    server.port += 500 //можно сразу менять значения

    return server //вернем объект
}
const servMicrosoft = azure(new Server('12.12.12.12', 8080)) // also working!

----------------------------------------------------------------

Facade
/*Этот шаблон проектирования нужен для упрощения системы за счет сведения всех возможных
внешних вызовов к одному объекту, который в свою очередь делегирует их соответствующим
объектам системы.

Фасад нужен для упрощения взаимоействия с различными классами и сущностями. Хороший пример
фасада - это библиотека jquery.*/

class Complaints {
	constructor () {
		this.complaints = []
	}

	reply(complaint) {}

	add(complaint) {
		this.complaints.push(complaint)
		return this.reply(complaint)
	}
}

class ProductComplaint extends Complaints {
	reply({id, customer, details}) {
		console.log(`Product complaint: ${id}: ${customer} (${details})`)
	}
}

class ServiceComplaint extends Complaints {
	reply({id, customer, details}) {
		console.log(`Service complaint: ${id}: ${customer} (${details})`)
	}
}

//Я добавил обертку для обработки разных типов, чтобы позволить фасаду ComplaintRegistry быть закрытым 
//для изменений при добавлении новых типов ошибок (Open close principle)
class ComplaintMaker {
    constructor (type) {
        if (type === 'service') {
            return new ServiceComplaint()
        } else if (type === 'product') {
            return new ProductComplaint()
        }
    }
}

//Теперь добавим класс для создания фасада
class ComplaintRegistry {
    register(customer, type, details) {
        const id = Date.now()

        let complaint = new ComplaintMaker(type)

        return complaint.add({id, customer, details})
    }
}

//Собственно теперь создаем фасад
const registry = new ComplaintRegistry()

//Обращаемся через одну команду
registry.register('Yury', 'service', 'access denied')
registry.register('Yury', 'product', 'error occured')

----------------------------------------------------------------

Flyweight
/*Очень часто применяемый паттерн. Он заключается в создании объектов-легковесов, которые могут применяться 
в разных комбинациях. Делается это для того, чтобы экономить память, так как такие объекты достаточно загрузить
всего лишь раз.
Часто используется вместе с фабрикой. Помогает определить, есть ли подобный объект в списке или еще нет.

Плюс в том, что экономится память. Минус в том, что расходуется процессорное время на выполнение кода.
Особенно актуален при подгрузке видео или изображений, которые повторяются.*/

class Car {
	constructor (model) {
		this.model = model
	}
}

class Factory {
	constructor() {
		this.cars = []
	}

	create (model) {
		const candidate = this.getCar(model)
		if (candidate) {
			console.log('You already have the same car!')
			return 
		} else {
			const newCar = new Car (model)
			this.cars.push(newCar)
			console.log(`${newCar} added!`)
			return newCar
		}

	}

	getCar (model) {
		return this.cars.find(car => car.model === model)
	}
}

//Создаю фабрику
const factory = new Factory

factory.create('bmw') //bmw added!
factory.create('lada') //lada added!
factory.create('bmw') //You already have 'bmw'

//Таким образом, если машина такой марки есть, мы не тратим память на создание дубликата.

----------------------------------------------------------------

Proxy
/*Иначе называется заместитель. Суть прокси в том, что он позволяет перехватывать вызовы к объекту,
делая что-либо до или после передачи вызова оригиналу.*/

function networkFetch(url) {
	return `${url}: response from server.`
}

const cache = new Set()

//Создадим прокси для функции
const proxiedFetch = new Proxy (networkFetch, {
	apply(target, thisArg, args) {
		const url = args[0]
		if (cache.has(url)) {
			return `${url}: response from cache.`
		} else {
			cache.add(url)
			return Reflect.apply(target, thisArg, args)
		}
	}
})

console.log(proxiedFetch('inistrad.com'))
console.log(proxiedFetch('atama.ru'))
console.log(proxiedFetch('inistrad.com'))

//Таким образом, здесь мы при помощи прокси не делаем лишних запросов.

----------------------------------------------------------------

//=========================== Behaviour Design Patterns ===============================

Chain of responsibility
/*Довольно простой паттерн, по-русски звучит как цепочка обязанностей.
Удобно, например, чтобы организовать цепочку проверок. Если хотя бы одно звено ложное - то процесс прервется.
Активно используется в jquery.*/

class MySum {
	constructor (initialValue = 0) {
		this.sum = initialValue
	}

	add (value) {
		this.sum += value
		return this //обязательно для поддерки chain of responsibility
	}
}

const summarizer = new MySum()
console.log(summarizer.add(8).add(9).add(122).sum) //собственно реализация метода.

----------------------------------------------------------------

Command
/*Система, когда класс-отправитель действия и класс-получатель зависят друг от друга - плоха.
Она может привести к разрастанию числа классов и необходимости прописывать логику для каждого в отдельности.

Паттерн команда предлагает вместо этого НЕ взаимодействовать напрямую я создать отдельный (единственный) класс,
который будет генерировать объект и передавать в него все необходимые параметры действия. Таким образом, выполняющие
действие классы будут всегда работать с одним и тем же объектом, у которого просто будут заданы разные параметры.
Удобство в том, что нужный метод будет называться всегда одинаково, а значит, к с ним будет легко 
взаимодействовать любому классу.
Также он удобен для ведения учета выполненных действий.

В данном паттерне принято вводить четыре составляющих - client, reciever(получатель команды),
invoker(вызывающий команды), command(объект-команда).*/

class MyMath {
	constructor (initialValue = 0) {
		this.num = initialValue
	}

	square() {
		return this.num ** 2
	}

	cube() {
		return this.num ** 3
	}
}

class Command {
	constructor(reciever) {
		this.reciever = reciever
		this.commandsArchive = [] //для учета выполненных команд
	}

	execute(command) {
		this.commandsArchive.push(command)
		return this.reciever[command]() //получаем функцию и вызываем ее
	}
}

const x = new Command(new MyMath(2))

console.log(x.execute('square')) //4
console.log(x.execute('cube')) //8
console.log(x.commandsArchive) //[ "square", "cube" ]

/*Таким образом, конечные получатели действия - MyMath взаимодействуют лишь с классом Command. Запросы, которые
мы делаем, передаются в Command, причем в единственный метод. Просто он вызывается с разными параметрами.*/

----------------------------------------------------------------

Iterator
/*В программировании часто встречаются большие хранилища данных, колллекции. Можно добавлять методы их перебора
внутрь коллекций, но такой подход опять же вызовет награмождение методов внутри класса, предназначенного для 
хранения, а не перебора. Особенно, если методов перебора будет несколько. 

Поэтому идея паттерна итератор - вынести перебор коллекции в отдельный класс, обладающий лишь функционалом перебора.
Одну коллекцию могут обходить сразу несколько итераторов.*/

const collection = new Array('alfa', 1, 45, 'program', 79, 100, true, false, 444, 12, 'omega')

class MyIterator {
	constructor (data) {
		this.index = 0
		this.data = data
	}

	[Symbol.iterator]() {
		return {
			next: () => {
				if (this.index < this.data.length) {
					return {
						value: this.data[this.index ++],
						done: false
					}
				} else {
					this.index = 0
					return {
						done: true,
						value: void 0
					}
				}
			}
		}
	}
}

const iterator = new MyIterator(collection)

for (let value of iterator) {
	console.log(`Value: ${value}`)
}

//Работает! Вообще, по сути, в JS в массив встроен свой итератор. Но здесь я добавил новый класс итератора, чтобы
//продемонстрировать работу паттерна. Если бы у массива итератора не было, то мы бы не загромождали его этим методом,
//а реализовали бы через отдельный класс.

----------------------------------------------------------------

Mediator
/*Посредник. Применяется, когда есть множество объектов, которые должны друг с другом взаимодействовать. 
При этом я не хочу, чтобы объекты явно ссылались друг на друга, так как это приведет к тому, что их невозможно
станет использовать в других частях приложения. Не стоит загромождать их связями с конкретными объектами, тем
более разными линиями поведения в зависимости от работы с тем или иным объектом. Для этого используется посредник.

Это как пилоты самолетов - если бы не было диспетчеров, то им бы приходилось самостоятельно связываться с сотнями
других пилотов, чтобы не столкнуться. Диспетчер - это и есть медиатор.

Сделаю мини-мессенджер.*/

class User {
	constructor (name) {
		this.name = name
		this.room = null //by default
	}

	message (message, to) {
		this.room.send(message, this, to) //method from mediator***
	}

	receive (message, from) {
		console.log(`From ${from.name} to ${this.name}: ${message}`)
	}
}

//Create mediator
class ChatRoom {
	constructor () {
		this.users = {}
	}

	register (user) {
		this.users[user.name] = user
		user.room = this //Собственно добавляет юзеру этот ChatRoom
	}

	send(message, from, to) { //***
		if (to) {
			to.receive(message, from)
		} else {
			Object.keys(this.users).forEach(key => {
				if (this.users[key] !== from) {
					this.users[key].receive(message, from)
				}
			})
		}
	}
}

//Теперь создадим пользователей:
const uriy = new User('Uriy')
const yulia = new User('Yulia')
const oleg = new User('Oleg')

//Создадим посредника (комнату, в которой будут находиться юзеры)
const room = new ChatRoom()
//Регистрируем пользователей
room.register(uriy)
room.register(yulia)
room.register(oleg)

//Взаимодействуем через медиатор
uriy.message('Hello!', yulia) //From Uriy to Yulia: Hello!
yulia.message('Hey!', uriy) //From Yulia to Uriy: Hey!
oleg.message('Hello!') //From Oleg to Uriy: Hello everybody!  //From Oleg to Yulia: Hello everybody!

//По факту мы теперь отправляем сообщение (метод message) через ChatRoom.

----------------------------------------------------------------

Observer
/*Этот паттерн создает механизм подписки, позволяющий объектам реагировать на изменения, происходящие в другом объекте.
Известен как наблюдатель, издатель-подписчик. Следящие объекты я буду называть обозревателями (observers), а тот, за 
которым следят - обозреваемым (observable). Если быть более точным, то observer - это не сам объект, а интерфейс, через 
который он следит и получает информацию. 

Паттерн позволяет с одной стороны отказаться от постоянных вызовов со стороны обозревателей (так как они не знают, когда
проиойдет изменение и вынуждены постоянно проверять состояние обозреваемого), а с другой стороны отказаться
от рассылки информации об изменениях всем объектам (так как обозреваемый не знает, кто конкретно за ним следит).

Когда необходимо, обозреваемый будет вызывать у наблюдателей метод. Этот метод должен иметь одинковое название
у всех объекто класса обозреватель. Функционал внутри наблюдателя может быть разным, но название метода должно
быть единым для всех наблюдателей, чтобы обозреваемый мог без проблем и дополнительных проверок взаимодействоваь с ними.

Обозреваемый хранит в себе список всех обозревателей для того, чтобы адресно вызывать в них метод. Если мы хотим,
чтобы у конкретного обозревателя перестал вызываться метод, мы удаляем его из списка получателе в обозреваемом.*/

class Observable {
	constructor() {
		this.observers = []
	}

	subscribe(observer) {
		this.observers.push(observer) //добавляем обозревателя
	}

	unsubscribe(observer) {
		this.observers = this.observers.filter(obs => obs !== observer) //удаляем обозревателя из массива
	}

	fire(changes) { //вызываем единый метод update у всех подписчиков
		this.observers.forEach(observer => {
			observer.update(changes)
		})
	}
}

//класс для того, чтобы делать объект обозревателем 
class Observer {
	update(changes) {
		switch (changes) {
			case 'INCREMENT':
				this.state = ++this.state
				console.log(this.state)
				break
			case 'DECREMENT':
				this.state = --this.state
				console.log(this.state)
				break
		}
	}
}

//класс для создания объектов
class SomeElement extends Observer {
	constructor(state = 1) {
		super(state)
		this.state = state
	}
}

const observable = new Observable()

//Теперь создадим обозревателей (подписчиков)
const div = new SomeElement(2)
const span = new SomeElement(7)
const section = new SomeElement()

//Теперь подпишем их
observable.subscribe(div)
observable.subscribe(span)
observable.subscribe(section)

//Теперь используя метод fire у обозреваемого, мы будем вызывать метод update у всех подписчиков, соответственно,
//вызывая в них определенное действие. В данном примере я сделал только увеличение/уменьшение базового значения.
//В реальности можно выпонять код любой сложности.
observable.fire('INCREMENT') //3 8 2
observable.fire('INCREMENT') //4 9 3
observable.fire('DECREMENT') //3 8 2

----------------------------------------------------------------

State
/*По-русски это называется "состояние". Основная идея в том, что программа может находиться в нескольких
состояниях, которые сменяют друг друга. Находясь в разных состояниях, программа по разному будет реагировать 
на одни и те же действия.

Например, Документ, обладая условно одинковым наполнением, может принимать три состояния - черновик, модерация,
опубликован. В каждом из этих состояний метод publish() будет работать поразному. ДЛя черновика он должен перевести
документ в состояние moderated, для moderated опубликовать, а для published сказать, что данный документ
уже опубликован.

Проблема в том, что таких состояний может быть гораздо больше. И тогда прописывать действия для них в
самом классе Документ будет проблематично, так как такой код будет очень трудно поддерживать.

Паттерн состояние предлагает создать отдельные классы с общим интерфейсом для каждого состояния. Благодаря
общему интерфейсу, Документ сможет не привязываться напрямую к классу состояния. Поведение Документа можно
будет изменить в любой момент, подключив к нему другое состояние.*/

//Родительский класс для состояний
class Status {
	constructor(status) {
		this.status = status
	}
}

//На его основе создаем любое количество состояний
class Draft extends Status {
	constructor() {
		super('draft')
	}

	viewStatus() {
		console.log(`Document is a ${this.status}`)
	}

	publish() {
		console.log('Modifying Doc...')
		console.log('Process finished!')
	}
}

class Modified extends Status {
	constructor() {
		super('modified')
	}

	viewStatus() {
		console.log(`Document is ${this.status}`)
	}

	publish() {
		console.log('Publishing Doc...')
		console.log('Process finished!')
	}
}

class Published extends Status {
	constructor() {
		super('published')
	}

	viewStatus() {
		console.log(`Document is ${this.status}`)
	}

	publish() {
		console.log('Already published!')
	}
}

let statesArray = new Array(new Draft(), new Modified(), new Published())

//Теперь, собственно, сам Документ
class Document {
	constructor() {
		this.states = statesArray //Это я сделал, чтобы при добавлении новых состояний не менять Документ
		this.currentState = this.states[0]
	}

	change() { //Этот метод будет менять текущее состояние Документа при использовании publish()
		const total = this.states.length
		let index = this.states.findIndex(status => status === this.currentState)

		if (index + 1 < total) {
			this.currentState = this.states[index + 1]
		} 
	}

	edit() { //Этот метод будет приводить Документ в состояние черновика, если мы захотим его снова изменить
		this.currentState = this.states[0]
	}

	status() { //Этот метод будет показывать текцщее состояние Документа
		return this.currentState.viewStatus() //собственно ради этого метода мы и вводили классы состояний,
		//иначе его бы пришлось расписать через условия (стал бы раздутым)
	}

	publish() { //Этот метод изменяет состояние документа опять же через общий интерфейс
		this.currentState.publish() //передаем нужное действие в класс состояния
		return this.change() //меняем состояние Документа
	}
}

//Теперь, как все это работает:
const doc = new Document()

doc.status() //Document is a draft

doc.publish() //Modifying doc... Process finished!

doc.status() //Document is modified - изменился.

doc.publish() //Publishing doc... Process finished!

doc.status() //Document is published - изменился.

doc.publish() //Already published! - больше не дает, так как в методе change() прописано условие

doc.edit() //привожу в состояние черновика

doc.status() //Document is a draft - все сработало! Можно публиковать по новой.

----------------------------------------------------------------

Strategy
/*Стратегия. Паттерн предназначен для определения семейства алгоритмов, инкапуляции каждого из них и
обеспечения их взаимозаменяемости. Он позволяет варьировать поведение класса путем подстановки различных
алгоритмов.

То есть мы берем схожие по действиям алгоритмы и выносим их в отдельные классы. А одинаоквый код
оставляем в основном классе. И основному коду будет безразлично, что происходит в алгоритмах,
так как у них обязательно должен быть единый интерфейс взаимодействия.
Таким образом, мы инкапсулируем алгоритм и используем для взаимодействия с основным классом лишь
один метод.
Так, например, можно сделать навигатор, рассчитывающий время, которое займет движение из А в В
на определенном транспортном средстве.*/

class Vehicle {
	travelTime(traffic, distance) { //единый интерфейс для взаимодействия
		return distance / (this.speed * traffic)
	}
}

//теперь сделаем дочерние классы для разных видов транспорта
class Bus extends Vehicle {
	constructor() {
		super()
		this.type = 'bus'
		this.speed = 50
	}
}

class Taxi extends Vehicle {
	constructor() {
		super()
		this.type = 'taxi'
		this.speed = 80
	}
}

class UFO extends Vehicle {
	constructor() {
		super()
		this.type = 'ufo'
		this.speed = 2000
	}
}

//Собственно, сам навигатор
class Navigator {

	//Сначала введу два метода, которые будут анализировать конкретный запрос от пользователя:
	getTraffic() { //метод для анализа и получения текущей загруженности дороги
		//Здесь алгоритм по анализу траффика, я просто выведу число (долю загруженности)
		return 0.5
	}

	getDistance() { //метод получения расстояния (будто бы задает пользователь)
		return 100
	}

	travel(transport) { //Это уже сам рассчет
		let traffic = this.getTraffic()
		let distance = this.getDistance()
		console.log(`Travel time on ${transport.type} is ${transport.travelTime(traffic, distance)} hours`)
	}

}

const nav = new Navigator()

//Теперь мы можем расчитать для каждого транспорта время.
//Плюс в том, что навигатор независим от алгоритмов и лишь передает и получает нужные данные

nav.travel(new UFO()) //Travel time on ufo is 0.1 hours
nav.travel(new Taxi()) //Travel time on ufo is 2.5 hours
nav.travel(new Bus()) //Travel time on bus is 4 hours

----------------------------------------------------------------

Template
/*Шаблонный метод. Это довольно простой паттерн, суть которого в том, что в абстрактном классе мы 
создаем шаблонный метод, который определяет общую для всех конкретных дочерних классов последовательность
поведения. То есть в него мы закладываем последовательность вызова других методов. Причем эти
методы уже могут присутствовать в абстрактном классе в виде абстрактных методов, а в конкретных
дочерних получать свою реализацию.
Иными словами, общий алгоритм мы помещаем в отедльный абстрактный класс. А все индивидуальные реализации методов
мы оставляем в конкретных классах.*/

class File { //абстрактный класс
	constructor(name) {
		this.name = name
	}

	loadFile() {} //абстрактный метод

	prepareFile() {} //абстрактный метод

	publishFile() { //шаблонный метод, алгоритм, общий для всех файлов.
		loadFile()
		prepareFile()
		console.log(`${this.name}.${this.type} was published!`)
	}
}

//Теперь сделаем конкретные классы
class PDF extends File {
	constructor(name) {
		super(name)
		this.type = 'pdf'
	}

	loadFile() { //Конкретная реализация метода (в каждом типе файла своя)
		console.log(`Loading ${this.name}.pdf file...`)
	}

	prepareFile() {
		console.log(`Loading ${this.name}.pdf file...`)
	}
}

class DOCX extends File {
	constructor(name) {
		super(name)
		this.type = 'docx'
	}

	loadFile() {
		console.log(`Loading ${this.name}.docx file...`)
	}

	prepareFile() {
		console.log(`Loading ${this.name}.docx file...`)
	}
}

const myPdfFile = new PDF('myPdfFile')
const myDocxFile = new PDF('myDocxFile')

myPdfFile.publishFile() 
//Loading myPdfFile.pdf file... 
//Preparing myPdfFile.pdf file... 
//myPdfFile.pdf was published!

myDocxFile.publishFile()
//Loading myDocxFile.pdf file...
//Preparing myDocxFile.pdf file...
//myDocxFile.pdf was published!

//Таким образом, общий алгоритм запускает последовательность индивидуальных методов.


=====================================================================================================

CORS (Кросс-доменные запросы)

/*В интернете для безопасности (чтобы нельзя было делать запросы с одного сайта
на сервера других сайтов, которые к нему не имеют отношения) существует такая концепция, как
same-origin-policy. Она подразумевает, что сетевые запросы можно делать лишь на тот сайт,
который имеет тот же домен, порт и протокол. Это не единственный механизм защиты сайтов, но один
из базовых.

CORS (cross origin resource sharing) - это спецификация, позволяющая делать кроссдоменные запросы. 
Это набор заголовков, которые пользволяют с помощью fetch и XMLHttpRequest делать
запросы на сайты (фактически на сервера сайтов) с другим доменом.

CORS делятся на простые и сложные. Простые подразумевают отправку запроса с определенными заголовками.
Этот способ применяется, когда нам нужно получить определенные данные с сервера, не более того.
Сложные запросы подразумевают выполнение предварительного запроса для получения разрешения на выполнение
запроса. Лишь после получения разрешения может быть выполнен запрос. Такой способ применяется,
когда нужно передать данные, которые могут потенциально навредить серверу, то есть, когда
происходит отправка данных.*/

------------------------

Простые запросы
/*Допустимые меотды для простого запроса: POST, GET, HEAD.

В зпросе на сервер среди заголовков запроса есть Origin. Он содержит информацию о текущем домене,
с которого выполняется запрос.
Собственно на стороне сервера необходимо настроить доступные ресурсы и передачу в ответе заголовка:
Access-Control-Allow-Origin: "содержимое заголовка Origin пришедшего запроса".

Это работает так: если мы хотим дать доступ к серверу всем доменам, то передаем в ответ
Access-Control-Allow-Origin: *, * - любой домен.
Если мы хотим ограничить доступ только одному определенному домену, то передаем в ответ
Access-Control-Allow-Origin: http://foo.example.

Если есть необходимость отослать на сервер куки, то в запросе это делается путем добавления*/
fetch('https://xxx.com', {
	credentials: 'include'
})
.then(...)
//Но просто так это сделать не получится, так как в ответе сервера должен содержаться заголовок
//Access-Control-Allow-Credentials: true

------------------------

Сложные запросы
/*Методы, для которых обязателен сложный запрос: PUT, PATCH, DELETE, CONNECT, TRACE, OPTIONS.
Также если передать некоторые специфичные нестандартные заголовки в запросе с домена, придется
использовать сложный запрос.

Суть в том, что сначала делается предварительный запрос с методом OPTIONS.
Он передает данные, которые фигурируют в основном запросе:
Access-Control-Request-Method: PUT //метод, требующий сложный запрос
Access-Control-Request-Headers: X-PINGOTHER, Content-Type //нестандартный заголовок

В ответе сервера браузер должен получить следюущее:
Access-Control-Allow-Origin: http://foo.example //базовая проверка на домен все равно происходит
Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT //здесь нам разрешают использоавать метод
Access-Control-Allow-Headers: X-PINGOTHER, Content-Type //здесь одобряют наш заголовок

Также сервер может отправить в ответ заголовок:
Access-Control-Max-Age: 86400
Это означает, что в течении 86400 мс (24 часа) браузер будет держать в памяти то, что по данному запросу
не нужно делать предварительные запросы. ТО есть только первый метод будет с предварительным, а все
другие в течение заданного времени будут выполняться простым способом. 
Стоит помнить, что каждый браузер имеет лимит на хранение кэша. Он может быть меньше.

Только после этого будет выполнен основной запрос на сайт.

Еще момент: если сервер присылает нестандартные заголовки, то они придут, но JS не сможет их
использовать, если в ответе сервера не присутствует заголовок:
Access-Control-Expose-Headers: yourHeader.
*/


=====================================================================================================

КАК РАБОТАЕТ JS 

=====================================================================================================

SORTING ALGORYTHMS

=====================================================================================================

indexedDB

=====================================================================================================



