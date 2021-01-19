
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





















