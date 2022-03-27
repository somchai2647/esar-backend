import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Assessmentpermission } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, assessmentpermission

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  assessmentpermission = await Assessmentpermission.create({})
})

test('POST /assespermis 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, assesID: 'test', groupID: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.assesID).toEqual('test')
  expect(body.groupID).toEqual('test')
})

test('POST /assespermis 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /assespermis 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /assespermis 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /assespermis 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /assespermis/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${assessmentpermission.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assessmentpermission.id)
})

test('GET /assespermis/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${assessmentpermission.id}`)
  expect(status).toBe(401)
})

test('GET /assespermis/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /assespermis/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${assessmentpermission.id}`)
    .send({ access_token: adminSession, assesID: 'test', groupID: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assessmentpermission.id)
  expect(body.assesID).toEqual('test')
  expect(body.groupID).toEqual('test')
})

test('PUT /assespermis/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${assessmentpermission.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /assespermis/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${assessmentpermission.id}`)
  expect(status).toBe(401)
})

test('PUT /assespermis/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, assesID: 'test', groupID: 'test' })
  expect(status).toBe(404)
})

test('DELETE /assespermis/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessmentpermission.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /assespermis/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessmentpermission.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /assespermis/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessmentpermission.id}`)
  expect(status).toBe(401)
})

test('DELETE /assespermis/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
