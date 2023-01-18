# Installing node on Linux

## Direct Install

The following will install node directly on your machine

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

