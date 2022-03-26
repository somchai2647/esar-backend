import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Fields, { schema } from './model'

const router = new Router()
const { assesID, title, variable, isReadOnly } = schema.tree

/**
 * @api {post} /field Create fields
 * @apiName CreateFields
 * @apiGroup Fields
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam assesID Fields's assesID.
 * @apiParam title Fields's title.
 * @apiParam variable Fields's variable.
 * @apiParam isReadOnly Fields's isReadOnly.
 * @apiSuccess {Object} fields Fields's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fields not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ assesID, title, variable, isReadOnly }),
  create)

/**
 * @api {get} /field Retrieve fields
 * @apiName RetrieveFields
 * @apiGroup Fields
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of fields.
 * @apiSuccess {Object[]} rows List of fields.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /field/:id Retrieve fields
 * @apiName RetrieveFields
 * @apiGroup Fields
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} fields Fields's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fields not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /field/:id Update fields
 * @apiName UpdateFields
 * @apiGroup Fields
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam assesID Fields's assesID.
 * @apiParam title Fields's title.
 * @apiParam variable Fields's variable.
 * @apiParam isReadOnly Fields's isReadOnly.
 * @apiSuccess {Object} fields Fields's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Fields not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ assesID, title, variable, isReadOnly }),
  update)

/**
 * @api {delete} /field/:id Delete fields
 * @apiName DeleteFields
 * @apiGroup Fields
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Fields not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
