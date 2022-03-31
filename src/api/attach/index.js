import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, addattach,getbyAsses } from './controller'
import { schema } from './model'
export Attach, { schema } from './model'

const router = new Router()
const { url, AssesID, GroupID } = schema.tree

/**
 * @api {post} /attach Create attach
 * @apiName CreateAttach
 * @apiGroup Attach
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam url Attach's url.
 * @apiParam AssesID Attach's AssesID.
 * @apiParam GroupID Attach's GroupID.
 * @apiSuccess {Object} attach Attach's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Attach not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ url, AssesID, GroupID }),
  create)

/**
 * @api {get} /attach Retrieve attaches
 * @apiName RetrieveAttaches
 * @apiGroup Attach
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} attaches List of attaches.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /attach/:id Retrieve attach
 * @apiName RetrieveAttach
 * @apiGroup Attach
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} attach Attach's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Attach not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /attach/:id Update attach
 * @apiName UpdateAttach
 * @apiGroup Attach
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam url Attach's url.
 * @apiParam AssesID Attach's AssesID.
 * @apiParam GroupID Attach's GroupID.
 * @apiSuccess {Object} attach Attach's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Attach not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ url, AssesID, GroupID }),
  update)

/**
 * @api {delete} /attach/:id Delete attach
 * @apiName DeleteAttach
 * @apiGroup Attach
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Attach not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

//Cutom Zone
router.get('/getbyAsses/:assesid',
  token({ required: true }),
  getbyAsses)

router.post('/addattach',
  token({ required: true }),
  body({ url, AssesID, GroupID }),
  addattach)


export default router
