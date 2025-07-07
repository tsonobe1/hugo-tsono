# tsono blog

## 多言語記事のためのGiscus設定

記事の日本語版と英語版の両方で同じGiscusディスカッションを使用するために、以下の設定が適用されています。

- **`hugo.toml`**:
    - `[params.comments.giscus].mapping` を `"issue-term"` に設定しています。これにより、Giscusは（URLやパス名ではなく）特定の用語を使用してディスカッションを識別します。

- **`themes/my-high-contrast-theme/layouts/partials/giscus.html`**:
    - Giscusスクリプトに `data-term` 属性が追加され、`{{ .File.Dir }}` に設定されています。これにより、記事のファイルディレクトリ（例: `posts/2025/07/macOS_shift_space_input_source/`）がディスカッションの一意の識別子として使用され、URL内の言語プレフィックスが無視されます。

この設定により、`example.com/en/posts/...` と `example.com/ja/posts/...` の両方が、コメントのために同じGitHub Discussionにリンクされるようになります。
