import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Collegeaward } from '.'

const app = () => express(apiRoot, routes)

let userSession, collegeaward

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  collegeaward = await Collegeaward.create({})
})

test('POST /collegeaward 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', year: 'test', award: 'test', level: 'test', org: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.award).toEqual('test')
  expect(body.level).toEqual('test')
  expect(body.org).toEqual('test')
})

test('POST /collegeaward 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /collegeaward 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /collegeaward 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /collegeaward/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${collegeaward.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(collegeaward.id)
})

test('GET /collegeaward/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${collegeaward.id}`)
  expect(status).toBe(401)
})

test('GET /collegeaward/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /collegeaward/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${collegeaward.id}`)
    .send({ access_token: userSession, name: 'test', year: 'test', award: 'test', level: 'test', org: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(collegeaward.id)
  expect(body.name).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.award).toEqual('test')
  expect(body.level).toEqual('test')
  expect(body.org).toEqual('test')
})

test('PUT /collegeaward/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${collegeaward.id}`)
  expect(status).toBe(401)
})

test('PUT /collegeaward/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', year: 'test', award: 'test', level: 'test', org: 'test' })
  expect(status).toBe(404)
})

test('DELETE /collegeaward/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${collegeaward.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /collegeaward/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${collegeaward.id}`)
  expect(status).toBe(401)
})

test('DELETE /collegeaward/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
