import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Qualityassessment } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, qualityassessment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  qualityassessment = await Qualityassessment.create({ user })
})

test('POST /qualiasses 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, AssessID: 'test', RefereeGroup: 'test', qualitylevel: 'test', prominent: 'test', developed: 'test', counsel: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.AssessID).toEqual('test')
  expect(body.RefereeGroup).toEqual('test')
  expect(body.qualitylevel).toEqual('test')
  expect(body.prominent).toEqual('test')
  expect(body.developed).toEqual('test')
  expect(body.counsel).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /qualiasses 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /qualiasses 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /qualiasses 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /qualiasses/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${qualityassessment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(qualityassessment.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /qualiasses/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${qualityassessment.id}`)
  expect(status).toBe(401)
})

test('GET /qualiasses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /qualiasses/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${qualityassessment.id}`)
    .send({ access_token: userSession, AssessID: 'test', RefereeGroup: 'test', qualitylevel: 'test', prominent: 'test', developed: 'test', counsel: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(qualityassessment.id)
  expect(body.AssessID).toEqual('test')
  expect(body.RefereeGroup).toEqual('test')
  expect(body.qualitylevel).toEqual('test')
  expect(body.prominent).toEqual('test')
  expect(body.developed).toEqual('test')
  expect(body.counsel).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /qualiasses/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${qualityassessment.id}`)
    .send({ access_token: anotherSession, AssessID: 'test', RefereeGroup: 'test', qualitylevel: 'test', prominent: 'test', developed: 'test', counsel: 'test' })
  expect(status).toBe(401)
})

test('PUT /qualiasses/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${qualityassessment.id}`)
  expect(status).toBe(401)
})

test('PUT /qualiasses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, AssessID: 'test', RefereeGroup: 'test', qualitylevel: 'test', prominent: 'test', developed: 'test', counsel: 'test' })
  expect(status).toBe(404)
})

test('DELETE /qualiasses/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${qualityassessment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /qualiasses/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${qualityassessment.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /qualiasses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${qualityassessment.id}`)
  expect(status).toBe(401)
})

test('DELETE /qualiasses/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
