import * as Generator from 'yeoman-generator';
import * as path from 'path';

module.exports = class extends Generator {
    private templateData: Object;
    constructor(args: string | string[], options: Object) {
        super(args, options);
        this.sourceRoot(path.join(__dirname, '../../AngularBasic'));
    }
    public async prompting() {
        var answers = await this.prompt([{
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // Default to current folder name
        }, {
            type: 'input',
            name: 'selector',
            message: 'Angular root selector',
            default: 'my-app'
        }, {
            type: 'input',
            name: 'description',
            message: 'Project description',
            default: 'Angular Basic App'
        }, {
            type: 'input',
            name: 'author',
            message: 'Project author(s)',
            default: ''
        }]);
        this.appname = answers['name'];

        this.templateData = {
            appName: this.appname,
            namespace: this.appname.replace(" ",""),
            project: this.appname.toLowerCase().replace(" ", "-"),
            rootSelector: answers['selector'],
            description: answers['description'],
            author: answers['author']
        }
    }

    public writing() {
        if (this.fs.exists(this.sourceRoot() + '/.gitignore')) {
            this.fs.copy(this.sourceRoot() + '/.gitignore', this.appname + '/.gitignore');
        }
        if (this.fs.exists(this.sourceRoot() + '/.npmignore')) {
            this.fs.copy(this.sourceRoot() + '/.npmignore', this.appname + '/.gitignore');
        }
        this.fs.copy(this.sourceRoot() + '/AngularBasic.csproj', this.appname + '/' + this.appname + '.csproj');
        this.fs.copyTpl(this.sourceRoot() + '/AngularBasic.nuspec', this.appname + '/' + this.appname + '.nuspec', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/*.json', this.appname + '/', this.templateData);
        this.fs.copy(this.sourceRoot() + '/*.js', this.appname + '/');
        this.fs.copy(this.sourceRoot() + '/packages.config', this.appname + '/packages.config');
        this.fs.copyTpl(this.sourceRoot() + '/*.cs', this.appname + '/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/Controllers/*.cs', this.appname + '/Controllers/', this.templateData);
        this.fs.copy(this.sourceRoot() + '/Properties/**', this.appname + '/Properties/');
        this.fs.copy(this.sourceRoot() + '/Styles/**', this.appname + '/Styles/');
        this.fs.copy(this.sourceRoot() + '/typings/**', this.appname + '/typings/');
        this.fs.copyTpl(this.sourceRoot() + '/Views/**', this.appname + '/Views/', this.templateData);
        this.fs.copy(this.sourceRoot() + '/wwwroot/app/**/*.ts', this.appname + '/wwwroot/app/');
        this.fs.copy(this.sourceRoot() + '/wwwroot/app/**/*.html', this.appname + '/wwwroot/app/');
        this.fs.copyTpl(this.sourceRoot() + '/wwwroot/app/app.component.ts', this.appname + '/wwwroot/app/app.component.ts', this.templateData);
        this.fs.copy(this.sourceRoot() + '/wwwroot/systemjs.config.ts', this.appname + '/wwwroot/systemjs.config.ts');
    }
}