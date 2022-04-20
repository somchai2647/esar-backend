import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, customCreate, showCustom } from './controller'
import { schema } from './model'
export Qualityassessment, { schema } from './model'

const router = new Router()
const { AssessID, RefereeGroup, qualitylevel, prominent, developed, counsel } = schema.tree

/**
 * @api {post} /qualiasses Create qualityassessment
 * @apiName CreateQualityassessment
 * @apiGroup Qualityassessment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam AssessID Qualityassessment's AssessID.
 * @apiParam RefereeGroup Qualityassessment's RefereeGroup.
 * @apiParam qualitylevel Qualityassessment's qualitylevel.
 * @apiParam prominent Qualityassessment's prominent.
 * @apiParam developed Qualityassessment's developed.
 * @apiParam counsel Qualityassessment's counsel.
 * @apiSuccess {Object} qualityassessment Qualityassessment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Qualityassessment not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ AssessID, RefereeGroup, qualitylevel, prominent, developed, counsel }),
  customCreate)

/**
 * @api {get} /qualiasses Retrieve qualityassessments
 * @apiName RetrieveQualityassessments
 * @apiGroup Qualityassessment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} qualityassessments List of qualityassessments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /qualiasses/:id Retrieve qualityassessment
 * @apiName RetrieveQualityassessment
 * @apiGroup Qualityassessment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} qualityassessment Qualityassessment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Qualityassessment not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

router.get('/get/:assesid',
  token({ required: true }),
  showCustom)

/**
 * @api {put} /qualiasses/:id Update qualityassessment
 * @apiName UpdateQualityassessment
 * @apiGroup Qualityassessment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam AssessID Qualityassessment's AssessID.
 * @apiParam RefereeGroup Qualityassessment's RefereeGroup.
 * @apiParam qualitylevel Qualityassessment's qualitylevel.
 * @apiParam prominent Qualityassessment's prominent.
 * @apiParam developed Qualityassessment's developed.
 * @apiParam counsel Qualityassessment's counsel.
 * @apiSuccess {Object} qualityassessment Qualityassessment's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Qualityassessment not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ AssessID, RefereeGroup, qualitylevel, prominent, developed, counsel }),
  update)

/**
 * @api {delete} /qualiasses/:id Delete qualityassessment
 * @apiName DeleteQualityassessment
 * @apiGroup Qualityassessment
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Qualityassessment not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
