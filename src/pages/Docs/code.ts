export const codeBlocks = {
    modelCreation: 'const {FieldDocumentType, Model} = require(\'field-database\')\n' +
        '\n' +
        'const schema = {\n' +
        '    messageText: {type: \'string\', required: true},\n' +
        '    date: {type: \'number\', required: true},\n' +
        '    note: {type: \'string\', default: null},\n' +
        '    deleted: {type: \'boolean\', default: false},\n' +
        '    likes: {type: \'object\', default: []}\n' +
        '}\n' +
        '\n' +
        'const Message = Model(\'message\', schema)\n' +
        '\n' +
        'export default Message',
    modelCreationTS: 'import {FieldDocumentType, Model} from \'field-database\'\n' +
        '\n' +
        '\n' +
        'export type MessageType = FieldDocumentType & {\n' +
        '    messageText: string\n' +
        '    date: number\n' +
        '    note: string | null\n' +
        '    deleted: boolean\n' +
        '    likes: Array<string>\n' +
        '}\n' +
        '\n' +
        'const schema = {\n' +
        '    messageText: {type: \'string\', required: true},\n' +
        '    date: {type: \'number\', required: true},\n' +
        '    note: {type: \'string\', default: null},\n' +
        '    deleted: {type: \'boolean\', default: false},\n' +
        '    likes: {type: \'object\', default: []}\n' +
        '}\n' +
        '\n' +
        '\n' +
        'const Message = Model<MessageType>(\'message\', schema)\n' +
        '\n' +
        'export default Message',
    connection: 'import {Express} from \'express\'\n' +
        'const express = require(\'express\')\n' +
        'import field from \'field-database\'\n' +
        '\n' +
        'const app: Express = express()\n' +
        'const PORT: number = 5000\n' +
        'async function start() {\n' +
        '    try {\n' +
        '        await field.connect({\n' +
        '            login: \'test\',\n' +
        '            password: \'111111\',\n' +
        '            projectId: \'Project ID\' \n' +
        '        })\n' +
        '        console.log(\'FieldDB is connected\')\n' +
        '        app.listen(PORT, () => log.info(`Server has been started on port ${PORT}`))\n' +
        '    } catch (e: any) {\n' +
        '        console.log(`Server Error: ${e.message}`)\n' +
        '        process.exit(1)\n' +
        '    }\n' +
        '}\n' +
        '\n' +
        'start()',
    usage: 'import Message from \'../models/Message\'\n' +
        'const router: IRouter = Router()\n' +
        '\n' +
        'router.put(\'/\',\n' +
        '    async (req, res) => {\n' +
        '        try {\n' +
        '            const {messageText} = req.body as {messageText: string}\n' +
        '            const message = new Message({\n' +
        '                messageText,\n' +
        '                date: Date.now()\n' +
        '            })\n' +
        '            await message.save()\n' +
        '            res.json({message})\n' +
        '        } catch (e: any) {\n' +
        '            log.error(e.message)\n' +
        '            res.status(500).json({message: \'Something went wrong\'})\n' +
        '        }\n' +
        '    }\n' +
        ')',
    objectsExample: '{\n' +
        '    _id: \'some id\',\n' +
        '    _creationDate: 1637876142324,\n' +
        '    _updatingDate: null,\n' +
        '    messageText: \'some message text\',\n' +
        '    date: 1637876142324,\n' +
        '    note: null,\n' +
        '    deleted: false,\n' +
        '    likes: []\n' +
        '}',
    save: 'await message.save()',
    find: {
        ru: '// Мы можем использовать метод, не передавая параметры\n' +
            '// и тогда получим все объекты из коллекции с моделью Message\n' +
            'const messages = await Message.find()\n' +
            '\n' +
            '// также мы можем передать объект - фильтр\n' +
            '// в таком случае мы получим только те объекты, которые соотвествуют указанным значениям в фильтре\n' +
            'const ownerMessages = await Message.find({ownerId: \'some id of owner\'})\n' +
            '\n' +
            '// фильтр может быть составным\n' +
            'const ownerDeletedMessages = await Message.find({ownerId: \'some id of owner\', deleted: true})',
        en: '// we can use this method without any parameters\n' +
            '// and get all objects from collection with model Message\n' +
            'const messages = await Message.find()\n' +
            '\n' +
            '// as well as with object parameter named filter\n' +
            '// in this case we will get only objects according to filter value\n' +
            'const ownerMessages = await Message.find({ownerId: \'some id of owner\'})\n' +
            '\n' +
            '// filter can be compound\n' +
            'const ownerDeletedMessages = await Message.find({ownerId: \'some id of owner\', deleted: true})',
    },
    findById: {
        ru: '// мы можем передать только один параметр - id\n' +
            'const message = await Message.findById(\'some message id\')\n' +
            '// если в базе данных найдется соотвествующий объект, мы получим его, иначе: null',
        en: '// we should to provide only one parameter: id\n' +
            'const message = await Message.findById(\'some message id\')\n' +
            '// if database find corresponding object we get object, else: null',
    },
    findOne: {
        ru: '// но в этот раз мы должны передать фильтр вместо id\n' +
            'const message = await Message.findById({messageText: \'This is message\'})\n' +
            '// в этом случае мы получим первый найденный объект с полем \'messageText\' равным \'This is message\'\n' +
            '// или null, если объект не будет найден',
        en: '// but now we should to provide any filter instead of id\n' +
            'const message = await Message.findById({messageText: \'This is message\'})\n' +
            '// in this case we get the first found object with field \'messageText\' equal to \'This is message\'\n' +
            '// or null if object not found'
    },
    findByIdAndUpdate: {
        ru: 'let newMessageText = \'this is new message text\'\n' +
            '// если нам необходим обновленный объект, то\n' +
            'const message = await Message.findByIdAndUpdate(\'some message id\', {messageText: newMessageText})\n' +
            '// но также мы можем и проигнорировать promise \n' +
            'await Message.findByIdAndUpdate(\'some message id\', {messageText: newMessageText})',
        en: 'let newMessageText = \'this is new message text\'\n' +
            '// if we need updated object\n' +
            'const message = await Message.findByIdAndUpdate(\'some message id\', {messageText: newMessageText})\n' +
            '// also we can ignore promise payload \n' +
            'await Message.findByIdAndUpdate(\'some message id\', {messageText: newMessageText})',
    },
    findByIdAndDelete: 'await Message.findByIdAndDelete(\'some message id\')',
}