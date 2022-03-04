const { prompt } = require("inquirer");
const db = require("./db");
const connection = require('./db/connection');

init(); 

// load main prompts
function init () {

    loadMainPrompts();

}

function loadMainPrompts() {
    prompt([
        {
            type:"list",
            name: "choice",
            message: "what would you like to do?",
            choices :[
                {
                    name: "view All Employees",
                    value: "View_Employees"
                },
                {
                    name: "view All Employees By Department",
                    value: "View_Employees_By_Department"
                },
                {
                    name: "view All Employees By Manager",
                    value: "View_Employees_By_Manager"
                },
                {
                    name: "Add Employee",
                    value: "Add_Employee"
                },
                {
                    name: "Add Department",
                    value: "Add_Department"
                },
                {
                    name: "Add Employee",
                    value: "Add_Employee"
                },
                {
                    name: "Add Role",
                    value: "Add_Role"
                },
                {
                    name: "Update Role",
                    value: "Update_Role"
                },
            
            ]
        }

    ])
    .then(res => {
        switch(res.choice) {
            case "View_Employees":
                viewAllRoles();
                break;
        }
    })
}
