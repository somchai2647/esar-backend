import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Analysiscommend } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Analysiscommend.create({ ...body, user })
    .then((analysiscommend) => analysiscommend.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Analysiscommend.find(query, select, cursor)
    .populate('user')
    .then((analysiscommends) => analysiscommends.map((analysiscommend) => analysiscommend.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Analysiscommend.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((analysiscommend) => analysiscommend ? analysiscommend.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Analysiscommend.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((analysiscommend) => analysiscommend ? Object.assign(analysiscommend, body).save() : null)
    .then((analysiscommend) => analysiscommend ? analysiscommend.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Analysiscommend.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((analysiscommend) => analysiscommend ? analysiscommend.remove() : null)
    .then(success(res, 204))
    .catch(next)

//CustomZone
export const getbyAsses = async ({ params }, res, next) => {
  Analysiscommend.findOne({ AssesID: params.assesid })
    .then(notFound(res))
    .then((analysiscommend) => analysiscommend ? analysiscommend.view() : null)
    .then(success(res))
    .catch(next)
}

export const addAgency = async ({ user, bodymen: { body } }, res, next) => {
  try {
    const filter = { AssesID: body.AssesID, GroupID: body.GroupID }
    const data = await Analysiscommend.findOne(filter)
    if (!data) {
      const analysiscommend = await Analysiscommend.create({ ...body, user })
      const resData = analysiscommend ? analysiscommend.view(true) : null

      res.status(200).json(resData)
    } else {
      const updated = await Analysiscommend.updateOne(filter, body)
      res.status(200).json(updated)
    }
  } catch (error) {
    console.log(error)
    // res.status(400).json(error)
  }

}