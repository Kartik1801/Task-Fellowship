const fs = require("fs");
const { get } = require("https");
const path = require("path");
const args = process.argv.slice(2);

const getTasks = () => {
    tasks = fs.readFileSync("task.txt",'utf-8');
    if(tasks)   
        return tasks.split('\r\n');
    else 
        return null;    
}
const updateTasks = (data) => {
    fs.writeFileSync("Task.txt",data.join('\r\n'));
}
const getCompletedTasks = () => {
    return fs.readFileSync("completed.txt",'utf-8')
}
const compareTaskPriority = (a, b) => {
    return parseInt(a) > parseInt(b) ? 1 : -1;
}

const help = () => console.log(`
$ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
$ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
$ ./task del INDEX            # Delete the incomplete item with the given index
$ ./task done INDEX           # Mark the incomplete item with the given index as complete
$ ./task help                 # Show usage
$ ./task report               # Statistics
`);

const addTask = ()=>{
    if(!args[1]) console.log("Error: Missing priority string. Nothing added!");
    else if(!args[2]) console.log("Error: Missing tasks string. Nothing added!");
    else{
        let task = getTasks();
        task.push(`${args[1]} ${args[2]}`);
        task.sort(compareTaskPriority);
        try { 
            updateTasks(task);
        }
        catch(err){
            console.error(err);
        }
        console.log(`Added task: "${args[2]}" with priority ${args[1]}`)
    }
}

const list = ()=>{
    let tasks = getTasks();
     if(!tasks) console.log("There are no pending tasks!");
     else tasks.forEach((d,i)=>{console.log((`${++i}. ${d.match(/[a-zA-Z ]+/g)} [${d.match(/\d+/g)}]`))})
}

const del = ()=>{
    
    if (!args[1]) console.log("Error: Missing NUMBER for deleting tasks.");
    else{
        let tasks=getTasks();
        if ( args[1] - 1 < tasks.length && args[1] > 0){
            tasks.splice(args[1]-1,1);
            try { 
                updateTasks(tasks);
            }
            catch(err){
                console.error(err);
            }
            console.log(`Deleted task #${args[1]}`);   
        }
        else console.log(`Error: task with index #${args[1]} does not exist. Nothing deleted.`)    
    } /* 
     if(args[1]-1<tasks.length&&args[1]-1>=0){
          
        fs.writeFile("task.txt",tasks.join('\r\n'), (err) => { 
        if (err) throw err;  
        else console.log(`Deleted task #${args[1]}`);
    }) */
    
    
}

const done = ()=>{
    let tasks=[];
    let done=[];
    if (!args[1])
        {console.log("Error: Missing NUMBER for marking tasks as done.");return;}
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
    else console.log(`Error: no incomplete item with index #${args[1]} exists.`);
}

const report = ()=>{
    let tasks=[];
    let done=[];
    fs.readFile("task.txt",(err, data)=>{
        if (data) tasks = data.toString().split('\r\n');
            tasks.sort((a,b)=>{a=parseInt(a);b=parseInt(b);return (a>b)?1:-1;});
        fs.readFile("completed.txt",(err,data)=>{
            if (data) done = data.toString().split('\r\n');  
            console.log(`Pending : ${tasks.length}`);  
            tasks.forEach((d,i)=>{console.log((`${++i}. ${d.match(/[a-zA-Z ]+/g)} [${d.match(/\d+/g)}].`))})
            console.log(`Completed : ${done.length}`);  
            done.forEach((d,i)=>{console.log((`${++i}. ${d}`))
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