const users = require("../test-data/users.json")
const mainPage = require("../pages/mainPage")

const { userName, password } = users.defaultTestUser

describe("Test 1", () => {
  beforeEach(() => {    
    cy.visit("/")
  })

  it("Verify creating user with existing credentials", () => {
    mainPage.signIn({ userName, password, submit: false })

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      mainPage.signInMenu.signInButton().click().click()

      // verify existing user message text
      cy.get("@alertStub").should("be.calledWith", "This user already exist.")
    })    
  })

  // failing test
  it("Verify logging in and out with valid user", () => {
    mainPage.login({ userName, password })
    // verify that user is logged in
    cy.contains("Welcome Anton990").should("exist")

    cy.get("[onclick='logOut()']").click()
    // verify that user is logged out
    cy.contains("Welcome Anton99").should("not.exist")
  })

  it("Verify logging in with invalid username", () => {
    mainPage.login({ userName: "invalidName", password, submit: false })  

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      mainPage.loginMenu.logInButton().click()

      // verify invalid user error text
      cy.get("@alertStub").should("be.calledWith", "User does not exist.")
    })
  })

  it("Verify logging in with invalid password", () => {
    mainPage.login({ userName, password: "invalidPassword", submit: false })

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      mainPage.loginMenu.logInButton().click()

      // verify wrong password error text
      cy.get("@alertStub").should("be.calledWith", "Wrong password.")
    })
  })
})