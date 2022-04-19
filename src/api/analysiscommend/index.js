import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, addAgency, getbyAsses, getbyAssesReferee } from './controller'
import { schema } from './model'
export Analysiscommend, { schema } from './model'

const router = new Router()
const { isReferee, qualitylevel, prominent, developed, counsel, GroupID, AssesID } = schema.tree

/**
 * @api {post} /analysis Create analysiscommend
 * @apiName CreateAnalysiscommend
 * @apiGroup Analysiscommend
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam prominent Analysiscommend's prominent.
 * @apiParam developed Analysiscommend's developed.
 * @apiParam counsel Analysiscommend's counsel.
 * @apiParam GroupID Analysiscommend's GroupID.
 * @apiParam AssesID Analysiscommend's AssesID.
 * @apiSuccess {Object} analysiscommend Analysiscommend's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Analysiscommend not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ isReferee, qualitylevel, prominent, developed, counsel, GroupID, AssesID }),
  create)

/**
 * @api {get} /analysis Retrieve analysiscommends
 * @apiName RetrieveAnalysiscommends
 * @apiGroup Analysiscommend
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} analysiscommends List of analysiscommends.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /analysis/:id Retrieve analysiscommend
 * @apiName RetrieveAnalysiscommend
 * @apiGroup Analysiscommend
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} analysiscommend Analysiscommend's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Analysiscommend not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /analysis/:id Update analysiscommend
 * @apiName UpdateAnalysiscommend
 * @apiGroup Analysiscommend
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam prominent Analysiscommend's prominent.
 * @apiParam developed Analysiscommend's developed.
 * @apiParam counsel Analysiscommend's counsel.
 * @apiParam GroupID Analysiscommend's GroupID.
 * @apiParam AssesID Analysiscommend's AssesID.
 * @apiSuccess {Object} analysiscommend Analysiscommend's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Analysiscommend not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ isReferee, qualitylevel, prominent, developed, counsel, GroupID, AssesID }),
  update)

/**
 * @api {delete} /analysis/:id Delete analysiscommend
 * @apiName DeleteAnalysiscommend
 * @apiGroup Analysiscommend
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Analysiscommend not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

//Cutom Zone
router.get('/getbyasses/:assesid',
  token({ required: true }),
  getbyAsses)

router.get('/getbyassesreferee/:assesid',
  token({ required: true }),
  getbyAssesReferee)

router.post('/addagency',
  token({ required: true }),
  body({ isReferee, qualitylevel, prominent, developed, counsel, GroupID, AssesID }),
  addAgency)

export default router
