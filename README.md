# No more switch statements!

This is a wrapper around reducers and action_types, which helps you work with redux in a OOP way, specifying `Events` and writing **only** the required logic, with minimal boilerplate.

# This still doesn't solving the fundamental problems of working with redux
Redux is not a plugin to the application. Redux forces you to work in a certain way under a certain architecture (which is good IMO) but doesn't allow you to easily do TDD. Which means by definition any code you write right away becomes legacy. You cannot refactor easily and you have tight coupling between things which should be separated.

By writing the tests first, you quickly define what you need and can disregard all other as unnecessary clutter. This isn't possible using redux, as you must create your store, actions and reducer before even writing a simple use-case test.

# So, where do we go from here?
We're working on a series of blog posts describing this problem in detail and the solution we think we have. The true benefit of redux in react apps is the automatic UI reactions you get when updating the state. This is can be perfectly accomplished using any other library (for example mobx) while the logic and app state can be constructed and structured in a clean way, without any boilerplate, using tests as our guide.

see https://github.com/wix/remx
