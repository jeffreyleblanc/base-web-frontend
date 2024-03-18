# Structure

The purpose of this system is make it easy to build clear SPA.

This is the basic css (some comments are tailwind classes):

```css
/* Basic Reset */

    /* Use Box Sizing */
    *, *::before, *::after {
        box-sizing: border-box;
    }
    /* Remove default margin and padding */
    * {
        margin: 0;
        padding: 0;
    }

/* Core Structure */

    .ux-spa-root {
        /* @apply h-screen w-screen relative overflow-hidden m-0 p-0; */
        height: 100vh;
        width: 100vw;
        position: relative;
        overflow: hidden;
        margin: 0px;
        padding: 0px;
    }

    .ux-parent-col {
        /* @apply flex flex-col items-stretch; */
        display: flex;
        flex-direction: column;
        align-items: stretch;

    }
    .ux-parent-col > .ux-child-expand {
        /* @apply flex-1 min-h-0 overflow-auto; */
        flex: 1 1 0%;
        min-height: 0px;
        overflow: auto;
    }

    .ux-parent-row {
        /* @apply flex flex-row items-stretch; */
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }
    .ux-parent-row > .ux-child-expand {
        /* @apply flex-1 min-w-0 overflow-auto; */
        flex: 1 1 0%;
        min-width: 0px;
        overflow: auto;
    }

    .ux-parent-stack {
        /* @apply relative; */
        position: relative;
    }

    .ux-parent-stack > .ux-child-expand {
        /* @apply pin-top-left full-size; */
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
    }

    .ux-w-full {
        /* @apply w-full; */
        width: 100%;
    }
    .ux-h-full {
        /* @apply h-full; */
        height: 100%;
    }

```


Simple HTML example:

```html
<body class="ux-spa-root ux-parent-col">
    <nav class="ux-w-full">
        My navigation bar
    </nav>
    <div class="ux-child-expand ux-parent-row">
        <nav class="ux-h-full">
            Side bar
        </nav>
        <main class="ux-child-expand ux-parent-col">
            <h1>Main content</h1>
            <p>More stuff</p>
        </main>
    </div>
</body>
```
