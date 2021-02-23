interface Descriptor {
  Name: string;
  Description: string;
}

interface Examples {
  SimpleExample: string;
  FullExample: string;
}

export interface MethodDefinition extends Descriptor, Examples {
  InternalName: string;
  Returns: string;
  Parameters: Record<
    string,
    Descriptor & {
      InternalName: string;
      Type: "string" | string;
      Order: number;
    }
  >;
}

export interface SectionDefinition extends Descriptor {
  Methods: Record<string, MethodDefinition>;
  Properties: Record<
    string,
    Descriptor &
      Examples & {
        InternalName: string;
      }
  >;
}

export interface HelpDocument {
  // [K: string]: SectionDefinition;
  SectionScriptObjects: Descriptor & {
    [K: string]: Descriptor;
  };
  SectionExposedObjects: Descriptor;
  SectionLocateWindow: SectionDefinition;
  SectionLanguage: SectionDefinition;
  SectionInternal: SectionDefinition;
  SectionTimers: SectionDefinition;
  SectionStoreRetrieveData: SectionDefinition;
  SectionInputAndDisplay: SectionDefinition;
  SectionOperatingSystem: SectionDefinition;
  SectionMedia: SectionDefinition;
  SectionMouse: SectionDefinition;
  SectionFiles: SectionDefinition;
  SectionKeystrokes: SectionDefinition;
  SectionMacros: SectionDefinition;
  SectionUtilities: SectionDefinition;
  SectionRegions: SectionDefinition;
  SectionNativeDynamic: SectionDefinition;
  SectionRegistry: SectionDefinition;
  SectionFloaters: SectionDefinition;
  SectionExtensions: SectionDefinition;
  SectionSystemWindow: SectionDefinition;
}
