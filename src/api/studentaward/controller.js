import { success, notFound } from '../../services/response/'
import { Studentaward } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Studentaward.create(body)
    .then((studentaward) => studentaward.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Studentaward.find(query, select, cursor).limit(500)
    .then((studentawards) => studentawards.map((studentaward) => studentaward.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Studentaward.findById(params.id)
    .then(notFound(res))
    .then((studentaward) => studentaward ? studentaward.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Studentaward.findById(params.id)
    .then(notFound(res))
    .then((studentaward) => studentaward ? Object.assign(studentaward, body).save() : null)
    .then((studentaward) => studentaward ? studentaward.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Studentaward.findById(params.id)
    .then(notFound(res))
    .then((studentaward) => studentaward ? studentaward.remove() : null)
    .then(success(res, 204))
    .catch(next)
