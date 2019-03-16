# awesome-react-typescript-starter
This project aims to simplify starting project.
It contains so much useful things which are, in my opinion, useful to get a really robust application.

It contains :
* Docker
* docker-compose
* eslint
* styled-components
* jest
* cypress (e2e testing)
* commitlint
* etc...


## Docker
My `Dockerfile` is optimised to avoid useless build when no new dependencies were added, or when code did not update.

You can use the Makefile to build production app and run it
```sh
make build
```

```sh
make run
```

### `make build`
This command will build project with default params.
Built image will be named `react-typescript-starter` and accessible port is `8080`.

### `make run`
This one will run an nginx serving static build and expose it to default port `8080`.

## docker-compose
I also included a docker-compose.yml file to ease up and down.
To build and run development server simply run :
```sh
docker-compose up --build -d web
```

To build and run production server run :
```sh
docker-compose up --build -d web-prod
```

## ESLint
I added custom plugins on top of initial ESLint configuration provided by create-react-app.
* `eslint-plugin-jsx-a11y` to ensure accessibility rules are ok
* `eslint-plugin-compat` to ensure we don't use methods that are not allowed in `package.json`'s `browserlist`
* `eslint-plugin-deprecate` to allow deprecating method usages (good for future)
* `eslint-plugin-filenames` to ensure our components are named accordingly to their filename
* `eslint-plugin-import` to ensure imports are resolvable, and order them (avoid dumb merge conflicts)
* `eslint-plugin-prettier` to ensure Prettier does not collide with ESLint rules

## Prettier
Our code is automatically reformated when we save a file, or when we try to commit thanks to Prettier.

## styled-components
We choose style-components because of its great advantages.
* theming
* CSS-in-JS is super useful when we want to refactor or remove a component
* etc

## Cypress
Cypress is an end-to-end testing tool that will allow you to test what your user sees.
I integrated it with aXe-core to allow us to test website or components accessibility (a11y). 

# Final notes
## Commands
You will find all available commands in `package.json`.
Here the ones that you will use often :
* `yarn start` to start application if you don't use Docker

Lint :
* `yarn lint:js` to lint all application's JS files with ESLint. You can append `--fix` if you want autofix
* `yarn lint:js:changed` to lint ONLY changed JS files
* `yarn lint:css` to lint CSS-in-JS or CSS files
* `yarn lint:css:changed` to lint ONLY changed CSS-in-JS or CSS files
* `yarn lint` to lint all application
* `yarn lint:changed` to lint all changed application files

`yarn ci-suite` runs :
```sh
./node_modules/.bin/eslint src --ext .js,.jsx,.ts,.tsx && \
    ./node_modules/.bin/stylelint src/**/*.{js,jsx,ts,tsx} --config .stylelint.styled.json && \
    ./node_modules/.bin/stylelint src/**/*.{css,sass} --config .stylelintrc && \
    CI=true ./node_modules/.bin/react-scripts test && \
    BROWSER=none ./node_modules/.bin/start-test 8080 test:e2e
```

... All commands are listed in `package.json` and are pretty self-explanatory.
So I won't list them all here, cuz' they all are important and useful.

## Contributions
We also lint your commit names thanks to `conventional-commits`.
If commit content or commit name is not valid, we will be rejected.

So it helps you to keep maintainable code
