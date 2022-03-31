import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Attach } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, attach

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  attach = await Attach.create({ user })
})

test('POST /attach 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, url: 'test', AssesID: 'test', GroupID: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.url).toEqual('test')
  expect(body.AssesID).toEqual('test')
  expect(body.GroupID).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('POST /attach 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /attach 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].user).toEqual('object')
})

test('GET /attach 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /attach/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${attach.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(attach.id)
  expect(typeof body.user).toEqual('object')
})

test('GET /attach/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${attach.id}`)
  expect(status).toBe(401)
})

test('GET /attach/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /attach/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${attach.id}`)
    .send({ access_token: userSession, url: 'test', AssesID: 'test', GroupID: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(attach.id)
  expect(body.url).toEqual('test')
  expect(body.AssesID).toEqual('test')
  expect(body.GroupID).toEqual('test')
  expect(typeof body.user).toEqual('object')
})

test('PUT /attach/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${attach.id}`)
    .send({ access_token: anotherSession, url: 'test', AssesID: 'test', GroupID: 'test' })
  expect(status).toBe(401)
})

test('PUT /attach/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${attach.id}`)
  expect(status).toBe(401)
})

test('PUT /attach/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, url: 'test', AssesID: 'test', GroupID: 'test' })
  expect(status).toBe(404)
})

test('DELETE /attach/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${attach.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /attach/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${attach.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /attach/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${attach.id}`)
  expect(status).toBe(401)
})

test('DELETE /attach/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
