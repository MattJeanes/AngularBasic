# AngularBasic
Basic Angular TypeScript app for VS2017/VSCode, uses aspnet core, webpack, gulp, sass and yarn (optional)

[![Build status](https://ci.appveyor.com/api/projects/status/f8pheooffn5a9vrb/branch/master?svg=true)](https://ci.appveyor.com/project/MattJeanes/angularbasic/branch/master)

## Demo site
http://angularbasic.mattjeanes.com/ (VSTS CI build from master branch)

## Why did you switch from SystemJS to webpack?
I feel that webpack has reached a point where it's ease of use and power have overcome my old SystemJS-based setup.

That said, it still has it's uses, particularly anywhere webpack-dev-middleware cannot be used, such as in older asp.net 4 applications.

If you wish to use the old SystemJS-based version, it's available on npm under 1.x or on the systemjs branches on this repository.
## Installation
You can download the master branch and use directly or (recommended) use the yeoman generator for this
- `npm install -g yo generator-angular-basic`
- `yo angular-basic`

This will ask a few questions such as project name and scaffold out your application ready for use

#
[![BrowserStack](https://user-images.githubusercontent.com/2363642/32060856-eac21ffa-ba67-11e7-94ad-0bf1ebe10e87.png)](https://www.browserstack.com)

Special thanks to BrowserStack for allowing me to use their platform to test this project
