import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy, getAsssessmentAdminAgency, IntegrateAssessment, getbyYear } from './controller'
import { schema } from './model'
export Assessment, { schema } from './model'

const router = new Router()
const { priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, weight, fields, analysis, tableType, checkrowbyrow } = schema.tree


router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, weight, fields, analysis, tableType, checkrowbyrow }),
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
  body({ priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, weight, fields, analysis, tableType, checkrowbyrow }),
  update)

router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)


//custom

router.get("/getbyyear/:year",
  token({ required: true, roles: ['admin'] }),
  getbyYear
)

router.get("/getadminagency/:year",
  token({ required: true, roles: ['admin','executive'] }),
  getAsssessmentAdminAgency
)

router.post("/integrate",
  token({ required: true, roles: ['admin'] }),
  body(),
  IntegrateAssessment
)
export default router