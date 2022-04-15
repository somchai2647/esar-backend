import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Teacheraward } from '.'

const app = () => express(apiRoot, routes)

let userSession, teacheraward

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  teacheraward = await Teacheraward.create({})
})

test('POST /teacherawards 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', teachername: 'test', award: 'test', level: 'test', org: 'test', year: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.teachername).toEqual('test')
  expect(body.award).toEqual('test')
  expect(body.level).toEqual('test')
  expect(body.org).toEqual('test')
  expect(body.year).toEqual('test')
})

test('POST /teacherawards 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /teacherawards 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /teacherawards 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /teacherawards/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${teacheraward.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(teacheraward.id)
})

test('GET /teacherawards/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${teacheraward.id}`)
  expect(status).toBe(401)
})

test('GET /teacherawards/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /teacherawards/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${teacheraward.id}`)
    .send({ access_token: userSession, name: 'test', teachername: 'test', award: 'test', level: 'test', org: 'test', year: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(teacheraward.id)
  expect(body.name).toEqual('test')
  expect(body.teachername).toEqual('test')
  expect(body.award).toEqual('test')
  expect(body.level).toEqual('test')
  expect(body.org).toEqual('test')
  expect(body.year).toEqual('test')
})

test('PUT /teacherawards/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${teacheraward.id}`)
  expect(status).toBe(401)
})

test('PUT /teacherawards/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', teachername: 'test', award: 'test', level: 'test', org: 'test', year: 'test' })
  expect(status).toBe(404)
})

test('DELETE /teacherawards/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${teacheraward.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /teacherawards/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${teacheraward.id}`)
  expect(status).toBe(401)
})

test('DELETE /teacherawards/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
