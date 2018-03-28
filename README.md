# Scanned Dictionary Browser #

This is a webpage that shows a given page of a scanned dictionary.

## Usage ##

A Hindi dictionary setup is included, as an example. You need to:

- supply images of the dictionary pages
- write a configuration script, such as `scripts/hindi.js`, such that it
    - sets the title, logo etc.
    - implements a function that compares two words in the dictionary's language
    - contains a list of every page's first word
- change `index.html` to refer to your script
