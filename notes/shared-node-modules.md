# Using Local Shared Node Module

Note: this is a rough document.

Imagine we have the following file layout:

```sh
sources/
    app1/
        src/
        package.json
        # etc
    app2/
        src/
        package.json
        # etc
    common/
        mymodule/
            package.json
            # etc
```

* For `app1` and `app2` we can use `npm install ../common/mymodule` to get the local module.
* So long as this directory structure remains, if we've removed the `node_modules` directory, `npm install` will correctly get the local module
* If we want to update an app we can:
    * Update the version number in `mymodule/package.json`
    * Explicitly `npm install ../common/mymodule` in each app

We should read more about <https://lerna.js.org/> which can help in these kinds of patterns I think.

