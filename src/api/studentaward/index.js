import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Studentaward, { schema } from './model'

const router = new Router()
const { name, year, award, type, level, org, students } = schema.tree

/**
 * @api {post} /studentaward Create studentaward
 * @apiName CreateStudentaward
 * @apiGroup Studentaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Studentaward's name.
 * @apiParam year Studentaward's year.
 * @apiParam award Studentaward's award.
 * @apiParam type Studentaward's type.
 * @apiParam level Studentaward's level.
 * @apiParam org Studentaward's org.
 * @apiParam students Studentaward's students.
 * @apiSuccess {Object} studentaward Studentaward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Studentaward not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, year, award, type, level, org, students }),
  create)

/**
 * @api {get} /studentaward Retrieve studentawards
 * @apiName RetrieveStudentawards
 * @apiGroup Studentaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} studentawards List of studentawards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /studentaward/:id Retrieve studentaward
 * @apiName RetrieveStudentaward
 * @apiGroup Studentaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} studentaward Studentaward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Studentaward not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /studentaward/:id Update studentaward
 * @apiName UpdateStudentaward
 * @apiGroup Studentaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam name Studentaward's name.
 * @apiParam year Studentaward's year.
 * @apiParam award Studentaward's award.
 * @apiParam type Studentaward's type.
 * @apiParam level Studentaward's level.
 * @apiParam org Studentaward's org.
 * @apiParam students Studentaward's students.
 * @apiSuccess {Object} studentaward Studentaward's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Studentaward not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, year, award, type, level, org, students }),
  update)

/**
 * @api {delete} /studentaward/:id Delete studentaward
 * @apiName DeleteStudentaward
 * @apiGroup Studentaward
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Studentaward not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
