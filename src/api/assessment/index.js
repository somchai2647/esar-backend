import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Assessment, { schema } from './model'

const router = new Router()
const { priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, fields } = schema.tree

/**
 * @api {post} /asses Create assessment
 * @apiName CreateAssessment
 * @apiGroup Assessment
 * @apiPermission master
 * @apiParam {String} access_token admin access token.
 * @apiParam priority Assessment's priority.
 * @apiParam year Assessment's year.
 * @apiParam title Assessment's title.
 * @apiParam description Assessment's description.
 * @apiParam descriptionHTML Assessment's descriptionHTML.
 * @apiParam status Assessment's status.
 * @apiParam type Assessment's type.
 * @apiParam url Assessment's url.
 * @apiParam formula Assessment's formula.
 * @apiParam aggregate Assessment's aggregate.
 * @apiParam countrows Assessment's countrows.
 * @apiSuccess {Object} assessment Assessment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessment not found.
 * @apiError 401 master access only.
 */

router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, fields }),
  create)

/**
 * @api {get} /asses Retrieve assessments
 * @apiName RetrieveAssessments
 * @apiGroup Assessment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} assessments List of assessments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin','user'] }),
  query(),
  index)

/**
 * @api {get} /asses/:id Retrieve assessment
 * @apiName RetrieveAssessment
 * @apiGroup Assessment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} assessment Assessment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessment not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin','user'] }),
  show)

/**
 * @api {put} /asses/:id Update assessment
 * @apiName UpdateAssessment
 * @apiGroup Assessment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam priority Assessment's priority.
 * @apiParam year Assessment's year.
 * @apiParam title Assessment's title.
 * @apiParam description Assessment's description.
 * @apiParam descriptionHTML Assessment's descriptionHTML.
 * @apiParam status Assessment's status.
 * @apiParam type Assessment's type.
 * @apiParam url Assessment's url.
 * @apiParam formula Assessment's formula.
 * @apiParam aggregate Assessment's aggregate.
 * @apiParam countrows Assessment's countrows.
 * @apiSuccess {Object} assessment Assessment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessment not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ priority, year, title, description, descriptionHTML, status, type, url, formula, aggregate, countrows, fields }),
  update)

/**
 * @api {delete} /asses/:id Delete assessment
 * @apiName DeleteAssessment
 * @apiGroup Assessment
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Assessment not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router