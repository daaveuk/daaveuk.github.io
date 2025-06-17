describe("Theme Toggle", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
    // Wait for React component to hydrate
    cy.get("#themeToggle", { timeout: 10000 }).should("be.visible");
  });

  it("should have theme toggle button", () => {
    cy.get("#themeToggle button")
      .should("be.visible")
      .and("have.attr", "aria-label")
      .and("contain", "theme");
  });

  it("should toggle theme when clicked", () => {
    // Get initial theme
    cy.get("html").then(($html) => {
      const initialTheme = $html.attr("data-theme") || "light";
      
      // Click theme toggle
      cy.get("#themeToggle button").click();
      
      // Wait for theme change and verify it changed
      cy.get("html").should("not.have.attr", "data-theme", initialTheme);
      
      // Click again to toggle back
      cy.get("#themeToggle button").click();
      
      // Should return to initial theme
      cy.get("html").should("have.attr", "data-theme", initialTheme);
    });
  });

  it("should update button aria-label when theme changes", () => {
    cy.get("#themeToggle button").then(($btn) => {
      const initialLabel = $btn.attr("aria-label");
      
      // Click to change theme
      cy.get("#themeToggle button").click();
      
      // Wait for label to change
      cy.get("#themeToggle button").should("not.have.attr", "aria-label", initialLabel);
    });
  });

  it("should persist theme preference", () => {
    // Change theme
    cy.get("#themeToggle button").click();
    
    // Get the theme after change
    cy.get("html").then(($html) => {
      const newTheme = $html.attr("data-theme");
      
      // Reload page
      cy.reload();
      
      // Wait for hydration
      cy.get("#themeToggle", { timeout: 10000 }).should("be.visible");
      
      // Theme should be preserved
      cy.get("html").should("have.attr", "data-theme", newTheme);
    });
  });

  it("should support keyboard interaction", () => {
    // Focus the theme toggle button
    cy.get("#themeToggle button").focus();
    
    // Get initial theme
    cy.get("html").then(($html) => {
      const initialTheme = $html.attr("data-theme") || "light";
      
      // Press Enter to toggle
      cy.get("#themeToggle button").type("{enter}");
      
      // Verify theme changed
      cy.get("html").should("not.have.attr", "data-theme", initialTheme);
      
      // Press Space to toggle back
      cy.get("#themeToggle button").type(" ");
      
      // Should return to initial theme
      cy.get("html").should("have.attr", "data-theme", initialTheme);
    });
  });

  it("should respect system theme preference", () => {
    // Clear any stored preference
    cy.clearLocalStorage();
    
    // Mock dark mode preference
    cy.window().then((win) => {
      cy.stub(win, "matchMedia").returns({
        matches: true, // Simulate dark mode preference
        addEventListener: cy.stub(),
        removeEventListener: cy.stub()
      });
    });
    
    // Reload to apply system preference
    cy.reload();
    
    // Wait for hydration
    cy.get("#themeToggle", { timeout: 10000 }).should("be.visible");
    
    // Should initialize with dark theme
    cy.get("html").should("have.attr", "data-theme", "dark");
  });
});
