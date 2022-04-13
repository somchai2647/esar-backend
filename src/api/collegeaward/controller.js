import { success, notFound } from '../../services/response/'
import { Collegeaward } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Collegeaward.create(body)
    .then((collegeaward) => collegeaward.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Collegeaward.find(query, select, cursor)
    .then((collegeawards) => collegeawards.map((collegeaward) => collegeaward.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Collegeaward.findById(params.id)
    .then(notFound(res))
    .then((collegeaward) => collegeaward ? collegeaward.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Collegeaward.findById(params.id)
    .then(notFound(res))
    .then((collegeaward) => collegeaward ? Object.assign(collegeaward, body).save() : null)
    .then((collegeaward) => collegeaward ? collegeaward.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Collegeaward.findById(params.id)
    .then(notFound(res))
    .then((collegeaward) => collegeaward ? collegeaward.remove() : null)
    .then(success(res, 204))
    .catch(next)
