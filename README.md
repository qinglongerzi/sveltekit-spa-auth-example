# Sveltekit SPA auth example

SPAの勉強用作ってみたプロジェクトです。作りかけのため、不要なファイルもある。

APIも混ざっているが、本当のプロジェクトの場合はサーバー側のコードが入れてはいけない(+server.ts/+page.server.ts/+layout.server.ts)

認証の流れとRoute Guardの実現は画像Sveltkit SPA auth flow.pngを参考してください。

## Tech Stack

**Client:** Sveltekit, shadcn/ui, TailwindCSS

**Server:** Node, Sveltekit

**Auth:** lucia auth

**DB orm:** Drizzle
