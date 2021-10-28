import { mount } from "@vue/test-utils";
import { TokenService } from "@/services/token.service";

const faker = require("faker");

describe("TokenService", () => {
  it("gets token", () => {
    let token = faker.datatype.number({ min: 1000, max: 9999 });
    TokenService.saveToken(token);

    expect(TokenService.getToken()).toBe(String(token));
  });

  it("sets token", () => {
    let token = faker.datatype.number({ min: 1000, max: 9999 });
    TokenService.saveToken(token);

    expect(TokenService.getToken()).toBe(String(token));
  });

  it("removes token", () => {
    let token = faker.datatype.number({ min: 1000, max: 9999 });
    TokenService.saveToken(token);

    expect(TokenService.getToken()).toBe(String(token));

    TokenService.removeToken();

    expect(TokenService.getToken()).toBe(null);
  });

  it("gets refreshtoken", () => {
    let token = faker.datatype.number({ min: 1000, max: 9999 });
    TokenService.saveRefreshToken(token);

    expect(TokenService.getRefreshToken()).toBe(String(token));
  });

  it("sets refreshtoken", () => {
    let token = faker.datatype.number({ min: 1000, max: 9999 });
    TokenService.saveRefreshToken(token);

    expect(TokenService.getRefreshToken()).toBe(String(token));
  });

  it("removes refreshtoken", () => {
    let token = faker.datatype.number({ min: 1000, max: 9999 });
    TokenService.saveRefreshToken(token);

    expect(TokenService.getRefreshToken()).toBe(String(token));

    TokenService.removeRefreshToken();

    expect(TokenService.getRefreshToken()).toBe(null);
  });
});
