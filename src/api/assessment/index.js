import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Assessment, { schema } from './model'

const router = new Router()
const { priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, weight, fields } = schema.tree


router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, weight, fields }),
  create)

router.get('/',
  token({ required: true, roles: ['admin', 'user'] }),
  query(),
  index)

router.get('/:id',
  token({ required: true, roles: ['admin', 'user'] }),
  show)

router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, weight, fields }),
  update)

router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router