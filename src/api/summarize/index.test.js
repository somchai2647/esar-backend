import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Summarize } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, summarize

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  summarize = await Summarize.create({})
})

test('POST /summarize 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, title: 'test', description: 'test', priority: 'test', year: 'test', standards: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.standards).toEqual('test')
})

test('POST /summarize 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /summarize 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /summarize 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /summarize 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /summarize/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${summarize.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(summarize.id)
})

test('GET /summarize/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${summarize.id}`)
  expect(status).toBe(401)
})

test('GET /summarize/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /summarize/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${summarize.id}`)
    .send({ access_token: adminSession, title: 'test', description: 'test', priority: 'test', year: 'test', standards: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(summarize.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.priority).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.standards).toEqual('test')
})

test('PUT /summarize/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${summarize.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /summarize/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${summarize.id}`)
  expect(status).toBe(401)
})

test('PUT /summarize/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test', description: 'test', priority: 'test', year: 'test', standards: 'test' })
  expect(status).toBe(404)
})

test('DELETE /summarize/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${summarize.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /summarize/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${summarize.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /summarize/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${summarize.id}`)
  expect(status).toBe(401)
})

test('DELETE /summarize/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
