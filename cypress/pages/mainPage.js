class MainPage {
  constructor() {
    this.categories = {
      phones: () => cy.contains("Phones"),
    }
    this.productCard = {
      title: () => cy.get("h4 a[href]"),
    }
  }
}

const mainPage = new MainPage()
module.exports = mainPage
