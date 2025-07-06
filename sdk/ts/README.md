# @sasiru/gpodder

[![npm version](https://img.shields.io/npm/v/@sasiru/gpodder?color=blue&style=flat-square)](https://www.npmjs.com/package/@sasiru/gpodder)
[![license](https://img.shields.io/npm/l/@sasiru/gpodder?style=flat-square)](./LICENSE)
[![build](https://img.shields.io/github/actions/workflow/status/sasiru/gpodder-ts-sdk/ci.yml?branch=main&style=flat-square)](https://github.com/sasirura/gpodder)

A modern TypeScript SDK for [gpodder.net](https://gpodder.net) API v2.11.

Supports public podcast discovery and authenticated subscription management via username/password login. Works in Node.js and modern bundlers.

---

## ✨ Features

- 📡 Access **top podcasts**, search, and podcast metadata
- 🔐 Login with `username` + `password`
- 🔄 Manage device subscriptions: upload, get, and delta
- 💅 Fully typed and tree-shakeable ESM output
- ⚡ Lightweight and dependency-free

---

## 📦 Installation

```bash
npm install @sasiru/gpodder
# or
yarn add @sasiru/gpodder
```

🚀 Quick Start
Import
```ts
import { login } from '@sasiru/gpodder'

Authenticate and get a client

const { client } = await login({
  username: 'my-username',
  password: 'my-password',
})
```