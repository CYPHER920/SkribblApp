
const zod = require('zod')

const roomCreateSchema = zod.object({
    maxRounds: zod.number().min(1).max(6).default(3),
    maxPlayers: zod.number().min(2).max(6).default(3)
})

module.exports = roomCreateSchema