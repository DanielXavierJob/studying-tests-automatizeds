import { setTimeout } from "timers/promises";
export default class Service {
  async save(data) {
    await setTimeout(2000)
    return "This data has saved";
  }
}
