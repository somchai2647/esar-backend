import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reply, { schema } from './model'

const router = new Router()
const { assesID, groupID, reply } = schema.tree

/**
 * @api {post} /reply Create reply
 * @apiName CreateReply
 * @apiGroup Reply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam assesID Reply's assesID.
 * @apiParam groupID Reply's groupID.
 * @apiParam reply Reply's reply.
 * @apiSuccess {Object} reply Reply's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reply not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ assesID, groupID, reply }),
  create)

/**
 * @api {get} /reply Retrieve replies
 * @apiName RetrieveReplies
 * @apiGroup Reply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} replies List of replies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /reply/:id Retrieve reply
 * @apiName RetrieveReply
 * @apiGroup Reply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} reply Reply's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reply not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /reply/:id Update reply
 * @apiName UpdateReply
 * @apiGroup Reply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam assesID Reply's assesID.
 * @apiParam groupID Reply's groupID.
 * @apiParam reply Reply's reply.
 * @apiSuccess {Object} reply Reply's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Reply not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ assesID, groupID, reply }),
  update)

/**
 * @api {delete} /reply/:id Delete reply
 * @apiName DeleteReply
 * @apiGroup Reply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Reply not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
