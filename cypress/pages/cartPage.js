class CartPage {
    constructor() {
      this.delete = () => cy.contains("Delete")
    //   this.placeOrder = () => cy.get("[data-target='#orderModal']")      
      this.placeOrder = () => cy.contains("button", "Place Order")
      this.placeOrderPopup = {
        name: () => cy.get("#name"),
        country: () => cy.get("#country"),
        city: () => cy.get("#city"),
        creditCard: () => cy.get("#card"),
        month: () => cy.get("#month"),
        year: () => cy.get("#year"),
        purchase: () => cy.get("[onclick='purchaseOrder()']")
      }
      this.successPopup = {
        text: () => cy.contains("Thank you for your purchase!")
      }
    }

    fillOrderFrom({ name, country, city, creditCard, month, year, submit = true } ) {
        this.placeOrderPopup.name().invoke("val", name)
        this.placeOrderPopup.country().invoke("val", country)
        this.placeOrderPopup.city().invoke("val", city)
        this.placeOrderPopup.creditCard().invoke("val", creditCard)
        this.placeOrderPopup.month().invoke("val", month)
        this.placeOrderPopup.year().invoke("val", year)
        if (submit) {
            this.placeOrderPopup.purchase().click()
        }
    }
}
  
const cartPage = new CartPage()
module.exports = cartPage
  