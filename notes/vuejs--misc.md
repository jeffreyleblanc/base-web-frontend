# Misc Vue Topics

## Non Reactive Data on Components

You can use `this.$options` but note: this is **shared** amoung all instances it seems.

So if you want non reactive per instance, do something like: `this.$my_local_obj = {};` in `constructed`.




