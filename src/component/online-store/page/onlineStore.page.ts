import {Page, Locator} from '@playwright/test'
import { createProductLocators } from '@utils/createProductLocators.util';



export class OnlineStore {

    private  baseUrl  = process.env.BASE_URL!;
    private  username = process.env.UI_USERNAME!;
    private  password = process.env.UI_PASSWORD!; 

    //login
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator
    
    //purchase
    private readonly shoppingCart: Locator;
    private readonly checkoutButton: Locator;

    //Checkout
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly zipCode: Locator;
    private readonly continueButton: Locator;
    private readonly priceTotal: Locator;

    //logout
    private readonly finishButton: Locator;
    private readonly backHomeButton: Locator;
    private readonly mainMenu: Locator;
    private readonly logOutButton: Locator;

    constructor(private page: Page) {

        this.usernameField = this.page.locator('#user-name');
        this.passwordField = this.page.locator('#password');
        this.loginButton = this.page.locator('#login-button');

        this.shoppingCart = this.page.locator('#shopping_cart_container');
        this.checkoutButton = this.page.locator('#checkout');

        this.firstName = this.page.locator('#first-name');
        this.lastName = this.page.locator('#last-name');
        this.zipCode = this.page.locator('#postal-code');
        this.continueButton = this.page.locator('#continue');
        this.priceTotal = this.page.getByText('Price Total', {exact: true})

        this.finishButton = this.page.locator('#finish');
        this.backHomeButton = this.page.locator('#back-to-products');
        this.mainMenu = this.page.locator('#react-burger-menu-btn');
        this.logOutButton = this.page.locator('#logout_sidebar_link');


    }

   private async navigateToDashboard(): Promise<void> {

        await this.page.goto(this.baseUrl );
        await this.usernameField.fill(this.username);
        await this.passwordField.fill(this.password);

        await this.loginButton.click();
    }

    private async addProductToCart(productName: 'backpack' | 'bike-light' | 'fleece-jacket' | 'onesie' = 'backpack'): Promise<void> {

        const { addToCartButton, verifyAdded } = createProductLocators(this.page, productName);

        await addToCartButton.click();
        if(!(await verifyAdded.isVisible())){
            throw new Error(`${productName} NOT added to cart`);
        }

        await this.shoppingCart.click();
        await this.checkoutButton.click();


    }

    private async enterClientInfo(name: string, surname: string, zipCode: string): Promise<void>{

        await this.firstName.fill(name);
        await this.lastName.fill(surname);
        await this.zipCode.fill(zipCode);
        await this.continueButton.click();
    }

    private async logOut(): Promise<void> {
        await this.mainMenu.click();
        await this.logOutButton.click();
    }

    public async completePurchase(
        productName: 'backpack' | 'bike-light' | 'fleece-jacket' | 'onesie' = 'backpack',
        name: string = 'user name', 
        surname: string = 'user surname', 
        zipCode: string = '1000'
    ): Promise<void> {

        await this.navigateToDashboard();
        await this.addProductToCart(productName);
        await this.enterClientInfo(name, surname, zipCode);

        if (!(await this.priceTotal.isVisible())) {
            throw new Error('Price total is not visible after entering client info');
        }

        await this.finishButton.click();
        if (!(this.page.url().includes("checkout-complete"))){
            throw new Error("Online purchase was not successful")
        }
        await this.backHomeButton.click();

        await this.logOut();
    }

}