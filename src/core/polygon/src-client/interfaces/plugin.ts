import { defaultExport } from "../default";

export interface IPlugin {
  setup(dojima: typeof defaultExport, ...payload);
}
