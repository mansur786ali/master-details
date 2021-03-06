angular.module('masterDetail').service('EmployeeServices', function(){

   var employees;

   initialize();

   function initialize(){
      employees = JSON.parse(localStorage.getItem("employees"));
      if(!employees){ 
         employees = [];
      }
   }

   function getUniqueId() {
      var highestId = 1;

      employees.forEach(function(e){
         if(e.id > highestId){ highestId = e.id; }
      });

      return ++highestId;
   }

   function saveEmployees(){         
      localStorage.setItem('employees', JSON.stringify(employees));
   }

   this.getEmployees = function(){
      return employees;     
   }

   this.refresh = function(employeesArray){
      this.setEmployees(employeesArray);
      return this.getEmployees();
   }

   this.create = function (employee) {
      employee.id = getUniqueId();
      employees.push(employee);
      saveEmployees();
   }

   this.update = function (employee) {
      saveEmployees();
   };

   this.delete = function (employee) {
      var iterator = 0, nextEmployeeToBeShown={};
      if(employees.length && employee){         
          for(iterator = 0; iterator < employees.length; iterator++ ){              
            if(employee.id === employees[iterator].id){
              employees.splice(iterator,1); 
              if(iterator == 0){
                  nextEmployeeToBeShown = employees[iterator];
               }else{
                  nextEmployeeToBeShown = employees[iterator-1];                            
               }                     
              break;
            }
          }  
         saveEmployees();
         return nextEmployeeToBeShown;      
      } 
   }

});
