import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Awardpermission } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, awardpermission

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  awardpermission = await Awardpermission.create({})
})

test('POST /awardpermissions 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, groupID: 'test', year: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.groupID).toEqual('test')
  expect(body.year).toEqual('test')
})

test('POST /awardpermissions 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /awardpermissions 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /awardpermissions 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /awardpermissions 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /awardpermissions 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /awardpermissions/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${awardpermission.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(awardpermission.id)
})

test('GET /awardpermissions/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${awardpermission.id}`)
  expect(status).toBe(401)
})

test('GET /awardpermissions/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /awardpermissions/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${awardpermission.id}`)
    .send({ groupID: 'test', year: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(awardpermission.id)
  expect(body.groupID).toEqual('test')
  expect(body.year).toEqual('test')
})

test('PUT /awardpermissions/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ groupID: 'test', year: 'test' })
  expect(status).toBe(404)
})

test('DELETE /awardpermissions/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${awardpermission.id}`)
  expect(status).toBe(204)
})

test('DELETE /awardpermissions/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
