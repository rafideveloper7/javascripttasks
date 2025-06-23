// mian bank class 
class bank {
  constructor(branch, location, bankCode) {
    this.branch = branch;
    this.location = location;
    this.bankCode = bankCode;
  }
}

// class for sub branches
class branch extends bank {
  constructor(branchCode, branch, location, bankCode) {
    super(branchCode, branch, location, bankCode);
  }
}

// class for to create accounts
class account extends branch {
  constructor(userName, Password, deposit, widthdraw, cash, bankCode, branchCode, location) {
    super(branchCode, location, bankCode)
    this.userName = userName;
    this.Password = Password;
    this.deposit = deposit;
    this.widthdraw = widthdraw;
    this.cash = cash;

  }
}

const user1 = new account("Rafi Ullah", 12345, 5000, 0, 5000, 111, 3, "kohat");
const user2 = new account("Haris", 654552, 6000, 2000, 4000, 111,  2, "peshawer")
const user3 = new account("Israr", 12313, 7000, 2000, 5000, 111,  1, "Karachi")

console.table(user1)
// console.table(user2)
// console.table(user3)