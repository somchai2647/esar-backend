import { success, notFound, authorOrAdmin, notFound2 } from '../../services/response/'
import { Qualityassessment } from '.'

import QA from './model'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Qualityassessment.create({ ...body, user })
    .then((qualityassessment) => qualityassessment.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Qualityassessment.find(query, select, cursor)
    .populate('user')
    .then((qualityassessments) => qualityassessments.map((qualityassessment) => qualityassessment.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Qualityassessment.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((qualityassessment) => qualityassessment ? qualityassessment.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Qualityassessment.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((qualityassessment) => qualityassessment ? Object.assign(qualityassessment, body).save() : null)
    .then((qualityassessment) => qualityassessment ? qualityassessment.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Qualityassessment.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((qualityassessment) => qualityassessment ? qualityassessment.remove() : null)
    .then(success(res, 204))
    .catch(next)

//custom
export const customCreate = async ({ user, bodymen: { body } }, res, next) => {

  try {

    await Qualityassessment.findOneAndDelete({ AssessID: body.AssessID, })

    Qualityassessment.create({ ...body, user })
      .then((qualityassessment) => qualityassessment.view(true))
      .then(success(res, 201))
      .catch(next)

  } catch (error) {
    res.status(400).send(error)
  }

}

export const showCustom = ({ params }, res, next) => {
  Qualityassessment.findOne({ AssessID: params.assesid })
    .populate('user')
    .then(notFound2(res))
    .then((qualityassessment) => qualityassessment ? qualityassessment.view() : null)
    .then(success(res))
    .catch(next)
  //   try {
  //     const data = QA.findOne({ AssessID: params.assesid }).populate('user')

  //     // if (!data) throw new Error(null)
  //     console.log(data)

  //     res.status(200).json(data ? data : null)

  //   } catch (error) {
  //     res.status(200).json(null)
  //   }
}
