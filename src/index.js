import {app, port} from './app.js'
import {connectDB} from './db.js'

connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})