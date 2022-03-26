import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Information } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, information

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  information = await Information.create({})
})

test('POST /information 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, title: 'test', isURL: 'test', URL: 'test', detail: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.isURL).toEqual('test')
  expect(body.URL).toEqual('test')
  expect(body.detail).toEqual('test')
})

test('POST /information 401 (admin)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('POST /information 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /information 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /information 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /information 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /information 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /information/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${information.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(information.id)
})

test('GET /information/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${information.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /information/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${information.id}`)
  expect(status).toBe(401)
})

test('GET /information/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /information/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${information.id}`)
    .send({ access_token: masterKey, title: 'test', isURL: 'test', URL: 'test', detail: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(information.id)
  expect(body.title).toEqual('test')
  expect(body.isURL).toEqual('test')
  expect(body.URL).toEqual('test')
  expect(body.detail).toEqual('test')
})

test('PUT /information/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${information.id}`)
    .send({ access_token: adminSession })
  expect(status).toBe(401)
})

test('PUT /information/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${information.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /information/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${information.id}`)
  expect(status).toBe(401)
})

test('PUT /information/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, title: 'test', isURL: 'test', URL: 'test', detail: 'test' })
  expect(status).toBe(404)
})

test('DELETE /information/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${information.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /information/:id 401 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${information.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(401)
})

test('DELETE /information/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${information.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /information/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${information.id}`)
  expect(status).toBe(401)
})

test('DELETE /information/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
