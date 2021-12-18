const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);

switch(args[0]){
    case undefined:
    case "help" : 
        console.log(`Usage :-
                $ ./task add 2 hello world    # Add a new item with priority 2 and text "hello world" to the list
                $ ./task ls                   # Show incomplete priority list items sorted by priority in ascending order
                $ ./task del INDEX            # Delete the incomplete item with the given index
                $ ./task done INDEX           # Mark the incomplete item with the given index as complete
                $ ./task help                 # Show usage
                $ ./task report               # Statistics`);
        break;
    case "ls":
        break;
    case "add": addTask();
        break;
    case "del":
        break;
    case "report": 
        break;                
}
const addTask = ()=>{
    let tasks=[];
    fs.readFile("task.txt",(err, data)=>{
    if (data) tasks = data.toString().split('\r\n');
     tasks.push(`${args[1]} ${args[2]}`);
     tasks.sort((a,b)=>{ a=a.split(" ")[0];a=parseInt(a); b=b.split(" ")[0];b=parseInt(b); return (a>b)?1:-1;});
     fs.writeFile("task.txt",tasks.join('\r\n'), (err) => { 
         if (err) throw err;  
         else console.log(`Added task: "${args[2]}" with priority ${args[1]}`);
     }) 
    })
}
