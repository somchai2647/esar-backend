import AssesPer from '../assessmentpermission/model';
import Assessment from '../assessment/model';
import ReplyDB from '../reply/model'
import { success, notFound } from '../../services/response/';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const create = ({ body }, res, next) =>
  res.status(201).json(body)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  res.status(200).json([])

export const show = ({ params }, res, next) =>
  res.status(200).json({})

export const update = ({ body, params }, res, next) =>
  res.status(200).json(body)

export const destroy = ({ params }, res, next) =>
  res.status(204).end()

//Custom Controller//

export const showAssesReplybyGroup = async ({ params }, res, next) => {
  try {
    const Asses = await AssesPer.find({ groupID: ObjectId(params.gid) }).sort({ priority: 1 }).populate("assessment")
    const reply = await ReplyDB.find({ groupID: ObjectId(params.gid) })
    const assessment = await Asses.map(item => item.assessment)

    res.status(200).json({ assessment, reply })
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export const showAssesReplybyYear = async ({ params }, res, next) => {
  try {
    // const Asses = await Assessment.find({ year: parseInt(params.year) }).sort({ priority: 1 })
    const reply = await ReplyDB.aggregate([
      {
        $lookup: {
          from: 'assessments',
          localField: "assesID",
          foreignField: "_id",
          as: "assessment"
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: [ { $arrayElemAt: [ "$assessment", 0 ] }, "$$ROOT" ] } }
     },
     { $project: { assessment: 0 } }
      // {
      //   $group: {
      //     _id: "$assesID",
      //     data: {
      //       $addToSet: {
      //         reply: "$reply"
      //       }
      //     }
      //   }
      // }
      // {
      //   $lookup: {
      //     from: 'assessment',
      //     localField: "assesID",
      //     foreignField: "_id",
      //     as: "replys"
      //   },
      // },
    ]).limit(1)
    res.status(200).json(reply)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)

  }
}

export const showPerbyAsses = async ({ params }, res, next) => {
  try {
    const Asses = await AssesPer.find({ assessment: ObjectId(params.aid) }).populate("groupID")

    res.status(200).json({ Asses })
  } catch (error) {
    console.log(error)
  }

}