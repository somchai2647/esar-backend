import { success, notFound } from '../../services/response/'
import { Awardpermission } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Awardpermission.create(body)
    .then((awardpermission) => awardpermission.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Awardpermission.find(query, select, cursor)
    .then((awardpermissions) => awardpermissions.map((awardpermission) => awardpermission.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Awardpermission.findById(params.id)
    .then(notFound(res))
    .then((awardpermission) => awardpermission ? awardpermission.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Awardpermission.findById(params.id)
    .then(notFound(res))
    .then((awardpermission) => awardpermission ? Object.assign(awardpermission, body).save() : null)
    .then((awardpermission) => awardpermission ? awardpermission.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Awardpermission.findById(params.id)
    .then(notFound(res))
    .then((awardpermission) => awardpermission ? awardpermission.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const customCreate = async ({ body }, res, next) => {
  try {
    const { year, groups } = body
    await Awardpermission.deleteMany({ year: { $eq: year } })

    const permission = await Awardpermission.insertMany(groups)

    res.status(200).json({ permission })


  } catch (error) {

    res.status(200).json({ error })
  }

}

export const showbyYear = ({ params }, res, next) =>
  Awardpermission.find({})
    .populate("groupID")
    .then(notFound(res))
    .then((awardpermission) => awardpermission ? awardpermission : null)
    .then(success(res))
    .catch(next)