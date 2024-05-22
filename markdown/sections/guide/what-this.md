# Book Template With Supabase Auth and Lemon Squeezy

一个知识付费的小册模板，使用 Lemon Squeezy 接入支付。

## 使用此模板

```bash
git clone https://github.com/Innei/book-supabase-lemonsqueezy
```

或者，你可以点击 Fork 此项目/使用此模板。

## 环境变量

| Name                    | Description            |
| ----------------------- | ---------------------- |
| `LEMONSQUEEZY_API_KEY`  | Lemon Squeezy API Key  |
| `LEMONSQUEEZY_STORE_ID` | Lemon Squeezy Store Id |

## 配置项

在 `src/app.config.ts` 中，你可以选择的更换一些配置。

| Variables | Types                                                                                   | Descriptions                                         |
| --------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `SEO`     | [`Metadata`](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) | Configuration for SEO, provided by Next.js           |
| `DONATE`  | `object`                                                                                | Sponsored Button content, links and images           |
| `CONFIG`  | `object`                                                                                | Related Configurations                               |
| `DONATE`  | `object`                                                                                | Sponsored Configuration, Links and Images for Button |

## 小节存放位置

你可以在 `markdown/sections` 中放置每小节的内容，内容格式为 `markdown`。

此项目，不会根据 File-system 去自动生成目录树，因此，你可以根据你的喜好去调整文件的层级关系。另一个好处是，你也可以更加灵活的调整每个小节出现的顺序。

例如，我们有这样一个目录树：

```text filename="/markdown"
.
├── index.json
└── sections
    ├── guide
    │   └── what-this.md
    └── usage
        └── markdown.md
```

小节存放在 `sections`，而在 `index.json` 控制其顺序。

```json filename="index.json"
[
  {
    "paths": ["./sections/guide/what-this.md"],
    "title": "开始"
  },
  {
    "paths": ["./sections/usage/markdown.md"],
    "title": "使用"
  }
]
```

你可以在 `paths` 中随意调整小节位置。

下一节，展开 Markdown 扩展语法。
