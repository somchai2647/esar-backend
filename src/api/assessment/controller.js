import { success, notFound } from '../../services/response/'
import { Assessment } from '.'
import Assessment2 from './model';
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
  Assessment.find(query, select, { limit: 100 })
    .sort({ priority: 1 })
    .then((assessments) => assessments.map((assessment) => assessment.view(true)))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Assessment.findById(params.id)
    .populate("replys")
    .sort({ priority: 1 })
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


//Custom

export const getbyYear = ({ params }, res, next) => {
  Assessment.find({ year: params.year })
    .sort({ priority: 1 })
    .then(notFound(res))
    .then((assessment) => assessment ? assessment : null)
    .then(success(res))
    .catch(next)
}

export const getAsssessmentAdminAgency = async ({ params }, res, next) => {
  try {
    const Agency = await Assessment.aggregate([
      {
        $match: {
          type: "agency",
          year: parseInt(params.year)
        }
      },
      {
        $sort: { priority: 1 }
      },
      {
        $lookup: {
          from: "replies",
          localField: "_id",
          foreignField: "assesID",
          as: "replies"
        }
      },
      {
        $lookup: {
          from: "attaches",
          localField: "_id",
          foreignField: "AssesID",
          as: "attach"
        }
      },
      {
        $unwind: {
          path: "$attach",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "qualityassessments",
          localField: "_id",
          foreignField: "AssessID",
          as: "analysis"
        }
      },
      {
        $unwind: {
          path: "$analysis",
          preserveNullAndEmptyArrays: true
        }
      },

    ]).limit(500)

    res.send(Agency)

  } catch (error) {
    res.send(error)
  }
}

export const IntegrateAssessment = async ({ bodymen: { body }, body: normalbody, params }, res, next) => {
  try {
    const { year, targetyear } = normalbody

    const assess = await Assessment2.find({ year: year })
      .sort({ priority: 1 }).lean();

    let newObj = assess.map((item) => {
      delete item["_id"];
      delete item["createdAt"];
      delete item["updatedAt"];
      delete item["__v"];
      return {
        ...item,
        year: parseInt(targetyear)
      }
    })

    const newAssess = await Assessment2.insertMany(newObj)
    // const newAssess = await Assessment2.deleteMany({ year: 2565 })
    res.send(newAssess)

  } catch (error) {
    res.send(error)
  }
}

//test