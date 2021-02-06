
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
When data is changed, UI will react and change automatically.*/

--------------------------------------------------------------

TWO-SIDES_BINDING
/*Ok, Vue can change UI when it gets new data. But the other side of this coin is to
to react on users actions. Vue also can change data when user is changing something in UI.
So, it works on both sides:
Data <----- ------> UI

Реализуется данный механизм при помощи директивы v-model*/

--------------------------------------------------------------









































































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



















