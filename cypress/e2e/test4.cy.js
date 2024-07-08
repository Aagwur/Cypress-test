const users = require("../test-data/users.json")
const general = require("../pages/general")
const mainPage = require("../pages/mainPage")

const { userName, password } = users.defaultTestUser

describe("Test 4", () => {
  beforeEach(() => {
    cy.visit("/")
    general.login({ userName, password })
  })

  it("Verify products count in each category", function () {
    let pageNumber,
      productsCountMain,
      productsCountCalculated = 0

    // count products on main page
    mainPage.clickNextUntilNotVisible()
    mainPage.productCard
      .title()
      .its("length")
      .then((length) => {
        pageNumber = pageNumber + +this.pageNumber
        productsCountMain += length
        // add count of items on previous pages
        if (+this.pageNumber > 0) {
          productsCountMain = (productsCountMain + 9) * +this.pageNumber
        }
      })

    // count products in each separate category
    mainPage.categories.phones().click()
    cy.wait(1000)
    mainPage.clickNextUntilNotVisible()
    mainPage.productCard
      .title()
      .its("length")
      .then((length) => {
        pageNumber = pageNumber + +this.pageNumber
        productsCountCalculated += length
        if (+this.pageNumber > 0) {
          productsCountCalculated = (productsCountCalculated + 9) * +this.pageNumber
        }
      })

    mainPage.categories.laptops().click()
    cy.wait(1000)
    mainPage.clickNextUntilNotVisible()
    mainPage.productCard
      .title()
      .its("length")
      .then((length) => {
        pageNumber = pageNumber + +this.pageNumber
        productsCountCalculated += length
        if (+this.pageNumber > 0) {
          productsCountCalculated = (productsCountCalculated + 9) * +this.pageNumber
        }
      })
    mainPage.categories.monitors().click()
    cy.wait(1000)
    pageNumber += mainPage.clickNextUntilNotVisible()
    mainPage.productCard
      .title()
      .its("length")
      .then((length) => {
        pageNumber = pageNumber + +this.pageNumber
        productsCountCalculated += length
        if (+this.pageNumber > 0) {
          productsCountCalculated = (productsCountCalculated + 9) * +this.pageNumber
        }
      })
    // compare product count calculated from categories and count on main page
    cy.wrap(productsCountMain).should("be.equal", productsCountCalculated)
  })
})
