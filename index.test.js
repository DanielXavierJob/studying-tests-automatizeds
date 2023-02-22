import assert from "assert";
import Products from "./product.js";
import { describe, it } from "node:test";
import Service from "./service.js";

const callTracker = new assert.CallTracker()

// when this program exiting, verify all calls
process.on('exit', () => callTracker.verify())

describe("validate params from products", async () => {
  it.skip("it should throw an error when description is less than 5 characters long", async () => {
    // Param is a MOCK, contains what we needs to test running
    const params = { description: "my p", id: 1, price: 10000 };

    const product = new Products({
      onCreate: () => {},
      // This will not be used because it would give a character size error
      service: new Service(),
    });


    assert.rejects(
      await product.create(params),
      { message: "description must be higher than 5" },
      "should throw error"
    );
  });

  it("should save product sucessfully", async () => {
    // Param is a MOCK, contains what we needs to test running
    const params = { description: "my product", id: 1, price: 10000 };
    

    const spyService =  callTracker.calls(1)

    // serviceStub = stop being ONLINE (EXTERN)
    const serviceStub = {
      async save(params){
        //SPY: spy the function
        spyService(params)
        return "This data has saved"
      }
    }


    const fn = (msg) => {
      assert.deepStrictEqual(msg.id, params.id, 'id should be the same')
      assert.deepStrictEqual(msg.price, params.price, 'price should be the same')
      assert.deepStrictEqual(msg.description, params.description.toUpperCase(), 'description should be the same')
    }
    const spyOnCreate = callTracker.calls(fn, 1)

    const product = new Products({
      onCreate: spyOnCreate,
      // the stub
      service: serviceStub,
    });

    const result = await product.create(params)

    assert.deepStrictEqual(result, "THIS DATA HAS SAVED")
  });
});
