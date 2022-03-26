import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, getOne } from './controller'
import { schema } from './model'
export General, { schema } from './model'

const router = new Router()
const { academy, year, director, executiveResource, executivePlanning, executiveAffairs, executiveDepartment, leaderQA, userAccess, refereeAccess, officerAccess } = schema.tree

/**
 * @api {post} /generals Create general
 * @apiName CreateGeneral
 * @apiGroup General
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam academy General's academy.
 * @apiParam year General's year.
 * @apiParam director General's director.
 * @apiParam executiveResource General's executiveResource.
 * @apiParam executivePlanning General's executivePlanning.
 * @apiParam executiveAffairs General's executiveAffairs.
 * @apiParam executiveDepartment General's executiveDepartment.
 * @apiParam leaderQA General's leaderQA.
 * @apiSuccess {Object} general General's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 General not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  token({ required: true, roles: ['admin'] }),
  body({ academy, year, director, executiveResource, executivePlanning, executiveAffairs, executiveDepartment, leaderQA, userAccess, refereeAccess, officerAccess }),
  create)

/**
 * @api {get} /generals Retrieve generals
 * @apiName RetrieveGenerals
 * @apiGroup General
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} generals List of generals.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /generals/:id Retrieve general
 * @apiName RetrieveGeneral
 * @apiGroup General
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} general General's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 General not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /generals/:id Update general
 * @apiName UpdateGeneral
 * @apiGroup General
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam academy General's academy.
 * @apiParam year General's year.
 * @apiParam director General's director.
 * @apiParam executiveResource General's executiveResource.
 * @apiParam executivePlanning General's executivePlanning.
 * @apiParam executiveAffairs General's executiveAffairs.
 * @apiParam executiveDepartment General's executiveDepartment.
 * @apiParam leaderQA General's leaderQA.
 * @apiSuccess {Object} general General's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 General not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ academy, year, director, executiveResource, executivePlanning, executiveAffairs, executiveDepartment, leaderQA, userAccess, refereeAccess, officerAccess }),
  update)

/**
 * @api {delete} /generals/:id Delete general
 * @apiName DeleteGeneral
 * @apiGroup General
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 General not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
