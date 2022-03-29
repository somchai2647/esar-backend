import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Reply } from '.'

const app = () => express(apiRoot, routes)

let userSession, anotherSession, reply

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  reply = await Reply.create({ userID: user })
})

test('POST /reply 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, assesID: 'test', groupID: 'test', reply: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.assesID).toEqual('test')
  expect(body.groupID).toEqual('test')
  expect(body.reply).toEqual('test')
  expect(typeof body.userID).toEqual('object')
})

test('POST /reply 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reply 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].userID).toEqual('object')
})

test('GET /reply 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /reply/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${reply.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reply.id)
  expect(typeof body.userID).toEqual('object')
})

test('GET /reply/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${reply.id}`)
  expect(status).toBe(401)
})

test('GET /reply/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /reply/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${reply.id}`)
    .send({ access_token: userSession, assesID: 'test', groupID: 'test', reply: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(reply.id)
  expect(body.assesID).toEqual('test')
  expect(body.groupID).toEqual('test')
  expect(body.reply).toEqual('test')
  expect(typeof body.userID).toEqual('object')
})

test('PUT /reply/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reply.id}`)
    .send({ access_token: anotherSession, assesID: 'test', groupID: 'test', reply: 'test' })
  expect(status).toBe(401)
})

test('PUT /reply/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${reply.id}`)
  expect(status).toBe(401)
})

test('PUT /reply/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, assesID: 'test', groupID: 'test', reply: 'test' })
  expect(status).toBe(404)
})

test('DELETE /reply/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reply.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /reply/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reply.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /reply/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${reply.id}`)
  expect(status).toBe(401)
})

test('DELETE /reply/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
