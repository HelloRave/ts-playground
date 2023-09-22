// ===================
// ===== Classes =====
// ===================
export class Department {
  static fiscalYear = 2023;
  protected employee: string[] = [];

  constructor(private readonly id: number, public name: string) {}

  describe() {
    console.log(`Department ${this.id}: ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employee.push(employee);
  }

  printEmployees() {
    console.log(this.employee);
  }

  static createEmployee(name: string) {
    return { name };
  }
}

class ITDepartment extends Department {
  private lastIncident: string;

  constructor(
    id: number,
    public admins: string[],
    private incidents: string[]
  ) {
    super(id, "IT");
    this.lastIncident = this.incidents[0];
  }

  // Overwritting methods
  addEmployee(employee: string): void {
    if (employee === "Max") {
      return;
    }
    this.employee.push(employee);
  }

  get getLastIncident() {
    if (this.lastIncident) {
      return this.lastIncident;
    }
    throw new Error("No incidents found.");
  }

  set setLastIncident(lastIncident: string) {
    this.lastIncident = lastIncident;
  }
}

const department = new Department(1, "HR");
department.describe(); // Expect: Department 1: HR
department.addEmployee("Anna");
department.printEmployees(); // Expect: [ 'Anna' ]

const itDepartment = new ITDepartment(2, ["Bella"], ["Incident 1"]);
console.log(itDepartment.admins); // Expect: [ 'Bella' ]
itDepartment.addEmployee("Charlie");
itDepartment.addEmployee("Max");
itDepartment.printEmployees(); // Expect: [ 'Charlie' ]
console.log(itDepartment.getLastIncident); // Expect: Incident 1
itDepartment.setLastIncident = "No incident";
console.log(itDepartment.getLastIncident); // Expect: No incident

console.log(Department.createEmployee("Damon"));

// ============================
// ===== Abstract Classes =====
// ============================
abstract class Utility {
    abstract logging(): void;
}
// Cannot be instantiated -> wrong: const utility = new Utility()

class Logger extends Utility {
    logging(): void {
        console.log("Abstract Classes");
    }
}

const logger1 = new Logger();
logger1.logging(); // Expect: Abstract Classes

// =============================================
// ===== Singletons & Private Constructors =====
// =============================================
class SingletonClass {
    static instance: SingletonClass;

    private constructor(private id: string) { }

    static getInstance() {
        return this.instance = new SingletonClass('1');
    }
}

console.log(SingletonClass.getInstance()); // Expect: SingletonClass { id: '1' }
