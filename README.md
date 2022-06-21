# Theresa.wiki

This repo is the frontend of https://theresa.wiki. An arknights wiki.
这是一个Theresa.wiki的前端。一个明日方舟的维基。

## License
1. MIT License
    * For all codes (not including `./src/arts/**`), the license is MIT License, see [LICENSE](./LICENSE)
2. CC-BY-SA 4.0 License
    * For arts (including `./src/arts/**`) and SVGs used in codes, the license is CC-BY-SA-4.0, see [src/arts/LICENSE](./src/arts/LICENSE)
    * All web contents served on [Theresa.wiki](https://theresa.wiki) are under [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/) license.

## Development and Contributing
PR is always welcome on `dev` branch.

You can use `yarn dev` to start your development environment.

### ENV
*`.env.local` is not loaded in docker, use `.env.production.local` instead*


`REDIS_URL` is redis:// URL or rediss:// URL. You can leave it blank if not using redis cache. Use `redis://redis/0` to specify database.

`THERESA_STATIC`: default value is `https://static.theresa.wiki` for production, and `http://static.theresa.localhost` for local testing

`THERESA_S3`: You can use https://raw.githubusercontent.com/Kengxxiao/ArknightsGameData/master/zh_CN/gamedata/ for testing. The limitation for `s3.theresa.wiki` is that it only provides the latest version of the data.

### docker
#### docker build args
`THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=True` 
    to not build dynamic routes like `/map/[stageId]`. Building these dynamic routes need to fetch data while building. You can specify this with `--build-arg THERESA_WIKI_NO_BUILD_DYNAMIC_ROUTES=true` when using docker build.

#### Why removing data files?
In Dockerfile, there is one line `RUN rm .next/standalone/.next/server/pages/zh/map.json`. This is intend to ask nextjs to refetch data when startup, i.e. fetch data and server with latest data when accessing `/map` page.


### Folder structure
|||
|--|--|
|src/arts|Arts, including SVGs, used in this project| 
|src/components|common components|
|src/configurations|configs|
|src/models| models, including gamedata and react context |
|src/pages|pages|

## Release process
For merging `dev` into `master`

1. `git checkout master`
1. `git merge dev --no-ff`
1. `git commit --amend`
    Message: Release: `x.x.x`
1. `git tag x.x.x`
1. `git checkout dev`
1. change changelog to next version
1. `git push --tags`
1. `git push --all`
