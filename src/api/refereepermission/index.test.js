import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Refereepermission } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, refereepermission

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  refereepermission = await Refereepermission.create({})
})

test('POST /refereepermissions 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, assessID: 'test', userID: 'test', year: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.assessID).toEqual('test')
  expect(body.userID).toEqual('test')
  expect(body.year).toEqual('test')
})

test('POST /refereepermissions 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /refereepermissions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /refereepermissions 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /refereepermissions 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /refereepermissions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /refereepermissions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${refereepermission.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(refereepermission.id)
})

test('GET /refereepermissions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${refereepermission.id}`)
  expect(status).toBe(401)
})

test('GET /refereepermissions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /refereepermissions/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${refereepermission.id}`)
    .send({ access_token: adminSession, assessID: 'test', userID: 'test', year: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(refereepermission.id)
  expect(body.assessID).toEqual('test')
  expect(body.userID).toEqual('test')
  expect(body.year).toEqual('test')
})

test('PUT /refereepermissions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${refereepermission.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /refereepermissions/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${refereepermission.id}`)
  expect(status).toBe(401)
})

test('PUT /refereepermissions/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, assessID: 'test', userID: 'test', year: 'test' })
  expect(status).toBe(404)
})

test('DELETE /refereepermissions/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${refereepermission.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /refereepermissions/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${refereepermission.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /refereepermissions/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${refereepermission.id}`)
  expect(status).toBe(401)
})

test('DELETE /refereepermissions/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
