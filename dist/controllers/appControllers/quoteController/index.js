import createCRUDController from '@/controllers/middlewaresControllers/createCRUDController';
import sendMail from './sendMail';
import create from './create';
import summary from './summary';
import update from './update';
import convertQuoteToInvoice from './convertQuoteToInvoice';
import paginatedList from './paginatedList';
import read from './read';
const methods = createCRUDController('Quote');
methods.list = paginatedList;
methods.read = read;
methods.mail = sendMail;
methods.create = create;
methods.update = update;
methods.convert = convertQuoteToInvoice;
methods.summary = summary;
export default methods;
//# sourceMappingURL=index.js.map