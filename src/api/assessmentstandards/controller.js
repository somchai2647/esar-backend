import { success, notFound } from '../../services/response/'
import { Assessmentstandards } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Assessmentstandards.create(body)
    .then((assessmentstandards) => assessmentstandards.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Assessmentstandards.find(query, select, cursor)
    .then((assessmentstandards) => assessmentstandards.map((assessmentstandards) => assessmentstandards.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Assessmentstandards.findById(params.id)
    .then(notFound(res))
    .then((assessmentstandards) => assessmentstandards ? assessmentstandards.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Assessmentstandards.findById(params.id)
    .then(notFound(res))
    .then((assessmentstandards) => assessmentstandards ? Object.assign(assessmentstandards, body).save() : null)
    .then((assessmentstandards) => assessmentstandards ? assessmentstandards.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Assessmentstandards.findById(params.id)
    .then(notFound(res))
    .then((assessmentstandards) => assessmentstandards ? assessmentstandards.remove() : null)
    .then(success(res, 204))
    .catch(next)
