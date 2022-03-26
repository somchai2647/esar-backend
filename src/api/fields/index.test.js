import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Fields } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, fields

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  fields = await Fields.create({})
})

test('POST /field 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, assesID: 'test', title: 'test', variable: 'test', isReadOnly: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.assesID).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.variable).toEqual('test')
  expect(body.isReadOnly).toEqual('test')
})

test('POST /field 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /field 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /field 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /field 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /field 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /field 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /field 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /field/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${fields.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(fields.id)
})

test('GET /field/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${fields.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('GET /field/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${fields.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /field/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${fields.id}`)
  expect(status).toBe(401)
})

test('GET /field/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /field/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${fields.id}`)
    .send({ access_token: adminSession, assesID: 'test', title: 'test', variable: 'test', isReadOnly: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(fields.id)
  expect(body.assesID).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.variable).toEqual('test')
  expect(body.isReadOnly).toEqual('test')
})

test('PUT /field/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${fields.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /field/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${fields.id}`)
  expect(status).toBe(401)
})

test('PUT /field/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, assesID: 'test', title: 'test', variable: 'test', isReadOnly: 'test' })
  expect(status).toBe(404)
})

test('DELETE /field/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fields.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /field/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fields.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /field/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${fields.id}`)
  expect(status).toBe(401)
})

test('DELETE /field/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
