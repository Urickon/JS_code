JEST

//===================================Unit-testing
/*In other words module testing, block testing. It's about isolation and separation of code blocks, some small parts of the program.
Tests should be written for every significant function or method.

There are also integartion tests - which combine modules together and check how they work with each other.
And end-to-end tests (E2E) - testing from user interface to the moment when server returns data and user sees it on his interface. In a nutshell 
these are some kind of global integration tests, which show process from the very beginning to the very end. It gives you the highest
coverage of the code.*/


//===================================TDD  - test driving development
/*Its a way to develop software, based on short developing cycles. First developer create test, and then write code 
for this test. In a nutshell you can think about it as a conception "Tests first, code after"*/


//===================================Common principle of working
/*Every project is differnt. The way of testing which was good in one proj can be useless in another.

Which characteristics of tests are important:
1. test should be fast
2. test should not break often
3. easy to read and understand to another person
4. test should really catch bugs
5. test should have good coverage*/


//===================================BASEMENT
test()
test.only()
// main commands to test

describe // grouping tests


//===================================MATCHERS
toBe, not.toBe // simple matcher for primitives (use Object.is)

toBeGreaterThan, toBeGreaterThanOrEqual, toBeLessThan, toBeCloseTo // ... number matchers

toEqual // recursive matcher for objects and arrays

toBeNull, toUndefined, toBeTruthy, toBeFalsy // boolean matcher

toContain // checks if the result contains an element

toMatch // string with RegExp matcher

toBeCalled, toBeCalledTimes(x) // function matchers


//===================================Hooks
// Нужны, чтобы не затрагивать глобальную область видимости при работе с тестами, так как для разных тестов может быть характерно изменение данных
// из глобальной области видимости.
beforeEach() // выполняется перед каждым тестом в своей области видимости
afterAll () // выполняется после каждого теста (функции test())


//===================================Asyncronous
// There are several ways to work with asyncronous functions in Jest. You can use async/await, try/catch to catch errors, or return Promise.
// There are also .resolves matcher and .rejects to deal with errors.


//===================================Mocking