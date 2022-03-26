import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { General } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, general

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  general = await General.create({})
})

test('POST /generals 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, academy: 'test', year: 'test', director: 'test', executiveResource: 'test', executivePlanning: 'test', executiveAffairs: 'test', executiveDepartment: 'test', leaderQA: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.academy).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.director).toEqual('test')
  expect(body.executiveResource).toEqual('test')
  expect(body.executivePlanning).toEqual('test')
  expect(body.executiveAffairs).toEqual('test')
  expect(body.executiveDepartment).toEqual('test')
  expect(body.leaderQA).toEqual('test')
})

test('POST /generals 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /generals 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /generals 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /generals 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /generals/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${general.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(general.id)
})

test('GET /generals/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${general.id}`)
  expect(status).toBe(401)
})

test('GET /generals/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /generals/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${general.id}`)
    .send({ access_token: adminSession, academy: 'test', year: 'test', director: 'test', executiveResource: 'test', executivePlanning: 'test', executiveAffairs: 'test', executiveDepartment: 'test', leaderQA: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(general.id)
  expect(body.academy).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.director).toEqual('test')
  expect(body.executiveResource).toEqual('test')
  expect(body.executivePlanning).toEqual('test')
  expect(body.executiveAffairs).toEqual('test')
  expect(body.executiveDepartment).toEqual('test')
  expect(body.leaderQA).toEqual('test')
})

test('PUT /generals/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${general.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /generals/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${general.id}`)
  expect(status).toBe(401)
})

test('PUT /generals/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, academy: 'test', year: 'test', director: 'test', executiveResource: 'test', executivePlanning: 'test', executiveAffairs: 'test', executiveDepartment: 'test', leaderQA: 'test' })
  expect(status).toBe(404)
})

test('DELETE /generals/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${general.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /generals/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${general.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /generals/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${general.id}`)
  expect(status).toBe(401)
})

test('DELETE /generals/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
