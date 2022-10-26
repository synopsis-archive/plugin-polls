# Plugin-Template

## Repository configuration

A git submodule is used to reference projects from the main core repository.

To initialize the core submodule, use the following command after cloning this repository:

```
git submodule update --init --recursive
```

## Development

Develop your plugin in the `CorePlugin.Plugin` project. You can then start the `CorePlugin.BackendDevServer` to run your
plugin.

`frontend` contains an empty angular project with tailwindcss already configured.

> ⚠ You should not change the `CorePlugin.BackendDevServer` as it already calls the configure methods of your plugin and is only used in development thus it will not be included in the deployment of your plugin.