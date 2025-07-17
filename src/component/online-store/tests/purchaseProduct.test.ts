import test, {expect} from '@fixtures/baseTest.fixture'

type ProductName = 'backpack' | 'bike-light' | 'fleece-jacket' | 'onesie';
const productNames: ProductName[] = ['backpack', 'bike-light', 'fleece-jacket', 'onesie'];

test.describe("Online shopping E2E @ui", () =>{

    for(const productName of productNames){
        test(`validate Purchase of ${productName} from online store`, async({onlineStore})=>{

            await onlineStore.completePurchase(productName);

        })
    }

})