describe("Content and SEO", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });

  it("should have proper page title", () => {
    cy.title().should("eq", "Dave Henderson - Experienced Typescript Engineer, Manchester, UK");
  });

  it("should have meta viewport tag", () => {
    cy.get('meta[name="viewport"]')
      .should("have.attr", "content", "width=device-width, initial-scale=1.0");
  });

  it("should have favicon", () => {
    cy.get('link[rel="icon"]').should("exist");
  });

  it("should display correct personal information", () => {
    // Check main title
    cy.findByTestId("title").should("contain.text", "Ey 'up!");
    
    // Check about section content
    cy.get("main").within(() => {
      cy.contains("I'm Dave, A quaint Yorkshireman living in Manchester").should("be.visible");
      cy.contains("Principal Typescript Engineer").should("be.visible");
      cy.contains("Interactive Investor").should("be.visible");
    });
  });

  it("should have proper semantic HTML structure", () => {
    // Check for main landmark
    cy.get("main").should("exist");
    
    // Check for header
    cy.get("header").should("exist");
    
    // Check for footer
    cy.get("footer").should("exist");
    
    // Check for sections with proper headings
    cy.get("section").should("have.length.at.least", 3);
  });

  it("should display profile picture", () => {
    cy.get('img[alt="Dave Henderson Profile Picture"]')
      .should("be.visible")
      .and("have.attr", "src", "/profilePic.png");
  });

  it("should have proper emoji accessibility", () => {
    // Check emojis have proper labels
    cy.get('[aria-label="Email icon"]').should("contain", "📬");
    cy.get('[aria-label="Love"]').should("contain", "❤️");
  });

  it("should have call-to-action section", () => {
    cy.contains("Always happy for a chat! Why not drop me a line?").should("be.visible");
    cy.get('.button').contains('Get In Touch').should("be.visible");
  });

  it("should have footer with attribution", () => {
    cy.get("footer").within(() => {
      cy.contains("Made with").should("be.visible");
      cy.contains("by David Henderson").should("be.visible");
    });
  });

  it("should have proper text hierarchy", () => {
    // Main title should be h1
    cy.get("h1").should("contain.text", "Ey 'up!");
    
    // Section headings should exist (even if screen reader only)
    cy.get("h2").should("have.length.at.least", 3);
  });

  it("should load external fonts", () => {
    // Check that Google Fonts link exists
    cy.get('link[href*="fonts.googleapis.com"]').should("exist");
  });

  it("should have responsive design elements", () => {
    // Test different viewport sizes
    cy.viewport(320, 568); // Mobile
    cy.findByTestId("title").should("be.visible");
    
    cy.viewport(768, 1024); // Tablet
    cy.findByTestId("title").should("be.visible");
    
    cy.viewport(1280, 720); // Desktop
    cy.findByTestId("title").should("be.visible");
  });
});
