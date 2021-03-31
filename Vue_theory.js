
<----------------CONSPECT VUEJS()----------------->

=====================================================================================================

VUE CONCEPTS (hard theory)
/*Why do you need Vue.js?

The main purpose of frontend ingeneer is to load data from somewhere, to render it on browser page
and to send some another data to server. It's like:
Data <-- --> JS <-- --> HTML
DRY! Dont repeat yourself! Dont do the same tasks again and again*. That's why frameworks and libraries
were created. Difference between them will be explained later.

Now about projects. There are 3 types of knowledge in every project:
1. Fundamentals - algorythms and so on
2. Stack - it is a set of libraries and technologies. Determined methods of solving problems. So a 
new member of a team already knows it and should not learn**.
3. Project knowledge - specific rules and methods of working in project or team. 
There are differnet ways of coding in every team.
We must minimize that part
because every new member of a team spends a lot of time to learn this knowledge.*/

//So frameworks are solving problems of reiteration* and standartization** in web-developing. 

/*The difference between library and framework:
Libraries are required by developer. You just use methods from it. Only you decide when and how.
Framework gives you a frame. It gives you less freedom, and it's good, because it minimizes specific project
knowledge. It gives you a system, and you can concentrate only on some part of it. 

And this is about system of components .vue. It's a part of your application, which has its own
HTML-structure, JS-code and styles. Creators of vue were inspired by system of web-components.
So, it is a frame of vue. Vue has rather tough structure.*/

--------------------------------------------------------------

REACTIVITY
/*So, we have Data and we have UI. One of the main purposes of frontend is to keep this two things
synchronized. When data is changed we must change UI. In pure JavaScript you must create functions and
bind them to HTML-elements, and then revoke function every time you want to change UI.

Reactivity of Vue is solving this problem automatically. Vue can bind data and UI. We don't care about data.
When data is changed, UI will react and change automatically.

By the way, there are two concepts - Data and State.
Data is a set of information
State is more complicated structure, which can be changed during our session.
You can erquire data from server and get it. When you need to update data you just load new data.
But when you got data, and a lot of components started work with it, data becomed state.
Reactivity is about when a lot of components are using the same data. For example, it is vuex.*/

--------------------------------------------------------------

TWO-SIDES_BINDING
/*Ok, Vue can change UI when it gets new data. But the other side of this coin is to
to react on users actions. Vue also can change data when user is changing something in UI.
So, it works on both sides:
Data <----- ------> UI

Реализуется данный механизм при помощи директивы v-model*/

--------------------------------------------------------------

DECLARATIVE AND IMPERATIVE

/*Imperative method is a strict method of coding. It's when you give to the program a strict command, like:
const a = 20
let name = 'Yuriy'
console.log('a')
You use declarative method when you give abstract order, that must be done. But you don't control the process
of the implementation. It is used in HTML. You just say "I want a div here". You don't control the process
of drawing div-element.

Another example:
JS (imperative):
for (i=0; i<10; i++)

SQL (declarative):
SELECT * FROM courses WHERE id > 2

The most imperative is machine language of processor. The most abstract lang is the most declarative.

VueJS is also declarative. You only say what you want to be on screen.
That's why Vue is so fast. Because it knows how to do what you want in the best and shortest way.
So, Vue does a lot of work 'under the hood'. It's your 'elder brother', which makes imperative code
(which processor needs) from your declarative code. And it does it's work the best way.*/

--------------------------------------------------------------

BUSINESS LOGIC OR REALISATION?
/*Business logic is about what you do. Realisation is about how you do it. For ex:
The task of business logic is to get films list from server. The task of realisation is to
complete the business logic's task. You can do it with axios, fetch, web socket, or even localStorage.
Business logic layer does not want to know how you will complete ist's task. It just want list of films.

This is a key point.

One of the main rules is not to mix business logic (how to show) and realisation logic (how to get what to show).
So, main task of the component is to show data to user. Don't add getting data to component. It is 
a violation of Single Responsibility principle. 
There is one another reason not to do it. When smth is changed in backend, you must change requests. And it's
easy to do when all working with API logic is separated from other components in one or two files. 
Components just get info from this file using standart methods. You don't need to change all the components in 
that case.

Little duck method. Just start to talk to little duck. Explane it all you code. And when you say:
"This component is responsible for smth AND - here you must stop. One component should have only one area
of responsibility."*/

--------------------------------------------------------------

HTML-first
/*There are two ways to show something on the screen. 
1. With JavaScript (React). We create render function, which makes our page. It's imperative templating.
It is a set of hard instructions.
2. With HTML and special markup (Angular and Vue). We called it HTML-first. It is decalrative templating.
We only give our intentions.
<li v-for:"item in items"> - this is just intention. Vue does it by itself.

So, one of main vue concepts is HTML-first.*/

--------------------------------------------------------------

COMPONENTS
/*Vue component system.
For what and how it works (main principles)
The main purpose of the components system is to provide incapsulation (isolation of elements).
Incapsulation is a hiding of realisation inside the element.
It does not make the system more simple. It optimizes the system and divides it into incapsulated elements.
Another important word is Interface. Every component has its own interface. We can imagine it as a
black box. We don't need to know what is in the box. We just need an interface to interact with it.
Of course, interfaces must be universal and comparable. Interface binds an element with another elems.
It is 'props', 'emits' and so on.

So, components are incapsulated parts of our application. Interfaces help them to interact with each other.

Component is HTML+JS+CSS

Components are closed systems, so they don't provide event propagation. We can manually do that,
but by default 'what happens in component, stays in component.'*/

=====================================================================================================

VUE NUANCES (important moments)

How to integrate something to vue system
/*When you need to add some tech to vue (webSocket, axios, apollo)
First ask a question: 
1.Does your tech need reactivity (automatically render  it's data on page)?
For example axios provides data, but it is not data to render on page, first you should handle with it.
So, the answer for axios in 'no'.
If yes - use npm installer (for example GraphQL).
If no ask second question:

2. Can it be a visual component? 
If yes - use vue-x or global big package (For exapmle GoogleMaps)
If no or not sure - use pure JS to deal with it. Don't use special librares for it.*/

Are you really good on vue?
/*One of the best ways to discover how a person knows technology is asking him about disadvantages of this 
technology. There is no 'SILVER BULLET'. And vue is not an exeption. So, don't start a holy war. If 
you think that technology is perfect, you just know it bad.

Vue - is an abstraction above HTML and JS. Pareto law works here - we can solve 80% of JS and HTML problems,
doing only 20% of work with the help of Vue. But we can't easely solve all the problems with vue.

Vue, Angular, React - none is bad. They can be bad in some cases. But good in another. If you want to
master any of them, you must know when to use it (to use it's advantages) and when not to use it
(to avoid it's disadvantages).

So, we can call it 'Theory of restrictions'. Any technology has some restrictions.
Every time think about is vue really needed or not. Vue is not a silver bullet.*/

Nuances of learning (with Coursera 'learning to learn')
/*TDD - test driving development - its an approach to write code, when u first write it badly,
just showing the idea. And after that u refactor it.
The idea is that you must know how to write good code and how to write bad code.
Don't just repeat from videos. Try to write code by yourself. Make mistakes. Fix it.

As Leo Tolstoy said: "All happy families are happy like each other, and all hapless are hapless in
their own one. There are a few approaches to write good code and a lot of approaches to write bad code.

Refactoring is a very necessary skill, so learn to find mistakes in code too, not only
to write good and beautiful code."*/

=====================================================================================================

PRACTICE

//Main directives
v-bind: // :
v-on: // @
@click = "method" === @click = "method()" //and many of them (you just dont need to create pure js events)
@click.stop = "method" //stop propagation
@submit.prevent = "method" // preventDefaul

v-if
v-else
v-for (:key="key")
v-model
v-show //works as v-if but it renders all html (so you can work with html even when it is not displayed)
//v-if renders only when the condition is true.

//Everytime you need a helper element, such as wrapper, use
template

//Place data right in html with the help of
{{ data }}

slot
//Slot helps to use templates. Slot will take all data that is between template tags. For ex
//we have a <popup></popup> components. <popup>{{dataToSlot htmlToSlot}}</popup>
//If component dont't have v-slot, any content between its tags will be discarded.

/*We can specify slots giving them name attribute and refer to this name in our template
<slot name="header"></slot>
...
<template v-slot="header"></template>*/

//Working with dynamic classes
:class = " x > y ? 'myClass' : '' "
:class = " x > y ? 'class1' : 'class2' "
:class = " {'myClass': x > y, 'anotherClass': x = y, ...} "

//Dynamic style
:style=" {height: `${value}`} " 
:height="value"

//Interact between components
v-bind:param="param" //in parent
props: { param } //in child

$emit('my-event', parameter) //in child
v-on:my-event="action($event)" //in parent

//Computed============================================================================
computed: {
	computedValue (value) {
		return value.filter(v => v > 2)
	}
}
//It's better then methods, because computed values can be cached. So application does not count them every
//time when you use it. They are counted (computed) only when the base value is changing.


//Life circle============================================================================
//Creational hooks - to GET and UPDATE DATA
beforeCreate //before init of reactivity - can't access data. 
created //access to data, but no access to real DOM (not rendered). Best time to AJAX

//Mounting hooks (the most usable) - to RENDER and CHANGE HTML on page
beforeMount
mounted //access to DOM, changing HTML

//Updating hooks
beforeUpdate //on data changing but before changing DOM
updated //after DOM has been changed

//Destructing hooks
beforeUnmount //before deleting the component from DOM (for ex in v-for directive). Best time to turn off event listeners
unmounted //for ex to send message about destroying to server


//========================================================================================
//One of the main vue concepts is not to call elements directly. Use v-bind wherever you can. 
//$refs are emergency method.
//Another base concept is template. Use template wherever you can. DRY! (don't repeat yourself)
//Make all templates reusable. Use props to send info to template wherever you can, not defined values 
//(to make your template more multipurpose).
props: {
	name: {
		type: String,
		required: true, //Makes prop mandatory
    default: 'Tom',
    validator: function(value) //to check value, throws an error when returns false.
	}
}





