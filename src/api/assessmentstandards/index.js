import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getbyYear,getResultbyYear } from './controller'
import { schema } from './model'
export Assessmentstandards, { schema } from './model'

const router = new Router()
const { title, description, year, priority, type, assessments } = schema.tree

/**
 * @api {post} /standard Create assessmentstandards
 * @apiName CreateAssessmentstandards
 * @apiGroup Assessmentstandards
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Assessmentstandards's title.
 * @apiParam description Assessmentstandards's description.
 * @apiParam year Assessmentstandards's year.
 * @apiParam assessments Assessmentstandards's assessments.
 * @apiSuccess {Object} assessmentstandards Assessmentstandards's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentstandards not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, year, priority, type, assessments }),
  create)

/**
 * @api {get} /standard Retrieve assessmentstandards
 * @apiName RetrieveAssessmentstandards
 * @apiGroup Assessmentstandards
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} assessmentstandards List of assessmentstandards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /standard/:id Retrieve assessmentstandards
 * @apiName RetrieveAssessmentstandards
 * @apiGroup Assessmentstandards
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} assessmentstandards Assessmentstandards's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentstandards not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /standard/:id Update assessmentstandards
 * @apiName UpdateAssessmentstandards
 * @apiGroup Assessmentstandards
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Assessmentstandards's title.
 * @apiParam description Assessmentstandards's description.
 * @apiParam year Assessmentstandards's year.
 * @apiParam assessments Assessmentstandards's assessments.
 * @apiSuccess {Object} assessmentstandards Assessmentstandards's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentstandards not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, year, priority, type, assessments }),
  update)

/**
 * @api {delete} /standard/:id Delete assessmentstandards
 * @apiName DeleteAssessmentstandards
 * @apiGroup Assessmentstandards
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Assessmentstandards not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

router.get("/getbyYear/:year",
  token({ required: true, roles: ['admin'] }),
  getbyYear
)

router.get("/result/:year",
  token({ required: true, roles: ['admin'] }),
  getResultbyYear
)

export default router
