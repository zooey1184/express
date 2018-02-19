import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
	res.send('/api/')
})
// router.get('/card/create', async (req, res) => {
// 	console.log(req.query)
// 	const { title } = req.query;
// 	const item = {
// 		uid: 1,
// 		cardId: 101,
// 		cardName: title,
// 	};
// 	await ApplyCard.create(item)
// 	res.send(item)
// })
router.get('/list', async (req, res) => {
	res.send('this is api/list')
})

export default router;
