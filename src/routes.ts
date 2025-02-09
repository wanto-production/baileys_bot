import { addController } from '@controller/add.controller'
import { antilinkController } from '@controller/antilink.controller'
import { demoteController } from '@controller/demote.controller'
import { kickController } from '@controller/kick.controller'
import { promoteController } from '@controller/promote.controller'
import { tagallController } from '@controller/tagall.controller'
import { tiktokController } from '@controller/tiktok.controller'

export const routeRules: Routes = {
    '!tagall': tagallController["main"],
    '!tiktok': tiktokController["main"],
    '!antilink': antilinkController["main"],
    '!kick': kickController["main"],
    '!add': addController["main"],
    '!promote': promoteController["main"],
    '!demote': demoteController["main"],
}
