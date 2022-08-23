import { Router } from 'express'
import { getIp, getLastLookups, getLastVisitors, ipLookup } from '../controllers/ip.controllers.js'
const router = Router()

router.get('/', (req, res) => {
  try {
    res.json({ message: 'hi' })
  } catch (err) {
    res.json(err)
  }
})
router.get('/api/ip', getIp)
router.post('/api/ip', ipLookup)
router.get('/api/visitors', getLastVisitors)
router.get('/api/lookups', getLastLookups)

export default router
