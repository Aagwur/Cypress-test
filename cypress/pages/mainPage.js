class MainPage {
    constructor() {
      this.loginMenu = {
        self: () => cy.get("#login2"),
        nameInput: () => cy.get("#loginusername"),
        passwordInput: () => cy.get("#loginpassword"),
        logInButton: () => cy.get("[onclick='logIn()']")
      } 
      this.signInMenu = {
        self: () => cy.get("#signin2"),
        nameInput: () => cy.get("#sign-username"),
        passwordInput: () => cy.get("#sign-password"),
        signInButton: () => cy.get("[onclick='register()']")
      }
    }
  
    login({ userName, password, submit = true }) {
      this.loginMenu.self().click()
      // workaround, cause usual cy.type() works unstable on your site
      this.loginMenu.nameInput().invoke("val", userName)
      this.loginMenu.passwordInput().invoke("val", password)
      if (submit) {
        this.loginMenu.logInButton().click()
      }
    }

    signIn({ userName, password, submit = true }) {
      this.signInMenu.self().click()
      // workaround, cause usual cy.type() works unstable on your site
      this.signInMenu.nameInput().invoke("val", userName)
      this.signInMenu.passwordInput().invoke("val", password)
      if (submit) {
        this.signInMenu.signInButton().click()
      }
    }
  }
  
  const mainPage = new MainPage()
  module.exports = mainPage
  