import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Assessment } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, assessment

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  assessment = await Assessment.create({})
})

test('POST /asses 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, priority: 'test', year: 'test', title: 'test', description: 'test', descriptionHTML: 'test', status: 'test', type: 'test', url: 'test', formula: 'test', aggregate: 'test', countrows: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.priority).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.descriptionHTML).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.formula).toEqual('test')
  expect(body.aggregate).toEqual('test')
  expect(body.countrows).toEqual('test')
})

test('POST /asses 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /asses 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /asses 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /asses 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /asses 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /asses 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /asses/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${assessment.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assessment.id)
})

test('GET /asses/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${assessment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /asses/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${assessment.id}`)
  expect(status).toBe(401)
})

test('GET /asses/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /asses/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${assessment.id}`)
    .send({ access_token: adminSession, priority: 'test', year: 'test', title: 'test', description: 'test', descriptionHTML: 'test', status: 'test', type: 'test', url: 'test', formula: 'test', aggregate: 'test', countrows: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assessment.id)
  expect(body.priority).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.descriptionHTML).toEqual('test')
  expect(body.status).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.url).toEqual('test')
  expect(body.formula).toEqual('test')
  expect(body.aggregate).toEqual('test')
  expect(body.countrows).toEqual('test')
})

test('PUT /asses/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${assessment.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /asses/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${assessment.id}`)
  expect(status).toBe(401)
})

test('PUT /asses/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, priority: 'test', year: 'test', title: 'test', description: 'test', descriptionHTML: 'test', status: 'test', type: 'test', url: 'test', formula: 'test', aggregate: 'test', countrows: 'test' })
  expect(status).toBe(404)
})

test('DELETE /asses/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessment.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /asses/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessment.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /asses/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessment.id}`)
  expect(status).toBe(401)
})

test('DELETE /asses/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
