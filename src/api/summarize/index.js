import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, createCustom, showByYear } from './controller'
import { schema } from './model'
export Summarize, { schema } from './model'

const router = new Router()
const { title, description, priority, year, type } = schema.tree

/**
 * @api {post} /summarize Create summarize
 * @apiName CreateSummarize
 * @apiGroup Summarize
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Summarize's title.
 * @apiParam description Summarize's description.
 * @apiParam priority Summarize's priority.
 * @apiParam year Summarize's year.
 * @apiSuccess {Object} summarize Summarize's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Summarize not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, priority, year, type }),
  createCustom)

/**
 * @api {get} /summarize Retrieve summarizes
 * @apiName RetrieveSummarizes
 * @apiGroup Summarize
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} summarizes List of summarizes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /summarize/:id Retrieve summarize
 * @apiName RetrieveSummarize
 * @apiGroup Summarize
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} summarize Summarize's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Summarize not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /summarize/:id Update summarize
 * @apiName UpdateSummarize
 * @apiGroup Summarize
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam title Summarize's title.
 * @apiParam description Summarize's description.
 * @apiParam priority Summarize's priority.
 * @apiParam year Summarize's year.
 * @apiParam standards Summarize's standards.
 * @apiSuccess {Object} summarize Summarize's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Summarize not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ title, description, priority, year, type }),
  update)

/**
 * @api {delete} /summarize/:id Delete summarize
 * @apiName DeleteSummarize
 * @apiGroup Summarize
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Summarize not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

router.get('/getbyYear/:year',
  token({ required: true }),
  showByYear)

export default router
