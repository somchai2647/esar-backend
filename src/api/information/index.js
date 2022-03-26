import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Information, { schema } from './model'

const router = new Router()
const { title, isURL, URL, detail, detailN } = schema.tree

/**
 * @api {post} /information Create information
 * @apiName CreateInformation
 * @apiGroup Information
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Information's title.
 * @apiParam isURL Information's isURL.
 * @apiParam URL Information's URL.
 * @apiParam detail Information's detail.
 * @apiSuccess {Object} information Information's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Information not found.
 * @apiError 401 master access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ title, isURL, URL, detail, detailN }),
  create)

/**
 * @api {get} /information Retrieve information
 * @apiName RetrieveInformation
 * @apiGroup Information
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of information.
 * @apiSuccess {Object[]} rows List of information.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /information/:id Retrieve information
 * @apiName RetrieveInformation
 * @apiGroup Information
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} information Information's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Information not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /information/:id Update information
 * @apiName UpdateInformation
 * @apiGroup Information
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam title Information's title.
 * @apiParam isURL Information's isURL.
 * @apiParam URL Information's URL.
 * @apiParam detail Information's detail.
 * @apiSuccess {Object} information Information's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Information not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  // master(),
  body({ title, isURL, URL, detail, detailN }),
  update)

/**
 * @api {delete} /information/:id Delete information
 * @apiName DeleteInformation
 * @apiGroup Information
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Information not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  // master(),
  destroy)

export default router
