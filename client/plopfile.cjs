const plopConfig = function (plop) {
  plop.setHelper('cwd', (p) => process.cwd());

  // React component generator
	plop.setGenerator('component', {
		description: "Create a component",
		prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'What is your component name?'
      }
    ],
		actions: [
        {
            type: 'add',
            path: '{{cwd}}/{{properCase componentName}}/index.ts',
            templateFile: '.plop-templates/component/index.ts.hbs'
        },
        {
            type: 'add',
            path: '{{cwd}}/{{properCase componentName}}/{{properCase componentName}}.tsx',
            templateFile: '.plop-templates/component/Component.tsx.hbs'
        },
        {
            type: 'add',
            path: '{{cwd}}/{{properCase componentName}}/{{properCase componentName}}.module.scss',
            templateFile: '.plop-templates/component/Component.module.scss.hbs'
        }
    ]
	});

  // FSD entity generator
	plop.setGenerator('entity', {
		description: "Create an entity",
		prompts: [
      {
        type: 'input',
        name: 'entityName',
        message: 'What is your entity name?'
      }
    ],
		actions: [
        {
            type: 'add',
            path: '{{cwd}}/{{dashCase entityName}}/index.ts',
            templateFile: '.plop-templates/entity/index.ts.hbs'
        },
        {
            type: 'add',
            path: '{{cwd}}/{{dashCase entityName}}/model/types.ts',
            templateFile: '.plop-templates/entity/model/types.ts.hbs'
        },
        {
            type: 'add',
            path: '{{cwd}}/{{dashCase entityName}}/model/index.ts',
            templateFile: '.plop-templates/entity/model/index.ts.hbs'
        }
    ]
	});
};

module.exports = plopConfig
