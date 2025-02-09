## simple bot whatsapp by ikhwan ganteng

## what you need to run this bot?

1. nodejs

## if you using termux, run

```sh

pkg install nodejs -y

```

## then run

```sh

npm start

```

## if you want make new command

```sh

npm run make:controller <name>

```

## then edit route.ts file from

```ts
// ./src/routes.ts

import { addController } from '@controller/add.controller'
import { antilinkController } from '@controller/antilink.controller'
import { demoteController } from '@controller/demote.controller'
import { kickController } from '@controller/kick.controller'
import { promoteController } from '@controller/promote.controller'
import { tagallController } from '@controller/tagall.controller'
import { tiktokController } from '@controller/tiktok.controller'

export const routeRules: Routes = {
  '!tagall': tagallController['main'],
  '!tiktok': tiktokController['main'],
  '!antilink': antilinkController['main'],
  '!kick': kickController['main'],
  '!add': addController['main'],
  '!promote': promoteController['main'],
  '!demote': demoteController['main'],
}
```

## to

```ts
// ./src/routes.ts

import { addController } from '@controller/add.controller'
import { antilinkController } from '@controller/antilink.controller'
import { demoteController } from '@controller/demote.controller'
import { kickController } from '@controller/kick.controller'
import { promoteController } from '@controller/promote.controller'
import { tagallController } from '@controller/tagall.controller'
import { tiktokController } from '@controller/tiktok.controller'
import { <name>controller } from '@controller/<name>.controller'

export const routeRules: Routes = {
    '!tagall': tagallController["main"],
    '!tiktok': tiktokController["main"],
    '!antilink': antilinkController["main"],
    '!kick': kickController["main"],
    '!add': addController["main"],
    '!promote': promoteController["main"],
    '!demote': demoteController["main"],
    '!<name>': <name>controller["main"]
}

```
