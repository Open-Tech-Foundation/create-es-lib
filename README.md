<div align="center">

# @open-tech-world/create-es-lib

[![Linux Build](https://github.com/open-tech-world/create-es-lib/actions/workflows/linux_build.yml/badge.svg)](https://github.com/open-tech-world/create-es-lib/actions/workflows/linux_build.yml) [![macOS Build](https://github.com/open-tech-world/create-es-lib/actions/workflows/macos_build.yml/badge.svg)](https://github.com/open-tech-world/create-es-lib/actions/workflows/macos_build.yml) [![Windows Build](https://github.com/open-tech-world/create-es-lib/actions/workflows/windows_build.yml/badge.svg)](https://github.com/open-tech-world/create-es-lib/actions/workflows/windows_build.yml) [![CodeFactor](https://www.codefactor.io/repository/github/open-tech-world/create-es-lib/badge)](https://www.codefactor.io/repository/github/open-tech-world/create-es-lib) ![npm (scoped)](https://img.shields.io/npm/v/@open-tech-world/create-es-lib?color=blue)

</div>

> Node.js CLI tool for creating modern ECMAScript libraries.

## Features

✔️ Zero-Config to Get Started 🚀

✔️ Completely Customizable

✔️ No Lock-In Framework

✔️ Follows [Semantic Versioning 2.0.0](https://semver.org/)

## Tech Stack

✔️ [ESLint](https://eslint.org/)

✔️ [Git](https://git-scm.com/)

✔️ [Jest](https://jestjs.io/)

✔️ [Prettier](https://prettier.io/)

✔️ [Rollup](https://rollupjs.org/guide/en/)

✔️ [Typescript](https://www.typescriptlang.org/)

## Library Types

🚧 Browser (WIP)

🚧 Node.js CLI (WIP)

✔️ Node.js Module

🚧 React (WIP)

## Requirements

- Node.js ^12.22.0 || ^14.17.0 || >=16.0.0
- Latest Npm or Yarn

## Install

⚠️ You should not install this package locally or globally, and it is only used to run on the CLI.

## Usage

Using npm
```bash
npx @open-tech-world/create-es-lib@latest my-lib
```
Using Yarn

```bash
yarn create @open-tech-world/es-lib my-lib
```

## Troubleshooting

❌ Error: Cannot create "/usr/local/bin/create-es-lib" due to insufficient permissions.

You can fix the above error by giving `sudo` access to the command line and after library created, change the library folder owner using `sudo chown -R $USER:$USER my-lib`.

## Getting Started

Post creating a library, follow the on-screen instructions to get started.

## License

Copyright (c) [Thanga Ganapathy](https://github.com/Thanga-Ganapathy) (MIT License).
