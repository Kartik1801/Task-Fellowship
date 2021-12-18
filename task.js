const fs =  require("fs");
const path = require("path");
const args = process.argv.slice(2);
console.log(args);

const addTask = () =>{
        
}

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