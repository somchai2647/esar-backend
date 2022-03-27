import { success, notFound } from '../../services/response/'
import { Assessmentpermission } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Assessmentpermission.create(body)
    .then((assessmentpermission) => assessmentpermission.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Assessmentpermission.find(query, select, cursor)
    .then((assessmentpermissions) => assessmentpermissions.map((assessmentpermission) => assessmentpermission.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Assessmentpermission.findById(params.id)
    .then(notFound(res))
    .then((assessmentpermission) => assessmentpermission ? assessmentpermission.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Assessmentpermission.findById(params.id)
    .then(notFound(res))
    .then((assessmentpermission) => assessmentpermission ? Object.assign(assessmentpermission, body).save() : null)
    .then((assessmentpermission) => assessmentpermission ? assessmentpermission.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Assessmentpermission.findById(params.id)
    .then(notFound(res))
    .then((assessmentpermission) => assessmentpermission ? assessmentpermission.remove() : null)
    .then(success(res, 204))
    .catch(next)
