# Introduction

## What is pgjs?

pgjs is **THE ORM for PostgreSQL**, specifically designed for modern JavaScript projects. Unlike generic ORMs that try to support multiple databases, pgjs is built from the ground up for PostgreSQL, embracing all of its powerful features.

## Why pgjs?

PostgreSQL is a powerful database with unique features like:
- `WINDOW` functions
- `MATERIALIZED VIEWS`
- `LATERAL` joins
- `GIN` indexes
- `JSONB` operations

Most ORMs either don't support these features or make them difficult to use. pgjs changes that by providing first-class support for everything PostgreSQL has to offer.

### Why Not Other ORMs?

While other ORMs like Sequelize are popular, they come with significant drawbacks:

- **Generic Approach**: Most ORMs try to support multiple databases, missing out on PostgreSQL's best features
- **Bloat**: Many ORMs are hard to tree-shake and introduce unnecessary complexity
- **Verbose APIs**: Query builders often make SQL feel harder than it should be

## Our Philosophy

pgjs is built on four core principles:

1. **PostgreSQL-First**
   - Not just "compatible with" PostgreSQL
   - Built specifically for PostgreSQL
   - Leverages all PostgreSQL features

2. **Clean, Simple API**
   - Fluent interface that feels natural
   - Outputs real PostgreSQL
   - No unnecessary abstractions

3. **Extensibility**
   - Support for raw SQL
   - Full JSONB operations
   - Triggers and views
   - Anything PostgreSQL can do

4. **No Magic**
   - No weird models
   - No hidden complexity
   - Just you and your database

## Getting Started

::: tip Coming Soon
pgjs is currently in active development. We're building it in the open and welcome contributions!
:::

```bash
# Installation (coming soon)
npm install pgjs
# or
yarn add pgjs
```

## Contributing

We're building pgjs in the open and invite everyone to collaborate. This is an open source and software libre project—your ideas, issues, and pull requests are welcome!

Check out our [Roadmap](../ROADMAP.md) and [Architecture](../architecture.md) to learn more about the project's direction and design.

### How to Contribute

1. Fork the repository
2. Create your feature branch
3. Submit a Pull Request with a clear description

Found a bug? Open an issue and help us squash it! 