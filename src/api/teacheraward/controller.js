import { success, notFound } from '../../services/response/'
import { Teacheraward } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Teacheraward.create(body)
    .then((teacheraward) => teacheraward.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Teacheraward.find(query, select, cursor)
    .then((teacherawards) => teacherawards.map((teacheraward) => teacheraward.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Teacheraward.findById(params.id)
    .then(notFound(res))
    .then((teacheraward) => teacheraward ? teacheraward.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Teacheraward.findById(params.id)
    .then(notFound(res))
    .then((teacheraward) => teacheraward ? Object.assign(teacheraward, body).save() : null)
    .then((teacheraward) => teacheraward ? teacheraward.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Teacheraward.findById(params.id)
    .then(notFound(res))
    .then((teacheraward) => teacheraward ? teacheraward.remove() : null)
    .then(success(res, 204))
    .catch(next)
