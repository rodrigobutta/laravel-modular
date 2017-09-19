# laravel-modular
An scalable and plugable laravel in order to keep things isolated.

The purpose of this project, still in BETA, but with a working copy, is to make pluggeable and isolated modules, so, everything that a module need, for example, "Product Module" remains inside its own folder, for example "app\Modules\Product".

The only thing Laravel needs to recognize this module is to reference its provider in the /config/app.php

App\Modules\Product\ProductProvider::class

After this, the routing, controllers, requests, notifiers, views and repositories are handled in an isolated way.

The main benefits:

- Large projects remains more clean
- Modules can be replicated of a base modules repository (coming soon) like a "template", for example, a "list++sortable+view" module, who will have its front and admin facilities.

