## AWS Cognito Lambda nodejs
AWS Cognito - Lambda nodejs
- flow USER_SRP_AUTH.

### 1- Install packages
```bash
npm install
```

### 2- Create Environment .env
```bash
UserPoolId=
AppClientId=
AppClientSecret=
```

### Run index.js - local
```bash
npm run index
```

### Run signUp.js - local
Modify parameters (username, password) in the package.json (scripts > signUp).

```bash
npm run signUp
```

### Run login.js - local
Modify parameters (username, password) in the package.json (scripts > login).
```bash
npm run login
```