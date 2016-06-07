---
layout: post
title: "Maintainable CSS (or CSS the good parts)"
published: true
---

CSS is kind of terrible. Everything affects everything. It’s impossible to refactor. Code is spaghetti from day one.  And selectors are used to identify elements in scripts as well as applying styles, not to mention the semantic meaning of html tags themselves.

So. Some proposals…

### Element ID
Don’t use ID. Don’t use `getElementByID()`. Don’t use element IDs in your CSS selectors. Just don’t. ID has no benefit over classes for use in CSS or JavaScript. 

There is virtually no case where you can be 100% certain that a style will only ever need to be used on one element in the whole page. Even if you _were_ certain, a class would work just as well!

There is only one acceptable use for id: to enable deep-links to specific elements (with the scroll behavior that entails).

### Tag selectors
Don’t use tag selectors in javascript. In CSS only use them to provide the most basic reset and baseline styles. Never mix tag selectors with class selectors.

### One class selectors
No nesting. If you need more behaviors on an element, add another class. If you need only some of the behaviors of a parent class and you want to override others, your parent class is probably doing too much. Try giving it less responsibility, or if you really can’t – no way, no how – just define a new class. 

Really consider giving the parent class less responsibilities though. If you have to think about the order of the rules in a style block, there are probably too many.

Good:

```css
.my-class { … }
```

Not great (but sometimes necessary):

```css
.my-container .my-class { … }
```

Bad (just create a third class):

```css
.my-class.other-class { … }
```

Very Bad (fully engaged in the precedence war):

```css
.container .sub-element a.special-link.active { … }
```

### Use Naming conventions
You should be able to tell roughly what a class is for (and you’re only using classes right?) by the name.  Establish – at a minimum – a convention for classes that control layout, text styles, and javascript hooks.

JavaScript should not use the same classes as css. 

That would be mixing presentation with logic.

### Use rem (root em) units
em units are kind of crap because if they are nested they compound. Still, it’s great to set the font-size on the body and have everything work from there. And, rems are well supported (IE 9+).

### Use lots of CSS files
You should have one main css file which uses `@import` to bring in everything else it needs. Break up your css so that each logical unit is in it’s own file. Got a custom dropdown widget? super-dropdown.css. What about persistent navigation at the top of each page? header-navbar.css. Login form? login-form.css.

If you have less than 5 CSS files you’re probably doing it wrong. If you have exactly _one_ CSS file you almost definitely are.

ok, ok, ok. I know what you’re thinking: “James, I’ve been doing lots of these ‘wrong’ things and it’s been working fine for me.”

You see, it seems that way at first. IDs, specific selectors, using a class for styles and javascript. These things seem useful and “clean”. Why use two classes when one will do? Because you will not be able to refactor your code. That’s why. And if you let it go on long enough you won’t even be able to change your code without a full round of manual testing.

Most CSS code being written today is technical debt from the moment it’s created. And it’s the worst kind of technical debt: the kind you don’t know you have.