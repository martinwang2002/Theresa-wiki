This is a starter template for [Learn Next.js](https://nextjs.org/learn).


docker run -p 6379:6379 -d redis

## ENV
*`.env.local` is not loaded in docker, use `.env.production.local` instead*
```
REDIS_URL=

THERESA_STATIC=static.theresa.wiki
THERESA_S3=s3.theresa.wiki
```

`REDIS_URL` 
    is redis:// URL or rediss:// URL, leave it blank if not using redis cache.
    Use `redis://redis/0` to specify database.

`THERESA_STATIC`
    `static.theresa.wiki` for production, and `static.theresa.localhost` for testing

`THERESA_S3`
    `s3.theresa.wiki` for production, and `s3.theresa.localhost` for testing

## docker  build args
`THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=True` 
    to not build dynamic routes like `/map/[stageId]`. Building these dynamic routes need to fetch data while building. You can specify this with `--build-arg THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=true` when using docker build.


## Release process
For merging `dev` into `master`

1. `git checkout master`
1. `git merge dev --no-ff`
1. change changelog `version` `x.x.x`, remove canary
1. `git commit --amend`

    Message: Release: `x.x.x`
1. `git tag x.x.x`
1. `git checkout dev`
1. change changelog to next version
1. `git push --all`
1. `git push --tags`
