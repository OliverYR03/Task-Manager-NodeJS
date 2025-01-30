import { Router } from "express";
import { authRequired } from "../middlewares/validateTokens.js";
import {getStatus, getStatuses, createStatus, updateStatus, deleteStatus} from '../controllers/status.controller.js'
import {getPriority, getPriorities, createPriority, updatePriority, deletePriority} from '../controllers/priority.controller.js'
import { taskCatSchema } from "../schemas/taskCat.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router()
router.get('/status', getStatuses)
router.get('/priority', getPriorities)

router.get('/priority/:id', getPriority)
router.get('/status/:id', getStatus)

router.post('/status', validateSchema(taskCatSchema), createStatus)
router.post('/priority', validateSchema(taskCatSchema), createPriority)

router.patch('/status/:id', updateStatus )
router.patch('/priority/:id', updatePriority)

router.delete('/status/:id', deleteStatus)
router.delete('/priority/:id', deletePriority)




export default router
