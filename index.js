const { prompt } = require("inquirer");
const { connect } = require("./db/connection");
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
          name: "view All Employees By Department",
          value: "View_Employees_By_Department",
        },
        {
          name: "view All Employees By Role",
          value: "View_Employees_By_Role",
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
      case "View_Employees_By_Department":
        viewDepartment();
        break;
      case "View_Employees_By_Role":
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
        complete();
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
  console.log("Enter Department Information");
  prompt([
    {
      type: "input",
      name: "department_name",
      message: "What is the new department?",
    },
  ]).then((res) => {
    let deptName = res.deptName;
    let sql3 = "SELECT * FROM department";

    connection.query(sql3, function (err, res) {
      if (err) throw err;
      let department = res.map(({ id, department_name }) => ({
        name: department_name,
        value: id,
      }));

      department.unshift({ name: "None", value: null });

      //   let newDept = connection.query ("INSERT INTO department SET")
      //   newDept,
      //   function (err, res) {
      //     if (err) throw err;
      //   }

      loadMainPrompts();
    });
  });
});

const addRole = (async = () => {
  console.log("Enter Role Information");
  prompt([
    {
      type: "input",
      name: "role title",
      message: "What is the new role?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is salary?",
    },
  ]).then((res) => {
    let roleName = res.roleName;
    let salary = res.salary;
    let sql4 = "SELECT * FROM roles";

    connection.query(sql4, function (err, res) {
      if (err) throw err;
      let department = res.map(({ id, title }) => ({
        name: title,
        value: id,
      }));

      prompt([
        {
          type: "list",
          name: "department_name",
          message: "Which department will the role be assigned to ?",
          choices: department,
        },
      ]).then((res) => {
        let roleId = res.roleId;
        let sql5 = "SELECT * FROM department";

        connection.query(sql5, function (err, res) {
          if (err) throw err;
          let employees = res.map(({ id, title, salary }) => ({
            name: `${title} ${salary}`,
            value: id,
          }));

          employees.unshift({ name: "None", value: null });

          loadMainPrompts();
        });
      });
      
    });
  });
});
const updateRole = async () => {
    console.log("Employee Update");
    prompt([
      {
        name: "employee",
        type: "list",
        choices: employee,
        //  res.map((first_name,last_name) => {
        //   return {
        //     name: first_name + " " + last_name,
        //     value: id,
        //   };
        // }),
        message: "Please choose an employee to update.",
      },
    ])
    .then((res) => {
      let role_id = res.updateId;
      let sql6 = "SELECT * FROM role";

    // })
    
    connection.query("UPDATE employee SET role_id = ? where id = ?",sql6, role_id, employeeId, function(err, res) {
      if(err) throw err;
    }
    )}
    )}

//    connection.query("SELECT * FROM role");

//     let roleSelection = inquirer.prompt([
//       {
//         name: "role",
//         type: "list",
//         choices: roles.map((roleName) => {
//           return {
//             name: roleName.title,
//             value: roleName.id,
//           };
//         }),
//         message: "Please select the role to update the employee with.",
//       },
//     ]);

//     let result = connection.query("UPDATE employee SET ? WHERE ?", [
//       { role_id: roleSelection.role },
//       { id: employeeSelection.employee },
//     ]);

//     console.log(`The role was successfully updated.\n`);
//     loadMainPrompts();
//   } catch (err) {
//     console.log(err);
//     loadMainPrompts();
//   }
// };


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
