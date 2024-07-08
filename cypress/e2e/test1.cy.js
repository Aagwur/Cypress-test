const users = require("../test-data/users.json")
const general = require("../pages/general")

const { userName, password } = users.defaultTestUser

describe("Test 1", () => {
  beforeEach(() => {
    cy.visit("/")
  })

  it("Verify creating user with existing credentials", () => {
    general.signIn({ userName, password, submit: false })

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      general.signInMenu.signInButton().click().click()

      // verify existing user message text
      cy.get("@alertStub").should("be.calledWith", "This user already exist.")
    })
  })

  // failing test
  it("Verify logging in and out with valid user", () => {
    general.login({ userName, password })
    // verify that user is logged in
    cy.contains("Welcome Anton990").should("exist")

    general.logOutButton().click()
    // verify that user is logged out
    cy.contains("Welcome Anton99").should("not.exist")
  })

  it("Verify logging in with invalid username", () => {
    general.login({ userName: "invalidName", password, submit: false })

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      general.loginMenu.logInButton().click()

      // verify invalid user error text
      cy.get("@alertStub").should("be.calledWith", "User does not exist.")
    })
  })

  it("Verify logging in with invalid password", () => {
    general.login({ userName, password: "invalidPassword", submit: false })

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      general.loginMenu.logInButton().click()

      // verify wrong password error text
      cy.get("@alertStub").should("be.calledWith", "Wrong password.")
    })
  })
})
