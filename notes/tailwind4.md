# Looking at Tailwind 4

Date: 2024-12-03


## Speed Tests

So I wanted to try the new tailwind v4, in part because it advertises being much faster:

* <https://tailwindcss.com/blog/tailwindcss-v4-beta>
* <https://tailwindcss.com/docs/v4-beta>

I decided to also compare the compiled cli tool from <https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.0.0-beta.1>

Basic setup and installation:

```sh
$ mkdir test-tw4 && cd test-tw4

$ npm install tailwindcss@next @tailwindcss/cli@next
$ cat package.json
#>  {
#>    "dependencies": {
#>      "@tailwindcss/cli": "^4.0.0-beta.4",
#>      "tailwindcss": "^4.0.0-beta.4"
#>    }
#>  }
```

Getting the current cli:

```sh
$ wget https://github.com/tailwindlabs/tailwindcss/releases/download/v4.0.0-beta.1/tailwindcss-linux-x64
               tailwindcss-linux-x64 -O tailwindcss-linux-x64-v4beta
$ chmod u+x tailwindcss-linux-x64-v4beta
# You can check the sha256sum if you wish
```

Race!

```sh
$ time npx @tailwindcss/cli@next -i ./src/main.css -o ./main-npx.css
#>  ≈ tailwindcss v4.0.0-beta.4
#>  
#>  Done in 177ms
#>  
#>  real    0m3.434s
#>  user    0m3.583s
#>  sys     0m0.658s

$ time ./tailwindcss-linux-x64-v4beta -i ./src/main.css -o ./main-cli.css
#>  ≈ tailwindcss v4.0.0-beta.1
#>  
#>  Done in 151ms
#>  
#>  real    0m0.849s
#>  user    0m0.852s
#>  sys     0m0.232s
```

So it's still not very fast? But the precompiled one is? And what meaning is there to the tailwind number when
`time` clearly indicates its slower?

I guess I don't know enough of what npx is doing, and if a big slowdown is spinning up node or something.
Also might be lots more optimizations.

I was curious to see if the cli tool for 3.4.16 was faster than npx, but it seems to be the same speed.
<https://github.com/tailwindlabs/tailwindcss/releases/tag/v3.4.16>

