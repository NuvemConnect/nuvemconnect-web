# NuvemconnectWeb - Configurando o ambiente de desenvolvimento

## 1. Instalar o Node.js [Node.js](https://nodejs.org/)

## 2. Instalar o Yarn [Yarn](https://yarnpkg.com/)

## 3. Instalar o Angular CLI globalmente

**Windows** `yarn global add @angular/cli@latest`
**Linux ou Mac** `sudo yarn global add @angular/cli@latest`

## 4. Baixar e instalar o VS Code [Visual Studio Code](https://code.visualstudio.com/)

## 5. Baixar e instalar o Git [Git](https://git-scm.com/)

## 6. Baixar e instalar o GitHub Desktop (opcional) [GitHub Desktop](https://desktop.github.com/)

## 7. Baixar e instalar o Postman [Postman](https://www.postman.com/downloads/)

**Alternativa online** [Postman Online](https://web.postman.co/)
**Alternativa ao Postman Plugin do VS Code** [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

## 8. Adicionar o ESLint ao projeto

**Windows** `yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`
**Linux ou Mac** `sudo yarn add --dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

### Configurar .eslintrc.json

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": ["plugin:@angular-eslint/recommended", "plugin:@angular-eslint/template/process-inline-templates"],
      "rules": {
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": ["element", "attribute"],
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ]
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {}
    }
  ]
}
```

### Adicionar script no package.json

```json
"scripts": {
  "lint": "eslint . --ext .ts,.html"
}
```

**Adicionar via CLI** `ng add @angular-eslint/schematics`

### Verificar em angular.json

```json
"cli": {
  "schematicCollections": ["@angular-eslint/schematics"]
}
```

## 9. Adicionar o Husky ao projeto

**Windows** `yarn add husky --dev`
**Linux ou Mac** `sudo yarn add husky --dev`
**Adicionar via CLI** `ng add @angular/husky`

## 10. Adicionar o CommitLint ao projeto

**Windows** `yarn add @commitlint/config-conventional @commitlint/cli --dev`
**Linux ou Mac** `sudo yarn add @commitlint/config-conventional @commitlint/cli --dev`
**Adicionar via CLI** `ng add @angular/commitlint`

## 11. Adicionar o Tailwind CSS ao projeto

**Windows** `yarn add tailwindcss postcss autoprefixer --dev`
**Linux ou Mac** `sudo yarn add tailwindcss postcss autoprefixer --dev`
**Adicionar via CLI** `ng add @angular/tailwindcss`

## 12. Adicionar o Jasmine ao projeto

**Windows** `yarn add jasmine --dev`
**Linux ou Mac** `sudo yarn add jasmine --dev`
**Adicionar via CLI** `ng add @angular/jasmine`

## 13. Adicionar o Karma ao projeto

**Windows** `yarn add karma --dev`
**Linux ou Mac** `sudo yarn add karma --dev`

**Adicionar via CLI** `ng add @angular/karma`

## 14. Adicionar o Compodoc ao projeto

**Windows** `yarn add compodoc --dev`
**Linux ou Mac** `sudo yarn add compodoc --dev`

**Adicionar via CLI** `ng add @angular/compodoc`
