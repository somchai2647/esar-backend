import { success, notFound } from '../../services/response/'
import AssesStard from '../assessmentstandards/model'
import { Summarize } from '.'
import SummarizeModel from './model';

export const create = ({ bodymen: { body } }, res, next) =>
  Summarize.create(body)
    .then((summarize) => summarize.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Summarize.find(query, select, cursor)
    .then((summarizes) => summarizes.map((summarize) => summarize.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Summarize.findById(params.id)
    .then(notFound(res))
    .then((summarize) => summarize ? summarize.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Summarize.findById(params.id)
    .then(notFound(res))
    .then((summarize) => summarize ? Object.assign(summarize, body).save() : null)
    .then((summarize) => summarize ? summarize.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Summarize.findById(params.id)
    .then(notFound(res))
    .then((summarize) => summarize ? summarize.remove() : null)
    .then(success(res, 204))
    .catch(next)

//Custom

export const createCustom = ({ bodymen: { body }, body: normalbody }, res, next) => {

  Summarize.create(body)
    .then((summarize) => summarize.view(true))
    .then(async (summarize) => {
      let newArr = []
      const summarizeID = summarize.id

      normalbody.standards.map((standards) => {
        let newObj = {
          ...standards,
          summarize: summarizeID
        }
        newArr.push(newObj)
      })

      await AssesStard.insertMany(newArr)

      return summarize
    })
    .then(success(res, 201))
    .catch(next)
}

export const showByYear = async ({ params }, res, next) => {
  try {
    const data = await SummarizeModel.aggregate([
      {
        $match: {
          year: parseInt(params.year)
        }
      },
      {
        $sort: { priority: 1 }
      },
      {
        $lookup: {
          from: "assessmentstandards",
          localField: "_id",
          foreignField: "summarize",
          pipeline: [
            {
              $sort: {
                priority: 1
              }
            },
            {
              $lookup: {
                from: "assessmentsides",
                localField: "assessmentsides",
                foreignField: "_id",
                pipeline: [
                  {
                    $lookup: {
                      from: "qualityassessments",
                      localField: "assessments",
                      foreignField: "AssessID",
                      pipeline: [
                        {
                          $lookup: {
                            from: "assessments",
                            localField: "AssessID",
                            foreignField: "_id",
                            pipeline: [
                              {
                                $project: {
                                  weight: 1
                                }
                              }
                            ],
                            as: "weight"
                          },
                        },
                        {
                          $unwind: {
                            path: "$weight",
                            preserveNullAndEmptyArrays: true
                          }
                        }
                      ],
                      as: "assessments"
                    }
                  },
                ],
                as: "assessmentsides"
              }
            },
          ],
          as: "standards"
        }
      },
    ]).limit(100)

    res.json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
