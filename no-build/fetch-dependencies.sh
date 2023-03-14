#!/bin/bash

set -e

printf "Download dependencies\n\n"

printf "Download vue\n"
wget -O _lib/vue.3.2.45.global.prod.js https://unpkg.com/vue@3.2.45/dist/vue.global.prod.js
wget -O _lib/vue.3.2.45.esm-browser.prod.js https://unpkg.com/vue@3.2.45/dist/vue.esm-browser.prod.js
wget -O _lib/vue-router.4.1.6.esm-browser.js https://unpkg.com/vue-router@4.1.6/dist/vue-router.esm-browser.js
printf "Download tailwind\n"
wget -O _lib/tailwindcss.3.2.4.js https://cdn.tailwindcss.com/3.2.4

printf "Edit vue-router\n"
sed -i '7s/.*/\/\/ removed import from devtools /' _lib/vue-router.4.1.6.esm-browser.js
sed -i '2509s/.*/function addDevtools(app, router, matcher) { return;/' _lib/vue-router.4.1.6.esm-browser.js

printf "\nComplete\n"
