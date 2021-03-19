====================================================================================================
<-----------TYPESCRIPT()------------>
====================================================================================================
ВВЕДЕНИЕ В TypeScript

Плюсы TS
/*Может отлавливать ошибки на этапе разработки, до сборки приложения.
Статическая типизация делает код более понятным.
TS нужен только из-за типизации и встроенных анализаторов кода. На нем можно писать,
как на JS, но это лишено всякого смысла. Так что типы задавать обязательно.

JS тем слабее, чем больше и серьезнее проект. TS приходит на помощь.
Позволяет писать более сложные и крупные JS-приложения, интеграция с IDE
Проще работать в команде
Богатая документация*/

Минусы TS
/*Это дополнительная прослойка, которую нужно внедрять на этапе разработки.*/

/*Файлы расширения ts.
Компиялтор может переводить их в js-файлы при запуске.*/

Компиляция
/*Настраивается в файле tsconfig.json*/


Типы данных
/*Присовив один раз, потом уже нельзя менять.*/

const isFetching: boolean = true

/*
variable: boolean,
variable: number,
variable: string,
variable: null,
variable: undefined.
Еще есть типы данных void(возвращает пустоту) и never(никогда ничего не возвращает) - для функций

variable: number[] - массив из чисел
variable: Array<number> - другая запись того же самого

Tuple - массив из рзных типов данных, записывается как
variable: [string, number]
По-русски это кортеж.

Any - означает, что переменная будет иметь динамическую типизацию, то есть ей можно 
присваивать любой тип данных.
variable: any

Object - по сути аналог Any, можно указывать лишь объект. 

Проверить тип данных можно так же как в JS при помощи команды typeof. На его основе
строится type guard.*/

type assertion
/*Приведение типов данных (type assertion).
Когда тип данных неопределен, либо указан тип any, либо type определен как смешанный,
то в случае необходимости привести данные к одному типу, используется:*/ 
let someValue: any = 'Hello TypeScript!'

let length: number = (<string>someValue).length
//либо
let length: number = (someValue as string).length

------------------------------

Type
/*Ключевое слово Type нужно для создания собственных типов.
Используется либо для создания одного типа на основе базового(1),
как правило, просто для удобства разработки, 
либо для создания производных типов для таких вещей, как ID, 
который может быть как числом, так и строкой(2)*/

type login = string
const newLogin: login = 'admin' //(1)

type ID = string | number
const newID: ID = 1234
const newID: ID = '1234' //(2)

//Если допустимы неопределенность или null, то

type ID2 = string | number | null | undefined
const newID2: ID2 = null

-------------------------------

enum MyEnum {}
/*Перечисление. 
Идеологически это набор связанных друг с другом значений.
Это подвид типа данных число. Это набор значений, пронумерованных как массив.
Исключения составляют элементы. для которых заданы значения.
Значения могут быть как константой, так и могут быть вычисляемыми.
Значения могут быть типа string или number.
Также перечисления могут быть смешанными, т.е. содержать как строки, так и числа.*/
enum Membership {
	Simple, //(0)
	Standart, //(1)
	Premium //(2)
}

const membership = Membership.Standart //равняется 1.
const membershipReverse = Membership[2] //равняется Premium
//Вторая строчка возможна потому, что JS компилирует enum как объект.

//В enum можно сразу задавать или вычислять значение.
enum FileAccess {
	//constants
	None,
	Read = 10, //значение задано сразу
	ReadWrite = Read | Write,
	//calculating elements
	G = '123'.length
}

//Если значение не задано, то компилятор пытается вычислить его автоматически, добавляя 1
//к предыдущему значению.
enum Numbers {
	a, //(0)
	b, //(1)
	c = 0, //(0)
	d //(1)
}
//Есть важный момент в том, что если это смешанное перечисление, то может получиться ошибка,
//если после элемента со строковвм значением указывать элементы,
//значения которых не заданы явно.
//Это лечится заданием числового следующему элементу после строкового.
enum Stones {
  Peach, // 0
  Apricot = "apricot",
  Cherry = 1, // 1, если не задать, полчится error
  Plum // 2
}

//При попытке возвратить строковое значение по номеру, будет показано последнее значение 
//с таким номером.
enum Nuts {
  Peanuts, //0
  Walnut, //1
  Hazelnut = 0, //0
  Cedar //1
}

const nut = Nuts[0] //Hazelnut
const nut2 = Nuts[1] //Cedar


//Внутри перечисления можно создавать ссылки на другие значения - псевдонимы (alias)
//Псевдонимы имеют значения свойства на которое ссылаются.
enum Langues {
  Apple, //value = 0
  Apfel = Apple, //value = 0
  LaPomme = Apple //value = 0
}

------------------------------

Type Guards
/*Для того, чтобы удостоверится в типе данных, в TS используются различные конструкции.
В основном это необходимо делать, когда данные могут быть нескольких заднных типов.*/
typeof(data) //возвращает строку с названием типа данных
data instanceof(someClass) //првоеряет, принадлежит ли объект определенному классу.

------------------------------

Generics (обобщения)
/*Иногда нам нужно работать с разными типами данных. Например, одна функция может
принимать строки и числа. Но потом нужно вернуть из функции тот же тип данных.
Для этого есть обощения. 
Они фактически создают отдельные функции при вызове для разных типов даных.
Запись следующая:*/
function getId<T>(id: T): T {
    return id;
}
//Здесь если в функцию была передана строка, то вернется строка,
//Если было передано число, то вернется число.

function revrse<T>(someArray: T[]): T { //T[] - массив с любыми данными
	return someArray.reverse()
}
//То же самое можно сделать с массивами. Будет возварщен массив с таким же типом данных.

//Помимо этого, бывают обощенные классы и интерфейсы, например:
//Есть два базовых типа
type PhotoType = {
	name: string
	size: number
}

type ServerType = {
	name: string
	size: string
	loadTime: number //в этом отличие
}

type ServerResponseType<T> = {
	errorCode: number
	message: array<string> //по сути массив это дженерик в миниатюре
	data: T // вот собственно здесь мы и делаем тип кастомным, т.е. можно подставить любой
}

//И PhotoType и ServerType будут работать
const response1: ServerResponseType<PhotoType> = {
	errorCode: 1
	messages: ['hello!']
	data: {
		name: 'myName'
		size: 23
	}
}

const response2: ServerResponseType<ServerType> = {
	errorCode: 2
	messages: ['hello!']
	data: {
		name: 'myName'
		size: 23
		loadTime: 120
	}
}

====================================================================================================

ФУНКЦИИ

/*Не совсем обычная запись. В аргументах указываем их тип данных.
При вызове функции в TS в нее нужно передавать столько аргументов, сколько она содержит.
Чтобы сделать некоторые аргументы необязательными, их помечают знаком ?*/

function sayMyName (name?: string): void { //function declaration, name - необязательный аргумент
	console.log(name)
}

let add = function (a: number, b: number) : number { //function expression
    return a + b;
}

add(1, 2)

//Тип функции void означает, что она ничего не возварщает.
/*Never - тип функции, которая возвращает ошибку или выполняется бесконечно. Например:*/

function throwError (error: string): never {
	throw new Error(error)
}

function infinite (): never {
	while (true){ //бесконечный цикл

	}
}

//Тип функции указыватся при выражении функции через переменную.
let myAdd: (x:number, y:number) => number //описание типа
=
function(x: number, y: number): number { return x + y }


//Значения параметров по умолчанию задаются следюущим образом:
function getName(firstName: string, lastName: string="Иванов") {
    return firstName + " " + lastName;
}

//Неограниченный набор параметров передается в функцию следующим образом:
function addNumbers(firstNum: number, ...numberArr: number[]): number {
	//some code
}

let result = addNumbers(1, 4, 77, 55, 12) //все аргументы после первого попадут в числовой массив

/*Перегрузка функций в TS.
Так как каждая конкретная функция работает с конкретным типом данных, можно объединять
их под одинаковым именем. Такая функция sum будет складывать строки и числа
в зависимости от того, какие данные получит.*/

function add(x: string, y: string): string //задаем вариант вызова, без действий
function add(x: number, y: number): number //задаем вариант вызова, без действий

function add(x: any, y: any): any {
    return x + y;
}

//В более новых версиях используется тип объединения

function myMethod(a: string | number) { //a либо строка либо число.
    //some code
}

------------------------------------

//Более сложный тип перегрузки функции:
//Создадим интерфейс
interface MyPosition {
	x: number | undefined
	y: number | undefined
}
//И еще один на его основе с дополнительным параметром
interface MyPositionWithDefault extends MyPosition {
	default: string
}

//Определяем возможные варианты вызова функции position
function position(): MyPosition //задаем вариант вызова, без действий
function position(a: number): MyPositionWithDefault //задаем вариант вызова, без действий
function position(a: number, b: number): MyPosition //задаем вариант вызова, без действий
//Теперь задаем саму функцию
function position (a?: number, b?: number) {
	if (!a && !b) { //если параметры не заданы
		return {x: undefined, y: undefined} //возвращаем параметры для интерфейса
	}

	if (a && !b) {
		return {x: a, y: undefined, default: a.toString()}
	}

	return {x: a, y: b}
}
//теперь мы можем вызывать position хоть вообще без параметров, хоть с двумя.

====================================================================================================

ИНТЕРФЕЙСЫ

/*Интерфейс это набор свойств и методов, которые объект должен реализовать.
Иными слвоами, это кастомный тип данных. но без реализации.
Они определяются с помощью ключевого слова Interface.*/

interface IUser {
	id: number;
	name: string;
	phone?: number; //необязательный
	[key: string]: any; //указываем что можно добавлять сколько угодно других пар ключ-значение
}

//При реализации интерфейса, создаваемый на его основе объект должен иметь все 
//обязательные поля.

let contact: IUser  = {
	id: 1,
	name: 'Ted'
}

//Другие варианты создания на основе интерфейса
let newObj = {} as IUser
let newObj = <IUser>{}

//Параметры функций (и методов в виде функций) также могут принимать в себя лишь
//объекты или классы, созданные на основе определенного интерфейса.
function getcontact(user: IUser): void {}

//readonly - означает, что свойство только для чтения, нельзя изменить после создания.
interface {readonly x: number;}

//Интерфейсы также могут определять функции, т.е. методы будущих объектов.
//Задается тип принимаемых аргументов и тип выходных данных функции.
//Объект должен будет содержать такую же функцию с таким же параметрами.
interface IUser {
    getFullName(surname: string): string;
}

//Интерфейсы классов
class User implements IUser {...}
//Здесь класс User обязан будет передавть объекту все те же свойства, что и IUser.

//Наследование одного интерфейса другим.
interface IHost extends IUser {
    getAge(): void;
}
//Здесь мы создаем новый интерфейс IHost на основе старого IUser и добавляем в функцию.
//Теперь все объекты, созданные на основе IHost будут должны иметь свойства 
//обоих интерфейсов.

//Интерфейсы бывают: массивов. Так же такой тип записи подходит для большого
//количества одинаковых свойств.
interface IStringArray {
    [index: number]: string;
}
//интерфейсы функций
interface IFullNameBuilder {
    (name: string, surname: string): string;
}

------------------------------

Операторы Exclude, Pick
/*Присваивание в Type ключей интерфейса.
Бывает полезно при перечислении ключей.*/
interface Person {
	name: string
	age: number
}

//Занесем в тип данных названия ключей интерфейса.
type personKeys = keysof Person //получим 'name', 'age'
let key: personKeys = 'name'
key = 'age' //можно
key = 'job' //нельзя


interface User {
	_id: number
	name: string
	adress: string
	createdAt: Data
}

//Создадим тип данных из ключей, но исключая некоторые из них.
type personKeysNoMeta = Exclude<keysof User, '_id' | 'createdAt'>
//Останется только 'name', 'adress'

//Другой метод, но приводящий к тем же результатам.
type personKeysNoMeta = Pick<User, 'name' | 'adress'>
//Будут только 'name', 'adress'

====================================================================================================

КЛАССЫ

/*Базовый функционал такой же, как и в JS. Везде следует указывать типы:*/
class User {
    static id: number = 1 //статическое свойство
    name: string
    constructor(userId: number, userName: string) {
        this.id = userId
        this.name = userName
    }
    getInfo(): string {
        return "id:" + this.id + " name:" + this.name
    }
}

/*В TS у классов есть модификаторы доступа. Это public, protected и private.
Если не указан никакой модификатор, то он по умолчанию расценивается как public.*/
class User {
	public id: number
	public password: number | string
}

Private
//К такому свойству или функции нельзя будет обратиться извне. Также к нему нельзя обратиться
//при создании класса-потомка. К private можно обратиться только внутри самого класса.
class User {
	private _id: number
	private displayID: void () {
		console.log(this.id)
	}
}
let Jack = new User
Jack.displayID() //error

Protected
//Схож со вторым, так как к нему тоже нельзя обращаться извне. Но из классов-потомков - можно.
//То есть при создании класса на его основе в конструкторе можно использовать это свойство.


//Еще одна приятная особенность модификаторов - то, что с их помощью можно скоращать код.
//Если передать их в параметры конструктора класса, то можно существенно упростить код.
//Было:
class User {
	public id: number
	public password: number

	constructor(userId: number, userPassword: number){
		this.id = userId
		this.password = userPassword
	}
}
//Стало:
class User {
	constructor(public userId: number, public userPassword: number){
	}
}


//Здесь так же можно сделать конструкцию с get, set
class User {
	private _name: string;

	public get name(): string {
	    return this._name;
	}

	public set name(n: string) {
	    this._name = n;
	}
}


Абстрактные классы
/*Классы это важная часть ООП в TS. Абстрактные класс отличаются от обычных тем, что
с их помощью напрямую нельзя создать объект. Задаются при помощи ключевого слова*/
abstract class {}
/*Это как класс "геометрическая фигура", ее нет в реальности, но она может задавать набор
методов для всех дочерных классов.
Эти методы лучше задавать как абстрактные методы при помощи ключевого слова abstract, 
так как они неприменимы к самому классу, а лишь только к его потомкам.*/
abstract class Figure {
    abstract getArea(): void;
}
//Все остальные классы создаются на основе абстрактного при помощи extends.

readonly
//Используется как свойство-константа. При компиляции программа понимает, что 
//данное свойство не будет перезаписываться.
class NewClass {
	readonly x: number = 3
}













