import { success, notFound } from '../../services/response/'
import { General } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  General.create(body)
    .then((general) => general.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  General.find(query, select, cursor)
    .then((generals) => generals.map((general) => general.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  General.findById(params.id)
    .then(notFound(res))
    .then((general) => general ? general.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  General.findById(params.id)
    .then(notFound(res))
    .then((general) => general ? Object.assign(general, body).save() : null)
    .then((general) => general ? general.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  General.findById(params.id)
    .then(notFound(res))
    .then((general) => general ? general.remove() : null)
    .then(success(res, 204))
    .catch(next)
