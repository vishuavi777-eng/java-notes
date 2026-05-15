# Java Interview Notes

Structured interview preparation notes for Java backend development.

The site is built with MkDocs and covers Java fundamentals, JVM internals, collections, streams, multithreading, exception handling, OOP, design patterns, SOLID principles, DSA, and Spring Boot.

## Content Structure

```text
docs/
  java/
    jvm/
    collections-framework/
    stream-api/
    multithreading/
    exception-handling/
    oop/
  design-patterns/
  solid-principles/
  dsa/
  spring/
```

Most notes follow this format:

```text
Definition
Why It Matters
Core Example
Common Traps
Interview Answer
Quick Revision
Deep Dive
```

## Local Setup

Create a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

## Build

Run a strict build:

```bash
mkdocs build --strict
```

For a normal production build:

```bash
mkdocs build
```

## Serve Locally

Start the local documentation server:

```bash
mkdocs serve
```

Then open:

```text
http://127.0.0.1:8000
```

## Publish on GitHub Pages

Build the site first:

```bash
mkdocs build
```

Publish the site to GitHub Pages:

```bash
mkdocs gh-deploy
```

This command builds the documentation and pushes the generated site to the `gh-pages` branch. After deployment, enable GitHub Pages in the repository settings and select the `gh-pages` branch if it is not already selected.

## Notes

- Source content lives in `docs/`.
- Generated output goes to `site/`.
- `site/` is ignored and should not be committed.
- `.DS_Store` is ignored and should not be committed.
- Dependency versions are pinned in `requirements.txt`.
