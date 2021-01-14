
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




























































