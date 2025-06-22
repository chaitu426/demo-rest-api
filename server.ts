import app from "./src/app"
import config from "./src/config/config";
import connectDB from "./src/config/db";
// import os from "os";
// import cluster from "cluster";
const server = async ()=>{
    await connectDB();
    const port = config.port || 3000;

    app.listen(port,()=>{
        console.log(`listening on port: ${port}`)
    })
}

server();


// this is optimization for multi core cpu using cluster module to make nodejs multi-threaded {make it work simplety uncomment the code below and comment the server() function call above }
// const totalCPUs = os.availableParallelism();
// if(cluster.isPrimary){
//     for(let i  = 0 ; i < totalCPUs; i++){
//         cluster.fork();
//     }

//     cluster.on("exit", (worker)=>{
//         console.log(`Worker ${worker.process.pid} died`);
//         cluster.fork();
//     })
// }else{
//     server();
//     console.log(`Worker ${process.pid} started`);
//     process.on("SIGTERM", () => {
//         console.log(`Worker ${process.pid} received SIGTERM`);
//         process.exit(0);
//     });
//     process.on("SIGINT", () => {
//         console.log(`Worker ${process.pid} received SIGINT`);
//         process.exit(0);
//     });
// }
