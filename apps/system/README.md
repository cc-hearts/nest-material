# System Backend

System Backend is a role-based access control (RBAC) system implemented using Nest.js.

## Description

This backend application provides a robust RBAC system that allows you to manage roles, permissions, and user access control in your application.

## Features

- Role management: Create, update, and delete roles.
- Permission management: Define and assign permissions to roles.
- User management: Manage user accounts and their associated roles.
- Access control: Enforce role-based access control for different parts of your application.

## Configuration

Before running the application, make sure to configure the necessary environment variables. Create a `.app.<NODE_ENV>.yaml` file in the project root directory and provide the following variables:

# Database configuration

```yaml
# base config
port: 33000

# mysql config
mysql:
  type:
  database:
  username:
  password:
  host:
  port:
# jwt config
secret:
```

## Usage

To start the System backend, run the following command:

```shell
npm run start
```

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Commit your changes.
5. Push to the branch.
6. Submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
