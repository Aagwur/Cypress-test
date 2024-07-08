class MainPage {
  constructor() {
    this.categories = {
      phones: () => cy.contains("Phones"),
      laptops: () => cy.contains("Laptops"),
      monitors: () => cy.contains("Monitors"),
    }
    this.productCard = {
      title: () => cy.get("h4 a[href]"),
    }
  }

  clickNextUntilNotVisible() {
    let pagesNumber = 0

    cy.get("#next2")
      .then(($el) => {
        if ($el.is(":visible")) {
          pagesNumber += 1
          cy.wrap($el)
            .click()
            .then(() => {
              this.clickNextUntilNotVisible()
            })
        }
      })
      .then(() => {
        cy.wrap(pagesNumber).as("pagesNumber")
      })
  }
}

const mainPage = new MainPage()
module.exports = mainPage
