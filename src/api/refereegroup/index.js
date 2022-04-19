import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Refereegroup, { schema } from './model'

const router = new Router()
const { name, description, leader, users, year } = schema.tree

/**
 * @api {post} /refereegroups Create refereegroup
 * @apiName CreateRefereegroup
 * @apiGroup Refereegroup
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Refereegroup's name.
 * @apiParam description Refereegroup's description.
 * @apiParam leader Refereegroup's leader.
 * @apiParam users Refereegroup's users.
 * @apiParam year Refereegroup's year.
 * @apiSuccess {Object} refereegroup Refereegroup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Refereegroup not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, leader, users, year }),
  create)

/**
 * @api {get} /refereegroups Retrieve refereegroups
 * @apiName RetrieveRefereegroups
 * @apiGroup Refereegroup
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} refereegroups List of refereegroups.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /refereegroups/:id Retrieve refereegroup
 * @apiName RetrieveRefereegroup
 * @apiGroup Refereegroup
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} refereegroup Refereegroup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Refereegroup not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /refereegroups/:id Update refereegroup
 * @apiName UpdateRefereegroup
 * @apiGroup Refereegroup
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Refereegroup's name.
 * @apiParam description Refereegroup's description.
 * @apiParam leader Refereegroup's leader.
 * @apiParam users Refereegroup's users.
 * @apiParam year Refereegroup's year.
 * @apiSuccess {Object} refereegroup Refereegroup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Refereegroup not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, leader, users, year }),
  update)

/**
 * @api {delete} /refereegroups/:id Delete refereegroup
 * @apiName DeleteRefereegroup
 * @apiGroup Refereegroup
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Refereegroup not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
