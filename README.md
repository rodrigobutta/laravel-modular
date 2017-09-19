# laravel-modular
An scalable and plugable laravel in order to keep things isolated.

*this is not an ready-to-use project yet* 

### Purpose
The purpose of this project, still in **BETA**, but with a working copy, is to make pluggeable and isolated modules, so, everything that a module need, for example, "Product Module" remains inside its own folder, for example "app\Modules\Product".

The only thing Laravel needs to recognize this module is to reference its provider in the /config/app.php

```
App\Modules\Product\ProductProvider::class
```

After this, the routing, controllers, requests, notifiers, views and repositories are handled in an isolated way.

### Benefits

* Large projects remains more clean and scalable.
* Modules can be replicated of a base modules repository (coming soon) like a "template", for example, a "list++sortable+view" module, who will have its front and admin facilities.
* You wont be needing to make a custom git package for every module. The purpose of this is to remain modular but esasy to a standalone job handle.

### Work in progress

I'm still working on this, so if you have any comments, you can reach me at [rbutta@gmail.com](mailto:rbutta@gmail.com)


### Laravel 5.5

Laravel 5.5 can handle dependencies without having to define them, so, i'll be making some test for this soon.
