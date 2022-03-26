import { success, notFound } from '../../services/response/'
import { Fields } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Fields.create(body)
    .then((fields) => fields.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Fields.count(query)
    .then(count => Fields.find(query, select, cursor)
      .then((fields) => ({
        count,
        rows: fields.map((fields) => fields.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Fields.findById(params.id)
    .then(notFound(res))
    .then((fields) => fields ? fields.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Fields.findById(params.id)
    .then(notFound(res))
    .then((fields) => fields ? Object.assign(fields, body).save() : null)
    .then((fields) => fields ? fields.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Fields.findById(params.id)
    .then(notFound(res))
    .then((fields) => fields ? fields.remove() : null)
    .then(success(res, 204))
    .catch(next)
