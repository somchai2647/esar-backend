import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Assessmentpermission, { schema } from './model'

const router = new Router()
const { assessment, groupID } = schema.tree

/**
 * @api {post} /assespermis Create assessmentpermission
 * @apiName CreateAssessmentpermission
 * @apiGroup Assessmentpermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam assessment Assessmentpermission's assessment.
 * @apiParam groupID Assessmentpermission's groupID.
 * @apiSuccess {Object} assessmentpermission Assessmentpermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentpermission not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ assessment, groupID }),
  create)

/**
 * @api {get} /assespermis Retrieve assessmentpermissions
 * @apiName RetrieveAssessmentpermissions
 * @apiGroup Assessmentpermission
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} assessmentpermissions List of assessmentpermissions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /assespermis/:id Retrieve assessmentpermission
 * @apiName RetrieveAssessmentpermission
 * @apiGroup Assessmentpermission
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} assessmentpermission Assessmentpermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentpermission not found.
 * @apiError 401 user access only.
 */
router.get('/:year/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /assespermis/:id Update assessmentpermission
 * @apiName UpdateAssessmentpermission
 * @apiGroup Assessmentpermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam assessment Assessmentpermission's assessment.
 * @apiParam groupID Assessmentpermission's groupID.
 * @apiSuccess {Object} assessmentpermission Assessmentpermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Assessmentpermission not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ assessment, groupID }),
  update)

/**
 * @api {delete} /assespermis/:id Delete assessmentpermission
 * @apiName DeleteAssessmentpermission
 * @apiGroup Assessmentpermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Assessmentpermission not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
