class ProductPage {
    constructor() {
      this.addToCard = () => cy.contains("Add to cart")
      this.price = () => cy.get(".price-container")
    }
}
  
const productPage = new ProductPage()
module.exports = productPage
  