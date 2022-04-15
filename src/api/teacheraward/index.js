import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Teacheraward, { schema } from './model'

const router = new Router()
const { name, teachername, award, level, org, year } = schema.tree

/**
 * @api {post} /teacherawards Create teacheraward
 * @apiName CreateTeacheraward
 * @apiGroup Teacheraward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Teacheraward's name.
 * @apiParam teachername Teacheraward's teachername.
 * @apiParam award Teacheraward's award.
 * @apiParam level Teacheraward's level.
 * @apiParam org Teacheraward's org.
 * @apiParam year Teacheraward's year.
 * @apiSuccess {Object} teacheraward Teacheraward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teacheraward not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, teachername, award, level, org, year }),
  create)

/**
 * @api {get} /teacherawards Retrieve teacherawards
 * @apiName RetrieveTeacherawards
 * @apiGroup Teacheraward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} teacherawards List of teacherawards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /teacherawards/:id Retrieve teacheraward
 * @apiName RetrieveTeacheraward
 * @apiGroup Teacheraward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} teacheraward Teacheraward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teacheraward not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /teacherawards/:id Update teacheraward
 * @apiName UpdateTeacheraward
 * @apiGroup Teacheraward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Teacheraward's name.
 * @apiParam teachername Teacheraward's teachername.
 * @apiParam award Teacheraward's award.
 * @apiParam level Teacheraward's level.
 * @apiParam org Teacheraward's org.
 * @apiParam year Teacheraward's year.
 * @apiSuccess {Object} teacheraward Teacheraward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Teacheraward not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, teachername, award, level, org, year }),
  update)

/**
 * @api {delete} /teacherawards/:id Delete teacheraward
 * @apiName DeleteTeacheraward
 * @apiGroup Teacheraward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Teacheraward not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
