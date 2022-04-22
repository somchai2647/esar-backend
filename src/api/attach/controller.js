import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Attach } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Attach.create({ ...body, user })
    .then((attach) => attach.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Attach.find(query, select, cursor)
    .populate('user')
    .limit(100)
    .then((attaches) => attaches.map((attach) => attach.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Attach.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((attach) => attach ? attach.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Attach.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((attach) => attach ? Object.assign(attach, body).save() : null)
    .then((attach) => attach ? attach.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Attach.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((attach) => attach ? attach.remove() : null)
    .then(success(res, 204))
    .catch(next)

//CustomZone
export const getbyAsses = async ({ params }, res, next) => {
  Attach.findOne({ AssesID: params.assesid })
    .then(notFound(res))
    .then((attach) => attach ? attach.view() : null)
    .then(success(res))
    .catch(next)
}

export const addattach = async ({ user, bodymen: { body } }, res, next) => {
  try {
    var filter = {}
    var attach = null
    if (body.type == "agency") {
      filter = { AssesID: body.AssesID, GroupID: body.GroupID }
      attach = await Attach.findOne(filter).populate({
        path: "AssesID",
        match: { type: { $eq: "agency" } },
        select: 'name -_id type'
      })
    } else {
      filter = { AssesID: body.AssesID }
      attach = await Attach.findOne(filter)
    }

    if (!attach) {
      const inserted = await Attach.create({ ...body, user })
      const res = inserted ? attach.view(true) : null

      res.status(200).json(res)
    } else {
      const updated = await Attach.updateOne(filter, { url: body.url })
      res.status(200).json(updated)
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
    next(error)
  }

}