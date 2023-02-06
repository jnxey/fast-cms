import Koa, { type ExtendableContext } from 'koa'
const app: Koa = new Koa()

// response
app.use((ctx: ExtendableContext) => {
  const list = [1, 2, 3]
  for (let i = 0; i < list.length; i++) {
    console.log(i)
  }
  ctx.body = 'Hello Koa'
})

app.listen(3000)
