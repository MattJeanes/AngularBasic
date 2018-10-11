# AngularBasic
Basic Angular TypeScript app for VS2017/VSCode, uses aspnet core, webpack, gulp, sass and yarn (optional)

[![Build status](https://ci.appveyor.com/api/projects/status/f8pheooffn5a9vrb/branch/master?svg=true)](https://ci.appveyor.com/project/MattJeanes/angularbasic/branch/master)

<!--BadgesSTART-->
[![Read Me Synchronizer](https://img.shields.io/badge/-powered%20by%20read%20me%20synchronizer-brightgreen.svg)](https://github.com/undefined/ReadMeSynchronizer)
<!-- Powered by https://github.com/undefined/ReadMeSynchronizer -->

[Subscribe](https://github.com/GregTrevellick/AngularBasic/subscription) to receive notificatons.

[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/GregTrevellick/AngularBasic?branch=master)](https://bettercodehub.com/results/GregTrevellick/AngularBasic)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c528ee94ef349d2b9f3d548761e8617)](https://www.codacy.com/project/gtrevellick/AngularBasic/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GregTrevellick/AngularBasic&amp;utm_campaign=Badge_Grade_Dashboard)
[![CodeFactor](https://www.codefactor.io/repository/github/GregTrevellick/AngularBasic/badge)](https://www.codefactor.io/repository/github/GregTrevellick/AngularBasic)
[![GitHub top language](https://img.shields.io/github/languages/top/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic)
[![Github language count](https://img.shields.io/github/languages/count/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic)
[![GitHub issues](https://img.shields.io/github/issues-raw/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic/pulls)














[![Hound](https://img.shields.io/badge/hound_ci-checked-brightgreen.svg)](https://houndci.com/)
[![Access Lint github](https://img.shields.io/badge/a11y-checked-brightgreen.svg)](https://www.accesslint.com)
[![ImgBot](https://img.shields.io/badge/images-optimized-brightgreen.svg)](https://imgbot.net/)
[![Renovate Bot github](https://img.shields.io/badge/renovatebot-checked-brightgreen.svg)](https://renovatebot.com/)
[![Charity Ware](https://img.shields.io/badge/charity%20ware-thank%20you-brightgreen.svg)](https://github.com/GregTrevellick/MiscellaneousArtefacts/wiki/Charity-Ware)
[![License](https://img.shields.io/github/license/gittools/gitlink.svg)](/LICENSE.txt)
<!--BadgesEND-->


## Demo site
http://angularbasic.mattjeanes.com/

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
