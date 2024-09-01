const currencyMap = {
  USD: "$",
  EUR: "€",
  PLN: "zł",
};

const gradientMap = {
  black: `linear-gradient(120deg, rgba(0, 0, 0, 1) 0%, rgba(30, 30, 30, 1) 17%, rgba(20, 20, 20, 1) 51%, rgba(70, 70, 70, 1) 81%, rgba(20, 20, 20, 1) 100%)`,
  gold: `linear-gradient(120deg, rgba(180,135,0,1) 0%, rgba(238,188,33,1) 6%, rgba(180,135,0,1) 57%, rgba(231,192,77,1) 81%, rgba(180,135,0,1) 100%)`,
  pink: `linear-gradient(120deg, rgb(255, 165, 198) 0%, rgba(255, 197, 219, 1) 6%, rgb(255, 165, 198) 57%, rgba(255, 197, 219, 1) 81%, rgb(255, 165, 198) 100%)`,
  green: `linear-gradient(120deg, rgba(82,156,49,1) 0%, rgba(141,203,113,1) 10%, rgba(82,156,49,1) 57%, rgba(141,203,113,1) 81%, rgba(82,156,49,1) 100%)`,
  red: `linear-gradient(120deg, rgba(156,49,49,1) 0%, rgba(203,113,113,1) 10%, rgba(156,49,49,1) 57%, rgba(203,113,113,1) 81%, rgba(156,49,49,1) 100%)`,
  blue: `linear-gradient(120deg, rgba(49,80,156,1) 0%, rgba(113,139,203,1) 10%, rgba(49,80,156,1) 57%, rgba(113,139,203,1) 81%, rgba(49,80,156,1) 100%)`,
};

const generateTimestampID = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
};

const functionalities = [
  {
    name: "Dashboard",
    description: "The Dashboard is your central hub in SaveWise",
    route: "/app",
  },
  {
    name: "Expense statistics",
    description: "Expense statistics - dashboard",
    route: "/app",
  },
  {
    name: "Weekly activity",
    description: "Weekly activity - dashboard",
    route: "/app",
  },
  {
    name: "Accounts",
    description: "Manage your accounts",
    route: "/app/accounts",
  },
  {
    name: "Deposit",
    description: "Make a deposit into your account",
    route: "/app/operations",
  },
  {
    name: "Withdraw",
    description: "Make a withdrawal from your account",
    route: "/app/operations/withdraw",
  },
  {
    name: "Operations",
    description: "Make deposit or withdrawal",
    route: "/app/operations",
  },
  {
    name: "Transactions",
    description: "Check transactions history",
    route: "/app/transactions",
  },
  {
    name: "Settings",
    description: "Settings",
    route: "/app/settings",
  },
  {
    name: "Profile",
    description: "Profile settings",
    route: "/app/settings",
  },
  {
    name: "Preferences",
    description: "Change profile preferences",
    route: "/app/settings/preferences",
  },
  {
    name: "Currency",
    description: "Change default currency",
    route: "/app/settings/preferences",
  },
  {
    name: "Notifications",
    description: "Change notifications preferences",
    route: "/app/settings/preferences",
  },
  {
    name: "Add account",
    description: "Add new account",
    route: "/app/accounts",
  },
];

export { currencyMap, gradientMap, generateTimestampID, functionalities };
