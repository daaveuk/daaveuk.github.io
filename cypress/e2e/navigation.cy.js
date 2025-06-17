describe("Navigation and Links", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });

  it("should have working email contact button", () => {
    cy.get(".button")
      .contains("Get In Touch")
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "mailto:me+enquires@daave.co.uk")
      .and("include", "subject=")
      .and("include", "body=");
  });

  it("should have properly formatted email with encoded content", () => {
    cy.get(".button")
      .contains("Get In Touch")
      .should("have.attr", "href")
      .then((href) => {
        // Check the email contains properly encoded subject and body
        expect(href).to.include(
          "subject=Hi%20Dave%2C%20I'd%20like%20to%20get%20in%20touch!"
        );
        expect(href).to.include("body=");
        expect(href).to.include("Hi%20Dave");
      });
  });

  it("should have working social media links", () => {
    // Twitter link
    cy.get('[aria-label="Follow me on Twitter"]')
      .should("be.visible")
      .and("have.attr", "href", "https://twitter.com/daaveuk/")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noreferrer noopener");

    // LinkedIn link
    cy.get('[aria-label="Connect with me on LinkedIn"]')
      .should("be.visible")
      .and("have.attr", "href", "https://www.linkedin.com/in/daaveuk/")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noreferrer noopener");

    // GitHub link
    cy.get('[aria-label="View my GitHub profile"]')
      .should("be.visible")
      .and("have.attr", "href", "https://github.com/daaveuk/")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noreferrer noopener");
  });

  it("should have working view code link in footer", () => {
    cy.get('footer a[href*="github.com"]')
      .should("be.visible")
      .and("contain.text", "View the code here")
      .and("have.attr", "href", "https://github.com/daaveuk/webpage")
      .and("have.attr", "target", "_blank")
      .and("have.attr", "rel", "noreferrer noopener");
  });

  it("should have skip link that jumps to main content", () => {
    cy.get("body").press("Tab");
    // Click skip link
    cy.get(".skip-link").click();

    // Should navigate to main content (check URL hash)
    cy.url().should("include", "#main-content");

    // Main content should be visible
    cy.get("#main-content").should("be.visible");
  });

  it("should handle external link security properly", () => {
    // Check all external links have proper security attributes
    cy.get('a[target="_blank"]').each(($link) => {
      cy.wrap($link).should("have.attr", "rel", "noreferrer noopener");
    });
  });

  it("should not have any broken internal links", () => {
    // Check all internal links (if any exist)
    cy.get('a:not([href^="http"]):not([href^="mailto:"])').each(($link) => {
      const href = $link.attr("href");
      if (href && href !== "#") {
        // Visit the link to ensure it doesn't 404
        cy.request(href).then((response) => {
          expect(response.status).to.eq(200);
        });
      }
    });
  });
});
