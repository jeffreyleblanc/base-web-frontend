# Base Web Frontend

## Motivation

Web frontend development shouldn't be difficult.

However, the proliferation of libraries, build tools, and mediocre Medium articles has made me feel like I'm caught in a useless loop in the past.

Developing a variety of SPA and visualization interfaces over the past few years has
convinced me to try to consolidate the best working practices and patterns I've
uncovered in a single place.

My goal is also to develop usable scaffolds with the minimum of libraries, e.g.
just Vue and Tailwind, and show how some basic patterns for data flow and css can 
free us of the ultimately heavy and cumbersome reliance on additional libraries.

## Overview

This project collects core patterns for setting up and building web frontends.

It currently focuses on utilizing the following libraries:

* Vue3
* Vue Router (version 4)
* Tailwind Css

In addition, the aim is provide scaffolds for:

* no-build setups
* build setups that use vite or esbuild depending on the libraries used.

## Sections

This is still being fully developed but the goal is the following:

* various stages of SPA using Vue3 and Tailwind
    * no-build versions
    * build via vite versions
* basic SPA UI using Tailwind component layer extensions
* examples of mobile/desktop responsive css
* example of light/dark theme css
* direct SVG js manipulation built with esbuild
* direct Canvas API js manipulation built with esbuild

