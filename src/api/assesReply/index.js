import { Router } from 'express'
import { middleware as query } from 'querymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, showAssesReplybyGroup, showPerbyAsses, showAssesReplybyYear } from './controller'

const router = new Router()

/**
 * @api {post} /assesreply Create asses reply
 * @apiName CreateAssesReply
 * @apiGroup AssesReply
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} assesReply Asses reply's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asses reply not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  create)

/**
 * @api {get} /assesreply Retrieve asses replies
 * @apiName RetrieveAssesReplies
 * @apiGroup AssesReply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} assesReplies List of asses replies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /assesreply/:id Retrieve asses reply
 * @apiName RetrieveAssesReply
 * @apiGroup AssesReply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} assesReply Asses reply's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asses reply not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /assesreply/:id Update asses reply
 * @apiName UpdateAssesReply
 * @apiGroup AssesReply
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} assesReply Asses reply's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Asses reply not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  update)

/**
 * @api {delete} /assesreply/:id Delete asses reply
 * @apiName DeleteAssesReply
 * @apiGroup AssesReply
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Asses reply not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)


//Custom Zone
//showAssesReplybyGroup
router.get('/showARG/:gid',
  token({ required: true }),
  query(),
  showAssesReplybyGroup)

//showPerbyAsses
router.get('/showPA/:aid',
  token({ required: true }),
  query(),
  showPerbyAsses)

//showAssesReplybyYear
router.get('/showARY/:year',
  token({ required: true, roles: ['admin','executive'] }),
  query(),
  showAssesReplybyYear
)



export default router
