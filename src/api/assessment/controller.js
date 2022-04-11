import { success, notFound } from '../../services/response/'
import { Assessment } from '.'
import Assessmentpermission from '../assessmentpermission/model'

export const create = ({ bodymen: { body }, body: normalbody }, res, next) => {
  Assessment.create(body)
    .then(async (assessment) => {
      let payload = []
      const permissions = normalbody.Permission
      permissions.map(groupid => {
        payload.push({
          assessment: assessment._id,
          groupID: groupid
        })
      })
      await Assessmentpermission.insertMany(payload)
      assessment.view(true)

      return assessment
    })
    .then(success(res, 201))
    .catch(next)
}

export const update = ({ bodymen: { body }, body: normalbody, params }, res, next) =>
  Assessment.findById(params.id)
    .then(notFound(res))
    .then((assessment) => assessment ? Object.assign(assessment, body).save() : null)
    .then(async (assessment) => {
      assessment ? assessment.view(true) : null

      await Assessmentpermission.deleteMany({ assessment: { $eq: params.id } })

      return assessment
    })
    .then(async (assessment) => {
      let payload = []
      const permissions = normalbody.Permission
      permissions.map(groupid => {
        payload.push({
          assessment: assessment._id,
          groupID: groupid
        })
      })
      await Assessmentpermission.insertMany(payload)

      return assessment
    })
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Assessment.find(query, select, cursor)
    .then((assessments) => assessments.map((assessment) => assessment.view(true)))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Assessment.findById(params.id)
    .populate("replys")
    .then(notFound(res))
    .then((assessment) => assessment ? assessment.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) => {
  Assessment.findById(params.id)
    .then(notFound(res))
    .then(async (assessment) => {
      await Assessmentpermission.deleteMany({ assessment: { $eq: params.id } })
      return assessment ? assessment.remove() : null

    })
    .then(success(res, 204))
    .catch(next)
}