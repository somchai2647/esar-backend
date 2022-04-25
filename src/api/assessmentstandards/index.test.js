import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Assessmentstandards } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, assessmentstandards

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  assessmentstandards = await Assessmentstandards.create({})
})

test('POST /standard 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, title: 'test', description: 'test', year: 'test', assessments: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.assessments).toEqual('test')
})

test('POST /standard 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /standard 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /standard 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /standard 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /standard/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${assessmentstandards.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assessmentstandards.id)
})

test('GET /standard/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${assessmentstandards.id}`)
  expect(status).toBe(401)
})

test('GET /standard/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /standard/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${assessmentstandards.id}`)
    .send({ access_token: adminSession, title: 'test', description: 'test', year: 'test', assessments: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(assessmentstandards.id)
  expect(body.title).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.year).toEqual('test')
  expect(body.assessments).toEqual('test')
})

test('PUT /standard/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${assessmentstandards.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /standard/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${assessmentstandards.id}`)
  expect(status).toBe(401)
})

test('PUT /standard/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, title: 'test', description: 'test', year: 'test', assessments: 'test' })
  expect(status).toBe(404)
})

test('DELETE /standard/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessmentstandards.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /standard/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessmentstandards.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /standard/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${assessmentstandards.id}`)
  expect(status).toBe(401)
})

test('DELETE /standard/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
