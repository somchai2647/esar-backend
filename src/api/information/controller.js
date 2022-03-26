import { success, notFound } from '../../services/response/'
import { Information } from '.'
import moment from 'moment'
moment.locale("th");

export const create = ({ bodymen: { body } }, res, next) =>
  Information.create(body)
    .then((information) => information.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Information.count(query)
    .then(count => Information.find(query, select, cursor)
      .then((information) => ({
        count,
        rows: information.map((data) => {
          const dateString = moment(data.createdAt).add(543,'year').format("LLL");
          const view = data.view()
          return {
            ...view,
            dateString
          }
        })
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Information.findById(params.id)
    .then(notFound(res))
    .then((information) => {
      const dateString = moment(information.updatedAt).add(543,'year').format("LLL");
      return {
        ...information,
        dateString
      }
    })
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Information.findById(params.id)
    .then(notFound(res))
    .then((information) => information ? Object.assign(information, body).save() : null)
    .then((information) => information ? information.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Information.findById(params.id)
    .then(notFound(res))
    .then((information) => information ? information.remove() : null)
    .then(success(res, 204))
    .catch(next)
