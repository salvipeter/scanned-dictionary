# Scanned Dictionary Browser #

This is a webpage that shows a given page of a scanned dictionary.

## Usage ##

You need to:

- supply images of the dictionary pages
- write a configuration script, such as `scripts/hindi.js`, such that it
    - sets the title, logo etc.
    - implements a function that compares two words in the dictionary's language
    - contains a list of every page's first word
- change `index.html` to refer to your script

## Examples ##

- R.S. McGregor's Oxford Hindi-English Dictionary
- Hans Wehr's Arabic-English Dictionary
- Mary Haas' Thai-English Dictionary
- Aryanpur Concise Persian-English dictionary

Note that you still need the scanned data, this project only contains the index.

## Mobile/Tablet-friendly version ##

Use `mobile.html` instead of `index.html` (experimental).
