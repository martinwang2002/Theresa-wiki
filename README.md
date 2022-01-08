This is a starter template for [Learn Next.js](https://nextjs.org/learn).


docker run -p 6379:6379 -d redis

## ENV
```
REDIS_URL=
THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=false
```

`REDIS_URL` is redis:// URL or rediss:// URL, leave it blank if not using redis cache.
`THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=True` to not build dynamic routes like `/map/[stageId]`. You can specify this with `--build-arg THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=true` when using docker build.
