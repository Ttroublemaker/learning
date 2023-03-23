class SignaleTon {
  private static instance;
  private constructor() {}
  public static getInstance() {
    if (!this.instance) {
      this.instance = new SignaleTon();
    }
    return this.instance;
  }
  fn1() {}
  fn2() {}
}
