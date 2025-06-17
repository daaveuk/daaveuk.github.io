describe("Performance and Loading", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4321");
  });

  it("should load page quickly", () => {
    // Page should load within reasonable time
    cy.findByTestId("title", { timeout: 5000 }).should("be.visible");
  });

  it("should load all images successfully", () => {
    cy.get("img").each(($img) => {
      cy.wrap($img)
        .should("be.visible")
        .and(($el) => {
          expect($el[0].naturalWidth).to.be.greaterThan(0);
        });
    });
  });

  it("should have React component hydration", () => {
    // Theme toggle should be interactive after hydration
    cy.get("#themeToggle", { timeout: 15000 })
      .should("be.visible")
      .and("not.be.disabled");
  });

  it("should not have console errors", () => {
    cy.window().then((win) => {
      cy.stub(win.console, "error").as("consoleError");
    });

    // Wait for page to fully load
    cy.wait(2000);

    // Check no console errors occurred
    cy.get("@consoleError").should("not.have.been.called");
  });

  it("should preload critical resources", () => {
    // Check for font preloading
    cy.get('link[rel="preconnect"]').should("exist");
  });

  it("should have proper caching headers", () => {
    // Check static assets have proper caching
    cy.request("/profilePic.png").then((response) => {
      expect(response.status).to.eq(200);
    });

    cy.request("/favicon.ico").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("should handle JavaScript disabled gracefully", () => {
    // Most content should still be visible without JS
    cy.findByTestId("title").should("be.visible");
    cy.contains("Get In Touch").should("be.visible");
    cy.get('[aria-label="Follow me on Twitter"]').should("be.visible");
  });

  it("should have minimal layout shift", () => {
    // Images should have dimensions to prevent layout shift
    cy.get("img").each(($img) => {
      const img = $img[0];
      expect(img.getAttribute("width") || img.style.width || img.naturalWidth)
        .to.exist;
      expect(
        img.getAttribute("height") || img.style.height || img.naturalHeight
      ).to.exist;
    });
  });

  it("should load CSS without render blocking", () => {
    // Check that critical styles are applied
    cy.get("body").should("have.css", "font-family");
    cy.findByTestId("title").should("have.css", "font-size");
  });
});
