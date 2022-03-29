import { Router } from 'express'
import user from './user'
import auth from './auth'
import general from './general'
import information from './information'
import group from './group'
import assessment from './assessment'
import fields from './fields'
import assessmentpermission from './assessmentpermission'
import reply from './reply'
import assesReply from './assesReply'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/users', user)
router.use('/auth', auth)
router.use('/generals', general)
router.use('/information', information)
router.use('/groups', group)
router.use('/asses', assessment)
router.use('/field', fields)
router.use('/assespermis', assessmentpermission)
router.use('/reply', reply)
router.use('/assesreply', assesReply)

export default router
