import {z} from 'zod'

export const taskCatSchema = z.object({
    title: z.string({
        required_error: 'titke is required'
    })
})