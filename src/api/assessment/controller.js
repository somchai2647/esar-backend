import { success, notFound } from '../../services/response/'
import { Assessment } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  console.log(body)
  Assessment.create(body)
    .then((assessment) => assessment.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Assessment.find(query, select, cursor)
    .then((assessments) => assessments.map((assessment) => assessment.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Assessment.findById(params.id)
    .then(notFound(res))
    .then((assessment) => assessment ? assessment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Assessment.findById(params.id)
    .then(notFound(res))
    .then((assessment) => assessment ? Object.assign(assessment, body).save() : null)
    .then((assessment) => assessment ? assessment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Assessment.findById(params.id)
    .then(notFound(res))
    .then((assessment) => assessment ? assessment.remove() : null)
    .then(success(res, 204))
    .catch(next)
