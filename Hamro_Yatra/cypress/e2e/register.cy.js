describe("Registration Form Tests", () => {
  beforeEach(() => {
    // Visit the registration page with an extended timeout to ensure it loads
    cy.visit("http://localhost:5173/register", { timeout: 10000 });
  });

  it("redirects to the login page after successful registration", () => {
    // Fill the form
    cy.get('input[name="name"]', { timeout: 10000 }).then(($input) => {
      expect($input).to.exist;
      $input.val("John Doe");
    });

    cy.get('input[name="phone"]', { timeout: 10000 }).then(($input) => {
      expect($input).to.exist;
      $input.val("1234567890");
    });

    cy.get('input[name="email"]', { timeout: 10000 }).then(($input) => {
      expect($input).to.exist;
      $input.val("john.doe@example.com");
    });

    cy.get('input[name="password"]', { timeout: 10000 }).then(($input) => {
      expect($input).to.exist;
      $input.val("password123");
    });

    cy.get('select[name="role"]', { timeout: 10000 }).then(($select) => {
      expect($select).to.exist;
      $select.val("passenger");
    });

    // Intercept the POST call to the registration endpoint
    cy.intercept("POST", "http://localhost:8080/api/register").as("register");

    // Submit the form
    cy.get("form").then(($form) => {
      expect($form).to.exist;
      $form.submit();
    });

    // Wait for the POST request to complete
    cy.wait("@register").then((interception) => {
      // Check the response status code
      assert.equal(
        interception.response.statusCode,
        200,
        "Response status code should be 200"
      );
    });

    // Check the URL to ensure it has been redirected to the login page
    cy.url().then((url) => {
      assert.isTrue(
        url.includes("/login"),
        "URL should include /login after registration"
      );
    });
  });
});
