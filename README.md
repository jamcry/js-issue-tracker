# Issue Tracking App
A simple yet functional issue tracking app developed with vanilla JavaScript (ES6) *(and HTML5 & CSS3)*.

This project idea is originated from *CodingTheSmartWay*'s [this](https://www.youtube.com/watch?v=NYq9J-Eur9U) tutorial. I have improved and refactored it with ECMAScript 6 features and new version of Bootstrap.

## How it works
* User fills the form with issue information (description, priority, assigned worker) and submits
* A unique issue id is created and assigned to this new issue, and the issue is created.
* The new issue is rendered on the page with options 'Close' and 'Delete'.

## Tools Used
* [Chance.js](https://chancejs.com/), for creating random issue ids
* [Bootstrap 4](https://getbootstrap.com/), for styling
* [Font Awesome](https://fontawesome.com/), for icons in the individual issue cards
* [localStorage](https://developer.mozilla.org/tr/docs/Web/API/Window/localStorage), for storing and loading *-if exists-* issues data in browser's local storage