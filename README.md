# AngularBasic
Basic Angular TypeScript app for VS2017/VSCode, uses aspnet core, webpack, gulp, sass and yarn (optional)

[![Build status](https://ci.appveyor.com/api/projects/status/f8pheooffn5a9vrb/branch/master?svg=true)](https://ci.appveyor.com/project/MattJeanes/angularbasic/branch/master)

<!--BadgesSTART-->
[![Read Me Synchronizer](https://img.shields.io/badge/-powered%20by%20read%20me%20synchronizer-brightgreen.svg)](https://github.com/GregTrevellick/ReadMeSynchronizer)
<!-- Powered by https://github.com/GregTrevellick/ReadMeSynchronizer -->

[![BetterCodeHub compliance](https://bettercodehub.com/edge/badge/GregTrevellick/AngularBasic?branch=master)](https://bettercodehub.com/results/GregTrevellick/AngularBasic)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/6c528ee94ef349d2b9f3d548761e8617)](https://www.codacy.com/project/gtrevellick/AngularBasic/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=GregTrevellick/AngularBasic&amp;utm_campaign=Badge_Grade_Dashboard)
[![CodeFactor](https://www.codefactor.io/repository/github/GregTrevellick/AngularBasic/badge)](https://www.codefactor.io/repository/github/GregTrevellick/AngularBasic)
[![GitHub top language](https://img.shields.io/github/languages/top/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic)
[![Github language count](https://img.shields.io/github/languages/count/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic)
[![GitHub issues](https://img.shields.io/github/issues-raw/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/GregTrevellick/AngularBasic.svg)](https://github.com/GregTrevellick/AngularBasic/pulls)
[![Sonar&metric=alert_status](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=alert_status)](https://sonarcloud.io/dashboard?id=AngularBasic)
[![Sonar&metric=bugs](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=bugs)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=bugs)
[![Sonar&metric=code_smells](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=code_smells)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=code_smells)
[![Sonar&metric=coverage](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=coverage)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=Coverage)
[![Sonar&metric=duplicated_lines_density](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=duplicated_lines_density)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=duplicated_lines)
[![Sonar&metric=ncloc](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=ncloc)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=ncloc)
[![Sonar&metric=reliability_rating](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=reliability_rating)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=reliability_rating)
[![Sonar&metric=security_rating](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=security_rating)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=security_rating)
[![Sonar&metric=sqale_index](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=sqale_index)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=sqale_index)
[![Sonar&metric=sqale_rating](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=sqale_rating)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=sqale_rating)
[![Sonar&metric=vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=AngularBasic&metric=vulnerabilities)](https://sonarcloud.io/component_measures?id=AngularBasic&metric=vulnerabilities)
[![Appveyor Build status](https://ci.appveyor.com/api/projects/status/9u37xi3cuan7qxpa?svg=true)](https://ci.appveyor.com/project/GregTrevellick/AngularBasic)
[![Appveyor unit tests](https://img.shields.io/appveyor/tests/GregTrevellick/AngularBasic.svg)](https://ci.appveyor.com/project/GregTrevellick/AngularBasic/build/tests)
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
