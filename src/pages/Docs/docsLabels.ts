export const docsLabels = {
    ru: {
        labels: {
            register: 'Для начала зарегистрируйтесь в приложении, чтобы использовать все его возможности.',
            importantData: 'Запомните свои логин и пароль, они понадобятся Вам, когда Вы будете подключаться к базе данных на своем backend сервере.',
            projectCreation: 'Перейдите в "Мои проекты" и создайте свой первый проект. Вам необходимо ввести только имя проекта.',
            projectData: 'Перейдите в проект. Вы увидете имя проекта и ID проекта.',
            projectId: 'ID также понадобится Вам для подключения базы данных на backend сервере.',

            features1: 'создание пользовательских классов, производящих необходимые объекты по заранее указанной схеме',
            features2: 'валидация создаваемых объектов по типу, необходимости данных, проверка указанных ключей (при настройке схемы модели)',

            addThePackageToYourProject: 'Добавьте пакет в свой проект',
            modelCreation: 'Чтобы создать модель для Вашего проекта, используйте функцию Model из пакета field-database',
            exportLastOne: 'Экспортируйте ее:',
            usingTypeScript: 'для TypeScript:',
            schemaTypes: 'Когда мы создаем схему модели, мы можем указать тип, обязательные параметры и параметры по-умолчанию.',
            types: 'При этом поле "type" может принимать значения \'string\', \'number\', \'boolean\', \'object\' (объекты, массивы, а также null)',

            beforeConnection: '!Прежде чем подключиться к базе данных, проверьте интернет соединение!',
            connectionPreHeader: 'На примере express (TypeScript):',

            exampleAbove: 'В соотвествии с примером выше, используя express router',
            instanceCreation: 'Здесь мы создаем instance передавая начальные параметры.',
            aboutSave: 'Метод save делает соотвествующую запись в базе данных.',
            whatIsObject: 'Если мы попробуем посмотреть на объект message, мы увидим:',

            demoVersion: 'В демо-версии базыданных доступны следующие методы',
            save: 'save сохраняет объекты в базе данных и возвращает Promise без начинки (void):',
            find: 'find статический метод. Он возвращает Promise с начинкой из массива объектов:',
            findById: 'findById статический метод. Возвращает Promise с объектом или null (если объект не найден):',
            findOne: 'findOne статический метод. Возвращает Promise с объектом или null как findById:',
            findByIdAndUpdate: 'findByIdAndUpdate также статический метод. Он обновляет объекты в соответствии с переданным фильтром и возвращает Promise с объектом или с null:',
            findByIdAndDelete: 'findByIdAndDelete статический метод. Удаляет объект в соотевствии с id и возвращает Promise без начинки (void):',

            errors: 'При создании модели мы должны передать все необходимые параметры полям, не имеющих значений по-умолчанию. Также мы должны передать значения корректных типов. Если мы ошибемся, мы получим одну из следующих ошибок:'
        },
        headers: {
            appUsage: 'Использование приложения',
            registration: 'Регистрация',
            importantData: 'Важные данные',
            npmPackage: 'field-database npm-пакет',
            features: 'Функционал',
            installing: 'Установка',
            example: 'Пример',
            modelCreation: 'Создание модели',
            connection: 'Подключение к базе данных',
            usage: 'Использование',
            availableMethods: 'Доступные методы',
            errors: 'Ошибки'
        },
    },
    en: {
        labels: {
            register: 'At first get registered in the application for using all features. You can do it by clicking "Sign up".',
            importantData: 'Remember your login and password. You will need them for authorization in database on your backend server.',
            projectCreation: 'Go to "My projects" and create your first project. You have to specify project name only.',
            projectData: 'Go to the project. We will see project name and project ID.',
            projectId: 'You will need project ID also for authorization in database on your backend server.',

            features1: 'creation of custom classes (models) for the production of the required objects according to a pre-specified scheme',
            features2: 'validation of created objects by type, need for data availability, existence of declared keys (setting when creating a model)',

            addThePackageToYourProject: 'Add the package to your project',
            modelCreation: 'To create model that will be used in you project, use function Model provided by field-database',
            exportLastOne: 'Export last one:',
            usingTypeScript: 'using TypeScript:',
            schemaTypes: 'When we create a schema for the model, we may specify type, require and default parameters.',
            types: 'In this time key "type" can turn \'string\', \'number\', \'boolean\', \'object\' (objects, arrays and also null)',

            beforeConnection: '!Before connecting to database, make you sure you have network connection!',
            connectionPreHeader: 'Using express (TypeScript):',

            exampleAbove: 'Continuing with the example above, using express router.',
            instanceCreation: 'Here we create new instance providing initial parameters.',
            aboutSave: 'Method save makes corresponding records in database.',
            whatIsObject: 'If we try to look what object message is, we can see:',

            demoVersion: 'Demo version of the database make available following asynchronous methods.',
            save: 'save is instance method. It saves object record in database and returns a Promise without payload (void):',
            find: 'find is static method. It returns a Promise with array payload:',
            findById: 'findById is static method. It returns a Promise with object or null payload:',
            findOne: 'findOne is static method. It returns a Promise with object or null payload like findById:',
            findByIdAndUpdate: 'findByIdAndUpdate is also static method. It updates the object according provided filter and returns a Promise with object or null:',
            findByIdAndDelete: 'findByIdAndDelete is static. It delete the object according provided id and returns a Promise without payload (void)',

            errors: 'With model creation we should provide all required parameters without default values. Also we have to pass values of the correct types. If we make the mistake, we can get one of following error messages:'
        },
        headers: {
            appUsage: 'Application usage',
            registration: 'Registration',
            importantData: 'Important data',
            npmPackage: 'field-database npm package',
            features: 'Features',
            installing: 'Installing',
            example: 'Example',
            modelCreation: 'Model creation',
            connection: 'Database connection',
            usage: 'Usage',
            availableMethods: 'Available methods',
            errors: 'Errors'
        },
    }
}

export type DocsLabelsType = typeof docsLabels.en