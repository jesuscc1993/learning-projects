export class OutputUtil {
  private static outputSettings: OutputSettings;

  static configure(outputSettings: OutputSettings) {
    this.outputSettings = outputSettings;
  }

  static log(message: any, forceLogging?: boolean): void {
    if (this.outputSettings.loggingEnabled || forceLogging) {
      console.log(message);
    }
  }

  static error(error: any): void {
    console.error(error);
  }

  static toString(object: any): string {
    return JSON.stringify(object, undefined, 2);
  }

}

export class OutputSettings {
  loggingEnabled: boolean;
}