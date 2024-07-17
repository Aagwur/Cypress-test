require("cypress-wait-until")

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log("Custom error handler", JSON.stringify(err))
  return false
})

Cypress.Commands.add("getByTest", { prevSubject: "optional" }, (subject, selector, ...args) => {
  if (subject) {
    return cy.wrap(subject).find(`[data-test="${selector}"]`, ...args)
  } else {
    return cy.get(`[data-test="${selector}"]`, ...args)
  }
})

// cypress has issue with missing last numbers in input, workaround
Cypress.Commands.add("typeNumber", { prevSubject: "element" }, (subject, number) => {
  if (parseFloat(number) % 1 === 0) {
    return cy.get(subject).invoke("val", number.slice(0, -1)).type(number.slice(-1))
  } else {
    return cy.get(subject).invoke("val", number).type(0)
  }
})

Cypress.Commands.add("chainedParent", { prevSubject: true }, (subject, levels) => {
  let element = subject

  for (let i = 0; i < levels; i++) {
    element = element.parent()
  }

  return cy.wrap(element)
})

Cypress.Commands.add("chainedPrev", { prevSubject: true }, (subject, levels) => {
  let element = subject

  for (let i = 0; i < levels; i++) {
    element = element.prev()
  }

  return cy.wrap(element)
})

Cypress.Commands.add("chainedNext", { prevSubject: true }, (subject, levels) => {
  let element = subject

  for (let i = 0; i < levels; i++) {
    element = element.next()
  }

  return cy.wrap(element)
})

Cypress.Commands.add("selectByPosition", { prevSubject: "element" }, (subject, elementIndex) => {
  cy.wrap(subject)
    .find("option")
    .eq(elementIndex)
    .then((option) => cy.wrap(subject).select(option.val()))
})
