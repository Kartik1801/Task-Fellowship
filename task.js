const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

const help = () => console.log(`Usage :-\n$ ./task add 2 hello world\t\t# Add a new item with priority 2 and text "hello world" to the list\n$ ./task ls\t\t\t\t# Show incomplete priority list items sorted by priority in ascending order\n$ ./task del INDEX\t\t\t# Delete the incomplete item with the given index\n$ ./task done INDEX\t\t\t# Mark the incomplete item with the given index as complete\n$ ./task help\t\t\t\t# Show usage\n$ ./task report\t\t\t\t# Statistics`);

const addTask = ()=>{
    let tasks=[];
    fs.readFile("task.txt",(err, data)=>{
    if (data) tasks = data.toString().split('\r\n');
     tasks.push(`${args[1]} ${args[2]}`);
     tasks.sort((a,b)=>{ a=parseInt(a);b=parseInt(b); return (a>b)?1:-1;});
     fs.writeFile("task.txt",tasks.join('\r\n'), (err) => { 
         if (err) throw err;  
         else console.log(`Added task: "${args[2]}" with priority ${args[1]}`);
     }) 
    })
}

const list = ()=>{
    let tasks=[];
    fs.readFile("task.txt",(err, data)=>{
    if (data) tasks = data.toString().split('\r\n');
     tasks.sort((a,b)=>{a=parseInt(a);b=parseInt(b); return (a>b)?1:-1;});
     tasks.forEach((d,i)=>{console.log((`${++i}. ${d.match(/[a-zA-Z ]+/g)} [${d.match(/\d+/g)}]`))})
    })
}

const del = ()=>{
    let tasks=[];
    fs.readFile("task.txt",(err, data)=>{
    if (data) tasks = data.toString().split('\r\n');
     tasks.sort((a,b)=>{a=parseInt(a);b=parseInt(b); return (a>b)?1:-1;});
     if(args[1]-1<tasks.length&&args[1]-1>=0){tasks.splice(args[1]-1,1);  
     fs.writeFile("task.txt",tasks.join('\r\n'), (err) => { 
        if (err) throw err;  
        else console.log(`Deleted item with index ${args[1]}`);
    })
    }
    else console.log(`Error: item with index ${args[1]} does not exist. Nothing deleted.`)
    })
}

const done = ()=>{
    let tasks=[];
    let done=[];
    if(args[1]-1>=0){
    fs.readFile("task.txt",(err, data)=>{
        if (data) tasks = data.toString().split('\r\n');
        tasks.sort((a,b)=>{ a=parseInt(a);b=parseInt(b); return (a>b)?1:-1;});
        fs.readFile("completed.txt",(err,cdata) => {
            if(cdata) done = cdata.toString().split("\r\n");
            if(args[1]-1<tasks.length){
                done.push(tasks[args[1]-1].match(/[a-zA-Z][a-zA-Z ]+/g)[0]);
                tasks.splice(args[1]-1,1)};
                fs.writeFile("task.txt",tasks.join('\r\n'), (err) => { 
                    if (err) throw err;  
                    fs.writeFile("completed.txt",done.join('\r\n'), (err) => { 
                        if (err) throw err;
                        console.log("Marked item as done.")  
                    })  
                }) 
            })
        })
    }
    else console.log(`Error: no incomplete item with index ${args[1]} exists.`);
}

const report = ()=>{
    let tasks=[];
    let done=[];
    fs.readFile("task.txt",(err, data)=>{
        if (data) tasks = data.toString().split('\r\n');
            tasks.sort((a,b)=>{a=parseInt(a);b=parseInt(b); return (a>b)?1:-1;});
        fs.readFile("completed.txt",(err,data)=>{
            if (data) done = data.toString().split('\r\n');  
            console.log(`Pending : ${tasks.length}`);  
            tasks.forEach((d,i)=>{console.log((`${++i}. ${d.match(/[a-zA-Z ]+/g)} [${d.match(/\d+/g)}]`))})
            console.log(`Completed : ${done.length}`);  
            done.forEach((d,i)=>{console.log((`${++i}. ${d} `))
        })
    })
})
}
switch(args[0]){
    case undefined:
    case "help": help(); break;
    case "ls": list(); break;
    case "add": addTask(); break;
    case "del": del(); break;
    case "done": done(); break;
    case "report": report(); break;                
}