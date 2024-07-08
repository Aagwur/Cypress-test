const users = require("../test-data/users.json")

const { username, password } = users.defaultTestUser

describe("Test 1", () => {
  beforeEach(() => {    
    cy.visit("/")
  })

  it("Verify creating user with existing credentials", () => {
    cy.get("#signin2").click()
    // workaround, cause usual cy.type() works unstable on your site
    cy.get("#sign-username").invoke("val", username)
    cy.get("#sign-password").invoke("val", password)

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      cy.get("[onclick='register()']").click()

      // verify alert message text
      cy.get("@alertStub").should("be.calledWith", "This user already exist.")
    })    
  })

  // failing test
  it("Verify logging in and out with valid user", () => {
    cy.get("#login2").click()
    cy.get("#loginusername").invoke("val", username)
    cy.get("#loginpassword").invoke("val", password)
    cy.get("[onclick='logIn()']").click()

    // verify that user is logged in
    cy.contains("Welcome Anton990").should("exist")

    cy.get("[onclick='logOut()']").click()

    // verify that user is logged out
    cy.contains("Welcome Anton99").should("not.exist")
  })

  it("Verify logging in with invalid username", () => {
    cy.get("#login2").click()
    cy.get("#loginusername").invoke("val", "invalidName")
    cy.get("#loginpassword").invoke("val", password)    

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      cy.get("[onclick='logIn()']").click()

      // verify alert message text
      cy.get("@alertStub").should("be.calledWith", "User does not exist.")
    })
  })

  it("Verify logging in with invalid password", () => {
    cy.get("#login2").click()
    cy.get("#loginusername").invoke("val", username)
    cy.get("#loginpassword").invoke("val", "invalidPassword")
    cy.get("[onclick='logIn()']").click()

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub")
      cy.get("[onclick='logIn()']").click()

      // verify alert message text
      cy.get("@alertStub").should("be.calledWith", "Wrong password.")
    })
  })
})