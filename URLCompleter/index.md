# URLCompleter

A Python class for merging URLs.

## Usage
First, initialize the `URLCompleter` class, like this:
```
comp = URLCompleter()
```
Then, call the `comp.complete()` function, like this:
```
print(comp.complete('example.com', '/path', 'path2', 'index.html'))
```
**Output**:
```
https://example.com/path/path2/index.html
```
The `comp.complete()` function takes two arguments: ***domain***, and ***paths***, where ***domain*** is the domain, and ***paths***, all the paths/files/queries you want to join. You can pass as many ***paths*** as you like.

If a value that is passed isn't a string, a `ValueError` will be raised.
