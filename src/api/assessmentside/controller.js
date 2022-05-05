import { success, notFound } from '../../services/response/'
import { Assessmentside } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Assessmentside.create(body)
    .then((assessmentside) => assessmentside.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Assessmentside.find(query, select, cursor)
    .then((assessmentsides) => assessmentsides.map((assessmentside) => assessmentside.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Assessmentside.findById(params.id)
    .then(notFound(res))
    .then((assessmentside) => assessmentside ? assessmentside.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Assessmentside.findById(params.id)
    .then(notFound(res))
    .then((assessmentside) => assessmentside ? Object.assign(assessmentside, body).save() : null)
    .then((assessmentside) => assessmentside ? assessmentside.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Assessmentside.findById(params.id)
    .then(notFound(res))
    .then((assessmentside) => assessmentside ? assessmentside.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const getbyType = async ({ params }, res, next) => {
  Assessmentside.find({ type: params.type, year: parseInt(params.year) })
    // .populate("assessments", "id title priority weight")
    .sort({ priority: 1 })
    .limit(100)
    .then(notFound(res))
    .then((assessmentside) => assessmentside ? assessmentside : null)
    .then(success(res))
    .catch(next)
}

export const getbyYear = async ({ params }, res, next) => {
  Assessmentside.find({ year: parseInt(params.year) })
    .populate("assessments", "id title priority weight")
    .sort({ priority: 1 })
    .limit(100)
    .then(notFound(res))
    .then((assessmentside) => assessmentside ? assessmentside : null)
    .then(success(res))
    .catch(next)
}

export const getResultbyYear = async ({ params }, res, next) => {
  try {
    const starnd = await Assessmentside.aggregate([
      {
        $match: {
          type: "agency",
          year: parseInt(params.year)
        }
      },
      {
        $lookup: {
          from: "assessments",
          localField: "assessments",
          foreignField: "_id",
          pipeline: [
            {
              $sort: {
                priority: 1
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
            {
              $project: {
                _id: 1,
                weight: 1,
                title: 1,
                replies: 1,
                analysis: "$analysis.qualitylevel"
              }
            },
          ],
          as: "assessments"
        }
      }
    ]).sort({ priority: 1 }).limit(100)

    res.status(200).json(starnd ? starnd : [])

  } catch (error) {
    res.status(200).json(error)
  }
}