import { success, notFound } from '../../services/response/'
import { Refereegroup } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Refereegroup.create(body)
    .then((refereegroup) => refereegroup.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Refereegroup.find(query, select, cursor)
    .populate("leader", "_id name group")
    .populate("users.userid", "_id name group")
    .sort({ createdAt: -1 })
    .then((refereegroups) => refereegroups.map((refereegroup) => refereegroup.view()))
    .then(success(res))
    .catch(next)

export const leaderCheck = ({ params }, res, next) => {
  Refereegroup.findOne({ leader: params.userid })
    .populate("leader", "_id name group")
    .populate("users.userid", "_id name group")
    .sort({ createdAt: -1 })
    .then(notFound(res))
    .then((refereegroups) => {
  
      return refereegroups
    })
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Refereegroup.findById(params.id)
    .then(notFound(res))
    .then((refereegroup) => refereegroup ? refereegroup.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Refereegroup.findById(params.id)
    .then(notFound(res))
    .then((refereegroup) => refereegroup ? Object.assign(refereegroup, body).save() : null)
    .then((refereegroup) => refereegroup ? refereegroup.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Refereegroup.findById(params.id)
    .then(notFound(res))
    .then((refereegroup) => refereegroup ? refereegroup.remove() : null)
    .then(success(res, 204))
    .catch(next)
