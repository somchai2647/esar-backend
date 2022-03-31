import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Analysiscommend } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, analysiscommend

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  analysiscommend = await Analysiscommend.create({ user })
})

test('POST /analysis 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, prominent: 'test', developed: 'test', counsel: 'test', GroupID: 'test', AssesID: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.prominent).toEqual('test')
  expect(body.developed).toEqual('test')
  expect(body.counsel).toEqual('test')
  expect(body.GroupID).toEqual('test')
  expect(body.AssesID).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /analysis 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /analysis 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /analysis 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /analysis/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${analysiscommend.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(analysiscommend.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /analysis/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${analysiscommend.id}`)
  expect(status).toBe(401)
})

test('GET /analysis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /analysis/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${analysiscommend.id}`)
    .send({ access_token: userSession, prominent: 'test', developed: 'test', counsel: 'test', GroupID: 'test', AssesID: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(analysiscommend.id)
  expect(body.prominent).toEqual('test')
  expect(body.developed).toEqual('test')
  expect(body.counsel).toEqual('test')
  expect(body.GroupID).toEqual('test')
  expect(body.AssesID).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /analysis/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${analysiscommend.id}`)
    .send({ access_token: anotherSession, prominent: 'test', developed: 'test', counsel: 'test', GroupID: 'test', AssesID: 'test' })
  expect(status).toBe(401)
})

test('PUT /analysis/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${analysiscommend.id}`)
  expect(status).toBe(401)
})

test('PUT /analysis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, prominent: 'test', developed: 'test', counsel: 'test', GroupID: 'test', AssesID: 'test' })
  expect(status).toBe(404)
})

test('DELETE /analysis/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${analysiscommend.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /analysis/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${analysiscommend.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /analysis/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${analysiscommend.id}`)
  expect(status).toBe(401)
})

test('DELETE /analysis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
