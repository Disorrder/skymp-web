# skymp.ru website
`npm i` - Update dependencies

## Development
<!-- Запускаем 2 процесса параллельно: -->
You need to run two process simultaneously:
`npm run dev`
`npm run api`

### global deps (if need, usually for dev on windows)
`npm i -g webpack webpack-cli webpack-dev-server nodemon pm2`

# VPS install
### Gitlab CI/CD
Gitlab-runner стирает файлы, которых не должно лежать в репозитории, в т.ч. node_modules и конфиги.  
Перед тем, как начать, необходимо создать папку с конфигом  
`mkdir -p /var/www/configs/`  
И записать в неё 2 файла:  
<!-- `touch /var/www/configs/web.config.js && touch /var/www/configs/api.config.js` -->
 - `cp -f src/config.default.js /var/www/configs/web.config.js`
 - `cp -f api/config.default.js /var/www/configs/api.config.js`

### Nginx update
`cp -f src/website.conf /etc/nginx/sites-enabled/website.conf`
`nginx -s reload`


# API
`npm run api` - dev startup
