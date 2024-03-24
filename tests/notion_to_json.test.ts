import { beforeEach, describe, expect, test } from "bun:test";

// Import the function to test
import { notionToJson } from "../src/notion_to_json";

describe("Notion to JSON", () => {
    describe("Basic conversions", () => {
        test("Title", () => {
            const properties = {
                Title: {
                    id: "title",
                    type: "title",
                    title: [
                        {
                            type: "text",
                            text: {
                                content: "page 1",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                            plain_text: "page 1",
                            href: null,
                        },
                    ],
                },
            };
            expect(notionToJson(properties)).toEqual({
                Title: "page 1",
            });
        });

        test("Text", () => {
            const properties = {
                Description: {
                    id: "HbZT",
                    type: "rich_text",
                    rich_text: [
                        {
                            type: "text",
                            text: {
                                content: "There is some ",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                            plain_text: "There is some ",
                            href: null,
                        },
                        {
                            type: "text",
                            text: {
                                content: "text",
                                link: null,
                            },
                            annotations: {
                                bold: true,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                            plain_text: "text",
                            href: null,
                        },
                        {
                            type: "text",
                            text: {
                                content: " in this property!",
                                link: null,
                            },
                            annotations: {
                                bold: false,
                                italic: false,
                                strikethrough: false,
                                underline: false,
                                code: false,
                                color: "default",
                            },
                            plain_text: " in this property!",
                            href: null,
                        },
                    ],
                },
            };
            expect(notionToJson(properties)).toEqual({
                Description: "There is some text in this property!",
            });
        });

        test("Number", () => {
            const properties = {
                Number: {
                    id: "DT%3Eg",
                    type: "number",
                    number: 2,
                },
            };
            expect(notionToJson(properties)).toEqual({
                Number: 2,
            });
        });

        test("Select", () => {
            const properties = {
                Select: {
                    id: "FSau",
                    type: "select",
                    select: {
                        id: "b5b79bb7-e513-4513-9c0f-8cf81392b189",
                        name: "option 1",
                        color: "red",
                    },
                },
            };
            expect(notionToJson(properties)).toEqual({
                Select: "option 1",
            });
        });

        test("MultiSelect", () => {
            const properties = {
                "Multi Select": {
                    id: "%3EP%60%7D",
                    type: "multi_select",
                    multi_select: [
                        {
                            id: "82303241-ae20-4690-bd0b-349a1528954c",
                            name: "option 2",
                            color: "red",
                        },
                        {
                            id: "d521ee51-b4ad-468d-979a-d230875c1cf8",
                            name: "option 1",
                            color: "green",
                        },
                    ],
                },
            };
            expect(notionToJson(properties)).toEqual({
                "Multi Select": ["option 2", "option 1"],
            });
        });

        test("Status", () => {
            const properties = {
                Status: {
                    id: "ynbl",
                    type: "status",
                    status: {
                        id: "13edf371-8bb1-4d19-921d-a095831dfab0",
                        name: "Done",
                        color: "green",
                    },
                },
            };
            expect(notionToJson(properties)).toEqual({
                Status: "Done",
            });
        });

        test("Simple DateTime", () => {
            const properties = {
                Date: {
                    id: "MJSZ",
                    type: "date",
                    date: {
                        start: "2024-03-16T00:00:00.000-05:00",
                        end: null,
                        time_zone: null,
                    },
                },
            };
            expect(notionToJson(properties)).toEqual({
                Date: {
                    start: "2024-03-16T00:00:00.000-05:00",
                    end: null,
                },
            });
        });

        test("DateTime Range", () => {
            const properties = {
                Date: {
                    id: "MJSZ",
                    type: "date",
                    date: {
                        start: "2024-03-16T00:00:00.000-05:00",
                        end: "2024-03-17T00:00:00.000-05:00",
                        time_zone: null,
                    },
                },
            };

            expect(notionToJson(properties)).toEqual({
                Date: {
                    start: "2024-03-16T00:00:00.000-05:00",
                    end: "2024-03-17T00:00:00.000-05:00",
                },
            });
        });

        test("Checkbox", () => {
            const properties = {
                Checkbox: {
                    id: "jWlx",
                    type: "checkbox",
                    checkbox: true,
                },
            };
            expect(notionToJson(properties)).toEqual({
                Checkbox: true,
            });
        });

        test("URL", () => {
            const properties = {
                URL: {
                    id: "jWlx",
                    type: "url",
                    url: "https://www.notion.so",
                },
            };
            expect(notionToJson(properties)).toEqual({
                URL: "https://www.notion.so",
            });
        });

        test("Unique Id without prefix", () => {
            const properties = {
                ID: {
                    id: "zw%40%3E",
                    type: "unique_id",
                    unique_id: {
                        prefix: null,
                        number: 1,
                    },
                },
            };
            expect(notionToJson(properties)).toEqual({
                ID: "1",
            });
        });

        test("Unique Id with prefix", () => {
            const properties = {
                ID: {
                    id: "zw%40%3E",
                    type: "unique_id",
                    unique_id: {
                        prefix: "prefix",
                        number: 1,
                    },
                },
            };
            expect(notionToJson(properties)).toEqual({
                ID: "prefix-1",
            });
        });
    });

    describe("Empty value conversions", () => {
        test("Empty Title", () => {
            const properties = {
                Title: {
                    id: "jWlx",
                    type: "title",
                    title: [],
                },
            };
            expect(notionToJson(properties)).toEqual({
                Title: "",
            });
        });

        test("Empty Rich Text", () => {
            const properties = {
                RichText: {
                    id: "jWlx",
                    type: "rich_text",
                    rich_text: [],
                },
            };
            expect(notionToJson(properties)).toEqual({
                RichText: "",
            });
        });

        test("Empty Number", () => {
            const properties = {
                Number: {
                    id: "jWlx",
                    type: "number",
                    number: null,
                },
            };
            expect(notionToJson(properties)).toEqual({
                Number: null,
            });
        });

        test("Empty Select", () => {
            const properties = {
                Select: {
                    id: "jWlx",
                    type: "select",
                    select: null,
                },
            };
            expect(notionToJson(properties)).toEqual({
                Select: null,
            });
        });

        test("Empty Multi Select", () => {
            const properties = {
                MultiSelect: {
                    id: "jWlx",
                    type: "multi_select",
                    multi_select: [],
                },
            };
            expect(notionToJson(properties)).toEqual({
                MultiSelect: [],
            });
        });

        test("Empty Status", () => {
            const properties = {
                Status: {
                    id: "jWlx",
                    type: "status",
                    status: null,
                },
            };
            expect(notionToJson(properties)).toEqual({
                Status: null,
            });
        });

        test("Empty Date", () => {
            const properties = {
                Date: {
                    id: "jWlx",
                    type: "date",
                    date: null,
                },
            };
            expect(notionToJson(properties)).toEqual({
                Date: {
                    start: null,
                    end: null,
                },
            });
        });

        test("Empty Checkbox", () => {
            const properties = {
                Checkbox: {
                    id: "jWlx",
                    type: "checkbox",
                    checkbox: false,
                },
            };
            expect(notionToJson(properties)).toEqual({
                Checkbox: false,
            });
        });

        test("Empty URL", () => {
            const properties = {
                URL: {
                    id: "jWlx",
                    type: "url",
                    url: "",
                },
            };
            expect(notionToJson(properties)).toEqual({
                URL: "",
            });
        });
    });

    // Mixed payload
    test("Mixed properties", () => {
        const properties = {
            Title: {
                id: "title",
                type: "title",
                title: [
                    {
                        type: "text",
                        text: {
                            content: "page 1",
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: "default",
                        },
                        plain_text: "page 1",
                        href: null,
                    },
                ],
            },
            Description: {
                id: "HbZT",
                type: "rich_text",
                rich_text: [
                    {
                        type: "text",
                        text: {
                            content: "There is some ",
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: "default",
                        },
                        plain_text: "There is some ",
                        href: null,
                    },
                    {
                        type: "text",
                        text: {
                            content: "text",
                            link: null,
                        },
                        annotations: {
                            bold: true,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: "default",
                        },
                        plain_text: "text",
                        href: null,
                    },
                    {
                        type: "text",
                        text: {
                            content: " in this property!",
                            link: null,
                        },
                        annotations: {
                            bold: false,
                            italic: false,
                            strikethrough: false,
                            underline: false,
                            code: false,
                            color: "default",
                        },
                        plain_text: " in this property!",
                        href: null,
                    },
                ],
            },
            Number: {
                id: "DT%3Eg",
                type: "number",
                number: 2,
            },
            Select: {
                id: "FSau",
                type: "select",
                select: {
                    id: "b5b79bb7-e513-4513-9c0f-8cf81392b189",
                    name: "option 1",
                    color: "red",
                },
            },
            "Multi Select": {
                id: "%3EP%60%7D",
                type: "multi_select",
                multi_select: [
                    {
                        id: "82303241-ae20-4690-bd0b-349a1528954c",
                        name: "option 2",
                        color: "red",
                    },
                    {
                        id: "d521ee51-b4ad-468d-979a-d230875c1cf8",
                        name: "option 1",
                        color: "green",
                    },
                ],
            },
            Status: {
                id: "ynbl",
                type: "status",
                status: {
                    id: "13edf371-8bb1-4d19-921d-a095831dfab0",
                    name: "Done",
                    color: "green",
                },
            },
            Date: {
                id: "MJSZ",
                type: "date",
                date: {
                    start: "2024-03-16T00:00:00.000-05:00",
                    end: "2024-03-17T00:00:00.000-05:00",
                    time_zone: null,
                },
            },
            Checkbox: {
                id: "jWlx",
                type: "checkbox",
                checkbox: true,
            },
            URL: {
                id: "jWlx",
                type: "url",
                url: "https://www.notion.so",
            },
        };
        expect(notionToJson(properties)).toEqual({
            Title: "page 1",
            Description: "There is some text in this property!",
            Number: 2,
            Select: "option 1",
            "Multi Select": ["option 2", "option 1"],
            Status: "Done",
            Date: {
                start: "2024-03-16T00:00:00.000-05:00",
                end: "2024-03-17T00:00:00.000-05:00",
            },
            Checkbox: true,
            URL: "https://www.notion.so",
        });
    });

    // Unmapped type test
    test("Unmapped type", () => {
        const properties = {
            UnmappedType: {
                id: "jWlx",
                type: "unmapped_type",
                unmapped_type: "unmapped_value",
            },
        };
        expect(notionToJson(properties)).toEqual({
            UnmappedType: "unmapped_value",
        });
    });
});
