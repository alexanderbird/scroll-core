## Search Index

To generate a search index, you'll need to run `create-search-index` with the
path to a JSON file that contains an array of objects with references and text,
like the following:

```
[{"reference":"GEN 1:1","text":" In the beginning, God created the heavens and the earth. "}]
```

```
npm run create-search-index path/to/input.json > path/to/result.json
```
