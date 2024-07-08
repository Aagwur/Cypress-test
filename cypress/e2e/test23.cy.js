const users = require("../test-data/users.json")
const general = require("../pages/general")
const mainPage = require("../pages/mainPage")
const productPage = require("../pages/productPage")
const cartPage = require("../pages/cartPage")

const { userName, password } = users.defaultTestUser

// 2nd and 3rd tests are the same in your assessment
describe("Test 2-3", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Verify placing order", function () {
    general.login({ userName, password })
    mainPage.categories.phones().click()
    // select 1st phone from list
    mainPage.productCard.title().first().click()
    productPage.price().invoke("text").as("price")
    productPage.addToCard().click()

    general.productStore().click()
    mainPage.categories.phones().click()
    // select 2nd phone from list
    mainPage.productCard.title().eq(1).click()
    productPage.addToCard().click()

    general.cart().click()
    // remove 1 item
    cartPage.delete().click()
    cy.wait(1000)
    cartPage.placeOrder().click()

    cartPage.fillOrderFrom({
      name: "Anton",
      country: "Canada",
      city: "Toronto",
      creditCard: "4441785637473911",
      month: "July",
      year: "1999",
    })
    cy.then(() => {
      // verify pop-up info contains user entered data and correct data from site
      cartPage.successPopup.text().should("exist")
      cy.get("[class*='sweet-alert']").contains("4441785637473911").should("exist")
      cy.get("[class*='sweet-alert']").contains("Anton").should("exist")
      cy.get("[class*='sweet-alert']").contains(this.price.match(/\d/g).join("")).should("exist")
    })
  })
})
