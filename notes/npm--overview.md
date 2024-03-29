# Npm

## Installing and Project Structure

`npm` will either install packages:

* `npm install PKG` in the local project at `./node_modules`
* `npm install -g PKG` within `/usr/local/...`

If we want to install from a local path:

* `npm install $PATH_TO_THE_MODULE_DIRECTORY`
* Also review `npm link` for similar

Some other `npm install` options:

* `--save-exact`: use exact version numbers
* TODO: fill in more common options

The basic structure of a project is:

```sh
root/
    node_modules/
    package.json
    package-lock.json

    # Other user made directories like:
    src/
    dist/
```

See links for more on the `.json` files, but in summary:

* `package.json` contains information on the project package including
    * list of dependencies
    * scripts for dev or build
    * meta information like author, date, etc
* `package-lock.json` contains a sort of version history of the actual packages installed.


## Links

* <https://docs.npmjs.com/cli/v9/commands/npm-install>
* <https://docs.npmjs.com/cli/v9/configuring-npm/folders>
* <https://docs.npmjs.com/cli/v9/configuring-npm/package-json>
* <https://docs.npmjs.com/cli/v9/configuring-npm/package-lock-json>


