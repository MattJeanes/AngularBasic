# AngularBasic
Basic Angular TypeScript app for VS2017/VSCode, uses aspnet core, webpack, gulp, sass and yarn (optional)

## Why did you switch from SystemJS to webpack?
I feel that webpack has reached a point where it's ease of use and power have overcome my old SystemJS-based setup.

That said, it still has it's uses, particularly anywhere webpack-dev-middleware cannot be used, such as in older asp.net 4 applications.

If you wish to use the old SystemJS-based version, it's available on npm under 1.x or on the systemjs branches on this repository.
## Installation
You can download the master branch and use directly or (recommended) use the yeoman generator for this
- `npm install -g yo generator-angular-basic`
- `yo angular-basic`

This will ask a few questions such as project name and scaffold out your application ready for use
