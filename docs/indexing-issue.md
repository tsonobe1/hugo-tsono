# Googleインデックス問題の調査メモ

## 原因
- `hugo.toml` の `outputs.home` から `"SITEMAP"` が外れていたため、サイトルートに `sitemap.xml` が出力されず、Google が多言語コンテンツのURLをクロールできなかった。
- `<head>` テンプレートに自己参照と相互参照の `hreflang` リンクがなく、日本語と英語の記事が別言語の対応ページとして認識されなかった。

## 対応
- `hugo.toml` の `outputs.home` に `"SITEMAP"` を追加して、ホーム出力で `sitemap.xml` が再生成されるようにした。これにより全言語のURLリストをGoogleが取得できる。
- `themes/my-high-contrast-theme/layouts/partials/head.html` と `layouts/_default/sitemap.xml` で自己参照および翻訳ページの `hreflang` 情報を出力するようにした。各ページとサイトマップに言語の対応関係が明示され、検索エンジンが日本語・英語の記事を正しく関連付けられる。

## 期待される効果
- Google Search Console に sitemap を再送信すれば、多言語ページが再クロールされる。
- `hreflang` 情報により、各言語ページが重複コンテンツとみなされず、それぞれの検索結果に適切に表示される。
