import { success, notFound } from '../../services/response/'
import { Assessmentpermission } from '.'
import Assessment from "../assessment/model"
import Reply from '../reply/model';
import { Promise } from 'bluebird';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const create = ({ bodymen: { body } }, res, next) =>
  Assessmentpermission.create(body)
    .then((assessmentpermission) => assessmentpermission.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Assessmentpermission.find(query, select, cursor)
    .populate("assessment")
    .then((assessmentpermissions) => assessmentpermissions.map((assessmentpermission) => assessmentpermission.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) => {
  Assessmentpermission.aggregate([
    {
      $lookup: {
        from: 'replies',
        localField: "assessment",
        foreignField: "assesID",
        as: "replys"
      },
    },
    { $unwind: "$replys" },
    {
      $lookup: {
        from: 'assessments',
        localField: "assessment",
        foreignField: "_id",
        as: "assm"
      },
    },
    { $unwind: "$assm" },
    {
      $match: {
        $and: [{ groupID: ObjectId(params.id) }, { 'assm.year': parseInt(params.year) }]
      }
    },
    {
      $project: {
        _id: 1,
        assess: "$assm",
        replys: "$replys"
      }
    }
  ])
    .then(notFound(res))
    .then(async (assessmentpermission) => {
      return assessmentpermission
      // let assessment = assessmentpermission.filter(async (asses, i) => {
      //   if (asses.assessment.year == params.year) {
      //     const assesid = asses.assessment.id
      //     const replys = await Reply.find({ assesID: assesid })
      //     const rp = await Promise.all(replys)
      //     console.log(rp)
      //     asses.replys = rp
      //     return {
      //       ...asses,
      //       replys: rp
      //     }
      //   }
      // })
      // const x = await Promise.all(assessment)
      // console.log(x)
      // return x
    })
    .then(success(res))
    .catch(next)

}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Assessmentpermission.findById(params.id)
    .then(notFound(res))
    .then((assessmentpermission) => assessmentpermission ? Object.assign(assessmentpermission, body).save() : null)
    .then((assessmentpermission) => assessmentpermission ? assessmentpermission.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Assessmentpermission.findById(params.id)
    .then(notFound(res))
    .then((assessmentpermission) => assessmentpermission ? assessmentpermission.remove() : null)
    .then(success(res, 204))
    .catch(next)
