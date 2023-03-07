# Misc Patterns to Incorp

## Optional Object Paths

```javascript
# Define a nested object
l = { a: { b: { c: "hi" } } }

# We can access deep paths
l.a.b.c
#> 'hi'

# And first order attributes resolve
l.a.b.yak
#> undefined

# But missing chains do not
l.a.quack.d
#> VM193:1 Uncaught TypeError: Cannot read properties of undefined (reading 'd')

# Unless we use `?.` chains
l.a?.quack?.d
#> undefined
```

