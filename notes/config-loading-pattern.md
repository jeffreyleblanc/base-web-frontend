# Config Loading Pattern

In the `<head>` block place a script block similar to:

```html
<head>
    <script id="my-config-data" type="application/json">
        {"key":"value"}
    </script>
</head>
```

Then in your main javascript file:

```js
// The utility
function load_json_block(script_block_id, on_success, on_error){
    let CONF;
    try {
        CONF = JSON.parse(document.getElementById(script_block_id).text);
    }catch(error){
        CONF = null;
        console.error("load_json_block error:",error);
        if(on_error!=undefined){on_error(error);}
    }
    if(CONF!=null){
        on_success(CONF);
    }
}

// Run it
function main(CONF){
    // do stuff...
}
load_json_block("my-config-data",main);
```
