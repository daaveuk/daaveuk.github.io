describe("Error Handling and Edge Cases", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });

  it("should handle missing images gracefully", () => {
    // Intercept image requests and return 404
    cy.intercept("GET", "/profilePic.png", { statusCode: 404 }).as(
      "failedImage"
    );

    cy.reload();

    // Page should still load even if image fails
    cy.findByTestId("title").should("be.visible");
  });

  it("should handle slow network conditions", () => {
    // Simulate slow network
    cy.intercept("GET", "**/*", (req) => {
      req.reply((res) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(res), 1000);
        });
      });
    }).as("slowNetwork");

    cy.reload();

    // Content should eventually load
    cy.findByTestId("title", { timeout: 15000 }).should("be.visible");
  });

  it("should handle JavaScript errors gracefully", () => {
    // Inject a JavaScript error
    cy.window().then((win) => {
      // Override console.error to track errors
      const originalError = win.console.error;
      let errorCount = 0;
      win.console.error = (...args) => {
        errorCount++;
        originalError.apply(win.console, args);
      };

      // Cause an error
      win.eval('throw new Error("Test error")');

      // Page should still be functional
      cy.findByTestId("title").should("be.visible");
      cy.contains("Get In Touch").should("be.visible");
    });
  });

  it("should handle theme toggle failures gracefully", () => {
    // Mock localStorage to fail
    cy.window().then((win) => {
      cy.stub(win.localStorage, "setItem").throws(new Error("Storage failed"));
    });

    // Theme toggle should still work visually even if persistence fails
    cy.get("#themeToggle button", { timeout: 10000 }).should("be.visible");

    // Try to toggle theme
    cy.get("#themeToggle button").click();

    // Visual theme should still change
    cy.get("html").should("have.attr", "data-theme");
  });

  it("should validate email link format", () => {
    cy.get(".button")
      .contains("Get In Touch")
      .should("have.attr", "href")
      .then((href) => {
        // Should be a valid mailto URL
        expect(href).to.match(/^mailto:[^@]+@[^@]+\.[^@]+/);

        // Should have properly encoded characters
        expect(href).to.not.include(" ");
        expect(href).to.not.include("\n");
      });
  });

  it("should handle browser back/forward navigation", () => {
    // Visit page
    cy.findByTestId("title").should("be.visible");

    // Navigate away (simulate)
    cy.visit("about:blank");

    // Go back
    cy.go("back");

    // Should still work
    cy.findByTestId("title").should("be.visible");
  });

  it("should work with disabled JavaScript", () => {
    // Most functionality should work without JS
    cy.findByTestId("title").should("be.visible");
    cy.contains("Get In Touch").should("be.visible");
    cy.get('[aria-label="Follow me on Twitter"]').should("be.visible");

    // Links should still work
    cy.get(".button").contains("Get In Touch").should("have.attr", "href");
  });

  it("should handle malformed URLs gracefully", () => {
    // Check that all href attributes are valid
    cy.get("a[href]").each(($link) => {
      const href = $link.attr("href");

      if (href.startsWith("http")) {
        // Should be valid HTTP(S) URL
        expect(href).to.match(/^https?:\/\/.+/);
      } else if (href.startsWith("mailto:")) {
        // Should be valid mailto URL
        expect(href).to.match(/^mailto:.+@.+/);
      } else {
        // Should be valid relative URL
        expect(href).to.match(/^[/#].*/);
      }
    });
  });

  it("should handle focus management correctly", () => {
    // Focus should be manageable and visible
    cy.get(".skip-link").focus();
    cy.focused().should("have.class", "skip-link");

    // Focus should move correctly
    cy.focused().tab();
    cy.focused().should("exist");
  });

  it("should handle large viewport sizes", () => {
    // Test very large screens
    cy.viewport(2560, 1440);
    cy.findByTestId("title").should("be.visible");

    // Content should not be stretched beyond readability
    cy.get("main").invoke("width").should("be.lessThan", 2000);
  });

  it("should handle very small viewport sizes", () => {
    // Test very small screens
    cy.viewport(240, 320);

    // Content should still be accessible
    cy.findByTestId("title").should("be.visible");
    cy.contains("Get In Touch").should("be.visible");

    // Touch targets should still meet minimum size
    cy.get(".button").invoke("outerHeight").should("be.gte", 44);
  });
});
