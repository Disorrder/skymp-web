# skymp.ru website
`npm i` - Update dependencies

## Development
You need to run two process simultaneously:
`npm run dev`
`npm run api`

### global deps (if need, usually for dev on windows)
`npm i -g webpack webpack-dev-server pm2 nodemon`

## Staging
clone repo into /var/www/app_name and run
`git pull && npm run vds` each time after push (build + api)
And replace website.conf if it has changed. Then run `nginx -s reload`
TODO some CI platform for auto deploy (gitlab-runner)


## Production
`npm run build` - Build with Webpack


# API
`npm run api` - dev startup
