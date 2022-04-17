import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, customCreate,showbyYear } from './controller'
import { schema } from './model'
export Awardpermission, { schema } from './model'

const router = new Router()
const { groupID, year } = schema.tree

/**
 * @api {post} /awardpermissions Create awardpermission
 * @apiName CreateAwardpermission
 * @apiGroup Awardpermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam groupID Awardpermission's groupID.
 * @apiParam year Awardpermission's year.
 * @apiSuccess {Object} awardpermission Awardpermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Awardpermission not found.
 * @apiError 401 admin access only.
 */
// router.post('/',
//   token({ required: true, roles: ['admin'] }),
//   body({ groupID, year }),
//   create)

router.post('/',
  token({ required: true, roles: ['admin'] }),
  customCreate)


/**
 * @api {get} /awardpermissions Retrieve awardpermissions
 * @apiName RetrieveAwardpermissions
 * @apiGroup Awardpermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} awardpermissions List of awardpermissions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /awardpermissions/:id Retrieve awardpermission
 * @apiName RetrieveAwardpermission
 * @apiGroup Awardpermission
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} awardpermission Awardpermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Awardpermission not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /awardpermissions/:id Update awardpermission
 * @apiName UpdateAwardpermission
 * @apiGroup Awardpermission
 * @apiParam groupID Awardpermission's groupID.
 * @apiParam year Awardpermission's year.
 * @apiSuccess {Object} awardpermission Awardpermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Awardpermission not found.
 */
router.put('/:id',
  body({ groupID, year }),
  update)

/**
 * @api {delete} /awardpermissions/:id Delete awardpermission
 * @apiName DeleteAwardpermission
 * @apiGroup Awardpermission
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Awardpermission not found.
 */
router.delete('/:id',
  destroy)

//Custom
router.get('/byyear/:year',
  token({ required: true }),
  query(),
  showbyYear)

export default router
