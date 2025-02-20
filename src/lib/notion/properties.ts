import { DateRange, RichText } from "@/types/api";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export type DatabaseProperties = PageObjectResponse["properties"];
export type DatabaseProperty = DatabaseProperties[string];

class ParseError extends Error {
  constructor(
    public propertyName: string,
    public expected: string,
  ) {
    const message = `Cannot parse '${propertyName}' as '${expected}'`;
    super(message);
    this.name = this.constructor.name;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

class Property {
  constructor(
    private property: DatabaseProperty,
    private propertyName: string,
  ) {}

  asTitle(): string {
    if (this.property.type === "title") {
      return this.property.title.map((t) => t.plain_text).join("");
    }
    throw new ParseError(this.propertyName, "title");
  }

  asRichText(): RichText[] {
    if (this.property.type === "rich_text") {
      return this.property.rich_text.map((r) => ({
        plainText: r.plain_text,
        annotations: {
          ...r.annotations,
          href: r.href ?? undefined,
          equation: r.type === "equation",
        },
      }));
    }
    throw new ParseError(this.propertyName, "RichText");
  }

  asCheckbox(): boolean {
    if (this.property.type === "checkbox") {
      return this.property.checkbox;
    }
    throw new ParseError(this.propertyName, "checkbox");
  }

  asDateRange(): DateRange | undefined {
    if (this.property.type === "date") {
      if (!this.property.date) return undefined;
      const [year, month, day] = this.property.date.start
        .split("-")
        .map(Number);
      const res: DateRange = {
        start: new Date(year, month - 1, day),
      };

      if (this.property.date.end) {
        const [year, month, day] = this.property.date.end
          .split("-")
          .map(Number);
        res.end = new Date(year, month - 1, day);
      }

      return res;
    }
    throw new ParseError(this.propertyName, "DateRange");
  }

  asMultiSelect(): string[] {
    if (this.property.type === "multi_select") {
      return this.property.multi_select.map((o) => o.name);
    }
    throw new ParseError(this.propertyName, "multiselect");
  }

  asSelect(): string | undefined {
    if (this.property.type === "select") {
      return this.property.select?.name;
    }
    throw new ParseError(this.propertyName, "select");
  }

  asUrl(): string | undefined {
    if (this.property.type === "url") {
      return this.property.url ?? undefined;
    }
    throw new ParseError(this.propertyName, "url");
  }
}

export default class Properties {
  constructor(private properties: DatabaseProperties) {}

  get(k: string): Property {
    if (this.properties[k]) {
      return new Property(this.properties[k], k);
    }
    throw new Error(`Cannot find property '${k}'`);
  }
}
