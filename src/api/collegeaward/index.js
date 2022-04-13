import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Collegeaward, { schema } from './model'

const router = new Router()
const { name, year, award, level, org } = schema.tree

/**
 * @api {post} /collegeaward Create collegeaward
 * @apiName CreateCollegeaward
 * @apiGroup Collegeaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Collegeaward's name.
 * @apiParam year Collegeaward's year.
 * @apiParam award Collegeaward's award.
 * @apiParam level Collegeaward's level.
 * @apiParam org Collegeaward's org.
 * @apiSuccess {Object} collegeaward Collegeaward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Collegeaward not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, year, award, level, org }),
  create)

/**
 * @api {get} /collegeaward Retrieve collegeawards
 * @apiName RetrieveCollegeawards
 * @apiGroup Collegeaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} collegeawards List of collegeawards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /collegeaward/:id Retrieve collegeaward
 * @apiName RetrieveCollegeaward
 * @apiGroup Collegeaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} collegeaward Collegeaward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Collegeaward not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /collegeaward/:id Update collegeaward
 * @apiName UpdateCollegeaward
 * @apiGroup Collegeaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Collegeaward's name.
 * @apiParam year Collegeaward's year.
 * @apiParam award Collegeaward's award.
 * @apiParam level Collegeaward's level.
 * @apiParam org Collegeaward's org.
 * @apiSuccess {Object} collegeaward Collegeaward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Collegeaward not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, year, award, level, org }),
  update)

/**
 * @api {delete} /collegeaward/:id Delete collegeaward
 * @apiName DeleteCollegeaward
 * @apiGroup Collegeaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Collegeaward not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
