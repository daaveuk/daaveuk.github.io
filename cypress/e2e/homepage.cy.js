describe("Portfolio", () => {
  it("should show the page title", () => {
    cy.visit("http://localhost:4321");
    cy.findByTestId("title").should("be.visible").and("have.text", "Ey 'up!");
  });

  it("should load all main sections", () => {
    cy.visit("http://localhost:4321");

    // Check main structural elements
    cy.get("header").should("be.visible");
    cy.get("main").should("be.visible");
    cy.get("footer").should("be.visible");

    // Check key content sections
    cy.contains("I'm Dave, A quaint Yorkshireman").should("be.visible");
    cy.contains("Get In Touch").should("be.visible");
    cy.contains("You can also find me here!").should("be.visible");
  });

  it("should have interactive elements", () => {
    cy.visit("http://localhost:4321");

    // Contact button
    cy.get(".button").contains("Get In Touch").should("be.visible");

    // Social media links
    cy.get('[aria-label="Follow me on Twitter"]').should("be.visible");
    cy.get('[aria-label="Connect with me on LinkedIn"]').should("be.visible");
    cy.get('[aria-label="View my GitHub profile"]').should("be.visible");

    // Theme toggle (after hydration)
    cy.get("#themeToggle", { timeout: 15000 }).should("be.visible");
  });
});
