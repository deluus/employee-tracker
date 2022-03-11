const { prompt } = require("inquirer");
const { connect, end } = require("./db/connection");
const db = require("./db/connection");
const connection = require("./db/connection");

init();

// load main prompts
function init() {
  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "what would you like to do?",
      choices: [
        {
          name: "view All Employees",
          value: "View_Employees",
        },
        {
          name: "view All Departments",
          value: "View_All_Departments",
        },
        {
          name: "view All Roles",
          value: "View_All_Roles",
        },
        {
          name: "Add Department",
          value: "Add_Department",
        },
        {
          name: "Add Employee",
          value: "Add_Employee",
        },
        {
          name: "Add Role",
          value: "Add_Role",
        },
        {
          name: "Update Role",
          value: "Update_Role",
        },
        {
          name: "Complete",
          value: "Complete",
        },
      ],
    },
  ]).then((res) => {
    switch (res.choice) {
      case "View_Employees":
        viewEmployees();
        break;
      case "View_All_Departments":
        viewDepartment();
        break;
      case "View_All_Roles":
        viewRoles();
        break;
      case "Add_Department":
        addDepartment();
        break;
      case "Add_Employee":
        addEmployee();
        break;
      case "Add_Role":
        addRole();
        break;
      case "Update_Role":
        updateRole();
        break;
      case "Complete":
        process.exit()
        break;
    }
  });
}

const viewEmployees = async () => {
  console.log("View Employees");
  try {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let employeeArray = [];
      res.forEach((employee) => employeeArray.push(employee));
      console.table(employeeArray);
      loadMainPrompts();
    });
  } catch (err) {
    console.log(err);
    loadMainPrompts();
  }
};

const viewDepartment = async () => {
  console.log("View Departments");
  try {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let departmentArray = [];
      res.forEach((department) => departmentArray.push(department));
      console.table(departmentArray);
      loadMainPrompts();
    });
  } catch (err) {
    console.log(err);
    loadMainPrompts();
  }
};

const viewRoles = async () => {
  console.log("view Roles");
  try {
    let query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
      if (err) throw err;
      let roleArray = [];
      res.forEach((role) => roleArray.push(role));
      console.table(roleArray);
      loadMainPrompts();
    });
  } catch (err) {
    console.log(err);
    loadMainPrompts();
  }
};

const addEmployee = (async = () => {
  console.log("Enter Employees Information");
  prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the employees first name?",
    },
    {
      type: "input",
      name: "lastName",
      message: "What is the employees last name?",
    },
  ]).then((res) => {
    let firstName = res.firstName;
    let lastName = res.lastName;
    let sql = "SELECT * FROM roles";

    connection.query(sql, function (err, res) {
      if (err) throw err;
      let roles = res.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt([
        {
          type: "list",
          name: "roleId",
          message: "What is the new employees role?",
          choices: roles,
        },
      ]).then((res) => {
        let roleId = res.roleId;
        let sql2 = "SELECT * FROM employee";

        connection.query(sql2, function (err, res) {
          if (err) throw err;
          let employees = res.map(({ id, first_name, last_name }) => ({
            name: `${first_name} ${last_name}`,
            value: id,
          }));

          employees.unshift({ name: "None", value: null });

          prompt([
            {
              type: "list",
              name: "managerId",
              message: "Who is the new employees manager?",
              choices: employees,
            },
          ])
            .then((res) => {
              let employee = {
                first_name: firstName,
                last_name: lastName,
                role_id: roleId,
                manager_id: res.managerId,
              };
              connection.query(
                "INSERT into employee SET?",
                employee,
                function (err, res) {
                  if (err) throw err;
                }
              );
            })
            .then(() => {
              console.log(`${firstName} ${lastName} Added to the Database`);
            })
            .then(() => [loadMainPrompts()]);
        });
      });
    });
  });
});

const addDepartment = (async = () => {
  // console.log("Enter Department Information");
  prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the new department?",
    },
  ]).then((res) => {
    let deptName = {department_name: res.department_name};
    let sql = 'INSERT INTO department SET ?'

    connection.query(sql, deptName, function (err, res) {
        if (err) throw err;
        console.log(`The ${deptName} has been added to the database.`)

       loadMainPrompts();
    });
  });
});

const addRole = (async = () => {
  console.log("Enter Role Information");
  prompt([
    {
      type: "input",
      name: "role_title",
      message: "What is the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is salary?",
    },
  ]).then((res) => {
    let roleName = res.role_title;
    let salary = res.salary;
    let sql4 = "SELECT * FROM department";

    connection.query(sql4, function (err, res) {
      if (err) throw err;
      let departmentChoices = res.map(({ id, department_name }) => ({
        name: department_name,
        value: id,
      }));

      prompt([
        {
          type: "list",
          name: "department_name",
          message: "Which department will the role be assigned to ?",
          choices: departmentChoices,
        },
      ]).then((res) => {
        let departmentId = res.department_name;
        let newRole = {
          title: roleName,
          salary: salary,
          department_id: departmentId
        }
        connection.query("INSERT INTO roles SET ?", newRole, function(err, res) {
          if(err) throw err;
          console.log(`${newRole.title} added to the database!`)
          loadMainPrompts();
        })
        });
      });
    });
  });


const updateRole = async () => {
    console.log("Employee Update");
    const sql = `SELECT * FROM employee`;
    connection.query(sql, function(err, res) {
      let employeeChoices = res.map(({id, first_name, last_name}) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }))

      prompt([
        {
          name: "employee",
          type: "list",
          choices: employeeChoices,
          message: "Please choose an employee to update.",
        },
      ])
      .then((res) => {
        let employeeId = res.employee;
        let sql2 = "SELECT * FROM roles"

        connection.query(sql2, function(err, res) {
          let roleChoices = res.map(({title, id}) => ({
            name: title,
            value: id
          }))

          prompt([
            {
              name: "roleId",
              type: "list",
              choices: roleChoices,
              message: "Please choose a role to update the employee with.",
            }
          ]).then(res => {
            let roleId = res.roleId;

            connection.query(`UPDATE employee SET role_id = ${roleId} where id = ${employeeId}`, function(err, res) {
              if(err) throw err;
              loadMainPrompts();
            })
          })
        })
      })
    })
   
};


// const updateEmployee = (async () => {
//   prompt ([
//     {
//       type: "list",
//       name: "employee",
//       message: "which employee would you like to update?",
//       choices: employee,
//     },
//   ]).then((res) => {
//     let = update = res.update;
//     let sql6 = "SELECT * FROM employee";
