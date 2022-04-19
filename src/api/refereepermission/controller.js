import { success, notFound } from '../../services/response/'
import { Refereepermission } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Refereepermission.create(body)
    .then((refereepermission) => refereepermission.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Refereepermission.find(query, select, cursor)
    .then((refereepermissions) => refereepermissions.map((refereepermission) => refereepermission.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Refereepermission.findById(params.id)
    .then(notFound(res))
    .then((refereepermission) => refereepermission ? refereepermission.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Refereepermission.findById(params.id)
    .then(notFound(res))
    .then((refereepermission) => refereepermission ? Object.assign(refereepermission, body).save() : null)
    .then((refereepermission) => refereepermission ? refereepermission.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Refereepermission.findById(params.id)
    .then(notFound(res))
    .then((refereepermission) => refereepermission ? refereepermission.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const createCustom = async ({ bodymen: { body }, body: normalbody }, res, next) => {
  const { userid, year, assessments } = normalbody

  await Refereepermission.deleteMany({ userID: { $eq: userid }, year: { $eq: year } })


  let payload = []
  assessments.map((asses) => {
    payload.push({
      assessID: asses,
      userID: userid,
      year: year
    })
  })

  Refereepermission.insertMany(payload)
    .then((refereepermission) => refereepermission)
    .then(success(res, 201))
    .catch(next)
}

export const getRefebyUser = async ({ params }, res, next) => {
  Refereepermission.find({ userID: params.userid })
    .populate('assessID')
    .then((refereepermission) => refereepermission)
    .then(success(res, 201))
    .catch(next)
}