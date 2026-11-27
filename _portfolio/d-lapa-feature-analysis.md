---
title: "D-LAPA feature analysis"
tagline: "A rerun of the feature analysis for the D-LAPA depth-injection paper: does adding depth features help a probe on LIBERO-10 frames?"
collection: portfolio
when: "Jun 2026"
start: "2026-06"
end: "2026-06"
context: "Analysis for the D-LAPA depth-injection paper"
stack: [Python, PyTorch, scikit-learn, UMAP, SciPy]
code: "https://github.com/khoadangnguyenn/D-LAPA-Feature-Analysis"
links:
  - {label: "Analysis report (PDF)", url: "https://github.com/khoadangnguyenn/D-LAPA-Feature-Analysis/blob/main/pdf/feature_analysis_redone.pdf"}
results:
  - "Ridge probe R² 0.454 for RGB alone, 0.520 for RGB plus the Model 2 or Model 6.1 depth features (+0.066)."
teaser: /images/work/d-lapa-feature-analysis/teaser.png
teaser_alt: "Bar chart of held-out Ridge R² for RGB alone and RGB combined with ground-truth depth and each model variant"
teaser_caption: "Held-out Ridge R² on LIBERO-10; the y-axis starts at 0.40."
card_summary: "Redone feature analysis for D-LAPA depth injection: Ridge probes, depth alignment and UMAP smoothness on 138,090 LIBERO-10 frame pairs."
card_result: "RGB R² 0.454 to 0.520 with depth features"
permalink: /portfolio/d-lapa-feature-analysis/
---
This is a rerun of the feature analysis behind the D-LAPA paper. It asks whether adding depth features helps a probe on LIBERO-10 frames. The earlier appendix used a finetuned-LAPA reference. The cache provided for the rerun matched the pre-VQ LAPA-LAQ scale, so the analysis was redone and its claims rewritten.

The script streams 138,090 consecutive frame pairs, split by video into 400 for training and 100 for testing, with seed 42. It runs four checks:

- Ridge probes that predict translation magnitude from RGB, from depth, and from RGB plus each of seven model variants.
- Alignment of each model's depth feature to the ground-truth one, by MSE and cosine.
- Token and sequence accuracy of the predicted depth indices.
- UMAP of 3,000 held-out pairs, scored with Moran's I.

## Results

RGB alone reaches R² 0.454. Adding Model 2 or Model 6.1 features raises it to 0.520, while ground-truth depth gives only 0.478. Model 3, an RGB-only control, gains just 0.003, so extra capacity alone does not explain the lift.

Alignment points the other way. Only Model 7.1 tracks the teacher depth feature (cosine 0.806, MSE 0.025). Models 2 and 6.1 have cosine near zero (0.023 and -0.003) yet give the largest gain. Model 4 has the smoothest UMAP (Moran's I 0.472) but a probe R² of only 0.481.

The report calls the gain modest and asks for a downstream policy evaluation. All results come from one split with one seed.

<!--lang:vi-->

Đây là bản chạy lại phần phân tích đặc trưng làm nền cho bài báo D-LAPA. Câu hỏi đặt ra là thêm đặc trưng độ sâu có giúp probe làm tốt hơn trên khung hình của LIBERO-10 hay không. Phụ lục trước đó lấy LAPA đã finetune làm mốc tham chiếu. Còn cache dùng cho lần chạy lại thì khớp với thang giá trị của LAPA-LAQ trước bước VQ, nên phân tích phải làm lại và các nhận định phải viết lại.

Script đọc dần (stream) 138.090 cặp khung hình liên tiếp, chia theo video thành 400 để huấn luyện và 100 để kiểm tra, với seed 42. Script chạy bốn phép kiểm tra:

- Ridge probe dự đoán độ lớn chuyển động tịnh tiến từ RGB, từ độ sâu, và từ RGB ghép với đặc trưng của từng biến thể trong bảy biến thể mô hình.
- Độ khớp giữa đặc trưng độ sâu của từng mô hình và đặc trưng độ sâu thật (ground truth), đo bằng MSE và cosine.
- Độ chính xác theo token và theo chuỗi của các chỉ số độ sâu mà mô hình dự đoán.
- UMAP của 3.000 cặp thuộc phần dữ liệu giữ lại (held-out), chấm bằng Moran's I.

## Kết quả

Chỉ dùng RGB, R² đạt 0,454. Thêm đặc trưng của Model 2 hoặc Model 6.1 thì R² lên 0,520, còn thêm độ sâu thật chỉ được 0,478. Model 3 là bản đối chứng chỉ dùng RGB và chỉ tăng 0,003, nên riêng việc mô hình lớn hơn không giải thích được mức tăng này.

Phép đo độ khớp cho kết quả ngược lại. Chỉ Model 7.1 bám theo đặc trưng độ sâu của teacher (cosine 0,806, MSE 0,025). Model 2 và Model 6.1 có cosine gần bằng 0 (0,023 và -0,003) nhưng lại cho mức tăng lớn nhất. Model 4 có UMAP mượt nhất (Moran's I 0,472) nhưng R² của probe chỉ đạt 0,481.

Báo cáo nhận định mức tăng này không lớn và đề nghị đánh giá thêm policy trên tác vụ downstream. Mọi kết quả đều đến từ một lần chia dữ liệu với một seed.

<!--lang:ja-->

D-LAPA論文のもとになった特徴量分析をやり直したものです。LIBERO-10のフレームで、深度特徴を加えるとプローブの性能が上がるのかを調べます。以前の付録では、ファインチューニング済みのLAPAを基準にしていました。ところが再実行用に用意されたキャッシュはVQ前のLAPA-LAQのスケールに合っていたため、分析をやり直し、主張も書き直しました。

スクリプトは連続する138,090組のフレームペアをストリーミングで読み込み、動画単位で学習用400、テスト用100に分けます（シードは42）。確認するのは次の4点です。

- 並進量の大きさを予測するRidgeプローブ。入力はRGBのみ、深度のみ、RGBと7つのモデルバリアントそれぞれの特徴の組み合わせです。
- 各モデルの深度特徴と正解の深度特徴との整合。MSEとコサイン類似度で測ります。
- 予測した深度インデックスのトークン単位と系列単位の精度。
- ホールドアウトした3,000ペアのUMAPと、そのMoran's Iによるスコア。

## 結果

RGBのみではR²は0.454です。Model 2かModel 6.1の特徴を加えると0.520まで上がりますが、正解の深度を加えても0.478にとどまります。RGBのみの対照であるModel 3は0.003しか上がらないので、モデルの容量が増えたことだけでは向上を説明できません。

整合の結果は逆の傾向を示しています。教師の深度特徴に追従しているのはModel 7.1だけです（コサイン類似度0.806、MSE 0.025）。Model 2とModel 6.1はコサイン類似度がほぼゼロ（0.023と-0.003）なのに、向上幅は最も大きくなっています。Model 4はUMAPが最も滑らか（Moran's I 0.472）ですが、プローブのR²は0.481にとどまります。

レポートではこの向上を小幅なものとし、下流タスクでのポリシー評価が必要だとしています。結果はすべて、1つのシードによる1回の分割から得たものです。
