export enum ParameterType {
  NUMBER = "number",
  STRING = "string",
  WEIGHTED_RENDERER_LIST = "weighted-renderer-list",
}

export interface RendererConfig<T> {
  type: ParameterType;
  value: T;
}

export interface RendererConfigGroup {
  [key: string]: RendererConfig<any>;
}

export interface RendererInfo {
  configs: RendererConfigGroup;
  rendererFactory: Function;
  rendererName: string;
}

export interface RendererInfoCollection {
  [key: string]: RendererInfo;
}

class RendererEditorRegistry {
  static registry: RendererInfoCollection = {};
  static register(
    name: string,
    rendererFactory: Function,
    configs: RendererConfigGroup
  ) {
    this.registry[name] = {
      configs: configs,
      rendererName: name,
      rendererFactory: rendererFactory,
    };
  }
  static getAllRenderer(): RendererInfoCollection {
    return this.registry;
  }

  static getRendererEntry(name: string): RendererInfo {
    return this.registry[name];
  }
}

export { RendererEditorRegistry };
