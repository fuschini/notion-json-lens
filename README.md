# notion-json-lens

A bi-directional converter between Notion's DB properties and a simple plain JSON object.

# Motivation

Notion's type objects definition for a DB items' properties can be tricky to work with. To get the value of any column, you need to know it's type and the object format of that type according to the [Type Objects Reference](https://developers.notion.com/reference/page-property-values#type-objects).

For example. A column of type `Text` in a notion DB is represented as:

```json
{
    ...
    "properties": {
        "column_name": {
            "id": "HbZT",
            "type": "rich_text",
            "rich_text": [
                {
                "type": "text",
                "text": {
                    "content": "There is some text here",
                    "link": null
                },
                "annotations": {
                    "bold": false,
                    "italic": false,
                    "strikethrough": false,
                    "underline": false,
                    "code": false,
                    "color": "default"
                },
                "plain_text": "There is some text here",
                "href": null
                },
            ]
        }
    }
}
```

To get the column's value you need to use `item.properties.column_name.rich_text[0].plain_text` 😰 (not to mention specific cases like if there are multiple blocks of rich_text in there).

Most times you just need a simple path to access an item's properties such as `item.properties.column_name` with no need to worry about the type of that columnm.

This is where this library comes in.

# How it works

The lens provides transformation in two directions, each implemented with a different function:

-   `notionToJson`
-   `jsonToNotion`

The lens will only be applied to the properties node of the item. Other data points outside the `properties` object are not contemplated in the transformation.

The name of the columns and json fields is preserved during a transformation. The lens is agnostic on the naming convention of the DB and object model, not performing any alterations on the columns and fields names, just its contents.

## Notion to JSON

Transforms a Notion DB item properties object into a flat JSON.

Transformed types:

-   Title
-   Text
-   Number
-   Select
-   Multi Select
-   Status
-   Date
-   Checkbox
-   URL
-   Unique Id

Columns with types not in the list above are returned as-is to preserve information. Support to more types coming in the future...

```node
import { notionToJson } from "notion-json-lens";

const sampleNotionDbProperties = {
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

console.log(notionToJson(baseNotionObject.properties));

// Output:
// {
//     Title: "page 1",
//     Description: "There is some text in this property!",
//     Number: 2,
//     Select: "option 1",
//     "Multi Select": ["option 2", "option 1"],
//     Status: "Done",
//     Date: {
//         start: "2024-03-16T00:00:00.000-05:00",
//         end: "2024-03-17T00:00:00.000-05:00",
//     },
//     Checkbox: true,
//     URL: "https://www.notion.so",
// }
```

## JSON to Notion

Transforms a JSON object that respects the format below to a properties node of a Notion DB item.

Transformed types:

-   Title
-   Text
-   Number
-   Select
-   Multi Select
-   Status
-   Date
-   Checkbox
-   URL

Unique Id is not supported in the JSON to Notion flow since the Id is not editable in Notion.

This side of the lens requires the Notion Table's schema to get the type information of each field and perform the appropriate conversion. The schema passed is the response of the [Retrieve Database](https://developers.notion.com/reference/retrieve-a-database) endpoint of Notion's API.

```node
import { Client } from "@notionhq/client"; // standard Notion API client
import { jsonToNotion } from "notion-json-lens";

const notion = new Client({ auth: <YOUR NOTION API SECRET> });

(async () => {

    const dbSchema = await notion.databases.retrieve({
        database_id: <your database_id>,
    });

    const json = {
        Title: "page 1",
        Description: "There is some **text** in this property!",
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
    };

    console.log(jsonToNotion(json, dbSchema));

})()

// Output
// {
//   "Title": {
//       "title": [
//           {
//               "text": {
//                   "content": "page 1"
//               }
//           }
//       ]
//   },
//   "Number": {
//       "number": 2
//   },
//   "Select": {
//       "select": {
//           "name": "option 1"
//       }
//   },
//   "Multi Select": {
//       "multi_select": [
//           {
//               "name": "option 2"
//           },
//           {
//               "name": "option 1"
//           }
//       ]
//   },
//   "Status": {
//       "status": {
//           "name": "Done"
//       }
//   },
//   "Date": {
//       "date": {
//           "start": "2024-03-16T00:00:00.000-05:00",
//           "end": "2024-03-17T00:00:00.000-05:00"
//       }
//   },
//   "Checkbox": {
//       "checkbox": true
//   },
//   "URL": {
//       "url": "https://www.notion.so"
//   }
// }

```

# Known issues

-   Currently the formatting information in `rich_text` columns is lost in the conversion. One idea is to use Markdown notation in the JSON side to represent markups supported by Notion, however this is not implemented yet
-   Not all Notion types are currently contemplated in the conversion. I decided to start with the ones I use the most for simplicity and add support to additional types as needed
    -   If you are interested in using this lib with an unsupported type, let me know or open a pull request 😁
-   There's no validation of the JSON schema received as input in the JSON to Notion flow. Ideally, the lib would validate if the JSON fields respect the expected format before attempting to convert to avoid any exceptions. Also in the roadmap for the future

# Shout-outs

The name of this project was inspired by Ink and Switch's [Project Cambria](https://www.inkandswitch.com/cambria/) even though the actual implementation is different.
