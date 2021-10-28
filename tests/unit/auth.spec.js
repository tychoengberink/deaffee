// use require syntax for inline loaders.
// with inject-loader, this returns a module factory
// that allows us to inject mocked dependencies.
let sinon = require("sinon");
const actionsInjector = require('inject-loader!./../../../src/store')

// create the module with our mocks
const actions = actionsInjector({
 
});

describe("actions", () => {
  afterEach(() => {
    // Restore the default sandbox here
    sinon.restore();
  });

  it("getAllProducts", () => {
    const commit = sinon.spy();
    const state = {};

    actions.getAllProducts({ commit, state });

    expect(commit.args).to.deep.equal([
      ["REQUEST_PRODUCTS"],
      [
        "RECEIVE_PRODUCTS",
        {
          /* mocked response */
        },
      ],
    ]);
  });
});
