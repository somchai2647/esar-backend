import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Refereegroup } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, refereegroup

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  refereegroup = await Refereegroup.create({})
})

test('POST /refereegroups 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', leader: 'test', users: 'test', year: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.leader).toEqual('test')
  expect(body.users).toEqual('test')
  expect(body.year).toEqual('test')
})

test('POST /refereegroups 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /refereegroups 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /refereegroups 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /refereegroups 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /refereegroups 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /refereegroups/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${refereegroup.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(refereegroup.id)
})

test('GET /refereegroups/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${refereegroup.id}`)
  expect(status).toBe(401)
})

test('GET /refereegroups/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /refereegroups/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${refereegroup.id}`)
    .send({ access_token: adminSession, name: 'test', description: 'test', leader: 'test', users: 'test', year: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(refereegroup.id)
  expect(body.name).toEqual('test')
  expect(body.description).toEqual('test')
  expect(body.leader).toEqual('test')
  expect(body.users).toEqual('test')
  expect(body.year).toEqual('test')
})

test('PUT /refereegroups/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${refereegroup.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /refereegroups/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${refereegroup.id}`)
  expect(status).toBe(401)
})

test('PUT /refereegroups/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, name: 'test', description: 'test', leader: 'test', users: 'test', year: 'test' })
  expect(status).toBe(404)
})

test('DELETE /refereegroups/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${refereegroup.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /refereegroups/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${refereegroup.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /refereegroups/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${refereegroup.id}`)
  expect(status).toBe(401)
})

test('DELETE /refereegroups/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
