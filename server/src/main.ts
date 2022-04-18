import {NestFactory} from '@nestjs/core'
import { AppModule } from './app.module'

const start = async () => {
  try {
    const PORT = process.env.PORT  || 5555
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    await app.listen(PORT, ()=>{console.log(`server started on port ${PORT}`);})
  } catch (e) {
    console.log(e)
  }
}

start()