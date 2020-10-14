## Antes de tudo
```console
npm install typeorm -g
```

## Para criar a primeira migration
```console
npx typeorm migrations:create -n create_orphanages
npx typeorm migrations:create -n create_images
```

## Depois de editar a migration criada
```console
npx ts-node ./node_modules/.bin/typeorm migration:run
```
