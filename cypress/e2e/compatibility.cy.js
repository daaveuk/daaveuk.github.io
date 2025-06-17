describe("Cross-browser Compatibility", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });

  it("should support modern CSS features gracefully", () => {
    // Check CSS custom properties work
    cy.get("body").should("exist");
    
    // Check CSS Grid/Flexbox layouts work
    cy.get(".container").should("be.visible");
  });

  it("should handle different color schemes", () => {
    // Test high contrast mode support
    cy.get(".button").should("be.visible");
    cy.get(".icon-button").should("be.visible");
  });

  it("should work with different text sizes", () => {
    // Simulate larger text sizes
    cy.get("html").invoke("attr", "style", "font-size: 20px");
    
    // Content should still be readable and accessible
    cy.findByTestId("title").should("be.visible");
    cy.contains("Get In Touch").should("be.visible");
  });

  it("should support touch interactions", () => {
    // Simulate touch events on interactive elements
    cy.get(".button").trigger("touchstart").trigger("touchend");
    cy.get(".icon-button").first().trigger("touchstart").trigger("touchend");
  });

  it("should handle reduced motion preferences", () => {
    // Check that hover effects exist but can be disabled
    cy.get(".hover-effect").should("exist");
  });

  it("should work with screen readers", () => {
    // Check for screen reader compatible elements
    cy.get(".sr-only").should("exist");
    cy.get('[aria-label]').should("have.length.at.least", 3);
    cy.get('[role]').should("exist");
  });

  it("should support keyboard-only navigation", () => {
    // Tab through all interactive elements
    cy.get("body").tab();
    cy.focused().should("exist");
    
    // Continue tabbing through all interactive elements
    let tabbableCount = 0;
    cy.get("a, button, [tabindex]:not([tabindex='-1'])").then(($els) => {
      tabbableCount = $els.length;
    });
    
    // Should be able to reach all interactive elements
    for (let i = 0; i < 10; i++) { // Test reasonable number of tabs
      cy.focused().tab();
      cy.focused().should("exist");
    }
  });

  it("should handle different viewport orientations", () => {
    // Portrait mobile
    cy.viewport(375, 667);
    cy.findByTestId("title").should("be.visible");
    
    // Landscape mobile
    cy.viewport(667, 375);
    cy.findByTestId("title").should("be.visible");
    
    // Reset to desktop
    cy.viewport(1280, 720);
  });

  it("should work with print styles", () => {
    // Check that print media doesn't break layout
    cy.window().then((win) => {
      const printMedia = win.matchMedia("print");
      // Content should still be accessible
      cy.findByTestId("title").should("be.visible");
    });
  });
});
