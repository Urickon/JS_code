<----------------CONSPECT REACTJS()----------------->

=====================================================================================================

HOW TO LEARN

/*
1. Always draw schemas, recap and outline your knowledges after every lesson.
2. Focus only on your study subject. In this case it is React, dont do a lot of markup or styling.
3. Try to understand how it works, not only how to write code on React.
4. Highlite on new features and focus on them but understand old features (like Class components in React)
5. Think about problems, which React is solving
*/

=====================================================================================================

REACT CONCEPTS (hard theory)

React Create App
/*
It is a set of tools which helps to build React App with one click. It includes babel and webpack.
It has one main dependency - react-scripts to manage the hole App.
react-scripts - is a container for babel and webpack.
npm run eject - separates babel and webpack configs.

You can successfully create a React application without using React Create App, and for advanced development it may be better.. 
*/

------------------------

Virtual DOM
/*
Evolution of web is decreasing markup and increasing JavaScript.
Basic DOM is very slow. Virtual DOM - is a lightweight copy of basic DOM. Virtual DOM has observers that watch for data changes.
When data was changed in virtual DOM, Application compares it with real DOM and changes it optionally, without rebuilding all the DOM.
So, virtual DOM is a lightweight JavaScript object.

In very old days browsers reloaded page every time when some new info from server was received.
Today server just sends a JSON, and JS on the client side puts it into markup without reloading page.
We can simply change one part of the App and keep another parts safe.

Today we have a lot of JS and radically small initial HTML in our page. We have lots of logic in our site, so it is better to call it web Application.
Site  - is an old type of data presentation
React maximizes this concept.


*/

------------------------

STYLES
/*
Styles in react builded application are js code too. There are no css-files that your browser receives.
One of useful concepts of react is dynamic styles. 

You can use inline styles: style={camelCaseStyle: 'css-property'}, you can use variables of type string with css-props: style={var1: var2}.

You can create module style.js., then import it like object with properties. Properties will be your classes. style={importedStyle.yourClass}.

You can use STYLED COMPONENTS module.

You can use concept of css modules. Just use Component.module.css: import styles from './Component.module.css' className={styles.yourClass}.
*/

------------------------

JSX
/*
Format combining data and markup - it is a kind of synthax in JS.
word class is reserved, so use className instead. 

In JSX we have functions not markup, functions that return markup.

Component, React component - is a function that return JSX. This function can be used as a tag.
export const Table = () => {} or <Table />
Name of react component should start with uppercase letter (otherwise it will be a simple html tag).

To use JS in JSX - {}
*/

------------------------

Import/export
/*
React uses system of import and export - MODULE SYSTEM. Module is a single script. Some time ago there were
libraries for implementing module system in JS, but now JS has its own import/export system. Every module
has it's scope. Usually every module is a single file.
When something is imported from module, code runs only once. On next imports module just exports prepared
data. The main purpose of module is to prepare and export data.
In vanilla JS modules can be used only in <script type="module">.
We have lots of BUNDLERS, like Webpack, to work with modules more efficently.

Export can be before declaration: export function App;
or after declaration: const App export App;

Export as: export { sayHi as hi } - shorter and more useful

Export default - exports even without name. One file (module) can have only one export default.
Export default function () {} - will olso work.
You can import such module with random name.
To avoid mess in names it's recommended to import with exactly the same name as name of the file:
import router from 'router.js'

Reexport - when you export smth from module you can automatically import it.
So: export * from 'user.js' in file module.js will first import data from user.js to module.js and
then export it where you need. You can build chains of exports.
But export * does not work with default.

--------------------------

import * as obj from module.js; obj.sayHi() - imports all exporting functions
import { sayHi } imports only what you need - minifies workload.

import { sayHi as hi } - use with name hi.

import module.js - only runs code of the module

--------------------------

Import/export works only in global scope, does not work in { ... }
Path to module should be a string.

--------------------------

Dynamic imports - import('path')
It's a special synthax that returns promise, and promise returns importing object.
So work with it in async functions: await import('pathToModule')
or import('path').then().catch()

This works in scopes {} and does not need <script type="module">.
*/

------------------------

Hooks
