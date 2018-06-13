import * as Generator from 'yeoman-generator';
import * as path from 'path';

module.exports = class extends Generator {
    private templateData: any;
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
        },
        {
            type: 'confirm',
            name: 'primeng',
            message: 'Include PrimeNG?',
            default: true
        },
        {
            type: 'confirm',
            name: 'material',
            message: 'Include Angular Material?',
            default: true
        }]);
        this.appname = answers.name;

        this.templateData = {
            appName: this.appname,
            namespace: this.appname.replace(" ", ""),
            project: this.appname.toLowerCase().replace(" ", "-"),
            rootSelector: answers.selector,
            description: answers.description,
            author: answers.author,
            primeng: answers.primeng,
            material: answers.material,
            covalent: false
        };

        // Covalent requires Angular Material
        if (this.templateData.material) {
            var answers = await this.prompt({
                type: 'confirm',
                name: 'covalent',
                message: 'Include Teradata Covalent?',
                default: true
            });

            this.templateData.covalent = answers.covalent;
        }

        var answers = await this.prompt([{
            type: 'confirm',
            name: 'pace',
            message: 'Include PACE? (Breaks AJAX in IE)',
            default: true
        },
        {
            type: 'confirm',
            name: 'test',
            message: 'Include Test Framework (Karma/Jasmine)?',
            default: false
        }]);

        this.templateData.pace = answers.pace;
        this.templateData.test = answers.test;
        this.templateData.vendorcss = this.templateData.covalent || this.templateData.pace || this.templateData.primeng;
    }

    public writing() {
		this.fs.copy(this.sourceRoot() + '/.gitignore.template', this.appname + '/.gitignore');
        this.fs.copy(this.sourceRoot() + '/AngularBasic.csproj', this.appname + '/' + this.appname + '.csproj');
        this.fs.copyTpl(this.sourceRoot() + '/*.json', this.appname + '/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/gulpfile.js', this.appname + '/gulpfile.js', this.templateData);
		this.fs.copyTpl(this.sourceRoot() + '/*.cs', this.appname + '/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/Controllers/*.cs', this.appname + '/Controllers/', this.templateData);
        this.fs.copy(this.sourceRoot() + '/Properties/**', this.appname + '/Properties/');
        this.fs.copyTpl(this.sourceRoot() + '/typings/**', this.appname + '/typings/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/Views/**', this.appname + '/Views/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/.vscode/**', this.appname + '/.vscode/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/ClientApp/app/**/*.ts', this.appname + '/ClientApp/app/', this.templateData);
        if (!this.templateData.test) {
            this.fs.delete(this.appname + '/ClientApp/app/**/*.spec.ts');
        }
        this.fs.copyTpl(this.sourceRoot() + '/ClientApp/app/**/*.html', this.appname + '/ClientApp/app/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/ClientApp/**/*.scss', this.appname + '/ClientApp/', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/ClientApp/*.ts', this.appname + '/ClientApp/', this.templateData);
        if (this.fs.exists(this.sourceRoot() + '/ClientApp/.gitignore')) {
            this.fs.copy(this.sourceRoot() + '/ClientApp/.gitignore', this.appname + '/ClientApp/.gitignore');
        }
        if (this.fs.exists(this.sourceRoot() + '/ClientApp/.npmignore')) {
            this.fs.copy(this.sourceRoot() + '/ClientApp/.npmignore', this.appname + '/ClientApp/.gitignore');
        }
        if (this.templateData.test) {
            this.fs.copy(this.sourceRoot() + '/ClientApp/test/*.ts', this.appname + '/ClientApp/test/');
            this.fs.copy(this.sourceRoot() + '/ClientApp/test/karma.conf.js', this.appname + '/ClientApp/test/karma.conf.js');
        }
        this.fs.copyTpl(this.sourceRoot() + '/webpack.config.ts', this.appname + '/webpack.config.ts', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/webpack.config.vendor.ts', this.appname + '/webpack.config.vendor.ts', this.templateData);
        this.fs.copyTpl(this.sourceRoot() + '/webpack.config.common.ts', this.appname + '/webpack.config.common.ts', this.templateData);
        this.fs.copy(this.sourceRoot() + '/wwwroot/favicon.ico', this.appname + '/wwwroot/favicon.ico');
        this.fs.copy(this.sourceRoot() + '/wwwroot/loading.css', this.appname + '/wwwroot/loading.css');
    }

    public install() {
        var elementDir = process.cwd() + '/' + this.appname;
        process.chdir(elementDir);

        this.installDependencies({
            npm: false,
            bower: false,
            yarn: true
        })
    }
}