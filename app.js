/*
//======================================================================================================================================================================
const tutorial = require('./tutorial') // "./" artinya same path + nama file
// console.log(tutorial);
console.log(tutorial.sum(1,1));
console.log(tutorial.PI);
console.log(new tutorial.SomeMathObject);
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
//events module

const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('tutorial',(num1,num2) =>{  //jalankan fungsi berikut saat event tutorial dipangggil
    console.log(num1+num2);
})

eventEmitter.emit('tutorial',1,2);//memanggil event tutorial, parameternya ('nama event',parameter1 func, par2 funct, so on)

class Person extends EventEmitter {
    constructor(name){
        super();
        this._name = name;
    }

    get name(){
        return this._name;
    }
}

let aan = new Person('aan');
let apang = new Person('apang');


aan.on('name', ()=>{
    console.log('my name is ' + aan.name);
})
apang.on('name', ()=>{
    console.log('nama ane ' + apang.name);
})

aan.emit('name');
apang.emit('name');
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
//readline module

const readline = require('readline');
const rl = readline.createInterface({input : process.stdin, //proccess itu global object jadi ngak butuh require
                                    output : process.stdout}) //take an object (configuration)
                

let num1 = Math.floor((Math.random()*10) + 1);
let num2 = Math.floor((Math.random()*10) + 1);
let answer = num1+num2;
rl.question(`What is ${num1} + ${num2} ?\n`,
(userInput)=>{
    // console.log(userInput);
    if(userInput.trim() == answer) {
        rl.close(); //close the app when done
    }
    else {
        rl.setPrompt('Incorrect response, please try again \n');
        rl.prompt();
        rl.on('line',(userInput) =>{
            if(userInput.trim() == answer) {
                rl.close(); //close the app when done
            }else {
                rl.setPrompt(`Your answer of ${userInput} is incorrect, try again \n`);
                rl.prompt();
            }
        })
    }
}) //parameter1 : string, parameter2 : function
rl.on('close', ()=> {
    console.log('Correct!');
})
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
file system (fs) module - part 1


const fs = require('fs');

//create a file
// fs.writeFile('example.txt','this is an example', (err) => {
//     if(err)
//         console.log(err);
//     else{
//         console.log('file successfully created')
//         fs.readFile('example.txt','utf8',(err,file)=>{ //read file
//             if(err)
//                 console.log(err);
//             else
//                 console.log(file) //output to binary
//         })//(nama_file,ENCODING_TYPE, callback(err,file)) //kalau ngak masukin encoding type, keluarnya binary
//     }
// })//(name_of_file, what_u_want_to_write_into_the_file, callback(mostly error))

//rename a file
// fs.rename('example.txt','example2.txt',(err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log('successfully renamed the file');
// }) //argument:('file_name+extension', 'rename_to,callback(err))

//append data to file
// fs.appendFile('example2.txt', '\nSome data being appended',(err)=>{
//     if(err)
//         console.log(err);
//     else
//         console.log('Data Added!');
// })//(namaFile,data yang mau ditambahkan,callback(err))

//delete a file
fs.unlink('example2.txt',(err)=>{
    if(err)
        console.log(err)
    else
        console.log('successfully deleted')
}) //(namafile,callback(err))

file system (fs) module - part 2

const fs = require('fs');

// function bikinFolder(namaFolder) {

// }
// fs.mkdir('tutorial', (err) =>{
//     if(err)
//         console.log(err)
//     else{
//         console.log('folder created');
//         // fs.rmdir('tutorial', (err)=>{
//         //     if(err)
//         //         console.log(err)
//         //     else
//         //         console.log('successfully deleted the folder')
//         // }) //argument (namafolder,callback)

//         //create file inside the folder
//         fs.writeFile('./tutorial/test1.txt', 'this is a test file', (err)=>{
//             if(err)
//                 console.log(err);
//             else
//                 console.log('file created');
//         })
//     }
// })// (namaFolder, callback(err))
// bikinFolder('tutorial');

// fs.unlink('./tutorial/test1.txt',(err)=>{
//     if(err)
//         console.log(err)
//     else
//         console.log('file successfully deleted')
//         fs.rmdir('tutorial', (err) => {
//             if(err)
//                 console.log(err);
//             else
//                 console.log('folder deleted');
//         })
// }) //(namafile,callback(err))

fs.readdir('./example',(err,files)=>{ //(directory name, callback(err, array:files))
    if(err)
        console.log(err)
    else{
        // console.log(files);
        files.forEach(file =>{
            fs.unlink(`./example/${file}`,(err)=>{
                if(err)
                    console.log(err);
                else
                    console.log(`file ${file} was deleted`);
            })
        })
    }
})
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
Readable and WriteAble Stream

const fs = require('fs');
const readStream = fs.createReadStream('./example.txt', 'utf8'); //(filename,encode type)
const writeStream = fs.createWriteStream('example2.txt');

readStream.on('data',(chunk) => { //readsteam can read largefile, while fs.readfile cannot
    // console.log(chunk);
    writeStream.write(chunk);
})
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
Pipes and Pipe Chaining

const fs = require('fs');
const zlib = require('zlib'); //basically a module for compression (compressing file)
// const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

// const readStream = fs.createReadStream('./example.txt', 'utf8'); //(filename,encode type)
// const writeStream = fs.createWriteStream('example2.txt.gz');
const readStream = fs.createReadStream('./example2.txt.gz'); //(filename,encode type)
const writeStream = fs.createWriteStream('uncompressed.txt');
readStream.pipe(gzip).pipe(writeStream)
readStream.pipe(gunzip).pipe(writeStream)// when using pipe, we need source stream and destination stream (in this case read and write stream)
//======================================================================================================================================================================
*/


/*
//======================================================================================================================================================================
create an Http Wrver Using the Http Module\
(basically create a web server with NodeJs)


const http = require('http');
const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write('Hello World from nodejs');
        res.end(); //send the response back to client
    }else {
        res.write('using some other domain')
        res.end();
    }
}); // take callback (req,res)

server.listen('3000');
//======================================================================================================================================================================
*/


/*
//======================================================================================================================================================================
Serving Static Files with Http and File System Modules

const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {
    const readStream = fs.createReadStream('./static/example.png');
    res.writeHead(200,{'Content-type' : 'image/png'});
    readStream.pipe(res);
}).listen('3000');
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
installing packages using npm

const _ = require('lodash');
let example = _.fill([1,2,3,4,5], "watermelon",1,4);
console.log(example)
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
Semantic Versioning
(basically a standard that allow node js follows)
^ = for 4.x.x
~ = for 4.17.x
gak pakai = gak usah update
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
Getting started with Express Web Framework

const express = require('express');
const app = express(); //basically this is a function that return object than return a buch of method that can be used in our app

app.get('/',(req,res)=>{
    res.send('Hello World');
}); //method get, argument (route,callback(req,res))

app.listen(3000);
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
Working with Express Get Requests

const express = require('express');
const app = express(); //basically this is a function that return object than return a buch of method that can be used in our app

app.get('/',(req,res)=>{
    res.send('Hello World');
}); //method get, argument (route,callback(req,res))

app.get('/example',(req,res)=>{
    res.send('This is example route');
});

app.get('/example/:name/:age',(req,res)=>{
    console.log(req.params); //output object based on what we input in url, use this for fixed parameter
    console.log(req.query); //use this for optinal parameter, such as when we want what sord data by "age"
    // res.send('example with route params');
    res.send(req.params.name + ' : ' + req.params.age); //this variable from :name and :age of the req(request)
});
app.listen(3000);
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
Serving Static Files With Express
(HTML file, css, client-side js, images, videos)

const express = require('express');
const path = require('path');

const app = express();

app.use('/public', express.static(path.join(__dirname,'static'))); //meaning using middleware arguments:(alias_for_folder, express.method) ->alias is giving an alias to the file, in here alias to static folder, __dirname is return string where this file located
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'static','index.html')) //arguments (dir,folderName,fileName)
}).listen(3000);
//======================================================================================================================================================================
*/

/*
//======================================================================================================================================================================
Http Post Request w/ Express and Body Parser Module
//======================================================================================================================================================================
*/