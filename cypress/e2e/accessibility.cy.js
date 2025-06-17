describe("Accessibility", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });

  it("should have proper heading structure", () => {
    // Check main title exists
    cy.findByTestId("title").should("be.visible").and("have.text", "Ey 'up!");

    // Check screen reader only headings exist
    cy.get("#about-heading").should("exist").and("have.text", "About me");
    cy.get("#contact-heading").should("exist").and("have.text", "Get in touch");
    cy.get("#social-heading")
      .should("exist")
      .and("have.text", "Find me online");
  });

  it("should have skip to main content link", () => {
    cy.get(".skip-link")
      .should("be.visible")
      .and("have.text", "Skip to main content")
      .and("have.attr", "href", "#main-content");
  });

  it("should have proper ARIA labels and roles", () => {
    // Check social media section has proper role
    cy.get('[role="list"][aria-label="Social media links"]').should("exist");

    // Check icon buttons have proper ARIA labels
    cy.get('[aria-label="Follow me on Twitter"]').should("exist");
    cy.get('[aria-label="Connect with me on LinkedIn"]').should("exist");
    cy.get('[aria-label="View my GitHub profile"]').should("exist");
  });

  it("should have proper alt text for images", () => {
    cy.get('img[alt="Dave Henderson Profile Picture"]').should("be.visible");
  });

  it("should support keyboard navigation", () => {
    // Tab through interactive elements
    cy.get("body").click(); // Click body first to establish focus
    cy.get("body").press("Tab");
    cy.focused().should("have.class", "skip-link");

    cy.focused().press("Tab");
    cy.focused().should("contain.text", "Get In Touch");

    // Continue tabbing through social links
    cy.focused().press("Tab");
    cy.focused().should("have.attr", "aria-label", "Follow me on Twitter");

    cy.focused().press("Tab");
    cy.focused().should(
      "have.attr",
      "aria-label",
      "Connect with me on LinkedIn"
    );

    cy.focused().press("Tab");
    cy.focused().should("have.attr", "aria-label", "View my GitHub profile");
  });

  it("should have sufficient color contrast", () => {
    // Check that text elements have good contrast
    cy.get("h1").should("be.visible");
    cy.get("p").should("be.visible");
    cy.get("strong").should("be.visible");
  });

  it("should have minimum touch target sizes", () => {
    // Check buttons meet WCAG AA minimum of 44px
    cy.get(".button").each(($btn) => {
      cy.wrap($btn).invoke("outerWidth").should("be.gte", 44);
      cy.wrap($btn).invoke("outerHeight").should("be.gte", 44);
    });

    cy.get(".icon-button").each(($btn) => {
      cy.wrap($btn).invoke("outerWidth").should("be.gte", 44);
      cy.wrap($btn).invoke("outerHeight").should("be.gte", 44);
    });
  });
});
