import { defaultExport } from "../default";

export interface IPlugin {
  // @ts-ignore
  setup(matic: typeof defaultExport, ...payload);
}
