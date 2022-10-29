import { getUrl } from "./get-url";
import { sasParser } from "./parser/sas-parser";
import { idbankParser } from "./parser/idbank-parser";

const sasPromise = getUrl('https://www.sas.am/en/appfood/personal/calculator/')
    .then(sasParser)
    .then(Object.fromEntries);

const idBankPromise = getUrl('https://idbank.am/en/rates/?RATE_TYPE=NO_CASH')
    .then(idbankParser)
    .then(Object.fromEntries);


Promise.all([sasPromise, idBankPromise]).then(([sas, idbank]) => {
   const asJson = JSON.stringify({ sas, idbank });
   process.stdout.write(asJson);
})
