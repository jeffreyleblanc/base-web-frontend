# About

This directory contains scaffolds for front ends that require "no build step".

## Running

The system uses `python3` and `python3-tornado`.

To run, simply `./server.py` from this directory, which serves at <localhost:8888>.

The paths are:

* <localhost:8888/> -- A list of links to examples
* <localhost:8888/example/NUM> -- The page for that link
* <localhost:8888/reload/> -- Reload information on contents of `/static/` where the examples are

