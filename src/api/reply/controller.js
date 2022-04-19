import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Reply } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Reply.create({ ...body, userID: user })
    .then((reply) => reply.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Reply.find(query, select, cursor)
    // .populate('userID')
    // .populate('assesID')
    // .populate('groupID')
    .then((replies) => replies.map((reply) => reply.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Reply.findById(params.id)
    // .populate('userID')
    // .populate('assesID')
    // .populate('groupID')
    .then(notFound(res))
    .then((reply) => reply ? reply.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Reply.findById(params.id)
    // .populate('userID')
    // .populate('assesID')
    // .populate('groupID')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userID'))
    .then((reply) => reply ? Object.assign(reply, body).save() : null)
    .then((reply) => reply ? reply.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>{

  Reply.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'userID'))
    .then((reply) => reply ? reply.remove() : null)
    .then(success(res, 204))
    .catch(next)
}