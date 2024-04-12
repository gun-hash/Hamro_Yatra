// login.spec.js
describe("Login Component Tests", () => {
  beforeEach(() => {
    // Mock API response for successful and failed login attempts
    cy.intercept("POST", "http://localhost:5173/login", (req) => {
      if (
        req.body.email === "sakshamkadayat@gmail.com" &&
        req.body.password === "1234567890"
      ) {
        // Simulate a successful login response
        req.reply({
          statusCode: 200,
          body: {
            success: true,
            message: "Logged in successfully",
          },
        });
      } else {
        // Simulate a failed login response
        req.reply({
          statusCode: 401,
          body: {
            success: false,
            message: "Invalid credentials",
          },
        });
      }
    }).as("loginRequest");

    // Visit the login page before each test
    cy.visit("http://localhost:5173/login");
  });

  it("login with correct credentials", () => {
    // Enter correct login credentials
    cy.get("input[name=email]").type("sakshamkadayat@gmail.com");
    cy.get("input[name=password]").type("1234567890");

    // Submit the login form
    cy.get(".login-form").submit();
    cy.log("login sucess");
  });

  it("logging in with incorrect credentials", () => {
    // Enter incorrect login credentials
    cy.get("input[name=email]").type("user@example.com");
    cy.get("input[name=password]").type("wrongpassword");

    // Submit the login form
    cy.get(".login-form").submit();
    cy.log("login failed");
  });
});
