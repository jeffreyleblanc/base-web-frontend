# Vue Router

Routing refers to synchronizing a SPA view to the URL path (and potentially query args)

https://router.vuejs.org/

https://unpkg.com/browse/vue-router@4.1.6/dist/

https://unpkg.com/vue-router@4.1.6/dist/vue-router.esm-browser.js

## Make Your Own

A basic sketch for a simple make our own router system:

```javascript

function main(){
    // Track the path on the global object
    G.uistate.path = "";

    // Provide a method to change the path
    G.set_path = (path)=>{
        // Normalize the path so it has no '#'
        const norm_path = (path.startsWith("#")?path.substring(1):path;
        G.uistate.path = norm_path;
        window.location.hash = "#"+norm_path;
    };

    // Add a listener for the change on the page
    window.addEventListener("hashchange",(event)=>{
        if(window.location.hash != `#${G.uistate.path`){
            G.set_path(window.location.hash);
        }
    });

    // Force the path to the starting path
    G.set_path(window.location.hash);

    // Provide vue shortcut
    app.config.globalProperties.$setpath = G.set_path;
    // So that in any component you can:
    // <div @click="$setpath("/something")>Go somewhere</div>
}

/*
Now in

*/

```

