import { NotionDbProperties, PlainJson, NotionTableSchema } from "./types";

const PropertyTypesHandlers = {
    title: TitleConversion,
    rich_text: RichTextConversion,
    number: NumberConversion,
    select: SelectConversion,
    multi_select: MultiSelectConversion,
    status: StatusConversion,
    date: DateConversion,
    checkbox: CheckboxConversion,
    url: URLConversion,
};

export function jsonToNotion(input: PlainJson, tableSchema: NotionTableSchema): NotionDbProperties {
    let res: NotionDbProperties = {};

    for (const inputProp in input) {
        // @ts-ignore
        const dbColum = tableSchema.properties[inputProp];

        if (!dbColum) {
            continue;
        }

        const type = dbColum.type;
        // @ts-ignore
        const handler = PropertyTypesHandlers[type];

        res[inputProp] = handler(input[inputProp]);
    }

    return res;
}

function TitleConversion(value: any) {
    return {
        title: value
            ? [
                  {
                      text: {
                          content: value,
                      },
                  },
              ]
            : [],
    };
}

function RichTextConversion(value: any) {
    return {
        rich_text: value
            ? [
                  {
                      text: {
                          content: value,
                      },
                  },
              ]
            : [],
    };
}

function NumberConversion(value: any) {
    return {
        number: value,
    };
}

function SelectConversion(value: any) {
    return {
        select: value
            ? {
                  name: value,
              }
            : null,
    };
}

function MultiSelectConversion(value: any) {
    return {
        multi_select: value.map(function (v: any) {
            return {
                name: v,
            };
        }),
    };
}

function StatusConversion(value: any) {
    return {
        status: value
            ? {
                  name: "Done",
              }
            : null,
    };
}

function DateConversion(value: any) {
    return {
        date: value
            ? {
                  start: value.start,
                  end: value.end ?? null,
              }
            : null,
    };
}

function CheckboxConversion(value: any) {
    return {
        checkbox: value ?? false,
    };
}

function URLConversion(value: any) {
    return {
        url: value,
    };
}
