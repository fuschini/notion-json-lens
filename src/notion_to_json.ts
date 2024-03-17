import { NotionObject, PlainJson } from "./types";

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
    unique_id: UniqueIdConversion,
};

export function notionToJson(notionObj: NotionObject): PlainJson {
    let res: PlainJson = {};

    for (const column in notionObj.properties) {
        // const sanitizedColumnName = column.replace(/\s/g, "_").toLocaleLowerCase();
        // @ts-ignore
        res[column] = PropertyTypesHandlers[notionObj.properties[column].type](
            notionObj.properties[column]
        );
    }

    return res;
}

function TitleConversion(value: any) {
    return value.title[0]?.plain_text ?? "";
}

function RichTextConversion(value: any) {
    return value.rich_text.map((textBlock: any) => textBlock.plain_text).join("");
}

function NumberConversion(value: any) {
    return value.number;
}

function SelectConversion(value: any) {
    return value.select?.name ?? null;
}

function MultiSelectConversion(value: any) {
    return value.multi_select.map((option: any) => option.name);
}

function StatusConversion(value: any) {
    return value.status?.name ?? null;
}

function DateConversion(value: any) {
    return {
        start: value.date?.start ?? null,
        end: value.date?.end ?? null,
    };
}

function CheckboxConversion(value: any) {
    return value.checkbox;
}

function URLConversion(value: any) {
    return value.url;
}

function UniqueIdConversion(value: any) {
    return value.unique_id.prefix
        ? `${value.unique_id.prefix}-${value.unique_id.number}`
        : value.unique_id.number.toString();
}
