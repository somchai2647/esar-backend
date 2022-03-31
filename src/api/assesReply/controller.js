import AssesPer from '../assessmentpermission/model';
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
    // let result = []
    
    // const Asses = await AssesPer.find({ groupID: ObjectId(params.gid) }).populate({
    //   path: 'assessment',
    //   match: { year: { $eq: parseInt(params.year) } },
    //   // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
    // })
        const Asses = await AssesPer.find({ groupID: ObjectId(params.gid) }).populate("assessment")
    const reply = await ReplyDB.find({ groupID: ObjectId(params.gid) })
    const assessment = await Asses.map(item => item.assessment)


    res.status(200).json({ assessment, reply })
  } catch (error) {
    console.log(error)
  }

}