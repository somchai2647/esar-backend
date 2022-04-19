import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, createCustom, getRefebyUser } from './controller'
import { schema } from './model'
export Refereepermission, { schema } from './model'

const router = new Router()
const { assessID, userID, year } = schema.tree

/**
 * @api {post} /refereepermissions Create refereepermission
 * @apiName CreateRefereepermission
 * @apiGroup Refereepermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam assessID Refereepermission's assessID.
 * @apiParam userID Refereepermission's userID.
 * @apiParam year Refereepermission's year.
 * @apiSuccess {Object} refereepermission Refereepermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Refereepermission not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ assessID, userID, year }),
  createCustom)

/**
 * @api {get} /refereepermissions Retrieve refereepermissions
 * @apiName RetrieveRefereepermissions
 * @apiGroup Refereepermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} refereepermissions List of refereepermissions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /refereepermissions/:id Retrieve refereepermission
 * @apiName RetrieveRefereepermission
 * @apiGroup Refereepermission
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} refereepermission Refereepermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Refereepermission not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

router.get('/refe/:userid',
  token({ required: true }),
  getRefebyUser)

/**
 * @api {put} /refereepermissions/:id Update refereepermission
 * @apiName UpdateRefereepermission
 * @apiGroup Refereepermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam assessID Refereepermission's assessID.
 * @apiParam userID Refereepermission's userID.
 * @apiParam year Refereepermission's year.
 * @apiSuccess {Object} refereepermission Refereepermission's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Refereepermission not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ assessID, userID, year }),
  update)

/**
 * @api {delete} /refereepermissions/:id Delete refereepermission
 * @apiName DeleteRefereepermission
 * @apiGroup Refereepermission
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Refereepermission not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
