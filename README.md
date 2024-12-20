# Amazon orders scraper

A scraper for Amazon orders built with pupeteer

## Installation

Install the node packages

```bash
$ npm i
```

## Initiating the program

```python
$ npx ts-node src/index.ts --username [USERNAME] --password [PASSWORD] --search_string [SEARCH_STRING] --count [MAX_COUNT]
```

## Fields and how to use them

We have the following arguments in the program

1. username - Username/Email of the Amazon account. This is **mandatory**.  
2. password - Password for the account. This is **mandatory**.
3. search_string - Filtered based on this parameter. This is **not mandatory**.
4. count - Maximum number of items required. This is **not mandatory**.
