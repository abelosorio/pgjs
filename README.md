# pgjs

## 🚧 **This is a WIP (Work In Progress) project.**  

We're building it in the open and inviting everyone to collaborate.
This is an **open source** and **software libre** project—your ideas, issues, and pull requests are welcome!

Check out our Roadmap [here](ROADMAP.md) and Architecture [here](architecture.md)

---

We're building **THE ORM for PostgreSQL**—tailored for modern JavaScript projects.

Forget generic ORMs. `pgjs` is designed specifically for **PostgreSQL**, with first-class support for everything it offers—from `WINDOW` functions to `MATERIALIZED VIEWS`, `LATERAL` joins, `GIN` indexes, `JSONB` operations, and more.

## 🚫 Why not Sequelize (or others)?

- Most ORMs are **not PostgreSQL-specific**, so they miss out on the best features the database has to offer.
- Sequelize is **bloated**, hard to tree-shake, and introduces unnecessary complexity for real-world use.
- Many query builders are **verbose and unintuitive**, making SQL feel harder than it should.

`pgjs` is here to change that.

## 🚀 Philosophy

- PostgreSQL-first. Not "compatible with". **Built for.**
- Clean, simple, fluent API that outputs **real PostgreSQL**.
- Extensible enough to support **raw SQL, JSONB, triggers, views**, and anything Postgres can do.
- No magic. No weird models. Just you and your database.

## 📦 Installation (comming soon!)

```bash
npm install pgjs
yarn add pgjs
```

## Contributors

- Abel Osorio (abel.m.osorio@gmail.com).
- Francisco Curti (facurti@gmail.com).

## 🙌 How to Contribute

We're just getting started—and we'd love your help.

### 🛠️ To contribute:

- Fork this repo.
- Code away.
- Submit a Pull Request with a clear description.

### 🐞 Found a bug?

- Open an issue and help us squash it.
