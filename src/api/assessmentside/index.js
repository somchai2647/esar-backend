import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getbyYear, getResultbyYear, getbyType } from './controller'
import { schema } from './model'
export Assessmentside, { schema } from './model'

const router = new Router()
const { title, description, priority, type, year, assessments } = schema.tree

/**
 * @api {post} /assesside Create assessmentside
 * @apiName CreateAssessmentside
 * @apiGroup Assessmentside
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Assessmentside's title.
 * @apiParam description Assessmentside's description.
 * @apiParam priority Assessmentside's priority.
 * @apiParam type Assessmentside's type.
 * @apiParam year Assessmentside's year.
 * @apiParam assessments Assessmentside's assessments.
 * @apiSuccess {Object} assessmentside Assessmentside's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentside not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, priority, type, year, assessments }),
  create)

/**
 * @api {get} /assesside Retrieve assessmentsides
 * @apiName RetrieveAssessmentsides
 * @apiGroup Assessmentside
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} assessmentsides List of assessmentsides.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /assesside/:id Retrieve assessmentside
 * @apiName RetrieveAssessmentside
 * @apiGroup Assessmentside
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} assessmentside Assessmentside's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentside not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /assesside/:id Update assessmentside
 * @apiName UpdateAssessmentside
 * @apiGroup Assessmentside
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Assessmentside's title.
 * @apiParam description Assessmentside's description.
 * @apiParam priority Assessmentside's priority.
 * @apiParam type Assessmentside's type.
 * @apiParam year Assessmentside's year.
 * @apiParam assessments Assessmentside's assessments.
 * @apiSuccess {Object} assessmentside Assessmentside's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentside not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, priority, type, year, assessments }),
  update)

/**
 * @api {delete} /assesside/:id Delete assessmentside
 * @apiName DeleteAssessmentside
 * @apiGroup Assessmentside
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Assessmentside not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

router.get("/getbyType/:year/:type",
  token({ required: true, roles: ['admin', "executive"] }),
  getbyType
)

router.get("/getbyYear/:year",
  token({ required: true, roles: ['admin', "executive"] }),
  getbyYear
)

router.get("/result/:year",
  token({ required: true, roles: ['admin', "executive"] }),
  getResultbyYear
)

export default router
