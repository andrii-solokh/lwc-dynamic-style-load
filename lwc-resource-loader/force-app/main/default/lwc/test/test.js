import { LightningElement } from "lwc";
import { loadDynamicStyle, unloadDynamicStyle } from "c/lwcResourceLoader";

export default class Test extends LightningElement {
  load() {
    const rule = ["div", ["background-color: white;"]];
    loadDynamicStyle(this, [rule]);
  }
  
  unload() {
    unloadDynamicStyle(this);
  }
}
