import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Studentaward } from '.'

const app = () => express(apiRoot, routes)

let userSession, studentaward

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  userSession = signSync(user.id)
  studentaward = await Studentaward.create({})
})

test('POST /studentaward 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, name: 'test', year: 'test', award: 'test', type: 'test', level: 'test', org: 'test', students: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.award).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.level).toEqual('test')
  expect(body.org).toEqual('test')
  expect(body.students).toEqual('test')
})

test('POST /studentaward 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /studentaward 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /studentaward 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /studentaward/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${studentaward.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(studentaward.id)
})

test('GET /studentaward/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${studentaward.id}`)
  expect(status).toBe(401)
})

test('GET /studentaward/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /studentaward/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${studentaward.id}`)
    .send({ access_token: userSession, name: 'test', year: 'test', award: 'test', type: 'test', level: 'test', org: 'test', students: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(studentaward.id)
  expect(body.name).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.award).toEqual('test')
  expect(body.type).toEqual('test')
  expect(body.level).toEqual('test')
  expect(body.org).toEqual('test')
  expect(body.students).toEqual('test')
})

test('PUT /studentaward/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${studentaward.id}`)
  expect(status).toBe(401)
})

test('PUT /studentaward/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: userSession, name: 'test', year: 'test', award: 'test', type: 'test', level: 'test', org: 'test', students: 'test' })
  expect(status).toBe(404)
})

test('DELETE /studentaward/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${studentaward.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /studentaward/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${studentaward.id}`)
  expect(status).toBe(401)
})

test('DELETE /studentaward/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})
