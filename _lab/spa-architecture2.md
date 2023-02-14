# A SPA Sketch

Let's revisit a certain setup with data classes like so:

* Collection
* Object
* Status

Now we want a path mapping like:

```sh
/       =>  [ c for c in collection ]
/c/:id  =>  collection info
                [ o for o in collection where o.c_id==:id ]
/o/:id
        =>  object info
                <- /c/:id
/s
        => status
```

from server then we want to be able at basic to:

```
fetch
    /c/
    /c/:id
    /o/
    /o/:id
    /s/
```

Our data manager fetch flow might look like:

```sh
start
path = /
fetch /c/ => resp
    => store.c = resp
path = /c/:id
    push cycle:
        fetch /c/:id => resp
        store.c[id] = resp
path = /o/:id
    pop cycle
    push cycle
        fetch /o/:id => resp
        store.o[id] = resp
```
