# Installing node on Linux


## Installation

As of `Ubuntu 23.04` node is new enough so:

```sh
# Install
$ apt-get install nodejs npm

# Check versions (may be updated)
$ node --version
#> v18.13.0
$ npm --version
#> 9.2.0
```

## Direct Install

For linux distributions where you can only get fairly old versions via the package manager, the following pattern works well to install an up to date version.

Note that you should only do this if you don't have a package manager based node install. You will also want to use an updated node version.


```sh
# Download and check shasum (may change depending on version)
curl -O https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-x64.tar.xz
sha256sum node-v16.13.0-linux-x64.tar.xz | cut -b 1-64 )
#=> a876ce787133149abd1696afa54b0b5bc5ce3d5ae359081d407ff776e39b7ba8

# Unpack and move into /usr/local
tar -xf node-v16.13.0-linux-x64.tar.xz
mv node-v16.13.0-linux-x64 /usr/local/

# Soft link the node executables into /usr/local/bin"
ln -s /usr/local/node-v16.13.0-linux-x64/bin/node /usr/local/bin/node
ln -s /usr/local/node-v16.13.0-linux-x64/bin/npx /usr/local/bin/npx
ln -s /usr/local/node-v16.13.0-linux-x64/bin/npm /usr/local/bin/npm
ln -s /usr/local/node-v16.13.0-linux-x64/bin/corepack /usr/local/bin/corepack
```

