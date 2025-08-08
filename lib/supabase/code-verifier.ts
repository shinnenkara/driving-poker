export class CodeVerifier {
  private readonly url: URL;

  constructor(request: Request) {
    this.url = new URL(request.url);
  }

  getCode() {
    const { searchParams } = this.url;
    const code = searchParams.get("code");

    return code ?? undefined;
  }

  getNext(): string {
    const { searchParams } = this.url;
    const next = searchParams.get("next");
    if (!next || !next.startsWith("/")) {
      return  "/";
    }

    return next;
  }

  getOrigin(): string {
    return this.url.origin;
  }
}
