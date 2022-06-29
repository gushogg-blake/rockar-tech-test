rockar-tech-test
===

Demo API for Rockar tech test.

This project is an Express app with endpoints for requesting customer/product data from a SQLite database (used for simplicity).

Installation
---

To set up the project locally, clone this repo and install the dependencies:

```bash
git clone https://github.com/gushogg-blake/rockar-tech-test
cd rockar-tech-test
npm i
```

Running
---

To run the project, call `main.js`:

```bash
node src/main.js
```

Testing
---

There will now be an Express server running at http://localhost:3000. To test graphql queries, you can open GraphiQL at http://localhost:3000/graphql.
